import { useSessionStore } from '@core/session-store'

const API_PREFIX = '/api'

export class FriendlyError extends Error {
  readonly status: number
  readonly body: unknown
  constructor(message: string, status: number, body: unknown) {
    super(message)
    this.name = 'FriendlyError'
    this.status = status
    this.body = body
  }
}

export function defineApiRoute<const T extends string>(path: T) {
  return `${API_PREFIX}${path}` as const
}

export function defineApiRouteFn(pathTemplate: string) {
  return (params: Record<string, string | number>) => {
    let result = pathTemplate
    for (const [key, value] of Object.entries(params)) {
      result = result.replace(`:${key}`, String(value))
    }
    return `${API_PREFIX}${result}`
  }
}

async function parseBody(res: Response): Promise<unknown> {
  const contentType = res.headers.get('content-type') ?? ''
  if (
    contentType.includes('application/json') ||
    contentType.includes('application/problem+json')
  ) {
    try {
      return await res.json()
    } catch {
      return null
    }
  }
  return null
}

function buildHeaders(init?: HeadersInit): Headers {
  const headers = new Headers(init)
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json')
  }
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  const token = useSessionStore.getState().token
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  return headers
}

export async function httpResource<T>(input: string, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: buildHeaders(init?.headers),
  })
  const data = await parseBody(res)
  if (!res.ok) {
    const message =
      typeof data === 'object' &&
      data !== null &&
      'title' in data &&
      typeof (data as { title?: unknown }).title === 'string'
        ? (data as { title: string }).title
        : res.statusText
    throw new FriendlyError(message || 'Request failed', res.status, data)
  }
  return data as T
}

export async function httpUpload<T>(
  input: string,
  body: FormData,
  init?: RequestInit,
): Promise<T> {
  const headers = new Headers(init?.headers)
  headers.set('Accept', 'application/json')
  const token = useSessionStore.getState().token
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  const res = await fetch(input, {
    ...init,
    method: init?.method ?? 'POST',
    body,
    headers,
  })
  const data = await parseBody(res)
  if (!res.ok) {
    throw new FriendlyError(res.statusText, res.status, data)
  }
  return data as T
}

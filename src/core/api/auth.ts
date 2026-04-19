import { defineApiRoute, httpResource } from '@core/http-resource'
import type { SessionUser } from '@core/session-store'

const loginRoute = defineApiRoute('/auth/login')
const logoutRoute = defineApiRoute('/auth/logout')
const registerRoute = defineApiRoute('/auth/register')

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  user: SessionUser
}

export async function loginRequest(body: LoginRequest): Promise<LoginResponse> {
  return httpResource<LoginResponse>(loginRoute, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function logoutRequest(): Promise<void> {
  await httpResource<unknown>(logoutRoute, {
    method: 'POST',
    body: JSON.stringify({}),
  })
}

export async function registerRequest(body: LoginRequest): Promise<LoginResponse> {
  return httpResource<LoginResponse>(registerRoute, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

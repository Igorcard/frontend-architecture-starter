import { createLocalId } from '@core/ids'
import type { Item } from '@core/api/items'
import type { SessionUser } from '@core/session-store'
import { http, HttpResponse } from 'msw'

let items: Item[] = [
  {
    id: 'item_seed_1',
    title: 'Sample item',
    description: 'Demonstration row for the data grid.',
    updatedAt: new Date().toISOString(),
  },
]

function mockUser(email: string): SessionUser {
  return { id: `user_${email}`, email }
}

function mockToken(email: string) {
  return `mock_${email}`
}

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string }
    return HttpResponse.json({
      token: mockToken(body.email),
      user: mockUser(body.email),
    })
  }),
  http.post('/api/auth/register', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string }
    return HttpResponse.json({
      token: mockToken(body.email),
      user: mockUser(body.email),
    })
  }),
  http.post('/api/auth/logout', () => HttpResponse.json({ ok: true })),
  http.get('/api/items', ({ request }) => {
    const url = new URL(request.url)
    const q = url.searchParams.get('q')?.toLowerCase() ?? ''
    const list = q
      ? items.filter(
          (i) =>
            i.title.toLowerCase().includes(q) ||
            i.description.toLowerCase().includes(q),
        )
      : items
    return HttpResponse.json(list)
  }),
  http.get('/api/items/:id', ({ params }) => {
    const item = items.find((i) => i.id === params.id)
    if (!item) {
      return HttpResponse.json({ title: 'Not found' }, { status: 404 })
    }
    return HttpResponse.json(item)
  }),
  http.post('/api/items', async ({ request }) => {
    const body = (await request.json()) as { title: string; description: string }
    const row: Item = {
      id: createLocalId('item'),
      title: body.title,
      description: body.description,
      updatedAt: new Date().toISOString(),
    }
    items = [row, ...items]
    return HttpResponse.json(row)
  }),
  http.put('/api/items/:id', async ({ params, request }) => {
    const body = (await request.json()) as { title: string; description: string }
    const idx = items.findIndex((i) => i.id === params.id)
    if (idx === -1) {
      return HttpResponse.json({ title: 'Not found' }, { status: 404 })
    }
    const current = items[idx]!
    const updated: Item = {
      id: current.id,
      title: body.title,
      description: body.description,
      updatedAt: new Date().toISOString(),
    }
    items = items.map((i) => (i.id === params.id ? updated : i))
    return HttpResponse.json(updated)
  }),
  http.delete('/api/items/:id', ({ params }) => {
    const before = items.length
    items = items.filter((i) => i.id !== params.id)
    if (items.length === before) {
      return HttpResponse.json({ title: 'Not found' }, { status: 404 })
    }
    return new HttpResponse(null, { status: 204 })
  }),
]

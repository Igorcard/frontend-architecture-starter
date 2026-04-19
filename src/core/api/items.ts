import { defineApiRoute, defineApiRouteFn, httpResource } from '@core/http-resource'

export type Item = {
  id: string
  title: string
  description: string
  updatedAt: string
}

export type ItemUpsert = Pick<Item, 'title' | 'description'>

const listRoute = defineApiRoute('/items')
const itemRoute = defineApiRouteFn('/items/:id')

export async function fetchItems(filters?: { q?: string }): Promise<Item[]> {
  const qs =
    filters?.q !== undefined && filters.q !== ''
      ? `?q=${encodeURIComponent(filters.q)}`
      : ''
  return httpResource<Item[]>(`${listRoute}${qs}`)
}

export async function fetchItem(id: string): Promise<Item> {
  return httpResource<Item>(itemRoute({ id }))
}

export async function createItem(body: ItemUpsert): Promise<Item> {
  return httpResource<Item>(listRoute, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function updateItem(id: string, body: ItemUpsert): Promise<Item> {
  return httpResource<Item>(itemRoute({ id }), {
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

export async function deleteItem(id: string): Promise<void> {
  await httpResource<unknown>(itemRoute({ id }), { method: 'DELETE' })
}

import { queryOptions } from '@tanstack/react-query'
import {
  createItem,
  deleteItem,
  fetchItem,
  fetchItems,
  updateItem,
} from '@core/api/items'
import type { ItemUpsert } from '@core/api/items'
import { queryKeys } from '@core/keys'

export const itemsQueries = {
  list: (filters?: { q?: string }) =>
    queryOptions({
      queryKey: queryKeys.items.list(filters).queryKey,
      queryFn: () => fetchItems(filters),
      staleTime: 30_000,
    }),
  detail: (id: string) =>
    queryOptions({
      queryKey: queryKeys.items.detail(id).queryKey,
      queryFn: () => fetchItem(id),
      enabled: Boolean(id),
    }),
}

export const itemsMutations = {
  create: () => ({
    mutationFn: (body: ItemUpsert) => createItem(body),
  }),
  update: (id: string) => ({
    mutationFn: (body: ItemUpsert) => updateItem(id, body),
  }),
  delete: () => ({
    mutationFn: (id: string) => deleteItem(id),
  }),
}

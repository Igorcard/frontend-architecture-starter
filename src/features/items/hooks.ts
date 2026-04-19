import {
  createItem,
  deleteItem,
  updateItem,
  type ItemUpsert,
} from '@core/api/items'
import { queryKeys } from '@core/keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateItem() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: ItemUpsert) => createItem(body),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.items.all.queryKey })
    },
  })
}

export function useUpdateItem(id: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: ItemUpsert) => updateItem(id, body),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.items.all.queryKey })
      await qc.invalidateQueries({ queryKey: queryKeys.items.detail(id).queryKey })
    },
  })
}

export function useDeleteItem() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteItem(id),
    onSuccess: async (_, id) => {
      await qc.invalidateQueries({ queryKey: queryKeys.items.all.queryKey })
      await qc.removeQueries({ queryKey: queryKeys.items.detail(id).queryKey })
    },
  })
}

import { createQueryKeyStore } from '@lukemorales/query-key-factory'

export const queryKeys = createQueryKeyStore({
  items: {
    all: null,
    list: (filters?: { q?: string }) => [filters?.q ?? ''],
    detail: (id: string) => [id],
  },
})

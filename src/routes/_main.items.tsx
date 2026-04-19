import { createFileRoute } from '@tanstack/react-router'
import { itemsQueries } from '@core/queries'
import { ItemsListPage } from '@features/items/items-list-page'

export const Route = createFileRoute('/_main/items')({
  validateSearch: (raw: Record<string, unknown>) => ({
    q: typeof raw.q === 'string' ? raw.q : undefined,
  }),
  loader: ({ context, location }) => {
    const q = new URLSearchParams(location.search).get('q') ?? undefined
    return context.queryClient.ensureQueryData(itemsQueries.list({ q }))
  },
  component: ItemsListPage,
})

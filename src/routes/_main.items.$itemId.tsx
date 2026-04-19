import { createFileRoute } from '@tanstack/react-router'
import { itemsQueries } from '@core/queries'
import { ItemDetailPage } from '@features/items/item-detail-page'

export const Route = createFileRoute('/_main/items/$itemId')({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(itemsQueries.detail(params.itemId)),
  component: ItemDetailPage,
})

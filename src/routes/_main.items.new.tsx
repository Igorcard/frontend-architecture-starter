import { createFileRoute } from '@tanstack/react-router'
import { ItemNewPage } from '@features/items/item-new-page'

export const Route = createFileRoute('/_main/items/new')({
  component: ItemNewPage,
})

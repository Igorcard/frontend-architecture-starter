import { useNavigate } from '@tanstack/react-router'
import { ItemForm } from '@features/items/item-form'
import { useCreateItem } from '@features/items/hooks'
import { Link } from '@tanstack/react-router'

export function ItemNewPage() {
  const create = useCreateItem()
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <Link
        to="/items"
        search={{ q: undefined }}
        className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
      >
        ← Back to items
      </Link>
      <ItemForm
        defaultValues={{ title: '', description: '' }}
        submitLabel="Create item"
        onSubmit={async (values) => {
          const item = await create.mutateAsync(values)
          await navigate({
            to: '/items/$itemId',
            params: { itemId: item.id },
            search: { q: undefined },
          })
        }}
      />
    </div>
  )
}

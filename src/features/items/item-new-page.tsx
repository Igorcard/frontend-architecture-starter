import { useNavigate } from '@tanstack/react-router'
import { ItemForm } from '@features/items/item-form'
import { useCreateItem } from '@features/items/hooks'
import { Link } from '@tanstack/react-router'
import { PageHeader } from '@pattern/page-header'

export function ItemNewPage() {
  const create = useCreateItem()
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          eyebrow="Cadastro"
          title="Novo item"
          description="POST mock cria o registro e redireciona para a página de edição com o id gerado."
        />
        <Link
          to="/items"
          search={{ q: undefined }}
          className="shrink-0 text-sm font-semibold text-teal-800 underline decoration-teal-600/35 underline-offset-2 hover:text-teal-950"
        >
          ← Voltar à lista
        </Link>
      </div>
      <div className="max-w-xl rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5 backdrop-blur-sm md:p-8">
        <ItemForm
          defaultValues={{ title: '', description: '' }}
          submitLabel="Criar item"
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
    </div>
  )
}

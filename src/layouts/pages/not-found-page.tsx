import { Link } from '@tanstack/react-router'
import { buttonVariants } from '@ui/button.variants'
import { cx } from '@ui/variants'

export function NotFoundPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-gradient-to-b from-slate-50 to-teal-50/30 px-6 py-12">
      <p className="font-display text-7xl font-semibold tabular-nums text-teal-800/90">404</p>
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold text-slate-900">Página não encontrada</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Essa rota não existe neste demo. Volte ao painel ou abra a lista de itens.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/dashboard" className={cx(buttonVariants({ variant: 'primary', size: 'md' }))}>
          Ir ao painel
        </Link>
        <Link
          to="/items"
          search={{ q: undefined }}
          className={cx(buttonVariants({ variant: 'secondary', size: 'md' }))}
        >
          Ver itens
        </Link>
      </div>
    </div>
  )
}

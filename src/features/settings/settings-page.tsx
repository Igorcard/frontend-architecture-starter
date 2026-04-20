import { useAppStore } from '@core/app-store'
import { Button } from '@ui/button'
import { PageHeader } from '@pattern/page-header'

export function SettingsPage() {
  const sidebarCollapsed = useAppStore((s) => s.sidebarCollapsed)
  const setSidebarCollapsed = useAppStore((s) => s.setSidebarCollapsed)

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Preferências"
        title="Ajustes"
        description="Demonstração de estado global com Zustand: a preferência de menu recolhido fica salva no navegador."
      />

      <div className="max-w-xl rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5 backdrop-blur-sm">
        <h2 className="font-display text-lg font-semibold text-slate-900">Barra lateral</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          O estado <code className="rounded-md bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-teal-900">sidebarCollapsed</code> é persistido via{' '}
          <code className="rounded-md bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-800">app-store</code>{' '}
          para você ver o fluxo completo sem backend.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button type="button" variant="primary" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            Alternar menu
          </Button>
          <span className="text-sm text-slate-600">
            Agora:{' '}
            <strong className="text-slate-900">{sidebarCollapsed ? 'recolhido' : 'expandido'}</strong>
          </span>
        </div>
      </div>
    </div>
  )
}

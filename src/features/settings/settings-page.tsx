import { useAppStore } from '@core/app-store'
import { Button } from '@ui/button'

export function SettingsPage() {
  const sidebarCollapsed = useAppStore((s) => s.sidebarCollapsed)
  const setSidebarCollapsed = useAppStore((s) => s.setSidebarCollapsed)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-zinc-900">Settings</h1>
      <p className="text-sm text-zinc-600">
        Sidebar collapsed state is persisted (demo of <code className="rounded bg-zinc-100 px-1">app-store</code>
        ).
      </p>
      <Button type="button" variant="secondary" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
        Toggle sidebar preference (current: {sidebarCollapsed ? 'collapsed' : 'expanded'})
      </Button>
    </div>
  )
}

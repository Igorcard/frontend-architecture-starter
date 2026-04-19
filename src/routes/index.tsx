import { createFileRoute, redirect } from '@tanstack/react-router'
import { useSessionStore } from '@core/session-store'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const { token } = useSessionStore.getState()
    throw redirect({ to: token ? '/dashboard' : '/login' })
  },
  component: () => null,
})

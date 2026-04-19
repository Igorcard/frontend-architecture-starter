import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { MainLayout } from '@layouts/main-layout'
import { useSessionStore } from '@core/session-store'

export const Route = createFileRoute('/_main')({
  beforeLoad: ({ location }) => {
    if (!useSessionStore.getState().token) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }
  },
  component: MainGroup,
})

function MainGroup() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}

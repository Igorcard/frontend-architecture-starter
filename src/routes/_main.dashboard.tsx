import { createFileRoute } from '@tanstack/react-router'
import { itemsQueries } from '@core/queries'
import { DashboardPage } from '@features/dashboard/dashboard-page'

export const Route = createFileRoute('/_main/dashboard')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(itemsQueries.list()),
  component: DashboardPage,
})

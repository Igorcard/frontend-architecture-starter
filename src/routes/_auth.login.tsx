import { createFileRoute } from '@tanstack/react-router'
import { LoginPage } from '@features/session/login-page'

export const Route = createFileRoute('/_auth/login')({
  validateSearch: (raw: Record<string, unknown>) => ({
    redirect: typeof raw.redirect === 'string' ? raw.redirect : undefined,
  }),
  component: LoginPage,
})

import { createFileRoute } from '@tanstack/react-router'
import { RegisterPage } from '@features/session/register-page'

export const Route = createFileRoute('/_auth/register')({
  validateSearch: (raw: Record<string, unknown>) => ({
    redirect: typeof raw.redirect === 'string' ? raw.redirect : undefined,
  }),
  component: RegisterPage,
})

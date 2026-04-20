import { getRouteApi, useNavigate } from '@tanstack/react-router'
import { useAppForm } from '@pattern/form.hooks'
import { PatternFormActions, PatternTextInput } from '@pattern/form'
import { useAuth } from '@core/hooks'
import { Button } from '@ui/button'
import { Link } from '@tanstack/react-router'

const loginRouteApi = getRouteApi('/_auth/login')

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const { redirect } = loginRouteApi.useSearch()

  const form = useAppForm({
    defaultValues: { email: '', password: '' },
    onSubmit: async ({ value }) => {
      await login(value.email, value.password)
      const target =
        redirect && redirect.startsWith('/') ? redirect : '/dashboard'
      await navigate({ to: target })
    },
  })

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900">Entrar</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        Use qualquer e-mail e senha — a API é mock e aceita qualquer combinação.
      </p>
      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          void form.handleSubmit()
        }}
      >
        <form.Field name="email">
          {(field) => (
            <PatternTextInput
              label="Email"
              id="login-email"
              type="email"
              autoComplete="email"
              value={field.state.value}
              onChange={(val) => field.handleChange(val)}
              onBlur={field.handleBlur}
            />
          )}
        </form.Field>
        <form.Field name="password">
          {(field) => (
            <PatternTextInput
              label="Password"
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={field.state.value}
              onChange={(val) => field.handleChange(val)}
              onBlur={field.handleBlur}
            />
          )}
        </form.Field>
        <PatternFormActions>
          <Button type="submit" variant="primary" className="w-full sm:w-auto">
            Continuar
          </Button>
        </PatternFormActions>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600">
        Não tem conta?{' '}
        <Link
          to="/register"
          search={{ redirect: undefined }}
          className="font-semibold text-teal-800 underline decoration-teal-600/40 underline-offset-2 hover:text-teal-900"
        >
          Criar conta
        </Link>
      </p>
    </div>
  )
}

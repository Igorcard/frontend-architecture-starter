import { getRouteApi, Link, useNavigate } from '@tanstack/react-router'
import { useAppForm } from '@pattern/form.hooks'
import { PatternFormActions, PatternTextInput } from '@pattern/form'
import { registerRequest } from '@core/api/auth'
import { useSessionStore } from '@core/session-store'
import { Button } from '@ui/button'

const registerRouteApi = getRouteApi('/_auth/register')

export function RegisterPage() {
  const navigate = useNavigate()
  const setSession = useSessionStore((s) => s.setSession)
  const { redirect } = registerRouteApi.useSearch()

  const form = useAppForm({
    defaultValues: { email: '', password: '' },
    onSubmit: async ({ value }) => {
      const res = await registerRequest({
        email: value.email,
        password: value.password,
      })
      setSession(res.token, res.user)
      const target = redirect?.startsWith('/') ? redirect : '/dashboard'
      await navigate({ to: target })
    },
  })

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900">Criar conta</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        Registro mock — qualquer e-mail e senha funcionam e você já entra logado.
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
              id="register-email"
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
              id="register-password"
              type="password"
              autoComplete="new-password"
              value={field.state.value}
              onChange={(val) => field.handleChange(val)}
              onBlur={field.handleBlur}
            />
          )}
        </form.Field>
        <PatternFormActions>
          <Button type="submit" variant="primary" className="w-full sm:w-auto">
            Registrar
          </Button>
        </PatternFormActions>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600">
        Já tem conta?{' '}
        <Link
          to="/login"
          search={{ redirect: undefined }}
          className="font-semibold text-teal-800 underline decoration-teal-600/40 underline-offset-2 hover:text-teal-900"
        >
          Entrar
        </Link>
      </p>
    </div>
  )
}

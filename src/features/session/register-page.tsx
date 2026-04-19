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
      <h1 className="text-xl font-semibold text-zinc-900">Create account</h1>
      <p className="mt-1 text-sm text-zinc-600">Mock registration — any values work.</p>
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
          <Button type="submit" variant="primary">
            Register
          </Button>
        </PatternFormActions>
      </form>
      <p className="mt-4 text-center text-sm text-zinc-600">
        Already have an account?{' '}
        <Link
          to="/login"
          search={{ redirect: undefined }}
          className="font-medium text-zinc-900 underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}

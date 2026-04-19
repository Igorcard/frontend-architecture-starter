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
      <h1 className="text-xl font-semibold text-zinc-900">Sign in</h1>
      <p className="mt-1 text-sm text-zinc-600">Use any email and password (mock API).</p>
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
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </PatternFormActions>
      </form>
      <p className="mt-4 text-center text-sm text-zinc-600">
        No account?{' '}
        <Link
          to="/register"
          search={{ redirect: undefined }}
          className="font-medium text-zinc-900 underline"
        >
          Register
        </Link>
      </p>
    </div>
  )
}

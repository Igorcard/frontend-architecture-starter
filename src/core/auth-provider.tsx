import { useMemo } from 'react'
import { loginRequest, logoutRequest } from '@core/api/auth'
import { AuthContext } from '@core/auth-context'
import { useSessionStore } from '@core/session-store'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const token = useSessionStore((s) => s.token)
  const user = useSessionStore((s) => s.user)
  const setSession = useSessionStore((s) => s.setSession)
  const clearSession = useSessionStore((s) => s.clearSession)

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(token && user),
      login: async (email: string, password: string) => {
        const res = await loginRequest({ email, password })
        setSession(res.token, res.user)
      },
      logout: async () => {
        try {
          await logoutRequest()
        } catch {
          // Sem rede / MSW off / 4xx: ainda assim encerramos a sessão local.
        } finally {
          clearSession()
        }
      },
    }),
    [token, user, setSession, clearSession],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

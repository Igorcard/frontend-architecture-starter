import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type SessionUser = {
  id: string
  email: string
}

type SessionState = {
  token: string | null
  user: SessionUser | null
  setSession: (token: string, user: SessionUser) => void
  clearSession: () => void
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: (token, user) => set({ token, user }),
      clearSession: () => set({ token: null, user: null }),
    }),
    {
      name: 'frontend-architecture-starter-session',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ token: s.token, user: s.user }),
    },
  ),
)

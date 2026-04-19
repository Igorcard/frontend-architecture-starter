import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type AppState = {
  sidebarCollapsed: boolean
  setSidebarCollapsed: (sidebarCollapsed: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
    }),
    {
      name: 'frontend-architecture-starter-app',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

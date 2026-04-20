import { QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { routeTree } from './routeTree.gen'
import { queryClient } from './query-client'

import './styles.css'

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

async function bootstrap() {
  if (import.meta.env.DEV && import.meta.env.VITE_MSW !== 'false') {
    try {
      const { worker } = await import('@mocks/browser')
      await worker.start({ onUnhandledRequest: 'bypass' })
    } catch (err) {
      console.error('[MSW] Failed to start mock API. Is public/mockServiceWorker.js present?', err)
    }
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  )
}

void bootstrap()

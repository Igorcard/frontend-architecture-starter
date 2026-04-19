import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from '@mocks/server'

export function setupMswServer() {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'bypass' })
  })
  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => {
    server.close()
  })
}

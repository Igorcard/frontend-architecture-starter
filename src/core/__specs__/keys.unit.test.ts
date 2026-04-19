import { queryKeys } from '@core/keys'
import { describe, expect, it } from 'vitest'

describe('queryKeys', () => {
  it('composes list keys with optional filter', () => {
    expect(queryKeys.items.list({ q: 'doc' }).queryKey.join('|')).toContain('doc')
  })

  it('composes detail keys with id', () => {
    expect(queryKeys.items.detail('x-1').queryKey).toContain('x-1')
  })
})

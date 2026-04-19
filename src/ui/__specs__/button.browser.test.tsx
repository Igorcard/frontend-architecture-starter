import { Button } from '@ui/button'
import { render } from 'vitest-browser-react'
import { expect, test } from 'vitest'

test('button is visible', async () => {
  const screen = await render(<Button type="button">Hello</Button>)
  await expect.element(screen.getByRole('button', { name: 'Hello' })).toBeInTheDocument()
})

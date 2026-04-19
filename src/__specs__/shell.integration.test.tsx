import { render } from 'vitest-browser-react'
import { expect, test } from 'vitest'

test('browser project runs', async () => {
  const screen = await render(
    <div>
      <h1>Shell</h1>
    </div>,
  )
  await expect.element(screen.getByRole('heading', { name: 'Shell' })).toBeInTheDocument()
})

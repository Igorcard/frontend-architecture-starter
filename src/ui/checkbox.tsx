import { Checkbox } from '@base-ui/react/checkbox'
import { cx } from '@ui/variants'
import type { ComponentProps } from 'react'

export function CheckboxField({ className, ...props }: ComponentProps<typeof Checkbox.Root>) {
  return (
    <Checkbox.Root
      className={cx(
        'flex size-4 items-center justify-center rounded border border-zinc-300 data-[checked]:border-zinc-900 data-[checked]:bg-zinc-900',
        className,
      )}
      {...props}
    >
      <Checkbox.Indicator className="text-white">✓</Checkbox.Indicator>
    </Checkbox.Root>
  )
}

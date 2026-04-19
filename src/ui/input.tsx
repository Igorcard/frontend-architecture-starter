import { Input as BaseInput } from '@base-ui/react/input'
import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { inputVariants } from '@ui/input.variants'
import { cx } from '@ui/variants'

type InputProps = ComponentProps<typeof BaseInput> & VariantProps<typeof inputVariants>

export function Input({ className, size, ...props }: InputProps) {
  return (
    <BaseInput
      className={cx(inputVariants({ size }), className)}
      data-slot="input"
      data-size={size}
      {...props}
    />
  )
}

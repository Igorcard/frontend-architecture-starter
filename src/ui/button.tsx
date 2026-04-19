import { Button as BaseButton } from '@base-ui/react/button'
import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { buttonVariants } from '@ui/button.variants'
import { cx } from '@ui/variants'

type ButtonProps = ComponentProps<typeof BaseButton> & VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <BaseButton
      className={cx(buttonVariants({ variant, size }), className)}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      {...props}
    />
  )
}

import { Link } from '@tanstack/react-router'
import { buttonVariants } from '@ui/button.variants'
import { cx } from '@ui/variants'

export function NotFoundPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6">
      <p className="text-lg font-medium text-zinc-900">Page not found</p>
      <Link
        to="/dashboard"
        className={cx(buttonVariants({ variant: 'secondary', size: 'md' }))}
      >
        Back to dashboard
      </Link>
    </div>
  )
}

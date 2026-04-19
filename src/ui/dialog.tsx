import { Dialog } from '@base-ui/react/dialog'
import { cx } from '@ui/variants'
import type { ReactNode } from 'react'

export function DialogRoot({ children }: { children: ReactNode }) {
  return <Dialog.Root>{children}</Dialog.Root>
}

export function DialogTrigger({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Trigger>) {
  return <Dialog.Trigger className={cx(className)} {...props} />
}

export function DialogContent({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="fixed inset-0 bg-black/40 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
      <Dialog.Popup className="fixed left-1/2 top-1/2 w-[min(100%-2rem,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-zinc-200 bg-white p-4 shadow-lg outline-none data-[ending-style]:scale-95 data-[starting-style]:scale-95">
        <Dialog.Title className="text-lg font-semibold text-zinc-900">{title}</Dialog.Title>
        {description ? (
          <Dialog.Description className="mt-1 text-sm text-zinc-600">
            {description}
          </Dialog.Description>
        ) : null}
        <div className="mt-4">{children}</div>
      </Dialog.Popup>
    </Dialog.Portal>
  )
}

export function DialogClose({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Close>) {
  return <Dialog.Close className={cx(className)} {...props} />
}

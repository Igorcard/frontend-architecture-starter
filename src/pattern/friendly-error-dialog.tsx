import { Dialog } from '@base-ui/react/dialog'
import { buttonVariants } from '@ui/button.variants'
import { cx } from '@ui/variants'

export function FriendlyErrorDialog({
  open,
  onOpenChange,
  title,
  message,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  message: string
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/40" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 w-[min(100%-2rem,24rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-zinc-200 bg-white p-4 shadow-lg">
          <Dialog.Title className="text-lg font-semibold text-zinc-900">{title}</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-zinc-600">
            {message}
          </Dialog.Description>
          <div className="mt-4 flex justify-end">
            <Dialog.Close
              className={cx(buttonVariants({ variant: 'secondary', size: 'md' }))}
            >
              Close
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

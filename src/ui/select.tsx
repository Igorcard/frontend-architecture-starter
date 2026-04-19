import { Select } from '@base-ui/react/select'
import { cx } from '@ui/variants'
import type { ReactNode } from 'react'

export function SelectRoot({ children }: { children: ReactNode }) {
  return <Select.Root>{children}</Select.Root>
}

export function SelectTrigger({ className, ...props }: React.ComponentProps<typeof Select.Trigger>) {
  return (
    <Select.Trigger
      className={cx(
        'flex h-10 w-full items-center justify-between rounded-md border border-zinc-200 bg-white px-3 text-sm',
        className,
      )}
      {...props}
    />
  )
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <Select.Value placeholder={placeholder} />
}

export function SelectContent({ children }: { children: ReactNode }) {
  return (
    <Select.Portal>
      <Select.Positioner>
        <Select.Popup className="min-w-[var(--anchor-width)] rounded-md border border-zinc-200 bg-white py-1 shadow-lg">
          <Select.List>{children}</Select.List>
        </Select.Popup>
      </Select.Positioner>
    </Select.Portal>
  )
}

export function SelectItem({
  value,
  children,
}: {
  value: string
  children: ReactNode
}) {
  return (
    <Select.Item
      value={value}
      className="cursor-pointer px-3 py-2 text-sm data-[highlighted]:bg-zinc-100"
    >
      {children}
    </Select.Item>
  )
}

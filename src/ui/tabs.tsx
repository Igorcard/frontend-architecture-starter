import { Tabs } from '@base-ui/react/tabs'
import { cx } from '@ui/variants'
import type { ReactNode } from 'react'

export function TabsRoot({
  defaultValue,
  children,
}: {
  defaultValue?: string
  children: ReactNode
}) {
  return <Tabs.Root defaultValue={defaultValue}>{children}</Tabs.Root>
}

export function TabsList({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <Tabs.List
      className={cx(
        'flex gap-1 rounded-lg border border-zinc-200 bg-zinc-50 p-1',
        className,
      )}
    >
      {children}
    </Tabs.List>
  )
}

export function TabsTab({
  value,
  children,
}: {
  value: string
  children: ReactNode
}) {
  return (
    <Tabs.Tab
      value={value}
      className="rounded-md px-3 py-1.5 text-sm font-medium text-zinc-600 data-[selected]:bg-white data-[selected]:text-zinc-900 data-[selected]:shadow-sm"
    >
      {children}
    </Tabs.Tab>
  )
}

export function TabsPanel({
  value,
  children,
}: {
  value: string
  children: ReactNode
}) {
  return <Tabs.Panel value={value}>{children}</Tabs.Panel>
}

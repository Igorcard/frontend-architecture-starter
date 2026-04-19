import { ErrorBoundary } from 'react-error-boundary'
import type { ReactNode } from 'react'

export function WidgetBoundary({
  children,
  fallback,
}: {
  children: ReactNode
  fallback: ReactNode
}) {
  return <ErrorBoundary fallbackRender={() => fallback}>{children}</ErrorBoundary>
}

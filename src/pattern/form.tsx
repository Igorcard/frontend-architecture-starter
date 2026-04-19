import type { ReactNode } from 'react'
import { Input } from '@ui/input'
import { Textarea } from '@ui/textarea'
import { FormField } from '@ui/form'

export function PatternTextInput({
  label,
  id,
  value,
  onChange,
  onBlur,
  error,
  type = 'text',
  autoComplete,
}: {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  onBlur: () => void
  error?: string
  type?: 'text' | 'email' | 'password'
  autoComplete?: string
}) {
  return (
    <FormField label={label} htmlFor={id} error={error}>
      <Input
        id={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
    </FormField>
  )
}

export function PatternTextareaInput({
  label,
  id,
  value,
  onChange,
  onBlur,
  error,
}: {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  onBlur: () => void
  error?: string
}) {
  return (
    <FormField label={label} htmlFor={id} error={error}>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
    </FormField>
  )
}

export function PatternFormActions({ children }: { children: ReactNode }) {
  return <div className="mt-6 flex flex-wrap gap-2">{children}</div>
}

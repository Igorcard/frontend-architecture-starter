import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext } from '@pattern/form.contexts'

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
})

export function createFormSubmitHandler<T>(
  parse: (raw: unknown) => { success: true; output: T } | { success: false },
  onValid: (data: T) => void | Promise<void>,
) {
  return async (raw: unknown) => {
    const result = parse(raw)
    if (!result.success) return
    await onValid(result.output)
  }
}

import * as v from 'valibot'
import { useAppForm } from '@pattern/form.hooks'
import { PatternFormActions, PatternTextareaInput, PatternTextInput } from '@pattern/form'
import type { ItemUpsertForm } from '@features/items/schemas'
import { itemUpsertSchema } from '@features/items/schemas'
import { Button } from '@ui/button'

export function ItemForm({
  defaultValues,
  submitLabel,
  onSubmit,
}: {
  defaultValues: ItemUpsertForm
  submitLabel: string
  onSubmit: (values: ItemUpsertForm) => void | Promise<void>
}) {
  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const parsed = v.safeParse(itemUpsertSchema, value)
      if (!parsed.success) return
      await onSubmit(parsed.output)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        void form.handleSubmit()
      }}
      className="flex max-w-xl flex-col gap-4"
    >
      <form.Field name="title">
        {(field) => (
          <PatternTextInput
            label="Título"
            id="item-title"
            value={field.state.value}
            onChange={(val) => field.handleChange(val)}
            onBlur={field.handleBlur}
            error={
              field.state.meta.errors[0] !== undefined
                ? String(field.state.meta.errors[0])
                : undefined
            }
          />
        )}
      </form.Field>
      <form.Field name="description">
        {(field) => (
          <PatternTextareaInput
            label="Descrição"
            id="item-description"
            value={field.state.value}
            onChange={(val) => field.handleChange(val)}
            onBlur={field.handleBlur}
            error={
              field.state.meta.errors[0] !== undefined
                ? String(field.state.meta.errors[0])
                : undefined
            }
          />
        )}
      </form.Field>
      <PatternFormActions>
        <Button type="submit" variant="primary">
          {submitLabel}
        </Button>
      </PatternFormActions>
    </form>
  )
}

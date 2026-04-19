import * as v from 'valibot'

export const itemUpsertSchema = v.object({
  title: v.pipe(v.string(), v.minLength(1, 'Title is required')),
  description: v.pipe(v.string(), v.minLength(1, 'Description is required')),
})

export type ItemUpsertForm = v.InferOutput<typeof itemUpsertSchema>

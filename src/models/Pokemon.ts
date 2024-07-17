import {z} from "zod";

const BaseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),

})

const PokemonNameSchema = z.object({
  name: z.string(),
  url: z.string(),
})

export const BaseSchemaWithPokemonNames = BaseSchema.extend({
  results: z.array(PokemonNameSchema),
})

export type PokemonName = z.infer<typeof PokemonNameSchema>

export type PokemonNameResults = z.infer<typeof BaseSchemaWithPokemonNames>
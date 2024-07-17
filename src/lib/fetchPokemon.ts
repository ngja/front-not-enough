import {BaseSchemaWithPokemonNames, PokemonNameResults} from "@/models/Pokemon";
import env from "./env"


export default async function fetchPokemonName(): Promise<PokemonNameResults | undefined> {
  try {
    const res = await fetch(`${env.POKEMON_URL}/pokemon`)

    const pokemonNameResults: PokemonNameResults = await res.json()

    console.log(pokemonNameResults)

    return BaseSchemaWithPokemonNames.parse(pokemonNameResults)
  } catch (e) {
    if (e instanceof Error) console.log(e.stack)
  }
}
import {z} from "zod";
import {toast} from "@/components/ui/use-toast";
import fetchPokemonName from "@/lib/fetchPokemon";
import {PokemonName} from "@/models/Pokemon";

const formSchema = z.object({

})

type ApiBaseSearchForm = z.infer<typeof formSchema>

export default async function ApiBaseSearchForm() {

  const pokemonNameResults = await fetchPokemonName()

  if (!pokemonNameResults) return <h2>No Pokemons</h2>

  const pokemonNames: PokemonName[] = pokemonNameResults.results;

  function onSubmit(values: ApiBaseSearchForm) {
    toast({
      title: "Plain Form",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      )
    })
  }

  return (
    <div>
      {pokemonNames.map(pokemonName => (
        <div key={pokemonName.name}>
          {pokemonName.name}
        </div>
      ))}
    </div>
  )
}
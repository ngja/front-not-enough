import { cleanEnv, str } from "envalid"

const env = cleanEnv(process.env, {
  POKEMON_URL: str(),
})

export default env
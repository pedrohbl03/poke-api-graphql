import { PokemonService } from "../services";
import { IPokemon } from "../types/pokeapi-response.type";

export const resolvers = {
  Query: {
    pokemon: async (_: any, { name }: { name: string }) => {
      return PokemonService.getPokemonByName(name);
    },
    pokemons: async (_: any, { limit, offset }: { limit?: number; offset?: number }) => {
      return PokemonService.getAllPokemons(limit, offset);
    },
  },

  Mutation: {
    createPokemonAttributes: async (_: any, { input }: { input: IPokemon }) => {
      return await PokemonService.createPokemonAttributes(input);
    },
    updatePokemonAttributes: async (_: any, { name, input }: { name: string; input: Partial<IPokemon> }) => {
      return await PokemonService.updatePokemonAttributes(name, input);
    },
    deletePokemonAttributes: async (_: any, { name }: { name: string }) => {
      return await PokemonService.deletePokemonAttributes(name);
    },
  },
};

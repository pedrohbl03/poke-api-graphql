import { PokemonService } from "../services";
import { PokemonAttributesInput } from "../types/graphql-generated.types";

const pokemonResolvers = {
  Query: {
    pokemon: async (_: any, { name }: { name: string }) => {
      return PokemonService.getPokemonByName(name);
    },
    pokemons: async (_: any, { page, limit }: { page?: number; limit?: number }) => {
      return PokemonService.getAllPokemons(limit, page ? (page - 1) * (limit || 20) : 0);
    },
  },

  Mutation: {
    createPokemonAttributes: async (_: any, { input }: { input: PokemonAttributesInput }) => {
      return await PokemonService.createPokemonAttributes(input);
    },
    updatePokemonAttributes: async (_: any, { input }: { input: PokemonAttributesInput }) => {
      return await PokemonService.updatePokemonAttributes(input);
    },
    deletePokemonAttributes: async (_: any, { name }: { name: string }) => {
      return await PokemonService.deletePokemonAttributes(name);
    },
  },
};

export default pokemonResolvers;
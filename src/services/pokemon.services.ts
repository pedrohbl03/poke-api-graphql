import PokemonRepository from "../repositories/pokemon.repository";
import { Pokemon, PokemonAttributesInput, PokemonPagination } from "../types/graphql-generated.types";
import { IPaginatedListResponse } from "../types/pokeapi-response.type";
import { PokeApiProvider } from "./providers/pokeapi.provider";

interface IPokemonService {
  getPokemonByName(name: string): Promise<Pokemon>;
  getAllPokemons(limit?: number, offset?: number): Promise<PokemonPagination>;

  createPokemonAttributes(data: PokemonAttributesInput): Promise<Pokemon>;
  updatePokemonAttributes(name: string, data: PokemonAttributesInput): Promise<Pokemon>;
  deletePokemonAttributes(name: string): Promise<boolean>;
};

const getPokemonByName = async (name: string): Promise<Pokemon> => {  
  const [pokemon, additionalAttributes] = await Promise.all([
    PokeApiProvider.getPokemon(name),
    PokemonRepository.findPokemonAttributesByName(name)
  ]);

  return {
    ...pokemon,
    ...additionalAttributes
  };
};

const getAllPokemons = async (limit: number = 20, offset: number = 0): Promise<PokemonPagination> => {
  const [pokeApi, additionalAttributes] = await Promise.all([
    PokeApiProvider.getPokemons(limit, offset),
    PokemonRepository.findAllPokemonAttributes()
  ]);

  return {
    count: pokeApi.count,
    next: pokeApi.next,
    previous: pokeApi.previous,
    results: pokeApi.results.map((pokemon: any) => ({
      ...pokemon,
      ...additionalAttributes.find((attr: any) => attr.name === pokemon.name)
    }))
  };
};

const createPokemonAttributes = async (data: PokemonAttributesInput): Promise<Pokemon> => {
  const newAttributes = await PokemonRepository.createPokemonAttributes(data);

  if (!newAttributes) {
    throw new Error('Failed to create Pokemon attributes');
  }

  const pokemon = await getPokemonByName(data.pokemonName);

  return {
    ...pokemon,
    ...newAttributes
  };
};

const updatePokemonAttributes = async (name: string, data: PokemonAttributesInput): Promise<Pokemon> => {
  return {} as any;
};

const deletePokemonAttributes = async (name: string): Promise<boolean> => {
  return {} as any;
};

const PokemonService: IPokemonService = {
  getPokemonByName,
  getAllPokemons,
  createPokemonAttributes,
  updatePokemonAttributes,
  deletePokemonAttributes,
};

export default PokemonService;
import PokemonRepository from "../repositories/pokemon.repository";
import { Pokemon, PokemonAttributesInput } from "../types/graphql-generated.types";
import { IPaginatedListResponse } from "../types/pokeapi-response.type";
import { PokeApiProvider } from "./providers/pokeapi.provider";

interface IPokemonService {
  getPokemonByName(name: string): Promise<Pokemon>;
  getAllPokemons(limit?: number, offset?: number): Promise<IPaginatedListResponse>;

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

const getAllPokemons = async (limit: number = 20, offset: number = 0): Promise<IPaginatedListResponse> => {
  const [] = await Promise.all([
    PokeApiProvider.getPokemons(limit, offset),
    PokemonRepository.findAllPokemonAttributes()
  ]);

  return {} as IPaginatedListResponse;
};

const createPokemonAttributes = async (data: any): Promise<any> => {
  return {} as any;
};

const updatePokemonAttributes = async (name: string, data: PokemonAttributesInput): Promise<any> => {
  return {} as any;
};

const deletePokemonAttributes = async (name: string): Promise<any> => {
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
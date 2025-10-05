import { IPaginatedListResponse, IPokemon } from "../types/pokeapi-response.type";

interface IPokemonService {
  getPokemonByName(name: string): Promise<IPokemon>;
  getAllPokemons(limit?: number, offset?: number): Promise<IPaginatedListResponse>;
  
  // Additional methods for creating, updating, and deleting local attributes
  createPokemonAttributes(data: any): Promise<any>;
  updatePokemonAttributes(name: string, data: any): Promise<any>;
  deletePokemonAttributes(name: string): Promise<any>;
};

const getPokemonByName = async (name: string): Promise<IPokemon> => {
  return { } as IPokemon;
};

const getAllPokemons = async (limit: number = 20, offset: number = 0): Promise<IPaginatedListResponse> => {
  return { } as IPaginatedListResponse;
};

const createPokemonAttributes = async (data: any): Promise<any> => {
  return { } as any;
};

const updatePokemonAttributes = async (name: string, data: any): Promise<any> => {
  return { } as any;
};

const deletePokemonAttributes = async (name: string): Promise<any> => {
  return { } as any;
};

const PokemonService: IPokemonService = {
  getPokemonByName,
  getAllPokemons,
  createPokemonAttributes,
  updatePokemonAttributes,
  deletePokemonAttributes,
};

export default PokemonService;
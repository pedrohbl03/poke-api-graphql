import { IPaginatedListResponse, IPokemon } from './../../types/pokeapi-response.type';
import envVars from "../../config/env";
import apiFetch from "../../utils/apiFetch";

interface IPokeApiProvider {
  getPokemon: (name: string) => Promise<IPokemon>;
  getPokemons: (limit: number, offset: number) => Promise<IPaginatedListResponse>;
}

const getPokemon = async (name: string): Promise<IPokemon> => {
  const response = await apiFetch<IPokemon>(`${envVars.pokeApiBaseUrl}/pokemon/${name.toLowerCase()}`, { method: 'GET' });
  return response;
}

const getPokemons = async (limit: number, offset: number): Promise<IPaginatedListResponse> => {
  const response = await apiFetch<IPaginatedListResponse>(`${envVars.pokeApiBaseUrl}/pokemon?limit=${limit}&offset=${offset}`, { method: 'GET' });
  return response;
}

export const PokeApiProvider: IPokeApiProvider = {
  getPokemon,
  getPokemons,
};  
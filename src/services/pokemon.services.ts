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
  const pokeApi = await PokeApiProvider.getPokemons(limit, offset);
  const additionalAttributes = await PokemonRepository.findManyPokemonAttributesByNames(
    pokeApi.results.map((p: any) => p.name)
  );

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

  if (data.powerLevel && !validatePowerLevel(data.powerLevel)) {
    throw new Error('Invalid power level');
  }

  if (data.favorite && !await validateFavoritesLimit()) {
    throw new Error('Cannot favorite more than 3 Pokemons');
  }

  const favorites = await PokemonRepository.findFavoritePokemonAttributes();

  if (favorites.length > 3) {
    throw new Error('Cannot favorite more than 3 Pokemons');
  }

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
  const existingAttributes = await PokemonRepository.findPokemonAttributesByName(name);

  if (!existingAttributes) {
    throw new Error('Pokemon attributes not found');
  }

  if (data.powerLevel && !validatePowerLevel(data.powerLevel)) {
    throw new Error('Invalid power level');
  }

  if (data.favorite && !await validateFavoritesLimit()) {
    throw new Error('Cannot favorite more than 3 Pokemons');
  }

  const updatedAttributes = await PokemonRepository.createPokemonAttributes({ ...existingAttributes, ...data });

  if (!updatedAttributes) {
    throw new Error('Failed to update Pokemon attributes');
  }

  const pokemon = await getPokemonByName(name);

  return {
    ...pokemon,
    ...updatedAttributes
  };
};

const deletePokemonAttributes = async (name: string): Promise<boolean> => {
  const deleted = await PokemonRepository.deletePokemonAttributesByName(name);

  return !!deleted;
};

const validatePowerLevel = (value: number): boolean => {
  return value >= 1 && value <= 100;
};

const validateFavoritesLimit = async (): Promise<boolean> => {
  const favorites = await PokemonRepository.findFavoritePokemonAttributes();
  return favorites.length < 4;
};

const PokemonService: IPokemonService = {
  getPokemonByName,
  getAllPokemons,
  createPokemonAttributes,
  updatePokemonAttributes,
  deletePokemonAttributes,
};

export default PokemonService;
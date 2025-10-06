import PokemonRepository from "../repositories/pokemon.repository";
import { Pokemon, PokemonAttributesInput, PokemonPagination } from "../types/graphql-generated.types";
import { BadRequestError, NotFoundError } from "../utils/error";
import { PokeApiProvider } from "./providers/pokeapi.provider";

interface IPokemonService {
  getPokemonByName(name: string): Promise<Pokemon>;
  getAllPokemons(limit?: number, offset?: number): Promise<PokemonPagination>;

  createPokemonAttributes(data: PokemonAttributesInput): Promise<Pokemon>;
  updatePokemonAttributes(data: PokemonAttributesInput): Promise<Pokemon>;
  deletePokemonAttributes(name: string): Promise<boolean>;
};

const getPokemonByName = async (name: string): Promise<Pokemon> => {
  const [pokemon, additionalAttributes] = await Promise.all([
    PokeApiProvider.getPokemon(name),
    PokemonRepository.findPokemonAttributesByName(name)
  ]);

  if (!pokemon) {
    throw new NotFoundError('Pokemon not found');
  }

  return {
    ...pokemon,
    ...additionalAttributes?.toJSON()
  };
};

const getAllPokemons = async (limit: number = 20, offset: number = 0): Promise<PokemonPagination> => {
  const pokeApi = await PokeApiProvider.getPokemons(limit, offset);
  const additionalAttributes = await PokemonRepository.findManyPokemonAttributesByNames(
    pokeApi.results.map((p: any) => p.name)
  );

  const mergedResults = pokeApi.results.map((pokemon: any) => {
    const attrs = additionalAttributes.find((attr: any) => attr.name === pokemon.name);
    return {
      ...pokemon,
      ...(attrs ? attrs.toJSON?.() ?? attrs : {})
    };
  });

  return {
    count: pokeApi.count,
    hasNext: !!pokeApi.next,
    hasPrevious: !!pokeApi.previous,
    page: Math.floor(offset / limit) + 1,
    totalPages: Math.ceil(pokeApi.count / limit),
    results: mergedResults
  };
};

const createPokemonAttributes = async (data: PokemonAttributesInput): Promise<Pokemon> => {
  const pokemon = await getPokemonByName(data.name);

  if (!pokemon) {
    throw new NotFoundError('Pokemon not found in external API');
  }

  const existAdditionalAttributes = await PokemonRepository.findPokemonAttributesByName(data.name);

  if (existAdditionalAttributes) {
    throw new BadRequestError('Pokemon attributes already exist', 'DUPLICATE_POKEMON_ATTRIBUTES');
  }

  if (data.favorite && !await validateFavoritesLimit()) {
    throw new BadRequestError('Cannot favorite more than 3 Pokemons', 'FAVORITES_LIMIT_EXCEEDED');
  }

  const newAttributes = await PokemonRepository.createPokemonAttributes(data);

  if (!newAttributes) {
    throw new BadRequestError('Failed to create Pokemon attributes', 'CREATE_POKEMON_ATTRIBUTES_FAILED');
  }

  return {
    ...pokemon,
    ...newAttributes.toJSON()
  };
};

const updatePokemonAttributes = async (data: PokemonAttributesInput): Promise<Pokemon> => {
  const existingAttributes = await PokemonRepository.findPokemonAttributesByName(data.name);

  if (!existingAttributes) {
    throw new NotFoundError('Pokemon attributes not found');
  }

  if (data.favorite && !await validateFavoritesLimit()) {
    throw new BadRequestError('Cannot favorite more than 3 Pokemons', 'FAVORITES_LIMIT_EXCEEDED');
  }

  const sanitizedData = {
    name: data.name,
    nickname: data.nickname ?? existingAttributes.nickname,
    favorite: !!data.favorite,
    powerLevel: data.powerLevel ?? existingAttributes.powerLevel,
  };

  const updatedAttributes = await PokemonRepository.updatePokemonAttributes(sanitizedData);

  if (!updatedAttributes) {
    throw new BadRequestError('Failed to update Pokemon attributes', 'UPDATE_POKEMON_ATTRIBUTES_FAILED');
  }

  const pokemon = await getPokemonByName(data.name);

  return {
    ...pokemon,
    ...updatedAttributes.toJSON()
  };
};

const deletePokemonAttributes = async (name: string): Promise<boolean> => {
  const deleted = await PokemonRepository.deletePokemonAttributesByName(name);
  return !!deleted;
};

const validateFavoritesLimit = async (): Promise<boolean> => {
  const favorites = await PokemonRepository.findFavoritePokemonAttributes();
  return favorites.length < 3;
};

const PokemonService: IPokemonService = {
  getPokemonByName,
  getAllPokemons,
  createPokemonAttributes,
  updatePokemonAttributes,
  deletePokemonAttributes,
};

export default PokemonService;
import { Pokemon } from "../models";
import { PokemonAttributesInput } from "../types/graphql-generated.types";

interface IPokemonRepository {
  findPokemonAttributesByName(name: string): Promise<InstanceType<typeof Pokemon> | null>;
  findAllPokemonAttributes(): Promise<InstanceType<typeof Pokemon>[]>;
  findManyPokemonAttributesByNames(names: string[]): Promise<InstanceType<typeof Pokemon>[]>;
  findFavoritePokemonAttributes(): Promise<InstanceType<typeof Pokemon>[]>;
  createPokemonAttributes(data: PokemonAttributesInput): Promise<InstanceType<typeof Pokemon>>;
  deletePokemonAttributesByName(name: string): Promise<InstanceType<typeof Pokemon> | null>;
}

const findPokemonAttributesByName = async (name: string): Promise<InstanceType<typeof Pokemon> | null> => {
  return Pokemon
    .findOne({ name })
    .exec();
};

const findAllPokemonAttributes = async (): Promise<InstanceType<typeof Pokemon>[]> => {
  return Pokemon
    .find()
    .exec();
};

const findFavoritePokemonAttributes = async (): Promise<InstanceType<typeof Pokemon>[]> => {
  return Pokemon
    .find({ favorite: true })
    .exec();
};

const findManyPokemonAttributesByNames = async (names: string[]): Promise<InstanceType<typeof Pokemon>[]> => {
  return Pokemon
    .find({ name: { $in: names } })
    .exec();
}

const createPokemonAttributes = async (data: any): Promise<InstanceType<typeof Pokemon>> => {
  const newPokemon = new Pokemon({ ...data });
  await newPokemon.save();

  return newPokemon;
}

const deletePokemonAttributesByName = async (name: string): Promise<InstanceType<typeof Pokemon> | null> => {
  return await Pokemon
    .findOneAndDelete({ name })
    .exec();
}

const PokemonRepository: IPokemonRepository = {
  findPokemonAttributesByName,
  findAllPokemonAttributes,
  findFavoritePokemonAttributes,
  findManyPokemonAttributesByNames,
  createPokemonAttributes,
  deletePokemonAttributesByName,
};

export default PokemonRepository;
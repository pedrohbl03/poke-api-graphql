import { Pokemon } from "../models";
import { PokemonAttributesInput } from "../types/graphql-generated.types";

interface IPokemonRepository {
  findPokemonAttributesByName(name: string): Promise<InstanceType<typeof Pokemon> | null>;
  findAllPokemonAttributes(): Promise<InstanceType<typeof Pokemon>[]>;
  createPokemonAttributesByName(name: string, data: PokemonAttributesInput): Promise<InstanceType<typeof Pokemon>>;
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

const createPokemonAttributesByName = async (name: string, data: any): Promise<InstanceType<typeof Pokemon>> => {
  const newPokemon = new Pokemon({ name, ...data });
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
  createPokemonAttributesByName,
  deletePokemonAttributesByName,
};

export default PokemonRepository;
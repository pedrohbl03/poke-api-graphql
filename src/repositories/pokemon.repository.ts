import { Pokemon } from "../models";

interface IPokemonRepository {
  findPokemonAttributesByName(name: string): Promise<any>;
  createPokemonAttributesByName(name: string, data: any): Promise<any>;
  deletePokemonAttributesByName(name: string): Promise<any>;
}

const findPokemonAttributesByName = async (name: string): Promise<any> => {
  return Pokemon
    .findOne({ name })
    .exec();
};

const createPokemonAttributesByName = async (name: string, data: any): Promise<any> => {
  const newPokemon = new Pokemon({ name, ...data });
  return await newPokemon.save();
}

const deletePokemonAttributesByName = async (name: string): Promise<any> => {
  return await Pokemon
    .findOneAndDelete({ name })
    .exec();
}

const PokemonRepository: IPokemonRepository = {
  findPokemonAttributesByName,
  createPokemonAttributesByName,
  deletePokemonAttributesByName,
};

  export default PokemonRepository;
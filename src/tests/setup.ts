// Mock PokeAPI responses
export const mockPokemonApiResponse = {
  name: 'pikachu',
  height: 4,
  weight: 60,
  url: 'https://pokeapi.co/api/v2/pokemon/25/',
  types: [
    {
      slot: 1,
      type: {
        name: 'electric',
        url: 'https://pokeapi.co/api/v2/type/13/'
      }
    }
  ]
};
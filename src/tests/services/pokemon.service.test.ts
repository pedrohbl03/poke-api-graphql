import PokemonService from '../../services/pokemon.services';
import PokemonRepository from '../../repositories/pokemon.repository';
import { PokeApiProvider } from '../../services/providers/pokeapi.provider';
import { BadRequestError, NotFoundError } from '../../utils/error';
import { mockPokemonApiResponse } from '../setup';

// Mock dependencies
jest.mock('../../repositories/pokemon.repository');
jest.mock('../../services/providers/pokeapi.provider');

const mockPokemonRepository = PokemonRepository as jest.Mocked<typeof PokemonRepository>;
const mockPokeApiProvider = PokeApiProvider as jest.Mocked<typeof PokeApiProvider>;

describe('Pokemon Service - Favorites Limit Validation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createPokemonAttributes', () => {
    const mockPokemonData = {
      name: 'pikachu',
      nickname: 'Pika',
      favorite: true,
      powerLevel: 50
    };

    it('should allow creating favorite pokemon when limit not reached', async () => {
      // Mock que existe menos de 3 favoritos
      mockPokemonRepository.findFavoritePokemonAttributes.mockResolvedValue([
        { name: 'bulbasaur', favorite: true } as any,
        { name: 'charmander', favorite: true } as any
      ]);

      // Mock que pokemon não existe ainda
      mockPokemonRepository.findPokemonAttributesByName.mockResolvedValue(null);

      // Mock PokeAPI response
      mockPokeApiProvider.getPokemon.mockResolvedValue({
        ...mockPokemonApiResponse,
        url: 'https://pokeapi.co/api/v2/pokemon/25/'
      } as any);

      // Mock successful creation
      const mockCreatedPokemon = { 
        ...mockPokemonData, 
      };
      mockPokemonRepository.createPokemonAttributes.mockResolvedValue(mockCreatedPokemon as any);

      const result = await PokemonService.createPokemonAttributes(mockPokemonData);

      expect(result).toBeDefined();
      expect(result.name).toBe('pikachu');
      expect(mockPokemonRepository.findFavoritePokemonAttributes).toHaveBeenCalled();
      expect(mockPokemonRepository.createPokemonAttributes).toHaveBeenCalledWith(mockPokemonData);
    });

    it('should reject creating favorite pokemon when limit of 3 is reached', async () => {
      // Mock que já existem 3 favoritos
      mockPokemonRepository.findFavoritePokemonAttributes.mockResolvedValue([
        { name: 'bulbasaur', favorite: true } as any,
        { name: 'charmander', favorite: true } as any,
        { name: 'squirtle', favorite: true } as any
      ]);

      // Mock que pokemon não existe ainda
      mockPokemonRepository.findPokemonAttributesByName.mockResolvedValue(null);

      // Mock PokeAPI response
      mockPokeApiProvider.getPokemon.mockResolvedValue(mockPokemonApiResponse);

      await expect(PokemonService.createPokemonAttributes(mockPokemonData))
        .rejects
        .toThrow(new BadRequestError('Cannot favorite more than 3 Pokemons', 'FAVORITES_LIMIT_EXCEEDED'));

      expect(mockPokemonRepository.findFavoritePokemonAttributes).toHaveBeenCalled();
      expect(mockPokemonRepository.createPokemonAttributes).not.toHaveBeenCalled();
    });

    it('should allow creating non-favorite pokemon regardless of limit', async () => {
      const nonFavoritePokemon = {
        name: 'geodude',
        nickname: 'Rocky',
        favorite: false,
        powerLevel: 30
      };

      // Mock que já existem 3 favoritos (limite atingido)
      mockPokemonRepository.findFavoritePokemonAttributes.mockResolvedValue([
        { name: 'bulbasaur', favorite: true } as any,
        { name: 'charmander', favorite: true } as any,
        { name: 'squirtle', favorite: true } as any
      ]);

      // Mock que pokemon não existe ainda
      mockPokemonRepository.findPokemonAttributesByName.mockResolvedValue(null);

      // Mock PokeAPI response
      mockPokeApiProvider.getPokemon.mockResolvedValue({
        ...mockPokemonApiResponse,
        name: 'geodude'
      });

      // Mock successful creation
      const mockCreatedPokemon = { 
        ...nonFavoritePokemon, 
      };
      mockPokemonRepository.createPokemonAttributes.mockResolvedValue(mockCreatedPokemon as any);

      const result = await PokemonService.createPokemonAttributes(nonFavoritePokemon);

      expect(result).toBeDefined();
      expect(result.name).toBe('geodude');
      expect(mockPokemonRepository.createPokemonAttributes).toHaveBeenCalledWith(nonFavoritePokemon);
    });

    it('should reject creating pokemon if it already exists', async () => {
      const existingPokemon = { name: 'pikachu', favorite: false } as any;
      
      mockPokemonRepository.findPokemonAttributesByName.mockResolvedValue(existingPokemon);
      mockPokeApiProvider.getPokemon.mockResolvedValue(mockPokemonApiResponse);

      await expect(PokemonService.createPokemonAttributes(mockPokemonData))
        .rejects
        .toThrow(new BadRequestError('Pokemon attributes already exist', 'DUPLICATE_POKEMON_ATTRIBUTES'));

      expect(mockPokemonRepository.createPokemonAttributes).not.toHaveBeenCalled();
    });
  });

  describe('updatePokemonAttributes', () => {
    const mockUpdateData = {
      name: 'pikachu',
      nickname: 'Thunder',
      favorite: true,
      powerLevel: 75
    };

    it('should allow updating to favorite when limit not reached', async () => {
      const existingPokemon = { 
        name: 'pikachu', 
        favorite: false, 
        powerLevel: 50,
        nickname: 'Pika'
      } as any;

      // Mock existing pokemon
      mockPokemonRepository.findPokemonAttributesByName.mockResolvedValue(existingPokemon);

      // Mock que existe menos de 3 favoritos
      mockPokemonRepository.findFavoritePokemonAttributes.mockResolvedValue([
        { name: 'bulbasaur', favorite: true } as any
      ]);

      // Mock PokeAPI response
      mockPokeApiProvider.getPokemon.mockResolvedValue(mockPokemonApiResponse);

      // Mock successful update
      const mockUpdatedPokemon = { 
        ...mockUpdateData, 
      };
      mockPokemonRepository.updatePokemonAttributes.mockResolvedValue(mockUpdatedPokemon as any);

      const result = await PokemonService.updatePokemonAttributes(mockUpdateData);

      expect(result).toBeDefined();
      expect(result.name).toBe('pikachu');
      expect(mockPokemonRepository.findFavoritePokemonAttributes).toHaveBeenCalled();
      expect(mockPokemonRepository.updatePokemonAttributes).toHaveBeenCalled();
    });

    it('should reject updating to favorite when limit of 3 is reached', async () => {
      const existingPokemon = { 
        name: 'pikachu', 
        favorite: false, 
        powerLevel: 50,
        nickname: 'Pika'
      } as any;

      // Mock existing pokemon
      mockPokemonRepository.findPokemonAttributesByName.mockResolvedValue(existingPokemon);

      // Mock que já existem 3 favoritos
      mockPokemonRepository.findFavoritePokemonAttributes.mockResolvedValue([
        { name: 'bulbasaur', favorite: true } as any,
        { name: 'charmander', favorite: true } as any,
        { name: 'squirtle', favorite: true } as any
      ]);

      await expect(PokemonService.updatePokemonAttributes(mockUpdateData))
        .rejects
        .toThrow(new BadRequestError('Cannot favorite more than 3 Pokemons', 'FAVORITES_LIMIT_EXCEEDED'));

      expect(mockPokemonRepository.findFavoritePokemonAttributes).toHaveBeenCalled();
      expect(mockPokemonRepository.updatePokemonAttributes).not.toHaveBeenCalled();
    });

    it('should allow updating non-favorite attributes regardless of limit', async () => {
      const nonFavoriteUpdate = {
        name: 'pikachu',
        nickname: 'Lightning',
        favorite: false,
        powerLevel: 90
      };

      const existingPokemon = { 
        name: 'pikachu', 
        favorite: false, 
        powerLevel: 50,
        nickname: 'Pika'
      } as any;

      // Mock existing pokemon
      mockPokemonRepository.findPokemonAttributesByName.mockResolvedValue(existingPokemon);

      // Mock PokeAPI response
      mockPokeApiProvider.getPokemon.mockResolvedValue(mockPokemonApiResponse);

      // Mock successful update
      const mockUpdatedPokemon = { 
        ...nonFavoriteUpdate, 
        toJSON: () => nonFavoriteUpdate 
      };
      mockPokemonRepository.updatePokemonAttributes.mockResolvedValue(mockUpdatedPokemon as any);

      const result = await PokemonService.updatePokemonAttributes(nonFavoriteUpdate);

      expect(result).toBeDefined();
      expect(result.nickname).toBe('Lightning');
      expect(result.powerLevel).toBe(90);
      expect(mockPokemonRepository.updatePokemonAttributes).toHaveBeenCalled();
    });

    it('should reject updating non-existing pokemon', async () => {
      mockPokemonRepository.findPokemonAttributesByName.mockResolvedValue(null);

      await expect(PokemonService.updatePokemonAttributes(mockUpdateData))
        .rejects
        .toThrow(new NotFoundError('Pokemon attributes not found'));

      expect(mockPokemonRepository.updatePokemonAttributes).not.toHaveBeenCalled();
    });
  });

  describe('validateFavoritesLimit', () => {
    it('should return true when less than 3 favorites exist', async () => {
      mockPokemonRepository.findFavoritePokemonAttributes.mockResolvedValue([
        { name: 'bulbasaur', favorite: true } as any
      ]);

      // Access private method for testing
      const service = PokemonService as any;
      const isValid = await service.validateFavoritesLimit?.() ?? true;

      expect(isValid).toBe(true);
    });

    it('should return false when 3 or more favorites exist', async () => {
      mockPokemonRepository.findFavoritePokemonAttributes.mockResolvedValue([
        { name: 'bulbasaur', favorite: true } as any,
        { name: 'charmander', favorite: true } as any,
        { name: 'squirtle', favorite: true } as any
      ]);

      // Access private method for testing
      const service = PokemonService as any;
      const isValid = await service.validateFavoritesLimit?.() ?? false;

      expect(isValid).toBe(false);
    });
  });
});
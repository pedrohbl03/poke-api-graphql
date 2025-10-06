import { BadRequestError, NotFoundError } from '../../utils/error';

describe('Error Classes - Custom GraphQL Errors', () => {
  describe('BadRequestError', () => {
    it('should create error with message and default code', () => {
      const error = new BadRequestError('Invalid input');

      expect(error.message).toBe('Invalid input');
      expect(error.extensions?.code).toBe('BAD_REQUEST');
    });

    it('should create error with message and custom details', () => {
      const details = { field: 'powerLevel', value: 150 };
      const error = new BadRequestError('Power level must be at most 100', details);

      expect(error.message).toBe('Power level must be at most 100');
      expect(error.extensions?.code).toBe('BAD_REQUEST');
      expect(error.extensions?.details).toEqual(details);
    });

    it('should handle powerLevel validation error with proper code', () => {
      const error = new BadRequestError(
        'Power level must be between 1 and 100',
        'INVALID_POWER_LEVEL'
      );

      expect(error.message).toBe('Power level must be between 1 and 100');
      expect(error.extensions?.details).toBe('INVALID_POWER_LEVEL');
    });

    it('should handle favorites limit error with proper code', () => {
      const error = new BadRequestError(
        'Cannot favorite more than 3 Pokemons',
        'FAVORITES_LIMIT_EXCEEDED'
      );

      expect(error.message).toBe('Cannot favorite more than 3 Pokemons');
      expect(error.extensions?.details).toBe('FAVORITES_LIMIT_EXCEEDED');
      expect(error.extensions?.code).toBe('BAD_REQUEST');
    });
  });

  describe('NotFoundError', () => {
    it('should create error with message and NOT_FOUND code', () => {
      const error = new NotFoundError('Pokemon not found');

      expect(error.message).toBe('Pokemon not found');
      expect(error.extensions?.code).toBe('NOT_FOUND');
    });

    it('should handle pokemon not found in external API', () => {
      const error = new NotFoundError('Pokemon not found in external API');

      expect(error.message).toBe('Pokemon not found in external API');
      expect(error.extensions?.code).toBe('NOT_FOUND');
    });

    it('should handle pokemon attributes not found', () => {
      const error = new NotFoundError('Pokemon attributes not found');

      expect(error.message).toBe('Pokemon attributes not found');
      expect(error.extensions?.code).toBe('NOT_FOUND');
    });
  });

  describe('Error inheritance', () => {
    it('should extend GraphQLError correctly for BadRequestError', () => {
      const error = new BadRequestError('Test error');

      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe('GraphQLError');
    });

    it('should extend GraphQLError correctly for NotFoundError', () => {
      const error = new NotFoundError('Test error');

      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe('GraphQLError');
    });
  });
});
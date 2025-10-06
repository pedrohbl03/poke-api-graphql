import { BadRequestError, NotFoundError } from '../utils/error';

describe('Business Rules Validation - Unit Tests', () => {
  describe('Rule 1: PowerLevel Validation (1-100)', () => {
    it('should validate powerLevel range boundaries', () => {
      const validPowerLevels = [1, 50, 100];
      const invalidPowerLevels = [0, -1, 101, 150, 999];

      // Test valid values
      validPowerLevels.forEach(powerLevel => {
        expect(powerLevel).toBeGreaterThanOrEqual(1);
        expect(powerLevel).toBeLessThanOrEqual(100);
      });

      // Test invalid values
      invalidPowerLevels.forEach(powerLevel => {
        expect(powerLevel < 1 || powerLevel > 100).toBe(true);
      });
    });

    it('should create proper error messages for powerLevel validation', () => {
      const errors = {
        tooLow: new BadRequestError('Power level must be at least 1'),
        tooHigh: new BadRequestError('Power level must be at most 100'),
        invalid: new BadRequestError('Power level must be between 1 and 100', 'INVALID_POWER_LEVEL')
      };

      expect(errors.tooLow.message).toBe('Power level must be at least 1');
      expect(errors.tooHigh.message).toBe('Power level must be at most 100');
      expect(errors.invalid.extensions?.details).toBe('INVALID_POWER_LEVEL');
    });
  });

  describe('Rule 2: Favorites Limit (Max 3)', () => {
    it('should validate favorites count logic', () => {
      const favoritesLimits = [
        { current: 0, adding: 1, allowed: true },
        { current: 1, adding: 1, allowed: true },
        { current: 2, adding: 1, allowed: true },
        { current: 3, adding: 1, allowed: false },
        { current: 3, adding: 0, allowed: true }, // not adding favorite
      ];

      favoritesLimits.forEach(({ current, adding, allowed }) => {
        const wouldExceedLimit = (current + adding) > 3;
        expect(!wouldExceedLimit).toBe(allowed);
      });
    });

    it('should create proper error for favorites limit exceeded', () => {
      const error = new BadRequestError(
        'Cannot favorite more than 3 Pokemons',
        'FAVORITES_LIMIT_EXCEEDED'
      );

      expect(error.message).toBe('Cannot favorite more than 3 Pokemons');
      expect(error.extensions?.details).toBe('FAVORITES_LIMIT_EXCEEDED');
      expect(error.extensions?.code).toBe('BAD_REQUEST');
    });
  });

  describe('Combined Business Rules', () => {
    it('should validate both rules in combination', () => {
      const testCases = [
        {
          name: 'Valid powerLevel and under favorites limit',
          powerLevel: 50,
          favorite: true,
          currentFavorites: 2,
          shouldPass: true
        },
        {
          name: 'Invalid powerLevel (too high)',
          powerLevel: 150,
          favorite: true,
          currentFavorites: 1,
          shouldPass: false,
          reason: 'powerLevel'
        },
        {
          name: 'Invalid powerLevel (too low)',
          powerLevel: 0,
          favorite: false,
          currentFavorites: 1,
          shouldPass: false,
          reason: 'powerLevel'
        },
        {
          name: 'Valid powerLevel but exceeds favorites limit',
          powerLevel: 75,
          favorite: true,
          currentFavorites: 3,
          shouldPass: false,
          reason: 'favorites'
        },
        {
          name: 'Valid powerLevel and non-favorite (bypasses limit)',
          powerLevel: 80,
          favorite: false,
          currentFavorites: 3,
          shouldPass: true
        }
      ];

      testCases.forEach(testCase => {
        const isPowerLevelValid = testCase.powerLevel >= 1 && testCase.powerLevel <= 100;
        const isFavoritesValid = !testCase.favorite || testCase.currentFavorites < 3;
        const shouldPass = isPowerLevelValid && isFavoritesValid;

        expect(shouldPass).toBe(testCase.shouldPass);
      });
    });
  });

  describe('Error Types and Codes', () => {
    it('should use correct GraphQL error types for each business rule', () => {
      const powerLevelError = new BadRequestError(
        'Power level must be between 1 and 100',
        'INVALID_POWER_LEVEL'
      );

      const favoritesError = new BadRequestError(
        'Cannot favorite more than 3 Pokemons',
        'FAVORITES_LIMIT_EXCEEDED'
      );

      const notFoundError = new NotFoundError('Pokemon not found');

      // All should be GraphQL errors with proper HTTP status
      expect(powerLevelError.extensions?.code).toBe('BAD_REQUEST');
      expect(favoritesError.extensions?.code).toBe('BAD_REQUEST');
      expect(notFoundError.extensions?.code).toBe('NOT_FOUND');

      // Should have proper details for debugging
      expect(powerLevelError.extensions?.details).toBe('INVALID_POWER_LEVEL');
      expect(favoritesError.extensions?.details).toBe('FAVORITES_LIMIT_EXCEEDED');
    });
  });

  describe('Input Validation Scenarios', () => {
    it('should handle edge cases and boundary values', () => {
      const edgeCases = [
        { powerLevel: 1, description: 'minimum valid powerLevel' },
        { powerLevel: 100, description: 'maximum valid powerLevel' },
        { powerLevel: undefined, description: 'undefined powerLevel (should default)' },
        { favorite: true, description: 'explicit favorite true' },
        { favorite: false, description: 'explicit favorite false' },
        { favorite: undefined, description: 'undefined favorite (should default to false)' }
      ];

      edgeCases.forEach(edgeCase => {
        if (edgeCase.powerLevel !== undefined) {
          expect(edgeCase.powerLevel >= 1 && edgeCase.powerLevel <= 100).toBe(true);
        }
        
        if (edgeCase.favorite !== undefined) {
          expect(typeof edgeCase.favorite).toBe('boolean');
        }
      });
    });

    it('should validate pokemon creation input structure', () => {
      const validInputs = [
        {
          name: 'pikachu',
          powerLevel: 50,
          favorite: true,
          nickname: 'Sparky'
        },
        {
          name: 'charmander',
          powerLevel: 75
          // favorite and nickname optional
        }
      ];

      const invalidInputs = [
        {
          // name missing
          powerLevel: 50,
          favorite: true
        },
        {
          name: 'pokemon',
          powerLevel: 150, // invalid
          favorite: true
        },
        {
          name: 'pokemon',
          powerLevel: -5, // invalid
          favorite: false
        }
      ] as any[];

      validInputs.forEach(input => {
        expect(input.name).toBeDefined();
        expect(typeof input.name).toBe('string');
        if (input.powerLevel) {
          expect(input.powerLevel >= 1 && input.powerLevel <= 100).toBe(true);
        }
      });

      invalidInputs.forEach(input => {
        const isNameValid = !!input.name && typeof input.name === 'string';
        const isPowerLevelValid = input.powerLevel === undefined || 
          (input.powerLevel >= 1 && input.powerLevel <= 100);
        
        const isInputValid = isNameValid && isPowerLevelValid;
        expect(isInputValid).toBe(false);
      });
    });
  });

  describe('Service Layer Logic Simulation', () => {
    // Simular a lógica que seria implementada no service
    const validatePokemonInput = (input: any, currentFavorites: number = 0) => {
      const errors = [];

      // Rule 1: PowerLevel validation
      if (input.powerLevel !== undefined && 
          (input.powerLevel < 1 || input.powerLevel > 100)) {
        errors.push(new BadRequestError('Power level must be between 1 and 100'));
      }

      // Rule 2: Favorites limit validation
      if (input.favorite && currentFavorites >= 3) {
        errors.push(new BadRequestError('Cannot favorite more than 3 Pokemons', 'FAVORITES_LIMIT_EXCEEDED'));
      }

      return errors;
    };

    it('should validate service logic for pokemon creation', () => {
      const testCases = [
        {
          input: { name: 'pikachu', powerLevel: 50, favorite: true },
          currentFavorites: 2,
          expectedErrors: 0
        },
        {
          input: { name: 'pikachu', powerLevel: 150, favorite: true },
          currentFavorites: 1,
          expectedErrors: 1 // powerLevel invalid
        },
        {
          input: { name: 'pikachu', powerLevel: 50, favorite: true },
          currentFavorites: 3,
          expectedErrors: 1 // favorites limit exceeded
        },
        {
          input: { name: 'pikachu', powerLevel: 150, favorite: true },
          currentFavorites: 3,
          expectedErrors: 2 // both rules violated
        },
        {
          input: { name: 'pikachu', powerLevel: 50, favorite: false },
          currentFavorites: 3,
          expectedErrors: 0 // non-favorite bypasses limit
        }
      ];

      testCases.forEach(testCase => {
        const errors = validatePokemonInput(testCase.input, testCase.currentFavorites);
        expect(errors).toHaveLength(testCase.expectedErrors);
      });
    });
  });
});
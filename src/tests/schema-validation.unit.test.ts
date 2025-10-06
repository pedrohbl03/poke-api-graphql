/**
 * Testes de Validação - Mongoose Schema Rules
 * 
 * Este arquivo testa especificamente as validações que seriam aplicadas
 * pelo schema do Mongoose sem precisar de conexão com banco de dados.
 */

describe('Pokemon Schema Validation Rules', () => {
  // Simula as validações do Mongoose schema
  const validatePokemonSchema = (data: any) => {
    const errors: string[] = [];

    // Required field validation
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
      errors.push('Path `name` is required');
    }

    // PowerLevel min validation
    if (data.powerLevel !== undefined && data.powerLevel < 1) {
      errors.push('Power level must be at least 1');
    }

    // PowerLevel max validation
    if (data.powerLevel !== undefined && data.powerLevel > 100) {
      errors.push('Power level must be at most 100');
    }

    // Type validations
    if (data.powerLevel !== undefined && typeof data.powerLevel !== 'number') {
      errors.push('Cast to Number failed for value at path "powerLevel"');
    }

    if (data.favorite !== undefined && typeof data.favorite !== 'boolean') {
      errors.push('Cast to Boolean failed for value at path "favorite"');
    }

    return errors;
  };

  // Simula transformações do schema
  const applySchemaTransformations = (data: any) => {
    const transformed = { ...data };

    // Default values
    if (transformed.powerLevel === undefined) {
      transformed.powerLevel = 1;
    }
    if (transformed.favorite === undefined) {
      transformed.favorite = false;
    }

    // String transformations
    if (transformed.name) {
      transformed.name = transformed.name.toLowerCase().trim();
    }
    if (transformed.nickname) {
      transformed.nickname = transformed.nickname.trim();
    }

    return transformed;
  };

  describe('Rule 1: PowerLevel Field Validation', () => {
    it('should accept valid powerLevel values (1-100)', () => {
      const validValues = [1, 25, 50, 75, 100];
      
      validValues.forEach(powerLevel => {
        const errors = validatePokemonSchema({ name: 'test', powerLevel });
        expect(errors).toHaveLength(0);
      });
    });

    it('should reject powerLevel below 1', () => {
      const invalidValues = [0, -1, -10, -100];
      
      invalidValues.forEach(powerLevel => {
        const errors = validatePokemonSchema({ name: 'test', powerLevel });
        expect(errors).toContain('Power level must be at least 1');
      });
    });

    it('should reject powerLevel above 100', () => {
      const invalidValues = [101, 150, 200, 999];
      
      invalidValues.forEach(powerLevel => {
        const errors = validatePokemonSchema({ name: 'test', powerLevel });
        expect(errors).toContain('Power level must be at most 100');
      });
    });

    it('should apply default powerLevel of 1 when not provided', () => {
      const data = { name: 'test' };
      const transformed = applySchemaTransformations(data);
      
      expect(transformed.powerLevel).toBe(1);
    });

    it('should validate powerLevel type (number)', () => {
      const invalidTypes = ['50', '100', true, null, undefined, {}, []];
      
      invalidTypes.forEach(powerLevel => {
        if (powerLevel !== undefined) {
          const errors = validatePokemonSchema({ name: 'test', powerLevel });
          expect(errors.some(err => err.includes('Cast to Number failed'))).toBe(true);
        }
      });
    });
  });

  describe('Name Field Validation', () => {
    it('should require name field', () => {
      const invalidData = [
        {},
        { name: '' },
        { name: '   ' },
        { name: null },
        { name: undefined }
      ];

      invalidData.forEach(data => {
        const errors = validatePokemonSchema(data);
        expect(errors).toContain('Path `name` is required');
      });
    });

    it('should transform name to lowercase and trim', () => {
      const testCases = [
        { input: 'PIKACHU', expected: 'pikachu' },
        { input: '  Charmander  ', expected: 'charmander' },
        { input: 'SquIrTlE', expected: 'squirtle' }
      ];

      testCases.forEach(({ input, expected }) => {
        const transformed = applySchemaTransformations({ name: input });
        expect(transformed.name).toBe(expected);
      });
    });
  });

  describe('Favorite Field Validation', () => {
    it('should apply default favorite value of false', () => {
      const data = { name: 'test' };
      const transformed = applySchemaTransformations(data);
      
      expect(transformed.favorite).toBe(false);
    });

    it('should accept boolean values', () => {
      const validValues = [true, false];
      
      validValues.forEach(favorite => {
        const errors = validatePokemonSchema({ name: 'test', favorite });
        expect(errors).toHaveLength(0);
      });
    });

    it('should validate favorite type (boolean)', () => {
      const invalidTypes = ['true', 'false', 1, 0, null, {}, []];
      
      invalidTypes.forEach(favorite => {
        const errors = validatePokemonSchema({ name: 'test', favorite });
        expect(errors.some(err => err.includes('Cast to Boolean failed'))).toBe(true);
      });
    });
  });

  describe('Nickname Field Validation', () => {
    it('should be optional', () => {
      const data = { name: 'test' };
      const errors = validatePokemonSchema(data);
      
      expect(errors).toHaveLength(0);
    });

    it('should trim nickname when provided', () => {
      const data = { name: 'test', nickname: '  Sparky  ' };
      const transformed = applySchemaTransformations(data);
      
      expect(transformed.nickname).toBe('Sparky');
    });

    it('should accept string nicknames', () => {
      const validNicknames = ['Sparky', 'Thunder', 'Bolt', ''];
      
      validNicknames.forEach(nickname => {
        const errors = validatePokemonSchema({ name: 'test', nickname });
        expect(errors).toHaveLength(0);
      });
    });
  });

  describe('Complete Pokemon Document Validation', () => {
    it('should validate complete valid pokemon documents', () => {
      const validPokemon = [
        {
          name: 'pikachu',
          powerLevel: 50,
          favorite: true,
          nickname: 'Sparky'
        },
        {
          name: 'charmander',
          powerLevel: 75,
          favorite: false
        },
        {
          name: 'squirtle'
          // powerLevel and favorite will get defaults
        }
      ];

      validPokemon.forEach(pokemon => {
        const errors = validatePokemonSchema(pokemon);
        expect(errors).toHaveLength(0);

        const transformed = applySchemaTransformations(pokemon);
        expect(transformed.powerLevel).toBeDefined();
        expect(transformed.favorite).toBeDefined();
        expect(typeof transformed.powerLevel).toBe('number');
        expect(typeof transformed.favorite).toBe('boolean');
      });
    });

    it('should catch multiple validation errors', () => {
      const invalidPokemon = {
        // name missing
        powerLevel: 150, // too high
        favorite: 'true' // wrong type
      };

      const errors = validatePokemonSchema(invalidPokemon);
      expect(errors.length).toBeGreaterThan(1);
      expect(errors).toContain('Path `name` is required');
      expect(errors).toContain('Power level must be at most 100');
      expect(errors.some(err => err.includes('Cast to Boolean failed'))).toBe(true);
    });
  });

  describe('Edge Cases and Boundary Values', () => {
    it('should handle boundary values correctly', () => {
      const boundaryTests = [
        { powerLevel: 1, shouldPass: true },    // minimum valid
        { powerLevel: 100, shouldPass: true },  // maximum valid
        { powerLevel: 0, shouldPass: false },   // just below minimum
        { powerLevel: 101, shouldPass: false } // just above maximum
      ];

      boundaryTests.forEach(({ powerLevel, shouldPass }) => {
        const errors = validatePokemonSchema({ name: 'test', powerLevel });
        if (shouldPass) {
          expect(errors).toHaveLength(0);
        } else {
          expect(errors.length).toBeGreaterThan(0);
        }
      });
    });

    it('should handle empty and whitespace strings', () => {
      const stringTests = [
        { name: '', shouldPass: false },
        { name: '   ', shouldPass: false },
        { name: 'a', shouldPass: true },
        { nickname: '', shouldPass: true },     // nickname can be empty
        { nickname: '   ', shouldPass: true }   // will be trimmed
      ];

      stringTests.forEach(test => {
        const data = { name: 'test', ...test };
        const errors = validatePokemonSchema(data);
        
        if (test.shouldPass) {
          expect(errors.filter(err => !err.includes('nickname'))).toHaveLength(0);
        }
      });
    });
  });

  describe('Schema Error Messages', () => {
    it('should provide meaningful error messages for business rules', () => {
      const testCases = [
        {
          data: { name: 'test', powerLevel: 0 },
          expectedMessage: 'Power level must be at least 1'
        },
        {
          data: { name: 'test', powerLevel: 101 },
          expectedMessage: 'Power level must be at most 100'
        },
        {
          data: { powerLevel: 50 },
          expectedMessage: 'Path `name` is required'
        }
      ];

      testCases.forEach(({ data, expectedMessage }) => {
        const errors = validatePokemonSchema(data);
        expect(errors).toContain(expectedMessage);
      });
    });
  });
});
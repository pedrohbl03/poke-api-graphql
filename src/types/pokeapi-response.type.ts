export interface IPokemon {
  name: string;
  url: string;
  height: number;
  weight: number;
  types: IPokemonType[];
}

export interface IPaginatedListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Partial<IPokemon>[];
}

export interface IPokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

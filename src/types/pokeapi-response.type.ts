export interface IPokemon {
  name: string;
  url: string;
  height: number;
  weight: number;
  types: string[];
}

export interface IPaginatedListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Partial<IPokemon>[];
}

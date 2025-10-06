import { GraphQLResolveInfo } from "graphql";
import { IPokemon } from "../types/pokeapi-response.type";
import { GraphQLContext } from "../types/graphql-context.type";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Mutation = {
  __typename?: "Mutation";
  _empty?: Maybe<Scalars["String"]["output"]>;
  createPokemonAttributes: Pokemon;
  deletePokemonAttributes?: Maybe<Scalars["Boolean"]["output"]>;
  updatePokemonAttributes?: Maybe<Pokemon>;
};

export type MutationCreatePokemonAttributesArgs = {
  input: PokemonAttributesInput;
};

export type MutationDeletePokemonAttributesArgs = {
  name: Scalars["String"]["input"];
};

export type MutationUpdatePokemonAttributesArgs = {
  input: PokemonAttributesInput;
};

export type Pokemon = {
  __typename?: "Pokemon";
  favorite?: Maybe<Scalars["Boolean"]["output"]>;
  height?: Maybe<Scalars["Int"]["output"]>;
  name: Scalars["String"]["output"];
  nickname?: Maybe<Scalars["String"]["output"]>;
  powerLevel?: Maybe<Scalars["Int"]["output"]>;
  types?: Maybe<Array<PokemonType>>;
  weight?: Maybe<Scalars["Int"]["output"]>;
};

export type PokemonAttributesInput = {
  favorite?: InputMaybe<Scalars["Boolean"]["input"]>;
  name: Scalars["String"]["input"];
  nickname?: InputMaybe<Scalars["String"]["input"]>;
  powerLevel?: InputMaybe<Scalars["Int"]["input"]>;
};

export type PokemonPagination = {
  __typename?: "PokemonPagination";
  count: Scalars["Int"]["output"];
  hasNext: Scalars["Boolean"]["output"];
  hasPrevious: Scalars["Boolean"]["output"];
  page: Scalars["Int"]["output"];
  results: Array<Pokemon>;
  totalPages: Scalars["Int"]["output"];
};

export type PokemonType = {
  __typename?: "PokemonType";
  slot?: Maybe<Scalars["Int"]["output"]>;
  type?: Maybe<PokemonTypeInfo>;
};

export type PokemonTypeInfo = {
  __typename?: "PokemonTypeInfo";
  name?: Maybe<Scalars["String"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
};

export type Query = {
  __typename?: "Query";
  _empty?: Maybe<Scalars["String"]["output"]>;
  pokemon?: Maybe<Pokemon>;
  pokemons: PokemonPagination;
};

export type QueryPokemonArgs = {
  name: Scalars["String"]["input"];
};

export type QueryPokemonsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<
  TResult,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<
  TTypes,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<
  T = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = Record<PropertyKey, never>,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Pokemon: ResolverTypeWrapper<IPokemon>;
  PokemonAttributesInput: PokemonAttributesInput;
  PokemonPagination: ResolverTypeWrapper<
    Omit<PokemonPagination, "results"> & {
      results: Array<ResolversTypes["Pokemon"]>;
    }
  >;
  PokemonType: ResolverTypeWrapper<PokemonType>;
  PokemonTypeInfo: ResolverTypeWrapper<PokemonTypeInfo>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars["Boolean"]["output"];
  Int: Scalars["Int"]["output"];
  Mutation: Record<PropertyKey, never>;
  Pokemon: IPokemon;
  PokemonAttributesInput: PokemonAttributesInput;
  PokemonPagination: Omit<PokemonPagination, "results"> & {
    results: Array<ResolversParentTypes["Pokemon"]>;
  };
  PokemonType: PokemonType;
  PokemonTypeInfo: PokemonTypeInfo;
  Query: Record<PropertyKey, never>;
  String: Scalars["String"]["output"];
}>;

export type MutationResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  createPokemonAttributes?: Resolver<
    ResolversTypes["Pokemon"],
    ParentType,
    ContextType,
    RequireFields<MutationCreatePokemonAttributesArgs, "input">
  >;
  deletePokemonAttributes?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeletePokemonAttributesArgs, "name">
  >;
  updatePokemonAttributes?: Resolver<
    Maybe<ResolversTypes["Pokemon"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePokemonAttributesArgs, "input">
  >;
}>;

export type PokemonResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["Pokemon"] = ResolversParentTypes["Pokemon"],
> = ResolversObject<{
  favorite?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  height?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  nickname?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  powerLevel?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  types?: Resolver<
    Maybe<Array<ResolversTypes["PokemonType"]>>,
    ParentType,
    ContextType
  >;
  weight?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
}>;

export type PokemonPaginationResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["PokemonPagination"] = ResolversParentTypes["PokemonPagination"],
> = ResolversObject<{
  count?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  hasNext?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  hasPrevious?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  page?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes["Pokemon"]>, ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
}>;

export type PokemonTypeResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["PokemonType"] = ResolversParentTypes["PokemonType"],
> = ResolversObject<{
  slot?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  type?: Resolver<
    Maybe<ResolversTypes["PokemonTypeInfo"]>,
    ParentType,
    ContextType
  >;
}>;

export type PokemonTypeInfoResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["PokemonTypeInfo"] = ResolversParentTypes["PokemonTypeInfo"],
> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  pokemon?: Resolver<
    Maybe<ResolversTypes["Pokemon"]>,
    ParentType,
    ContextType,
    RequireFields<QueryPokemonArgs, "name">
  >;
  pokemons?: Resolver<
    ResolversTypes["PokemonPagination"],
    ParentType,
    ContextType,
    Partial<QueryPokemonsArgs>
  >;
}>;

export type Resolvers<ContextType = GraphQLContext> = ResolversObject<{
  Mutation?: MutationResolvers<ContextType>;
  Pokemon?: PokemonResolvers<ContextType>;
  PokemonPagination?: PokemonPaginationResolvers<ContextType>;
  PokemonType?: PokemonTypeResolvers<ContextType>;
  PokemonTypeInfo?: PokemonTypeInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

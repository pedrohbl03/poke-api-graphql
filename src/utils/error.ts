import { GraphQLError } from "graphql";

export class NotFoundError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: 'NOT_FOUND',
        http: { status: 404 },
      },
    });
  }
}

export class BadRequestError extends GraphQLError {
  constructor(message: string, details?: any) {
    super(message, {
      extensions: {
        code: 'BAD_REQUEST',
        http: { status: 400 },
        details,
      },
    });
  }
}
import path from "path";
import { BadRequestError, NotFoundError } from "../utils/error";
import logger from "../utils/logger";

// Middleware to log errors and format them for GraphQL responses

export const errorPlugin = {
  async requestDidStart() {
    return {
      async didEncounterErrors(ctx: any) {
        for (const err of ctx.errors) {
          logger.error({
            locations: err.locations,
            code: err.extensions?.code,
            path: err.path,
          });

          if ((err.extensions?.code === 'INTERNAL_SERVER_ERROR' || err.extensions?.code === 'INTERNAL_ERROR')) {
            err.message = 'An unexpected error occurred.';
            err.extensions = {
              code: 'INTERNAL_SERVER_ERROR',
              http: { status: 500 },
            };
          }
        }
      }
    };
  }
};

export default errorPlugin;
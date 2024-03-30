import { GraphQLError } from 'graphql/error';

export class RefreshTokenIsInvalidException extends GraphQLError {
  constructor() {
    super('Refresh token is invalid');
  }
}

import { UnauthorizedException as BaseUnauthorizedException } from '@nestjs/common';
import { GraphQLError } from 'graphql/error';

export class UnauthorizedException extends GraphQLError {
  constructor() {
    const originalError = new BaseUnauthorizedException();
    super(originalError.message, {
      originalError,
    });
  }
}

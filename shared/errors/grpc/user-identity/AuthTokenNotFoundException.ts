import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';

export class AuthTokenNotFoundException extends GrpcNotFoundException {
  constructor() {
    super('Auth token not found');
  }
}

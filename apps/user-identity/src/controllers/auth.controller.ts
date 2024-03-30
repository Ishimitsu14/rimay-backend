import { Controller, UseInterceptors } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from '../services';
import {
  CanRefreshAuthTokenRequest,
  CreateAuthTokenRequest,
  SignInWithProviderRequest,
} from '@shared/generated/proto/user-identity';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'SignInWithProvider')
  async signInWithProvider(payload: SignInWithProviderRequest) {
    return this.authService.signInWithProvider(payload);
  }

  @GrpcMethod('AuthService', 'CreateAuthToken')
  async createAuthToken(payload: CreateAuthTokenRequest) {
    return this.authService.createAuthToken(payload);
  }

  @GrpcMethod('AuthService', 'CanRefreshAuthToken')
  async canRefreshAuthToken(payload: CanRefreshAuthTokenRequest) {
    return this.authService.refreshAuthToken(payload);
  }
}

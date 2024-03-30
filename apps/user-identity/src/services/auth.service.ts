import { Injectable } from '@nestjs/common';
import {
  AccountRepository,
  AuthTokenRepository,
  UserRepository,
} from '../repositories';
import { ProviderEnum } from '../prisma';
import {
  CanRefreshAuthTokenRequest,
  CreateAuthTokenRequest,
  providerEnumToJSON,
  SignInWithProviderRequest,
} from '@shared/generated/proto/user-identity';
import { AuthTokenNotFoundException } from '@shared/errors/grpc/user-identity/AuthTokenNotFoundException';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository,
    private readonly authTokenRepository: AuthTokenRepository,
  ) {}

  async signInWithProvider(payload: SignInWithProviderRequest) {
    const provider = providerEnumToJSON(payload.provider) as ProviderEnum;
    let user = await this.userRepository.findByEmailAndProvider(
      payload.email,
      provider,
    );

    if (!user) {
      user = await this.userRepository.create({
        username: payload.email,
        email: payload.email,
        emailVerified: true,
        password: null,
        image: payload.image,
      });

      await this.accountRepository.createAccount({
        userId: user.id,
        provider,
      });
    }

    return user;
  }

  async createAuthToken(payload: CreateAuthTokenRequest) {
    console.log(payload.id);
    await this.authTokenRepository.batchDelete({
      userId: payload.id,
    });

    return this.authTokenRepository.create({
      userId: payload.id,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      expiresAt: payload.expiresAt,
    });
  }

  async refreshAuthToken(payload: CanRefreshAuthTokenRequest) {
    const authToken = await this.authTokenRepository.findByRefreshToken(
      payload.refreshToken,
    );

    if (authToken) {
      return await this.userRepository.findById(authToken.userId);
    }

    throw new AuthTokenNotFoundException();
  }
}

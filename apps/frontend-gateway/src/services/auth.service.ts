import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { UserIdentityConfig } from '../../../user-identity/src/config';
import { ClientGrpc } from '@nestjs/microservices';
import { SignInWithGoogleRequestDto } from '../dto';
import {
  AuthServiceClientImpl,
  User,
  ProviderEnum,
} from '@shared/grpc/user-identity';
import { firstValueFrom } from 'rxjs';
import { AuthTokenModel } from '../models';
import { RefreshTokenInput } from '../resolvers';
import { JwtTokenService } from './jwt-token.service';

@Injectable()
export class AuthService implements OnModuleInit {
  private gRpcAuthService: AuthServiceClientImpl;

  constructor(
    @Inject(UserIdentityConfig.get('NAMESPACE')) private client: ClientGrpc,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  onModuleInit() {
    this.gRpcAuthService =
      this.client.getService<AuthServiceClientImpl>('AuthService');
  }

  async signInWithGoogle(payload: SignInWithGoogleRequestDto) {
    const user = await firstValueFrom(
      this.gRpcAuthService.SignInWithProvider({
        email: payload.email,
        image: payload.picture,
        provider: ProviderEnum.GOOGLE,
      }),
    );

    return await this._createAuthToken(user);
  }

  async refreshAuthToken(payload: RefreshTokenInput) {
    this.jwtTokenService.verifyToken(payload.refreshToken);

    const user = await firstValueFrom(
      this.gRpcAuthService.CanRefreshAuthToken({
        refreshToken: payload.refreshToken,
      }),
    );

    return await this._createAuthToken(user);
  }

  private async _createAuthToken(user: User) {
    const tokenData = this.jwtTokenService.createTokens({
      subject: user.id,
    });

    return new AuthTokenModel(
      await firstValueFrom(
        this.gRpcAuthService.CreateAuthToken({
          id: user.id,
          accessToken: tokenData.accessToken,
          refreshToken: tokenData.refreshToken,
          expiresAt: tokenData.expiresAt.toISOString(),
        }),
      ),
    );
  }
}

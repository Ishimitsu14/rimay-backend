import { JwtService } from '@nestjs/jwt';
import { FrontendGatewayConfig } from '../config';
import { Injectable } from '@nestjs/common';
import { JwtVerifyOptions } from '@nestjs/jwt/dist/interfaces';
import { RefreshTokenIsInvalidException } from '@shared/errors';

export interface createTokensPayload {
  subject: string | number;
}

@Injectable()
export class JwtTokenService {
  private readonly accessTokenLifetime = Number(
    FrontendGatewayConfig.get('AUTH_ACCESS_TOKEN_LIFETIME'),
  );
  private readonly refreshTokenLifetime = Number(
    FrontendGatewayConfig.get('AUTH_REFRESH_TOKEN_LIFETIME'),
  );

  constructor(private readonly jwtService: JwtService) {}

  createTokens(payload: createTokensPayload) {
    const accessToken = this.jwtService.sign({
      subject: payload.subject,
    });
    const refreshToken = this.jwtService.sign(
      { accessToken },
      {
        expiresIn: this.refreshTokenLifetime,
      },
    );
    const expiresAt = new Date(Date.now() + this.accessTokenLifetime);

    return {
      accessToken,
      refreshToken,
      expiresAt,
    };
  }

  verifyToken(token: string, options?: JwtVerifyOptions) {
    try {
      return this.jwtService.verify(token, options);
    } catch (e) {
      throw new RefreshTokenIsInvalidException();
    }
  }
}

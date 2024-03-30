import { Controller, Get, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { FrontendGatewayConfig } from '../config';
import { SignInWithGoogleRequestDto } from '../dto';
import { AuthService } from '../services';
import { AuthTokenModel } from '../models';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @UseInterceptors(GrpcToHttpInterceptor)
  async googleAuthCallback(
    @Req() req: { user: SignInWithGoogleRequestDto },
    @Res() res: Response,
  ) {
    const tokens = await this.authService.signInWithGoogle({
      email: req.user.email,
      picture: req.user.picture,
    });

    res.cookie('access_token', tokens.accessToken, {
      expires: tokens.expiresAt,
    });
    res.cookie('refresh_token', tokens.refreshToken);
    res.redirect(
      FrontendGatewayConfig.get('AUTH_GOOGLE_FRONTEND_REDIRECT_URL'),
    );
  }
}

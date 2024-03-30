import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, JwtPayload } from 'passport-jwt';
import { UserService } from '../services';
import { FrontendGatewayConfig } from '../config';
import { UnauthorizedException } from '@shared/errors';
import { UserModel } from '../models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: FrontendGatewayConfig.get('AUTH_JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findUserById(payload.subject);

    if (!user || !payload) {
      throw new UnauthorizedException();
    }

    return new UserModel(user);
  }
}

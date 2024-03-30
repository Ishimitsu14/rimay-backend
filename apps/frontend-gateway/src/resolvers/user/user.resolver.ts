import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthTokenModel, UserModel } from '../../models';
import { AuthService, UserService } from '../../services';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards';
import { CurrentUser } from '../../decorators';
import { RefreshTokenInput } from './input';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

@Resolver(() => UserModel)
@UseInterceptors(GrpcToHttpInterceptor)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => UserModel, { name: 'findMe' })
  @UseGuards(JwtAuthGuard)
  async findMe(@CurrentUser() user: UserModel) {
    return user;
  }

  @Mutation(() => AuthTokenModel)
  async refreshToken(@Args('refreshTokenInput') payload: RefreshTokenInput) {
    return await this.authService.refreshAuthToken(payload);
  }
}

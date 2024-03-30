import { Module } from '@nestjs/common';
import { AuthService, UserService } from './services';
import { PrismaAdapter } from './prisma';
import { GoogleStrategy } from '../../frontend-gateway/src/auth-strategies';
import {
  AccountRepository,
  AuthTokenRepository,
  UserRepository,
} from './repositories';
import { UserController, AuthController } from './controllers';
import { APP_FILTER } from '@nestjs/core';
import { GrpcServerExceptionFilter } from 'nestjs-grpc-exceptions';

@Module({
  imports: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GrpcServerExceptionFilter,
    },
    AuthService,
    UserService,
    AuthTokenRepository,
    AccountRepository,
    UserRepository,
    GoogleStrategy,
    PrismaAdapter,
  ],
  controllers: [AuthController, UserController],
  exports: [PrismaAdapter],
})
export class AppModule {}

import * as path from 'path';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserIdentityConfig } from '../../user-identity/src/config';
import { AuthController } from './controllers';
import { AuthService, JwtTokenService } from './services';
import { GoogleStrategy, JwtStrategy } from './auth-strategies';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserService } from './services';
import { JwtModule } from '@nestjs/jwt';
import { FrontendGatewayConfig } from './config';
import { JwtAuthGuard } from './guards';
import { UserResolver } from './resolvers';
import * as process from 'process';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: path.join(
        __dirname,
        '../../../shared/schema/frontend-gateway/schema.gql',
      ),
    }),
    ClientsModule.register([
      {
        name: UserIdentityConfig.get('NAMESPACE'),
        transport: Transport.GRPC,
        options: {
          url: `localhost:${UserIdentityConfig.get('GRPC_PORT')}`,
          package: UserIdentityConfig.get('NAMESPACE'),
          protoPath: path.join(
            __dirname,
            '../../../proto',
            UserIdentityConfig.get('GRPC_PROTO_FILE'),
          ),
        },
      },
    ]),
    JwtModule.register({
      secret: FrontendGatewayConfig.get('AUTH_JWT_SECRET'),
      signOptions: {
        expiresIn: FrontendGatewayConfig.get('AUTH_ACCESS_TOKEN_LIFETIME'),
      },
    }),
  ],
  providers: [
    JwtStrategy,
    JwtAuthGuard,
    JwtTokenService,
    UserResolver,
    GoogleStrategy,
    AuthService,
    UserService,
  ],
  controllers: [AuthController],
  exports: [JwtStrategy, JwtModule],
})
export class AppModule {}

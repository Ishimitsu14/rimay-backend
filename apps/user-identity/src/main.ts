import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserIdentityConfig } from './config';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: UserIdentityConfig.get('NAMESPACE'),
      url: `localhost:${UserIdentityConfig.get('GRPC_PORT')}`,
      protoPath: path.join(
        __dirname,
        '../../../proto',
        UserIdentityConfig.get('GRPC_PROTO_FILE'),
      ),
    },
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.init();
  await app.startAllMicroservices();
}

bootstrap();

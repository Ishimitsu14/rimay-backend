import { NestFactory } from '@nestjs/core';
import { AppModule } from './flow-runner.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import path from 'path';
import { FlowRunnerConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: FlowRunnerConfig.get('NAMESPACE'),
      url: `localhost:${FlowRunnerConfig.get('GRPC_PORT')}`,
      protoPath: path.join(
        __dirname,
        '../../../proto',
        FlowRunnerConfig.get('GRPC_PROTO_FILE'),
      ),
    },
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.init();
  await app.startAllMicroservices();
}
bootstrap();

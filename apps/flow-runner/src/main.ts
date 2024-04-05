import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import path from 'path';
import { FlowRunnerConfig } from './config';
import { ProtoSerializer } from './serialization/serializer.class';

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

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: [FlowRunnerConfig.get('NATS_SERVER')],
      name: FlowRunnerConfig.get('NATS_NAME'),
      pass: FlowRunnerConfig.get('NATS_PASS'),
      user: FlowRunnerConfig.get('NATS_USER'),
      serializer: new ProtoSerializer(),
    },
  });

  await app.init();
  await app.startAllMicroservices();
}
bootstrap();

import { Module } from '@nestjs/common';
import { FlowService } from './services/flow.service';
import { TaskService } from './services/task.service';
import { RunnerService } from './services/runner.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FlowRunnerConfig } from './config';
import { FlowRunnerController } from './controllers/flow-runner.controller';
import { ProtoSerializer } from './serialization/serializer.class';
import { PROTO_MSG_MAP } from './types/proto-message.map';
import { ProtoDeserializer } from './serialization/deserializer.class';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS', // TODO: use constant
        transport: Transport.NATS,
        options: {
          servers: [FlowRunnerConfig.get('NATS_SERVER')],
          name: FlowRunnerConfig.get('NATS_NAME'),
          pass: FlowRunnerConfig.get('NATS_PASS'),
          user: FlowRunnerConfig.get('NATS_USER'),
          serializer: new ProtoSerializer(PROTO_MSG_MAP),
          deserializer: new ProtoDeserializer(PROTO_MSG_MAP),
        },
      },
    ]),
  ],
  controllers: [FlowRunnerController],
  providers: [FlowService, TaskService, RunnerService],
})
export class AppModule {}

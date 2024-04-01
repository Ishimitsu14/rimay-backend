import { Module } from '@nestjs/common';
import { FlowService } from './services/flow.service';
import { TaskService } from './services/task.service';
import { RunnerService } from './services/runner.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FlowRunnerConfig } from './config';

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
        },
      },
    ]),
  ],
  controllers: [],
  providers: [FlowService, TaskService, RunnerService],
})
export class AppModule {}

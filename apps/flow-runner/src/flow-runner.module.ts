import { Module } from '@nestjs/common';
import { FlowRunnerController } from './flow-runner.controller';
import { FlowRunnerService } from './flow-runner.service';
import { FlowService } from './services/flow.service';
import { TaskService } from './services/task.service';

@Module({
  imports: [],
  controllers: [FlowRunnerController],
  providers: [FlowRunnerService, FlowService, TaskService],
})
export class AppModule {}

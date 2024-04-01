import { Module } from '@nestjs/common';
import { FlowService } from './services/flow.service';
import { TaskService } from './services/task.service';

@Module({
  imports: [],
  controllers: [],
  providers: [FlowService, TaskService],
})
export class AppModule {}

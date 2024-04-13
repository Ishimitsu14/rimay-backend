import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnModuleDestroy,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NewTask } from '@shared/grpc/chatgpt-adapter';
import { TaskService } from './task.service';
import { Task, TaskTypeEnum } from '../prisma';

const typeToSubject = {
  CHATGPT: 'v1.chatgpt.task.new',
  DALLE: 'v1.dalle.task.new',
  COMBINE_TEXT: 'COMBINE_TEXT',
  TEXT: 'TEXT',
  IMAGE_VIEWER: 'IMAGE_VIEWER',
  TEXT_VIEWER: 'TEXT_VIEWER',
};

@Injectable()
export class RunnerService implements OnApplicationBootstrap, OnModuleDestroy {
  private readonly logger = new Logger(RunnerService.name);

  constructor(
    @Inject('NATS') private readonly publisher: ClientProxy,
    private readonly taskService: TaskService,
  ) {}

  async onApplicationBootstrap() {
    await this.publisher.connect();
  }

  async onModuleDestroy() {
    await this.publisher.close();
  }

  async runAsync(flowId: string) {
    const tasks = await this.taskService.getCreatedTasksBy(flowId);

    for (const task of tasks) {
      await this.sendTask(task);
    }
  }

  private async sendTask(task: Task) {
    let subject = '';
    let msg = {
      id: task.id,
    };

    switch (task.type) {
      case TaskTypeEnum.CHATGPT:
        subject = 'v1.chatgpt.task.new';
        msg = Object.assign(msg, {});
        break;

      default:
        this.logger.warn(`${task.type} not implemented`);
    }

    this.publisher.emit(subject, msg);
  }
}

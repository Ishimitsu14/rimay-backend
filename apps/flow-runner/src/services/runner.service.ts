import {
  Inject,
  Injectable,
  OnApplicationBootstrap,
  OnModuleDestroy,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NewTask } from '@shared/grpc/chatgpt-adapter';

@Injectable()
export class RunnerService implements OnApplicationBootstrap, OnModuleDestroy {
  constructor(@Inject('NATS') private readonly publisher: ClientProxy) {}

  async onApplicationBootstrap() {
    await this.publisher.connect();
  }

  async onModuleDestroy() {
    await this.publisher.close();
  }

  async sendTask(newTask: NewTask) {
    this.publisher.emit('v1.chatgpt.task.new', newTask);
  }
}

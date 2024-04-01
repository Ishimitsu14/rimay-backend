import { Injectable } from '@nestjs/common';

@Injectable()
export class FlowRunnerService {
  getHello(): string {
    return 'Hello World!';
  }
}

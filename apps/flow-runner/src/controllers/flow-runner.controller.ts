import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import { NewFlow } from '@shared/grpc/flow-runner';

@Controller('flow-runner')
export class FlowRunnerController {
  constructor() {}

  @MessagePattern('v1.flowrunner.flow.new')
  async newFlow(@Payload() payload: NewFlow, @Ctx() context: NatsContext) {
    console.log('payload', payload);
  }
}

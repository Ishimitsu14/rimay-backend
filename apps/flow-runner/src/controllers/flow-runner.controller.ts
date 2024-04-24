import { Controller } from '@nestjs/common';
import {
  Ctx,
  GrpcMethod,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import {
  GetFLowResultsRequest,
  GetFlowResultsResponse,
  NewFlow,
} from '@shared/grpc/flow-runner';
import { FlowService } from '../services/flow.service';

@Controller('flow-runner')
export class FlowRunnerController {
  constructor(private readonly flowService: FlowService) {}

  @MessagePattern('v1.flowrunner.flow.new')
  async newFlow(
    @Payload() payload: NewFlow,
    @Ctx() context: NatsContext,
  ): Promise<void> {
    await this.flowService.run(payload.flow);
    console.log('payload', payload);
  }

  @GrpcMethod('FlowRunner', 'GetFlowResults')
  async getFlowResults(
    payload: GetFLowResultsRequest,
  ): Promise<GetFlowResultsResponse> {
    return {
      results: {},
    };
  }
}

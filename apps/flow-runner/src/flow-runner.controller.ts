import { Controller, Get } from '@nestjs/common';
import { FlowRunnerService } from './flow-runner.service';

@Controller()
export class FlowRunnerController {
  constructor(private readonly flowRunnerService: FlowRunnerService) {}

  @Get()
  getHello(): string {
    return this.flowRunnerService.getHello();
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { FlowRunnerController } from './flow-runner.controller';

describe('FlowRunnerController', () => {
  let controller: FlowRunnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlowRunnerController],
    }).compile();

    controller = module.get<FlowRunnerController>(FlowRunnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

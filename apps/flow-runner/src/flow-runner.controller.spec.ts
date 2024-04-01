import { Test, TestingModule } from '@nestjs/testing';
import { FlowRunnerController } from './flow-runner.controller';
import { FlowRunnerService } from './flow-runner.service';

describe('FlowRunnerController', () => {
  let flowRunnerController: FlowRunnerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FlowRunnerController],
      providers: [FlowRunnerService],
    }).compile();

    flowRunnerController = app.get<FlowRunnerController>(FlowRunnerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(flowRunnerController.getHello()).toBe('Hello World!');
    });
  });
});

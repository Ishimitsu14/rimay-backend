import { Test, TestingModule } from '@nestjs/testing';
import { FlowService } from './flow.service';

describe('FlowService', () => {
  let service: FlowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlowService],
    }).compile();

    service = module.get<FlowService>(FlowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should run flow', async () => {
    const flowMock = require('../testutils/mock-data/flow1.json');
    let ids = service.run(flowMock);

    for (let i = 0; i < ids.length; i++) {
      service.fill(ids[i], `result ${i}`);
    }

    const result = service.collectResults();
    console.log(result);
  });
});

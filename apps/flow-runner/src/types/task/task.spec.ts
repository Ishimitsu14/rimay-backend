import { v4 } from 'uuid';
import { ChatGPTTask } from './task';
import { TypeEnum } from '../../prisma';

describe('Task', () => {
  it('should be defined', () => {
    expect(
      new ChatGPTTask({
        id: v4(),
        flowId: v4(),
        type: TypeEnum.CHATGPT,
        data: null,
        result: null,
        inputs: [v4()],
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ).toBeDefined();
  });
});

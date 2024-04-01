import { Injectable } from '@nestjs/common';
import { NodeBase, getIncomers } from '@xyflow/system';
import { ReactFlowJsonObject, Node } from '../types/reactflow.types';
import { TaskService } from './task.service';
import { FlowRepository } from '../repositories';

export type RunDTO = {
  id: string;
  userId: number;
  flow: ReactFlowJsonObject;
};

@Injectable()
export class FlowService {
  constructor(
    private readonly taskService: TaskService,
    private readonly flowRepository: FlowRepository,
  ) {}

  async run(dto: RunDTO) {
    const {
      id,
      userId,
      flow: { nodes, edges },
    } = dto;

    const flow = await this.flowRepository.create({
      id,
      userId,
    });

    // TODO: replace with batch
    let tasks = new Map();
    for (const node of nodes) {
      const task = await this.taskService.createTask(id, node);
      tasks.set(node.id, task);
    }

    for (const [id] of tasks) {
      const incomers = getIncomers({ id }, nodes as NodeBase[], edges).map(
        (v) => v.id,
      );
      await this.taskService.link(id, incomers);
    }
    return Array.from(tasks.keys());
  }

  async collectResults(flowId: string) {
    const flow = await this.flowRepository.findById(flowId);

    const results = new Map<string, string>();
    for (const task of flow.tasks) {
      if (!task.result) {
        return new Map();
      }
      results.set(task.id, task.result);
    }
    return results;
  }
}

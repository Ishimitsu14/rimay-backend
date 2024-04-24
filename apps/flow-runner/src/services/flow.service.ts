import { Injectable } from '@nestjs/common';
import { NodeBase, getIncomers } from '@xyflow/system';
import { ReactFlowJsonObject } from '../types/reactflow.types';
import { TaskService } from './task.service';
import { FlowRepository } from '../repositories';
import { Flow, Node } from '@shared/grpc/flow-runner';
import { RunnerService } from './runner.service';

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
    private readonly runnerService: RunnerService,
  ) {}

  async get(id: string) {
    return this.flowRepository.findById(id);
  }

  async run({ id, userId, nodes, edges }: Flow) {
    const flow = await this.flowRepository.create({
      id,
      userId,
    });

    // TODO: add transaction
    // TODO: replace with batch method
    let tasks = new Map();
    for (const node of nodes) {
      const task = await this.taskService.createTask(id, node);
      tasks.set(node.id, task);
    }

    for (const [id] of tasks) {
      const incomers = getIncomers(
        { id },
        nodes.map(nodeToNodebase),
        edges,
      ).map((v) => v.id);
      await this.taskService.link(id, incomers);
    }

    await this.runnerService.runAsync(id);

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

function nodeToNodebase(node: Node): NodeBase {
  return {
    id: node.id,
    position: { x: 0, y: 0 },
    data: node.data,
  };
}

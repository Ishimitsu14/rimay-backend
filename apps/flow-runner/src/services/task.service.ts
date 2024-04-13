import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../repositories';
import { TaskTypeEnum, TaskStatusEnum } from '../prisma/client';
import { Task as TaskObject } from '../types/task/task';
import { Node, nodeTypeToJSON } from '@shared/grpc/flow-runner';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  getTask(id: string) {
    return this.taskRepository.findById(id);
  }

  getCreatedTasksBy(flowId: string) {
    return this.taskRepository.findByFlow(flowId, TaskStatusEnum.CREATED);
  }

  async createTask(flowId: string, node: Node) {
    const existing = await this.taskRepository.findById(node.id);
    if (existing) {
      throw Error('already exits');
    }

    const task = await this.taskRepository.create({
      id: node.id,
      type: TaskTypeEnum[nodeTypeToJSON(node.type)],
      status: TaskStatusEnum.CREATED,
      data: node.data,
      flow: {
        connect: {
          id: flowId,
        },
      },
    });

    return TaskObject.from(task);
  }

  async link(id: string, inputs: string[]) {
    await this.taskRepository.setInputs(id, inputs);
  }
}

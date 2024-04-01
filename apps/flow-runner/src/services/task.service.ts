import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../repositories';
import { Node } from '../types/reactflow.types';
import { TypeEnum, Task as TaskModel } from '../prisma/client';
import { TASK_MAP } from '../types/task/task';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  getTask(id: string) {
    return this.taskRepository.findById(id);
  }

  async createTask(flowId: string, node: Node) {
    const existing = await this.taskRepository.findById(node.id);
    if (existing) {
      throw Error('already exits');
    }
    // wrap to class first, then create
    const task = await this.taskRepository.create({
      id: node.id,
      type: TypeEnum[node.type.toUpperCase()],
      data: node.data,
      flow: {
        connect: {
          id: flowId,
        },
      },
    });

    return this.wrap(task);
  }

  async link(id: string, inputs: string[]) {
    await this.taskRepository.setInputs(id, inputs);
  }

  private wrap(model: TaskModel) {
    return new TASK_MAP[model.type](model);
  }
}

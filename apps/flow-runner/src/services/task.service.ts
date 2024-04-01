import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../repositories';
import { Node } from '../types/reactflow.types';
import { TypeEnum, Task as TaskModel } from '../prisma/client';

abstract class Task {
  protected _result?: string;
  private data: any;
  private _inputs: string[];

  constructor(model: TaskModel) {
    this.data = model.data;
  }

  get inputs() {
    return this._inputs;
  }

  set inputs(val: string[]) {
    // TODO: validation?
    this._inputs = val;
  }

  get result() {
    return this._result;
  }

  set result(val: string) {
    this._result = val;
  }

  hasResult(): boolean {
    return !!this._result;
  }

  toString() {
    return JSON.stringify({
      result: this._result,
      inputs: this._inputs,
      //   data: this.data,
    });
  }
}

class ChatGPTTask extends Task {}

class ImageViewerTask extends Task {}

class DalleTask extends Task {}

class CombineTextTask extends Task {}

class TextViewerTask extends Task {}

class NotExecutableTask extends Task {
  constructor(model: TaskModel) {
    super(model);
    if (!model.data || !model.data['text']) {
      throw Error('data and text cannot be null');
    }
    this._result = model.data['text'];
  }

  set result(val: string) {}

  get result() {
    return super.result;
  }
}

export const TASK_MAP = {
  ChatGPT: ChatGPTTask,
  Text: NotExecutableTask,
  ImageViewer: ImageViewerTask,
  Dalle: DalleTask,
  CombineText: CombineTextTask,
  TextViewer: TextViewerTask,
};

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

import { TypeEnum, Task as TaskModel } from '../../prisma/client';

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

export class ChatGPTTask extends Task {}

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

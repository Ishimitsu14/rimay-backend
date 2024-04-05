import { NewTask } from '@shared/grpc/chatgpt-adapter';
import { NewFlow } from '@shared/grpc/flow-runner';

export interface ProtoMessage<T> {
  encode(message: NewTask): any;
  decode(input: Uint8Array): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
}

export type ProtoMapping<T = any> = {
  [K: string]: ProtoMessage<T>;
};

export const PROTO_MSG_MAP: ProtoMapping = {
  'v1.chatgpt.task.new': NewTask,
  'v1.flowrunner.flow.new': NewFlow,
};

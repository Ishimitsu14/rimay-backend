/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "CHATGPT_ADAPTER";

/** v1.chatgpt.task.new */
export interface NewTask {
  /** UUID */
  id: string;
  prompt: string;
  model: string;
  /** float */
  temperature: string;
}

function createBaseNewTask(): NewTask {
  return { id: "", prompt: "", model: "", temperature: "" };
}

export const NewTask = {
  encode(message: NewTask, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.prompt !== "") {
      writer.uint32(18).string(message.prompt);
    }
    if (message.model !== "") {
      writer.uint32(26).string(message.model);
    }
    if (message.temperature !== "") {
      writer.uint32(34).string(message.temperature);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NewTask {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNewTask();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.prompt = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.model = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.temperature = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NewTask {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      prompt: isSet(object.prompt) ? globalThis.String(object.prompt) : "",
      model: isSet(object.model) ? globalThis.String(object.model) : "",
      temperature: isSet(object.temperature) ? globalThis.String(object.temperature) : "",
    };
  },

  toJSON(message: NewTask): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.prompt !== "") {
      obj.prompt = message.prompt;
    }
    if (message.model !== "") {
      obj.model = message.model;
    }
    if (message.temperature !== "") {
      obj.temperature = message.temperature;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NewTask>, I>>(base?: I): NewTask {
    return NewTask.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NewTask>, I>>(object: I): NewTask {
    const message = createBaseNewTask();
    message.id = object.id ?? "";
    message.prompt = object.prompt ?? "";
    message.model = object.model ?? "";
    message.temperature = object.temperature ?? "";
    return message;
  },
};

export interface ChatGptAdaper {
}

export const ChatGptAdaperServiceName = "CHATGPT_ADAPTER.ChatGptAdaper";
export class ChatGptAdaperClientImpl implements ChatGptAdaper {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || ChatGptAdaperServiceName;
    this.rpc = rpc;
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

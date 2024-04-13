/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import Long = require("long");

export const protobufPackage = "FLOW_RUNNER";

export enum NodeType {
  UNKNOWN = 0,
  TEXT = 1,
  IMAGE_VIEWER = 2,
  DALLE = 3,
  COMBINE_TEXT = 4,
  CHATGPT = 5,
  TEXT_VIEWER = 6,
  UNRECOGNIZED = -1,
}

export function nodeTypeFromJSON(object: any): NodeType {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return NodeType.UNKNOWN;
    case 1:
    case "TEXT":
      return NodeType.TEXT;
    case 2:
    case "IMAGE_VIEWER":
      return NodeType.IMAGE_VIEWER;
    case 3:
    case "DALLE":
      return NodeType.DALLE;
    case 4:
    case "COMBINE_TEXT":
      return NodeType.COMBINE_TEXT;
    case 5:
    case "CHATGPT":
      return NodeType.CHATGPT;
    case 6:
    case "TEXT_VIEWER":
      return NodeType.TEXT_VIEWER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return NodeType.UNRECOGNIZED;
  }
}

export function nodeTypeToJSON(object: NodeType): string {
  switch (object) {
    case NodeType.UNKNOWN:
      return "UNKNOWN";
    case NodeType.TEXT:
      return "TEXT";
    case NodeType.IMAGE_VIEWER:
      return "IMAGE_VIEWER";
    case NodeType.DALLE:
      return "DALLE";
    case NodeType.COMBINE_TEXT:
      return "COMBINE_TEXT";
    case NodeType.CHATGPT:
      return "CHATGPT";
    case NodeType.TEXT_VIEWER:
      return "TEXT_VIEWER";
    case NodeType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Node {
  /** UUID */
  id: string;
  type: NodeType;
  data: { [key: string]: string };
}

export interface Node_DataEntry {
  key: string;
  value: string;
}

export interface Edge {
  id: string;
  /** UUID */
  source: string;
  /** UUID */
  target: string;
  targetHandle: string;
}

export interface Flow {
  /** UUID */
  id: string;
  userId: number;
  nodes: Node[];
  edges: Edge[];
}

export interface GetFLowResultsRequest {
  /** UUID */
  id: string;
}

export interface GetFlowResultsResponse {
  /** UUID => string */
  results: { [key: string]: string };
}

export interface GetFlowResultsResponse_ResultsEntry {
  key: string;
  value: string;
}

/** v1.flowrunner.flow.new */
export interface NewFlow {
  flow: Flow | undefined;
}

function createBaseNode(): Node {
  return { id: "", type: 0, data: {} };
}

export const Node = {
  encode(message: Node, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    Object.entries(message.data).forEach(([key, value]) => {
      Node_DataEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Node {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNode();
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
          if (tag !== 16) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = Node_DataEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.data[entry3.key] = entry3.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Node {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      type: isSet(object.type) ? nodeTypeFromJSON(object.type) : 0,
      data: isObject(object.data)
        ? Object.entries(object.data).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: Node): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.type !== 0) {
      obj.type = nodeTypeToJSON(message.type);
    }
    if (message.data) {
      const entries = Object.entries(message.data);
      if (entries.length > 0) {
        obj.data = {};
        entries.forEach(([k, v]) => {
          obj.data[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Node>, I>>(base?: I): Node {
    return Node.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Node>, I>>(object: I): Node {
    const message = createBaseNode();
    message.id = object.id ?? "";
    message.type = object.type ?? 0;
    message.data = Object.entries(object.data ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseNode_DataEntry(): Node_DataEntry {
  return { key: "", value: "" };
}

export const Node_DataEntry = {
  encode(message: Node_DataEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Node_DataEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNode_DataEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Node_DataEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: Node_DataEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Node_DataEntry>, I>>(base?: I): Node_DataEntry {
    return Node_DataEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Node_DataEntry>, I>>(object: I): Node_DataEntry {
    const message = createBaseNode_DataEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseEdge(): Edge {
  return { id: "", source: "", target: "", targetHandle: "" };
}

export const Edge = {
  encode(message: Edge, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.source !== "") {
      writer.uint32(18).string(message.source);
    }
    if (message.target !== "") {
      writer.uint32(26).string(message.target);
    }
    if (message.targetHandle !== "") {
      writer.uint32(34).string(message.targetHandle);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Edge {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEdge();
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

          message.source = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.target = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.targetHandle = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Edge {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      source: isSet(object.source) ? globalThis.String(object.source) : "",
      target: isSet(object.target) ? globalThis.String(object.target) : "",
      targetHandle: isSet(object.targetHandle) ? globalThis.String(object.targetHandle) : "",
    };
  },

  toJSON(message: Edge): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.source !== "") {
      obj.source = message.source;
    }
    if (message.target !== "") {
      obj.target = message.target;
    }
    if (message.targetHandle !== "") {
      obj.targetHandle = message.targetHandle;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Edge>, I>>(base?: I): Edge {
    return Edge.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Edge>, I>>(object: I): Edge {
    const message = createBaseEdge();
    message.id = object.id ?? "";
    message.source = object.source ?? "";
    message.target = object.target ?? "";
    message.targetHandle = object.targetHandle ?? "";
    return message;
  },
};

function createBaseFlow(): Flow {
  return { id: "", userId: 0, nodes: [], edges: [] };
}

export const Flow = {
  encode(message: Flow, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.userId !== 0) {
      writer.uint32(16).uint64(message.userId);
    }
    for (const v of message.nodes) {
      Node.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.edges) {
      Edge.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Flow {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFlow();
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
          if (tag !== 16) {
            break;
          }

          message.userId = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.nodes.push(Node.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.edges.push(Edge.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Flow {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : 0,
      nodes: globalThis.Array.isArray(object?.nodes) ? object.nodes.map((e: any) => Node.fromJSON(e)) : [],
      edges: globalThis.Array.isArray(object?.edges) ? object.edges.map((e: any) => Edge.fromJSON(e)) : [],
    };
  },

  toJSON(message: Flow): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.nodes?.length) {
      obj.nodes = message.nodes.map((e) => Node.toJSON(e));
    }
    if (message.edges?.length) {
      obj.edges = message.edges.map((e) => Edge.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Flow>, I>>(base?: I): Flow {
    return Flow.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Flow>, I>>(object: I): Flow {
    const message = createBaseFlow();
    message.id = object.id ?? "";
    message.userId = object.userId ?? 0;
    message.nodes = object.nodes?.map((e) => Node.fromPartial(e)) || [];
    message.edges = object.edges?.map((e) => Edge.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetFLowResultsRequest(): GetFLowResultsRequest {
  return { id: "" };
}

export const GetFLowResultsRequest = {
  encode(message: GetFLowResultsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFLowResultsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFLowResultsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetFLowResultsRequest {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: GetFLowResultsRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetFLowResultsRequest>, I>>(base?: I): GetFLowResultsRequest {
    return GetFLowResultsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetFLowResultsRequest>, I>>(object: I): GetFLowResultsRequest {
    const message = createBaseGetFLowResultsRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetFlowResultsResponse(): GetFlowResultsResponse {
  return { results: {} };
}

export const GetFlowResultsResponse = {
  encode(message: GetFlowResultsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.results).forEach(([key, value]) => {
      GetFlowResultsResponse_ResultsEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFlowResultsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFlowResultsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = GetFlowResultsResponse_ResultsEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.results[entry1.key] = entry1.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetFlowResultsResponse {
    return {
      results: isObject(object.results)
        ? Object.entries(object.results).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: GetFlowResultsResponse): unknown {
    const obj: any = {};
    if (message.results) {
      const entries = Object.entries(message.results);
      if (entries.length > 0) {
        obj.results = {};
        entries.forEach(([k, v]) => {
          obj.results[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetFlowResultsResponse>, I>>(base?: I): GetFlowResultsResponse {
    return GetFlowResultsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetFlowResultsResponse>, I>>(object: I): GetFlowResultsResponse {
    const message = createBaseGetFlowResultsResponse();
    message.results = Object.entries(object.results ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseGetFlowResultsResponse_ResultsEntry(): GetFlowResultsResponse_ResultsEntry {
  return { key: "", value: "" };
}

export const GetFlowResultsResponse_ResultsEntry = {
  encode(message: GetFlowResultsResponse_ResultsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFlowResultsResponse_ResultsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFlowResultsResponse_ResultsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetFlowResultsResponse_ResultsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: GetFlowResultsResponse_ResultsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetFlowResultsResponse_ResultsEntry>, I>>(
    base?: I,
  ): GetFlowResultsResponse_ResultsEntry {
    return GetFlowResultsResponse_ResultsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetFlowResultsResponse_ResultsEntry>, I>>(
    object: I,
  ): GetFlowResultsResponse_ResultsEntry {
    const message = createBaseGetFlowResultsResponse_ResultsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseNewFlow(): NewFlow {
  return { flow: undefined };
}

export const NewFlow = {
  encode(message: NewFlow, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.flow !== undefined) {
      Flow.encode(message.flow, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NewFlow {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNewFlow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.flow = Flow.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NewFlow {
    return { flow: isSet(object.flow) ? Flow.fromJSON(object.flow) : undefined };
  },

  toJSON(message: NewFlow): unknown {
    const obj: any = {};
    if (message.flow !== undefined) {
      obj.flow = Flow.toJSON(message.flow);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NewFlow>, I>>(base?: I): NewFlow {
    return NewFlow.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NewFlow>, I>>(object: I): NewFlow {
    const message = createBaseNewFlow();
    message.flow = (object.flow !== undefined && object.flow !== null) ? Flow.fromPartial(object.flow) : undefined;
    return message;
  },
};

export interface FlowRunner {
  GetFlowResults(request: GetFLowResultsRequest): Promise<GetFlowResultsResponse>;
}

export const FlowRunnerServiceName = "FLOW_RUNNER.FlowRunner";
export class FlowRunnerClientImpl implements FlowRunner {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || FlowRunnerServiceName;
    this.rpc = rpc;
    this.GetFlowResults = this.GetFlowResults.bind(this);
  }
  GetFlowResults(request: GetFLowResultsRequest): Promise<GetFlowResultsResponse> {
    const data = GetFLowResultsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetFlowResults", data);
    return promise.then((data) => GetFlowResultsResponse.decode(_m0.Reader.create(data)));
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

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

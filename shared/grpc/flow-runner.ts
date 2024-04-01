/* eslint-disable */

export const protobufPackage = "FLOW_RUNNER";

export interface FlowRunner {
}

export const FlowRunnerServiceName = "FLOW_RUNNER.FlowRunner";
export class FlowRunnerClientImpl implements FlowRunner {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || FlowRunnerServiceName;
    this.rpc = rpc;
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

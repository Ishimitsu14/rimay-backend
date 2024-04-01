import { ConfigService } from '@shared/config';

export interface FlowRunnerConfig {
  NAMESPACE: string;

  GRPC_PORT: string;
  GRPC_PROTO_FILE: string;

  DATABASE_URL: string;

  NATS_SERVER: string;
  NATS_NAME: string;
  NATS_PASS: string;
  NATS_USER: string;
}

export const FlowRunnerConfig = new ConfigService<FlowRunnerConfig>(
  'FLOW_RUNNER',
);

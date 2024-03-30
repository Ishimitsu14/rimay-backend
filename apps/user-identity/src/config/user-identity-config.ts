import { ConfigService } from '@shared/config';

export interface UserIdentityConfig {
  NAMESPACE: string;
  GRPC_PORT: string;
  GRPC_PROTO_FILE: string;

  DATABASE_URL: string;
}

export const UserIdentityConfig = new ConfigService<UserIdentityConfig>(
  'USER_IDENTITY',
);

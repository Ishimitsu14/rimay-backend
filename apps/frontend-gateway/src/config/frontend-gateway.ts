import { ConfigService } from '@shared/config';

export interface FrontendGatewayConfig {
  HTTP_PORT: string;

  AUTH_JWT_SECRET: string;
  AUTH_ACCESS_TOKEN_LIFETIME: string;
  AUTH_REFRESH_TOKEN_LIFETIME: string;

  AUTH_GOOGLE_ID: string;
  AUTH_GOOGLE_SECRET: string;
  AUTH_GOOGLE_CALLBACK_URL: string;
  AUTH_GOOGLE_FRONTEND_REDIRECT_URL: string;

  AUTH_GITHUB_ID: string;
  AUTH_GITHUB_SECRET: string;
}

export const FrontendGatewayConfig = new ConfigService<FrontendGatewayConfig>(
  'FRONTEND_GATEWAY',
);

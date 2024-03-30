import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FrontendGatewayConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(FrontendGatewayConfig.get('HTTP_PORT'));
}
bootstrap();

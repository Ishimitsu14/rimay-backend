import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FrontendGatewayConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
    maxAge: 600,
    origin: ['http://localhost:3000'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Добавляем допустимые заголовки
  });
  await app.listen(FrontendGatewayConfig.get('HTTP_PORT'));
}
bootstrap();

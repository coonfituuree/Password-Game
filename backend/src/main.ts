import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Для фронта (например Next.js) разрешим CORS
  app.enableCors({
    origin: '*', // лучше потом заменить на свой домен
    credentials: true,
  });

  await app.listen(4000);
}
bootstrap();

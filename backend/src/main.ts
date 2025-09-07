import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Для фронта (например Next.js) разрешим CORS
  app.enableCors({
    origin: 'https://courageous-renewal-production-a54c.up.railway.app/', // лучше потом заменить на свой домен
    credentials: true,
  });

  await app.listen(4000);
}
bootstrap().catch((err) => {
  console.error('Bootstrap failed:', err);
  process.exit(1);
});

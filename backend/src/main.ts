import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Для фронта (например Next.js) разрешим CORS
  app.enableCors({
    origin: 'https://password-game-navy.vercel.app/', // лучше потом заменить на свой домен
    credentials: true,
  });

  await app.listen(4000);
}
bootstrap().catch((err) => {
  console.error('Bootstrap failed:', err);
  process.exit(1);
});

import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule } from '@nestjs/config';

import { TelegramController } from './telegram/telegram.controller';
import { TelegramAuthService } from './telegram/telegram-auth.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { AppUpdate } from './app.update'; // твой класс с @Start()

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN!, // токен из .env
    }),
    AuthModule,
  ],
  controllers: [TelegramController],
  providers: [TelegramAuthService, PrismaService, AppUpdate],
})
export class AppModule {}

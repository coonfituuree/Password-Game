import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TelegramUserData, JwtPayload } from '../types/auth';
import { User } from '@prisma/client';

@Injectable()
export class TelegramAuthService {
  private botToken = process.env.TELEGRAM_BOT_TOKEN || '';

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  validate(initData: string): { ok: boolean; user?: TelegramUserData } {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    urlParams.delete('hash');

    const dataCheckString = [...urlParams.entries()]
      .map(([key, value]) => `${key}=${value}`)
      .sort()
      .join('\n');

    const secretKey = crypto
      .createHash('sha256')
      .update(this.botToken)
      .digest();

    const hmac = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    if (hmac !== hash) {
      return { ok: false };
    }

    const user = JSON.parse(urlParams.get('user') || '{}') as TelegramUserData;
    return { ok: true, user };
  }

  async findOrCreateUser(userData: TelegramUserData): Promise<User> {
    let user = await this.prisma.user.findUnique({
      where: { telegramId: userData.id },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          telegramId: userData.id,
          username: userData.username,
          photoUrl: userData.photo_url,
          pts: userData.pts,
          rating: userData.rating,
        },
      });
    }

    return user;
  }

  generateToken(user: User): string {
    const payload: JwtPayload = {
      sub: user.id,
      telegramId: user.telegramId,
    };
    return this.jwtService.sign(payload);
  }
}

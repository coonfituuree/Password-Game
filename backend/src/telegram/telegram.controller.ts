import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { TelegramAuthService } from './telegram-auth.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly authService: TelegramAuthService) {}

  @Post('login')
  async login(@Body() body: { initData: string }) {
    const result = this.authService.validate(body.initData);
    if (!result.ok) {
      throw new UnauthorizedException('Invalid Telegram auth data');
    }

    const user = await this.authService.findOrCreateUser(result.user);
    const token = this.authService.generateToken(user);

    return {
      success: true,
      token,
      user,
    };
  }
}

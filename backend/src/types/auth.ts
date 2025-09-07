export interface TelegramUserData {
  id: number;
  username?: string;
  photo_url?: string;
  pts?: string;
  rating?: string;
}

export interface JwtPayload {
  sub: number;
  telegramId: number;
}

import { Update, Start, Help, Ctx, Command } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class AppUpdate {
  @Start()
  async startCommand(@Ctx() ctx: Context) {
    await ctx.reply(
      'Привет! 👋 Жми кнопку ниже, чтобы запустить игру',
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: '▶ Играть',
                web_app: { url: 'https://weak-teams-design.loca.lt' }, // тут ссылка на твой фронтенд
              },
            ],
          ],
          resize_keyboard: true,
        },
      },
    );
  }

  @Help()
  async helpCommand(@Ctx() ctx: Context) {
    await ctx.reply('Напиши /start чтобы получить кнопку запуска игры');
  }

  @Command('ping')
  async pingCommand(@Ctx() ctx: Context) {
    await ctx.reply('pong 🏓');
  }
}

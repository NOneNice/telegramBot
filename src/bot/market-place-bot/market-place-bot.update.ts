import { MarketPlaceBotService } from './market-place-bot.service';
import { Telegraf, Context } from 'telegraf';
import { actionButtons } from './button/button';
import { Hears, InjectBot, Start, Update } from 'nestjs-telegraf';

@Update()
export class MarketPlaceBotUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly marketPlaceBotService: MarketPlaceBotService,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Начало!');
    await ctx.reply('Что будешь?', actionButtons());
  }

  @Hears('Список дел')
  async getAll() {
    return 'авф-авф 🐕';
  }
}

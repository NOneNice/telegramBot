import {MarketPlaceBotService} from './market-place-bot.service';
import {InjectBot, Start, Update} from "nestjs-telegraf";
import {Telegraf, Context} from 'telegraf'


@Update()
export class MarketPlaceBotUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>,  private readonly marketPlaceBotService: MarketPlaceBotService) {}


  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Начало!')
  }





}

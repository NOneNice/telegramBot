import {Module} from '@nestjs/common';
import {MarketPlaceBotModule} from "./bot/market-place-bot/market-place-bot.module";
import {TelegrafModule} from "nestjs-telegraf";

@Module({
  imports: [
      TelegrafModule.forRoot({
            token: '6038118292:AAFk1IIy9-CfJHNjZRQaDnyGBsEgxH6hcU4',
      }),
      MarketPlaceBotModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

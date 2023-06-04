import {Module} from '@nestjs/common';
import {MarketPlaceBotService} from './market-place-bot.service';
import {MarketPlaceBotUpdate} from './market-place-bot.update';

@Module({
  controllers: [],
  providers: [MarketPlaceBotService, MarketPlaceBotUpdate]
})
export class MarketPlaceBotModule {}

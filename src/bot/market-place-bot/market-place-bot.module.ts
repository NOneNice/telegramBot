import {Module} from '@nestjs/common';
import {MarketPlaceBotService} from './market-place-bot.service';
import {MarketPlaceBotUpdate} from './market-place-bot.update';
import {SequelizeModule} from "@nestjs/sequelize";
import {Product} from "./market-place-bot.model";

@Module({

  imports: [SequelizeModule.forFeature([Product])],
  controllers: [],
  providers: [MarketPlaceBotService, MarketPlaceBotUpdate]
})
export class MarketPlaceBotModule {}

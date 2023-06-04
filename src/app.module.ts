import {Module} from '@nestjs/common';
import {MarketPlaceBotModule} from "./bot/market-place-bot/market-place-bot.module";
import {TelegrafModule} from "nestjs-telegraf";
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
  imports: [
      SequelizeModule.forRoot({
          dialect: "postgres",
          host: 'localhost',
          port: Number(5432),
          username: 'postgres',
          password: 'admin',
          database: "marketPlaceBot",
          autoLoadModels: true,
          synchronize: true,
      }),
      TelegrafModule.forRoot({
            token: '6038118292:AAFk1IIy9-CfJHNjZRQaDnyGBsEgxH6hcU4',
      }),
      MarketPlaceBotModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

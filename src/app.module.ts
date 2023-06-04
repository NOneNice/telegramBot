import { Module } from '@nestjs/common';
import { TelegramModule } from './bot/market-place-bot/telegram.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { sessionMiddleware } from './middlewares/session.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadModels: true,
      synchronize: true,
    }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        token: process.env.TG_TOKEN,
        middlewares: [sessionMiddleware],
      }),
    }),
    TelegramModule,
  ],
})
export class AppModule {}

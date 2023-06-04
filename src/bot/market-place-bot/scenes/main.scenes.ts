import {
  ADMINISTRATION_START_SCENE,
  MAIN_SCENE,
} from '../constats/scens.const';
import { ContextType } from '../../types/context.type';
import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import {
  ADMINISTRATION,
  RELOAD,
  SELECT_AN_ACTION,
} from '../constats/message.const';
import { getMessageText } from '../../utilites/getMessage';
import { UserService } from '../user/user.service';

@Scene(MAIN_SCENE)
export class MainScene {
  constructor(private readonly userService: UserService) {}

  @SceneEnter()
  async sceneEnter(@Ctx() ctx: ContextType) {
    const user = ctx.session['user'];
    await ctx.reply('Добро пожаловать!');
    if (user.role === 'user') {
      await ctx.reply(SELECT_AN_ACTION, {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [[{ text: RELOAD }]],
        },
      });
    } else if (user.role === 'admin') {
      await ctx.reply(SELECT_AN_ACTION, {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [[{ text: RELOAD }], [{ text: ADMINISTRATION }]],
        },
      });
    }
  }
  @On('text')
  async onText(@Ctx() ctx: ContextType) {
    const text = getMessageText(ctx);
    switch (text) {
      case RELOAD:
        ctx.session['user'] = await this.userService.findOneByTelegramId(
          ctx.session['user'].telegramId,
        );
        await ctx.scene.reenter();
        break;
      case ADMINISTRATION:
        const user = ctx.session['user'];
        if (user.role === 'admin') {
          await ctx.scene.enter(ADMINISTRATION_START_SCENE);
        } else {
          await ctx.reply('У Вас недостаточно прав для администрирования');
        }
        break;
      default:
        await ctx.reply(SELECT_AN_ACTION);
        break;
    }
  }
}

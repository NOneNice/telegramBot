import { MAIN_SCENE } from '../constats/scens.const';
import { UserService } from '../user/user.service';
import { ContextType } from '../../types/context.type';
import { Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { getUserId } from '../../utilites/get-user-id';
import {
  ADMINISTRATION,
  BOOK_A_ROOM,
  RELOAD,
  SELECT_AN_ACTION,
  VIEW_BOOKED,
} from '../constats/message.const';

@Scene(MAIN_SCENE)
export class MainScene {
  constructor(private userService: UserService) {}

  @SceneEnter()
  async sceneEnter(@Ctx() ctx: ContextType) {
    const user = await this.userService.findOneByTelegramId(getUserId(ctx));
    if (user.role === 'user') {
      await ctx.reply(SELECT_AN_ACTION, {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [
            [{ text: BOOK_A_ROOM }],
            [{ text: VIEW_BOOKED }],
            [{ text: RELOAD }],
          ],
        },
      });
    } else if (user.role === 'admin') {
      await ctx.reply(SELECT_AN_ACTION, {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [
            [{ text: BOOK_A_ROOM }],
            [{ text: VIEW_BOOKED }],
            [{ text: RELOAD }],
            [{ text: ADMINISTRATION }],
          ],
        },
      });
    }
  }
}

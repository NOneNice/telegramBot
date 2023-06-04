import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import {
  EDIT_ADMINISTRATORS_SCENE,
  REMOVE_ADMINISTRATOR_SCENE,
} from '../../../constats/scens.const';
import { UserService } from '../../../user/user.service';
import { ContextType } from '../../../../types/context.type';
import {
  BACK_TO_PREVIOUS_MENU,
  TYPE_AN_ADMIN_NUMBER,
} from '../../../constats/message.const';
import { getMessageText } from '../../../../utilites/getMessage';

@Scene(REMOVE_ADMINISTRATOR_SCENE)
export class RemoveAdministratorScene {
  constructor(private userService: UserService) {}
  @SceneEnter()
  async sceneEnter(@Ctx() ctx: ContextType) {
    await ctx.reply(TYPE_AN_ADMIN_NUMBER, {
      reply_markup: {
        keyboard: [[{ text: BACK_TO_PREVIOUS_MENU }]],
      },
    });
  }

  @On('text')
  async onText(@Ctx() ctx: ContextType) {
    if (await this.userService.isAdmin(ctx)) {
      const text = getMessageText(ctx);
      if (text.trim()) {
        if (text === BACK_TO_PREVIOUS_MENU) {
          await ctx.scene.enter(EDIT_ADMINISTRATORS_SCENE);
        } else if (text.trim().length === 11) {
          const removedUser = await this.userService.removeAdmin(text);
          if (!!removedUser[0]) {
            await ctx.reply(
              `Пользователь: \n${removedUser[1][0].firstName} ${removedUser[1][0].lastName}\nc номером: \n${removedUser[1][0].phoneNumber}\n переведен в пользователи ✅ ✅ ✅`,
            );
            await ctx.reply(
              "Напишите номер, или нажмите кнопку 'Назад' для возврата в предыдущее меню",
              {
                reply_markup: {
                  resize_keyboard: true,
                  keyboard: [[{ text: BACK_TO_PREVIOUS_MENU }]],
                },
              },
            );
          } else {
            await ctx.reply(`Пользователь с номером ${text} не найден`);
            await ctx.reply(
              "Напишите номер, или нажмите кнопку 'Назад' для возврата в предыдущее меню",
            );
          }
        } else {
          await ctx.reply(TYPE_AN_ADMIN_NUMBER);
        }
      } else {
        await ctx.reply(TYPE_AN_ADMIN_NUMBER);
      }
    }
  }
}

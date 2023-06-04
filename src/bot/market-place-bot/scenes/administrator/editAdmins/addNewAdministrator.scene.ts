import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import {
  ADD_NEW_ADMINISTRATOR_SCENE,
  EDIT_ADMINISTRATORS_SCENE,
} from '../../../constats/scens.const';
import { UserService } from '../../../user/user.service';
import {
  BACK_TO_PREVIOUS_MENU,
  TYPE_AN_ADMIN_NUMBER,
} from '../../../constats/message.const';
import { ContextType } from '../../../../types/context.type';
import { getMessageText } from '../../../../utilites/getMessage';

@Scene(ADD_NEW_ADMINISTRATOR_SCENE)
export class AddNewAdministratorScene {
  constructor(private readonly userService: UserService) {}

  @SceneEnter()
  async sceneEnter(@Ctx() ctx: ContextType) {
    await ctx.reply(TYPE_AN_ADMIN_NUMBER, {
      reply_markup: {
        resize_keyboard: true,
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
          const updatedUser = await this.userService.addAdmin(text);
          if (!!updatedUser[0]) {
            await ctx.reply(
              `Пользователь: \n${updatedUser[1][0].firstName} ${updatedUser[1][0].lastName}\nc номером: \n${updatedUser[1][0].phoneNumber}\nуспешно добавлен в администраторы ✅ ✅ ✅`,
            );
            await ctx.reply(
              "Добавьте администраторов, или нажмите кнопку 'Назад' для возврата в предыдущее меню",
              {
                reply_markup: {
                  resize_keyboard: true,
                  keyboard: [[{ text: BACK_TO_PREVIOUS_MENU }]],
                },
              },
            );
          } else {
            await ctx.reply(
              `Пользователь с номером ${text} не найден ❌ ❌ ❌`,
            );
            await ctx.reply(
              "Добавьте администраторов, или нажмите кнопку 'Назад' для возврата в предыдущее меню",
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

import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import {
  ADMINISTRATION_START_SCENE,
  EDIT_ADMINISTRATORS_SCENE,
  EDIT_PRODUCT_SCENE,
  MAIN_SCENE,
} from '../../constats/scens.const';
import { ContextType } from '../../../types/context.type';
import {
  ADMIN_AUTHORIZATION_SUCCESSFULLY,
  BACK_TO_MAIN_MENU,
  CHOOSE_ONE_OF_THE_SUGGESTED_ACTIONS,
  EDIT_ADMINISTRATORS,
  EDIT_PRODUCT,
} from '../../constats/message.const';
import { getMessageText } from '../../../utilites/getMessage';

@Scene(ADMINISTRATION_START_SCENE)
export class AdministratorStartScene {
  @SceneEnter()
  async sceneEnter(@Ctx() ctx: ContextType) {
    await ctx.reply(ADMIN_AUTHORIZATION_SUCCESSFULLY, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [
          [{ text: EDIT_ADMINISTRATORS }],
          [{ text: EDIT_PRODUCT }],
          [{ text: BACK_TO_MAIN_MENU }],
        ],
      },
    });
  }

  @On('text')
  async handleText(@Ctx() ctx: ContextType) {
    const text = getMessageText(ctx);
    switch (text) {
      case EDIT_ADMINISTRATORS:
        await ctx.scene.enter(EDIT_ADMINISTRATORS_SCENE);
        break;
      case EDIT_PRODUCT:
        await ctx.scene.enter(EDIT_PRODUCT_SCENE);
        break;
      case BACK_TO_MAIN_MENU:
        await ctx.scene.enter(MAIN_SCENE);
        break;
      default:
        await ctx.reply(CHOOSE_ONE_OF_THE_SUGGESTED_ACTIONS);
    }
  }
}

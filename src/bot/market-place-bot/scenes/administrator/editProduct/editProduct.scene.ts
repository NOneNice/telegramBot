import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import {
  ADD_NEW_PRODUCT_SCENE,
  ADMINISTRATION_START_SCENE,
  EDIT_PRODUCT_SCENE,
} from '../../../constats/scens.const';
import { ContextType } from '../../../../types/context.type';
import {
  BACK_TO_PREVIOUS_MENU,
  CHOOSE_ONE_OF_THE_SUGGESTED_ACTIONS,
  EDIT_PRODUCT,
  SELECT_AN_ACTION,
} from '../../../constats/message.const';
import { ADD_NEW_PRODUCT } from '../../../constats/button.const';
import { getMessageText } from '../../../../utilites/getMessage';

@Scene(EDIT_PRODUCT_SCENE)
export class EditProductScene {
  @SceneEnter()
  async sceneEnter(@Ctx() ctx: ContextType) {
    await ctx.reply(SELECT_AN_ACTION, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [
          [{ text: ADD_NEW_PRODUCT }],
          [{ text: EDIT_PRODUCT }],
          [{ text: BACK_TO_PREVIOUS_MENU }],
        ],
      },
    });
  }

  @On('text')
  async editCottageHandler(@Ctx() ctx: ContextType) {
    const text = getMessageText(ctx);
    switch (text) {
      case ADD_NEW_PRODUCT:
        await ctx.scene.enter(ADD_NEW_PRODUCT_SCENE);
        break;
      case BACK_TO_PREVIOUS_MENU:
        await ctx.scene.enter(ADMINISTRATION_START_SCENE);
        break;
      default:
        return CHOOSE_ONE_OF_THE_SUGGESTED_ACTIONS;
    }
  }
}

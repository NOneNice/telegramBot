import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import {
  ADD_NEW_PRODUCT_DESCRIPTION_KEYBOARD_SCENE,
  ADD_NEW_PRODUCT_SCENE,
} from '../../../../constats/scens.const';
import { ContextType } from '../../../../../types/context.type';
import {
  ADD_NEW_PRODUCT_DESCRIPTION_KEYBOARD,
  BACK_TO_PREVIOUS_MENU,
} from '../../../../constats/message.const';
import { getMessageText } from '../../../../../utilites/getMessage';

@Scene(ADD_NEW_PRODUCT_DESCRIPTION_KEYBOARD_SCENE)
export class AddNewProductDescriptionScene {
  @SceneEnter()
  async sceneEnter(@Ctx() ctx: ContextType) {
    await ctx.reply(ADD_NEW_PRODUCT_DESCRIPTION_KEYBOARD, {
      reply_markup: {
        remove_keyboard: true,
        resize_keyboard: true,
        keyboard: [[{ text: BACK_TO_PREVIOUS_MENU }]],
      },
    });
  }

  @On('text')
  async addNewProductDescription(@Ctx() ctx: ContextType) {
    const description = getMessageText(ctx);
    if (description === BACK_TO_PREVIOUS_MENU) {
      await ctx.scene.enter(ADD_NEW_PRODUCT_SCENE);
    } else if (description.trim()) {
      await ctx.scene.enter(ADD_NEW_PRODUCT_SCENE, {
        ...ctx.scene.state,
        description,
      });
    } else {
      await ctx.reply(ADD_NEW_PRODUCT_DESCRIPTION_KEYBOARD);
    }
  }
}

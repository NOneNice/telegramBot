import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import {
  ADD_NEW_ADMINISTRATOR_SCENE,
  EDIT_ADMINISTRATORS_SCENE,
  MAIN_SCENE,
  REMOVE_ADMINISTRATOR_SCENE,
} from '../../../constats/scens.const';
import { ContextType } from '../../../../types/context.type';
import {
  ADD_ADMINISTRATOR,
  BACK_TO_MAIN_MENU,
  BACK_TO_PREVIOUS_MENU,
  REMOVE_ADMINISTRATOR,
  SELECT_AN_ACTION,
} from '../../../constats/message.const';
import { getMessageText } from '../../../../utilites/getMessage';

@Scene(EDIT_ADMINISTRATORS_SCENE)
export class EditAdministratorScene {
  @SceneEnter()
  async sceneEnter(@Ctx() ctx: ContextType) {
    await ctx.reply(SELECT_AN_ACTION, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [
          [{ text: ADD_ADMINISTRATOR }],
          [{ text: REMOVE_ADMINISTRATOR }],
          [{ text: BACK_TO_PREVIOUS_MENU }],
        ],
      },
    });
  }

  @On('text')
  async textHandle(@Ctx() ctx: ContextType) {
    const text = getMessageText(ctx);
    switch (text) {
      case ADD_ADMINISTRATOR:
        await ctx.scene.enter(ADD_NEW_ADMINISTRATOR_SCENE);
        break;
      case REMOVE_ADMINISTRATOR:
        await ctx.scene.enter(REMOVE_ADMINISTRATOR_SCENE, ctx.scene.state);
        break;
      case BACK_TO_PREVIOUS_MENU:
        await ctx.scene.enter(MAIN_SCENE, ctx.scene.state);
        break;
      default:
        await ctx.reply(SELECT_AN_ACTION, {
          reply_markup: {
            keyboard: [
              [{ text: ADD_ADMINISTRATOR }],
              [{ text: REMOVE_ADMINISTRATOR }],
              [{ text: BACK_TO_PREVIOUS_MENU }],
              [{ text: BACK_TO_MAIN_MENU }],
            ],
          },
        });
    }
  }
}

import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import {
  ADD_NEW_PRICE_GUESTS_KEYBOARD_SCENE,
  ADD_NEW_PRODUCT_DESCRIPTION_KEYBOARD_SCENE,
  ADD_NEW_PRODUCT_PHOTOS_KEYBOARD_SCENE,
  ADD_NEW_PRODUCT_SCENE,
  EDIT_PRODUCT_SCENE,
} from '../../../constats/scens.const';
import { ContextType } from '../../../../types/context.type';
import {
  ADD_NEW_PRICE_GUESTS_KEYBOARD,
  ADD_NEW_PRODUCT_DESCRIPTION_KEYBOARD,
  ADD_NEW_PRODUCT_PHOTOS_KEYBOARD,
  BACK_TO_PREVIOUS_MENU,
  EDIT_PRODUCT,
  SAVE_MESSAGE,
  SELECT_AN_ACTION,
} from '../../../constats/message.const';
import { getMessageText } from '../../../../utilites/getMessage';
import { AddProductInterface } from '../../../../types/add-new-product';
import { UserService } from '../../../user/user.service';

@Scene(ADD_NEW_PRODUCT_SCENE)
export class AddNewProductScene {
  constructor(private readonly userService: UserService) {}

  @SceneEnter()
  async sceneEnter(@Ctx() ctx: ContextType) {
    console.log(ctx.scene.state);
    await ctx.reply(SELECT_AN_ACTION, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [
          [{ text: ADD_NEW_PRODUCT_DESCRIPTION_KEYBOARD }],
          [{ text: ADD_NEW_PRODUCT_PHOTOS_KEYBOARD }],
          [{ text: ADD_NEW_PRICE_GUESTS_KEYBOARD }],
          [{ text: SAVE_MESSAGE }],
          [{ text: BACK_TO_PREVIOUS_MENU }],
        ],
      },
    });
  }

  @On('text')
  async addCottage(@Ctx() ctx: ContextType) {
    const text: string = getMessageText(ctx);
    switch (text) {
      case ADD_NEW_PRODUCT_DESCRIPTION_KEYBOARD:
        await ctx.scene.enter(ADD_NEW_PRODUCT_DESCRIPTION_KEYBOARD_SCENE, {
          ...ctx.scene.state,
        });
        break;

      case ADD_NEW_PRODUCT_PHOTOS_KEYBOARD:
        await ctx.scene.enter(ADD_NEW_PRODUCT_PHOTOS_KEYBOARD_SCENE, {
          ...ctx.scene.state,
        });
        break;

      case ADD_NEW_PRICE_GUESTS_KEYBOARD:
        await ctx.scene.enter(ADD_NEW_PRICE_GUESTS_KEYBOARD_SCENE, {
          ...ctx.scene.state,
        });
        break;

      case SAVE_MESSAGE:
        if (await this.userService.isAdmin(ctx)) {
          const { description, photos, price } = ctx.scene
            .state as AddProductInterface;
          if (!description) {
            await ctx.reply(ADD_NEW_PRODUCT_DESCRIPTION_KEYBOARD);
            break;
          }
          if (!photos) {
            await ctx.reply(ADD_NEW_PRODUCT_PHOTOS_KEYBOARD);
            break;
          }
          if (!price) {
            await ctx.reply(ADD_NEW_PRICE_GUESTS_KEYBOARD);
            break;
          }
          //  await this.cottageService.addCottage({ description, photos, price });
          await ctx.reply('Сохранено!');
          await ctx.scene.reenter();
        }
        break;

      case BACK_TO_PREVIOUS_MENU:
        await ctx.scene.enter(EDIT_PRODUCT_SCENE);
        break;

      default:
        await ctx.reply(SELECT_AN_ACTION);
        break;
    }
  }
}

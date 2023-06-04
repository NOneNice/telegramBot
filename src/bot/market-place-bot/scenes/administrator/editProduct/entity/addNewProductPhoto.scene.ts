import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import {
  ADD_NEW_PRODUCT_PHOTOS_KEYBOARD_SCENE,
  EDIT_PRODUCT_SCENE,
} from '../../../../constats/scens.const';
import { ContextType } from '../../../../../types/context.type';
import {
  ADD_NEW_COTTAGE_PHOTOS,
  BACK_TO_PREVIOUS_MENU,
} from '../../../../constats/message.const';
import { getMessageText } from '../../../../../utilites/getMessage';
import * as path from 'path';
import { FileService } from '../service/file.service';
import { AddProductInterface } from '../../../../../types/add-new-product';

@Scene(ADD_NEW_PRODUCT_PHOTOS_KEYBOARD_SCENE)
export class AddNewProductPhotoScene {
  constructor(private readonly fileService: FileService) {}

  @SceneEnter()
  async sceneEnter(@Ctx() ctx: ContextType) {
    await ctx.reply(ADD_NEW_COTTAGE_PHOTOS, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [[{ text: BACK_TO_PREVIOUS_MENU }]],
      },
    });
  }

  @On('text')
  async onText(@Ctx() ctx: ContextType) {
    const text = getMessageText(ctx);
    if (text === BACK_TO_PREVIOUS_MENU) {
      ctx.scene.enter(EDIT_PRODUCT_SCENE, { ...ctx.scene.state });
    }
  }

  @On('photo')
  async addNewPhoto(@Ctx() ctx: ContextType) {
    // TODO: Доделать

    // @ts-ignore
    const { file_id } = await ctx.message.photo[ctx.message.photo.length - 1];
    const fileUrl = String(await ctx.telegram.getFileLink(file_id));
    if (
      path.extname(fileUrl) === '.jpg' ||
      path.extname(fileUrl) === '.png' ||
      path.extname(fileUrl) === '.jpeg'
    ) {
      const fileName = path.basename(String(fileUrl));
      await this.fileService.downloadFile(
        String(fileUrl),
        path.resolve(__dirname, 'photos', fileName),
      );
      const { photos } = ctx.scene.state as AddProductInterface;
      if (photos) {
        ctx.scene.state = { ...ctx.scene.state, photos: [...photos, fileName] };
      } else {
        ctx.scene.state = { ...ctx.scene.state, photos: [fileName] };
      }
    } else {
      return 'Отправьте фото в формате JPG/PNG';
    }
  }
}

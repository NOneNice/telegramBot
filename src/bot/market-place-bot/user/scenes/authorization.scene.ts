import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { AUTHORIZATION_SCENE, MAIN_SCENE } from '../../constats/scens.const';
import { UserService } from '../user.service';
import { ContextType } from '../../../types/context.type';
import { PLEASE_LOGIN_TO_GAIN_ACCESS } from '../../constats/message.const';
import { AUTHORIZATION } from '../../constats/button.const';

@Scene(AUTHORIZATION_SCENE)
export class AuthorizationScene {
  constructor(private userService: UserService) {}

  @SceneEnter()
  async sceneEnter(@Ctx() ctx: ContextType) {
    await ctx.reply(PLEASE_LOGIN_TO_GAIN_ACCESS, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [[{ text: AUTHORIZATION, request_contact: true }]],
      },
    });
  }

  @On('contact')
  async phone(@Ctx() ctx) {
    const contact = ctx.message.contact;
    ctx.session['user'] = await this.userService.addUser({
      phoneNumber: contact.phone_number,
      role: 'user',
      firstName: contact.first_name,
      lastName: contact.last_name,
      userName: ctx.message.username,
      telegramId: contact.user_id,
    });
    await ctx.scene.enter(MAIN_SCENE);
  }
}

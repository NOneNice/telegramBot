import { Ctx, Start, Update } from 'nestjs-telegraf';
import { UserService } from './user/user.service';
import { ContextType } from '../types/context.type';
import { AUTHORIZATION_SCENE, MAIN_SCENE } from './constats/scens.const';

@Update()
export class StartTelegramUpdate {
  constructor(private readonly userService: UserService) {}

  @Start()
  async onStart(@Ctx() ctx: ContextType) {
    const findUser = await this.userService.findOneByTelegramId(
      ctx.message.from.id,
    );
    if (!!findUser) {
      ctx.session['user'] = findUser;
      await ctx.scene.enter(MAIN_SCENE);
    } else {
      await ctx.scene.enter(AUTHORIZATION_SCENE);
    }
  }
}

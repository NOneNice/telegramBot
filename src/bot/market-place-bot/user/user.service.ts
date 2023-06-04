import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserInterface } from '../../types/user.interface';
import { Op } from 'sequelize';
import { ContextType } from '../../types/context.type';
import { MAIN_SCENE } from '../constats/scens.const';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async findOneByTelegramId(telegramId: number) {
    return await this.userRepository.findOne({ where: { telegramId } });
  }

  async addUser(user: UserInterface) {
    return await this.userRepository.create(
      {
        role: 'user',
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber:
          user.phoneNumber.charAt(0) === '+'
            ? user.phoneNumber.substring(1)
            : user.phoneNumber,
        telegramId: user.telegramId,
      },
      { returning: true },
    );
  }

  async addAdmin(text: string) {
    return await this.userRepository.update(
      { role: 'admin' },
      {
        where: {
          phoneNumber: text,
        },
        returning: true,
      },
    );
  }

  async removeAdmin(text: string) {
    return await this.userRepository.update(
      { role: 'user' },
      {
        where: {
          phoneNumber: text,
        },
        returning: true,
      },
    );
  }

  async isAdmin(ctx: ContextType) {
    const result = await this.findOneByTelegramId(
      ctx.session['user']['telegramId'],
    );
    if (result.role != 'admin') {
      ctx.session['user'] = result;
      await ctx.reply(
        'Вы не являетесь больше администратором и будете переведены на начальную страницу',
      );
      await ctx.scene.enter(MAIN_SCENE);
      return false;
    }
    return true;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserInterface } from '../../types/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async findOneByTelegramId(telegramId: number) {
    return await this.userRepository.findOne({ where: { telegramId } });
  }

  async addUser(user: UserInterface) {
    await this.userRepository.create({
      role: 'user',
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      telegramId: user.telegramId,
    });
  }
}

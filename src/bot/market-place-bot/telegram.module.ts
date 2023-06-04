import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './market-place-bot.model';
import { StartTelegramUpdate } from './startTelegram.update';
import { UserService } from './user/user.service';
import { MainScene } from './scenes/main.scenes';
import { AuthorizationScene } from './user/scenes/authorization.scene';
import { User } from './user/user.model';
import { AdministratorStartScene } from './scenes/administrator/administratorStart.scene';
import { EditAdministratorScene } from './scenes/administrator/editAdmins/editAdministrator.scene';
import { AddNewAdministratorScene } from './scenes/administrator/editAdmins/addNewAdministrator.scene';
import { RemoveAdministratorScene } from './scenes/administrator/editAdmins/removeAdministrator.scene';

const scenes = [
  MainScene,
  AuthorizationScene,
  AdministratorStartScene,
  EditAdministratorScene,
  AddNewAdministratorScene,
  RemoveAdministratorScene,
];

const service = [UserService, StartTelegramUpdate];

@Module({
  imports: [SequelizeModule.forFeature([Product, User])],
  providers: [...scenes, ...service],
})
export class TelegramModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StartTelegramUpdate } from './startTelegram.update';
import { UserService } from './user/user.service';
import { MainScene } from './scenes/main.scenes';
import { AuthorizationScene } from './user/scenes/authorization.scene';
import { User } from './user/user.model';
import { AdministratorStartScene } from './scenes/administrator/administratorStart.scene';
import { EditAdministratorScene } from './scenes/administrator/editAdmins/editAdministrator.scene';
import { AddNewAdministratorScene } from './scenes/administrator/editAdmins/addNewAdministrator.scene';
import { RemoveAdministratorScene } from './scenes/administrator/editAdmins/removeAdministrator.scene';
import { EditProductScene } from './scenes/administrator/editProduct/editProduct.scene';
import { AddNewProductScene } from './scenes/administrator/editProduct/addNewProduct.scene';
import { AddNewProductDescriptionScene } from './scenes/administrator/editProduct/entity/addNewProductDescription.scene';
import { AddNewProductPhotoScene } from './scenes/administrator/editProduct/entity/addNewProductPhoto.scene';
import { FileService } from './scenes/administrator/editProduct/service/file.service';
import { HttpModule } from '@nestjs/axios';

const scenes = [
  MainScene,
  AuthorizationScene,
  AdministratorStartScene,
  EditAdministratorScene,
  AddNewAdministratorScene,
  RemoveAdministratorScene,
  EditProductScene,
  AddNewProductScene,
  AddNewProductDescriptionScene,
  AddNewProductPhotoScene,
];

const service = [UserService, StartTelegramUpdate, FileService];

@Module({
  imports: [SequelizeModule.forFeature([User]), HttpModule],
  providers: [...scenes, ...service],
})
export class TelegramModule {}

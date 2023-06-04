import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { UserInterface } from '../../types/user.interface';

@Table({ tableName: 'user', timestamps: false })
export class User extends Model<User, UserInterface> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  role: string;

  @Column({ type: DataType.STRING })
  phoneNumber: string;

  @Column({ type: DataType.STRING })
  firstName: string;

  @Column({ type: DataType.STRING })
  lastName: string;

  @Column({ type: DataType.INTEGER })
  telegramId: number;
}

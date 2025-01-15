import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { Role } from './Role.js';
import { Status } from './Status.js';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleId!: number;

  @ForeignKey(()=> Status)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  statusId!: string;
}
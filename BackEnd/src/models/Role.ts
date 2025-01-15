import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { Status } from './Status.js';

@Table({ tableName: 'roles' })
export class Role extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @ForeignKey(()=> Status)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  statusId!: string;
}
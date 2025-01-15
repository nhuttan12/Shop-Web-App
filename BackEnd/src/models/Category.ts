import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { Status } from './Status.js';

@Table({tableName: 'categories'})
export class Category extends Model{
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  description!: string;

  @ForeignKey(()=> Status)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  statusId!: string;
}
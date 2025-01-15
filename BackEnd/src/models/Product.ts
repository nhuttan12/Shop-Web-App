import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import {Category} from './Category.js';
import { Status } from './Status.js';

@Table({tableName: 'products'})
export class Product extends Model{
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  description!: string;

  @Column({
    type: DataType.DECIMAL(10,2),
    allowNull: false
  })
  price!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  quantity!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  imageUrl!: string;

  @ForeignKey(()=> Category)
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  categoriesId!: string;

  @ForeignKey(()=> Status)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  statusId!: string;
}
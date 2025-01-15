import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({tableName: 'status'})
export class Status extends Model{
  @Column({
    type: DataType.ENUM('ACTIVE', 'INACTIVE', 'DELETED'),
    defaultValue: 'ACTIVE'
  })
  name!: string;
}
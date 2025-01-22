import { sequelize } from '../utils/db-connector.js';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
// export default class Category extends Model {
//   id!: number;
//   name!: string;
//   description!: string;
//   statusId!: number;
// }

@Entity()
export class Category{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description: string;

  @Column()
  statusId!: number
}
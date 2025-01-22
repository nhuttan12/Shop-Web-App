import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export default class User extends Model {
  public id!: number;
  public name!: string;
  public username!: string;
  public password!: string;
  public email!: string;
  public statusId!: number;
  public roleId!: number;
}
@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id!: number;

}
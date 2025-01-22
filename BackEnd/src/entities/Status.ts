import { Entity } from 'typeorm/decorator/entity/Entity.js';
import { Column } from 'typeorm/decorator/columns/Column.js';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn.js';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany.js';
import { Role } from './Role.js';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Role, (role: Role) => role.status)
  roles!: Role[];
}
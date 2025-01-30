import { Entity } from 'typeorm/decorator/entity/Entity.js';
import { JoinColumn } from 'typeorm/decorator/relations/JoinColumn.js';
import { Status } from './Status.js';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne.js';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany.js';
import { User } from './User.js';
import { BaseEntity } from './BaseEntity.js';

@Entity('roles')
export class Role extends BaseEntity{
  @ManyToOne(() => Status, (status: Status) => status.roles)
  @JoinColumn({ name: 'statusId' })
  status!: Status;

  @OneToMany(() => User, (user: User) => user.role)
  users!: User[];
}
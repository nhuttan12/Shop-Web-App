import { Entity } from 'typeorm/decorator/entity/Entity.js';
import { JoinColumn } from 'typeorm/decorator/relations/JoinColumn.js';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne.js';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany.js';
import { BaseEntity } from './BaseEntity.js';
import { Status } from './Status.js';
import { User } from './User.js';
import { Relation } from 'typeorm';

@Entity('roles')
export class Role extends BaseEntity{
  @ManyToOne(() => Status, (status) => status.roles)
  @JoinColumn({ name: 'statusId' })
  status!: Relation<Status>;

  @OneToMany(() => User, (user) => user.role)
  users!: Relation<User[]>;
}
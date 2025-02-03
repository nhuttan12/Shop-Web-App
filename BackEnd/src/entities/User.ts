import { Entity } from 'typeorm/decorator/entity/Entity.js';
import { Column } from 'typeorm/decorator/columns/Column.js';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne.js';
import { JoinColumn } from 'typeorm/decorator/relations/JoinColumn.js';
import { Role } from './Role.js';
import { BaseEntity } from './BaseEntity.js';
import { Status } from './Status.js';
import { Relation } from 'typeorm';

@Entity('users')
export class User extends BaseEntity{
  @Column({ type: 'varchar', length: 255 })
  username!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @ManyToOne(() => Status, (status) => status.users)
  @JoinColumn({ name: 'statusId' })
  status!: Relation<Status>;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role!: Relation<Role>;
}
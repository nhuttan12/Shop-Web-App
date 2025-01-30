import { Entity } from 'typeorm/decorator/entity/Entity.js';
import { Column } from 'typeorm/decorator/columns/Column.js';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne.js';
import { Status } from './Status.js';
import { JoinColumn } from 'typeorm/decorator/relations/JoinColumn.js';
import { Role } from './Role.js';
import { BaseEntity } from './BaseEntity.js';

@Entity('users')
export class User extends BaseEntity{
  @Column({ type: 'varchar', length: 255 })
  username!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @ManyToOne(() => Status, (status: Status) => status.users)
  @JoinColumn({ name: 'statusId' })
  status!: Status;

  @ManyToOne(() => Role, (role: Role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role!: Role;
}
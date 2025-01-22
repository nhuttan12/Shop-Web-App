import { Entity } from 'typeorm/decorator/entity/Entity.js';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn.js';
import { JoinColumn } from 'typeorm/decorator/relations/JoinColumn.js';
import { Status } from './Status.js';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne.js';
import { Column } from 'typeorm/decorator/columns/Column.js';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Status, (status: Status) => status.roles)
  @JoinColumn({ name: 'statusId' })
  status!: Status;
}

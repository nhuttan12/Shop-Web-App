import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn.js';
import { Column } from 'typeorm/decorator/columns/Column.js';
import { BaseEntity as TypeORMBaseEntity } from 'typeorm';

export abstract class BaseEntity extends TypeORMBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'datetime' })
  createAt!: Date;

  @Column({ type: 'datetime' })
  updateAt?: Date;
}
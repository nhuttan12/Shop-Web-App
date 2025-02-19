import { Entity } from 'typeorm/decorator/entity/Entity.js';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn.js';
import { Column } from 'typeorm/decorator/columns/Column.js';
import { BaseEntity, Relation } from 'typeorm';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne.js';
import { JoinColumn } from 'typeorm/decorator/relations/JoinColumn.js';
import { User } from './User.js';

@Entity('refresh_token')
export class RefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  token!: string;

  @Column({ type: 'datetime' })
  expiration!: Date;

  @Column({ type: 'datetime' })
  createdAt!: Date;

  @Column({ type: 'datetime' })
  updatedAt?: Date;

  @ManyToOne(() => User, user => user.tokens)
  @JoinColumn({ name: 'userId' })
  user!: Relation<User>;
}

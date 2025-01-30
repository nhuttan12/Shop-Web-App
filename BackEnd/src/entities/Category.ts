import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne.js';
import { Entity } from 'typeorm/decorator/entity/Entity.js';
import { Column } from 'typeorm/decorator/columns/Column.js';
import { Status } from './Status.js';
import { JoinColumn } from 'typeorm/decorator/relations/JoinColumn.js';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany.js';
import { Product } from './Product.js';
import { BaseEntity } from './BaseEntity.js';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  description!: string;

  @ManyToOne(() => Status, (status: Status) => status.categories)
  @JoinColumn({ name: 'statusId' })
  status!: Status;

  @OneToMany(() => Product, (product: Product) => product.category)
  products!: Product[];
}
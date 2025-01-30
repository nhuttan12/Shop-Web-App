import { Entity } from 'typeorm/decorator/entity/Entity.js';
import { Column } from 'typeorm/decorator/columns/Column.js';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne.js';
import { Category } from './Category.js';
import { JoinColumn } from 'typeorm/decorator/relations/JoinColumn.js';
import { Status } from './Status.js';
import { BaseEntity } from './BaseEntity.js';

@Entity('products')
export class Product extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  description!: string;

  @Column({ type: 'double precision', precision: 12, scale: 2 })
  price!: number;

  @Column({ type: 'int' })
  quantity!: number;

  @Column({ type: 'text' })
  imageUrl!: string;

  @ManyToOne(() => Category, (category: Category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category!: Category;

  @ManyToOne(() => Status, (status: Status) => status.products)
  @JoinColumn({ name: 'statusId' })
  status!: Status;
}

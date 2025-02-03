import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne.js';
import { Entity } from 'typeorm/decorator/entity/Entity.js';
import { Column } from 'typeorm/decorator/columns/Column.js';
import { JoinColumn } from 'typeorm/decorator/relations/JoinColumn.js';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany.js';
import { BaseEntity } from './BaseEntity.js';
import { Relation } from 'typeorm';
import { Status } from './Status.js';
import { Product } from './Product.js';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  description!: string;

  @ManyToOne(() => Status, status => status.categories)
  @JoinColumn({ name: 'statusId' })
  status!: Relation<Status>;

  @OneToMany(() => Product, (product) => product.category)
  products!: Relation<Product[]>;
}
import { Entity } from 'typeorm/decorator/entity/Entity.js';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany.js';
import { BaseEntity } from './BaseEntity.js';
import { Category } from './Category.js';
import { Role } from './Role.js';
import { User } from './User.js';
import { Product } from './Product.js';
import { Relation } from 'typeorm';

@Entity('status')
export class Status extends BaseEntity{
  @OneToMany(() => Role, (role) => role.status)
  roles!: Relation<Role[]>;

  @OneToMany(() => Category, (category) => category.status)
  categories!: Relation<Category[]>;

  @OneToMany(() => User, (user) => user.status)
  users!: Relation<User[]>;

  @OneToMany(()=>Product, (product)=>product.status)
  products!: Relation<Product[]>;
}
import { Entity } from 'typeorm/decorator/entity/Entity.js';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany.js';
import { Role } from './Role.js';
import { Category } from './Category.js';
import { User } from './User.js';
import { Product } from './Product.js';
import { BaseEntity } from './BaseEntity.js';

@Entity('status')
export class Status extends BaseEntity{
  @OneToMany(() => Role, (role: Role) => role.status)
  roles!: Role[];

  @OneToMany(() => Category, (category: Category) => category.status)
  categories!: Category[];

  @OneToMany(() => User, (user: User) => user.status)
  users!: User[];

  @OneToMany(()=>Product, (product: Product)=>product.status)
  products!: Product[];
}
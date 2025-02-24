import { Expose, plainToInstance } from 'class-transformer';
import { CategoryAdminDTO } from './category-admin-dto.js';
import { StatusDTO } from '../status-dto.js';
import { Product } from '../../entities/Product.js';

export class ProductAdminDTO {
  @Expose()
  name!: string;

  @Expose()
  description!: string;

  @Expose()
  price!: number;

  @Expose()
  quantity!: number;

  @Expose()
  imageUrl!: string;

  @Expose()
  category!: CategoryAdminDTO;

  @Expose()
  status!: StatusDTO;

  static fromEntity(product: Product): ProductAdminDTO {
    return plainToInstance(
      ProductAdminDTO,
      {
        name: product.name,
        description: product.name,
        price: product.price,
        quantity: product.quantity,
        imageUrl: product.imageUrl,
        category: plainToInstance(CategoryAdminDTO, product.category, {
          excludeExtraneousValues: true,
        }),
        status: plainToInstance(StatusDTO, product.status, {
          excludeExtraneousValues: true,
        }),
      },
      { excludeExtraneousValues: true }
    );
  }
}

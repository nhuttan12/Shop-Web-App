import { Category } from './../../entities/Category';
import { Expose, plainToInstance } from 'class-transformer';
import { StatusDTO } from '../status-dto.js';

export class CategoryAdminDTO {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  status!: StatusDTO;

  static fromEntity(category: Category): CategoryAdminDTO {
    return plainToInstance(
      CategoryAdminDTO,
      {
        id: category.id,
        name: category.name,
        status: plainToInstance(StatusDTO, category.status, {
          excludeExtraneousValues: true,
        }),
      },
      { excludeExtraneousValues: true }
    );
  }
}

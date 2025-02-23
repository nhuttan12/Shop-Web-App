import { Expose, plainToInstance } from 'class-transformer';
import { RoleDTO } from './role-dto.js';
import { StatusDTO } from './status-dto.js';
import { User } from '../entities/User.js';

export class UserDTO {
  @Expose()
  id!: number;

  @Expose()
  username!: string;

  @Expose()
  email!: string;

  @Expose()
  role!: RoleDTO;

  @Expose()
  status!: StatusDTO;

  static fromEntity(user: User): UserDTO {
    return plainToInstance(
      UserDTO,
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: plainToInstance(RoleDTO, user.role, {
          excludeExtraneousValues: true,
        }),
        status: plainToInstance(StatusDTO, user.status, {
          excludeExtraneousValues: true,
        }),
      },
      { excludeExtraneousValues: true }
    );
  }
}

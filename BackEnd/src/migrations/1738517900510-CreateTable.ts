import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRoleTable1738517900510 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      const roleTable = await queryRunner.hasTable('roles');
      if (!roleTable) {
        await queryRunner.createTable(
          new Table({
            name: 'roles',
            columns: [
              {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                isUnique: true,
              },
              {
                name: 'name',
                type: 'varchar',
                length: '255',
                default: "''",
              },
              {
                name: 'statusId',
                type: 'int',
                default: 0,
              },
              {
                name: 'createdAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
              },
              {
                name: 'updatedAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
                onUpdate: 'CURRENT_TIMESTAMP',
              },
            ],
          })
        );
      }

      const statusTable = await queryRunner.hasTable('status');
      if (!statusTable) {
        await queryRunner.createTable(
          new Table({
            name: 'status',
            columns: [
              {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                isUnique: true,
              },
              {
                name: 'name',
                type: 'varchar',
                length: '255',
                default: "''",
                isUnique: true,
              },
              {
                name: 'createdAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
              },
              {
                name: 'updatedAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
                onUpdate: 'CURRENT_TIMESTAMP',
              },
            ],
          })
        );
      }

      const categoriesTable = await queryRunner.hasTable('categories');
      if (!categoriesTable) {
        await queryRunner.createTable(
          new Table({
            name: 'categories',
            columns: [
              {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                isUnique: true,
              },
              {
                name: 'name',
                type: 'varchar',
                length: '255',
                default: "''",
              },
              {
                name: 'description',
                type: 'varchar',
                length: '255',
                default: "''",
              },
              {
                name: 'statusId',
                type: 'int',
                default: 0,
              },
              {
                name: 'createdAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
              },
              {
                name: 'updatedAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
                onUpdate: 'CURRENT_TIMESTAMP',
              },
            ],
          })
        );
      }

      const productsTable = await queryRunner.hasTable('products');
      if (!productsTable) {
        await queryRunner.createTable(
          new Table({
            name: 'products',
            columns: [
              {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                isUnique: true,
              },
              {
                name: 'name',
                type: 'varchar',
                length: '255',
                default: "''",
              },
              {
                name: 'description',
                type: 'varchar',
                length: '255',
                default: "''",
              },
              {
                name: 'price',
                type: 'double precision',
                precision: 12,
                scale: 2,
                default: 0.0,
              },
              {
                name: 'quantity',
                type: 'int',
                default: 0,
              },
              {
                name: 'imageUrl',
                type: 'text',
              },
              {
                name: 'categoryId',
                type: 'int',
                default: 0,
              },
              {
                name: 'statusId',
                type: 'int',
                default: 0,
              },
              {
                name: 'createdAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
              },
              {
                name: 'updatedAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
                onUpdate: 'CURRENT_TIMESTAMP',
              },
            ],
          })
        );
      }

      const usersTable = await queryRunner.hasTable('users');
      if (!usersTable) {
        await queryRunner.createTable(
          new Table({
            name: 'users',
            columns: [
              {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                isUnique: true,
              },
              {
                name: 'username',
                type: 'varchar',
                length: '255',
                default: "''",
              },
              {
                name: 'password',
                type: 'varchar',
                length: '255',
                default: "''",
              },
              {
                name: 'email',
                type: 'varchar',
                length: '255',
                default: "''",
              },
              {
                name: 'name',
                type: 'varchar',
                length: '255',
                default: "''",
              },
              {
                name: 'roleId',
                type: 'int',
                default: 0,
              },
              {
                name: 'statusId',
                type: 'int',
                default: 0,
              },
              {
                name: 'createdAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
              },
              {
                name: 'updatedAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
                onUpdate: 'CURRENT_TIMESTAMP',
              },
            ],
          })
        );
      }
    } catch (error) {
      console.error('Migration failed:', error);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRoleTable1738517900510 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
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
              },
              {
                name: 'name',
                type: 'varchar',
                length: '255',
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
              },
              {
                name: 'name',
                type: 'varchar',
                length: '255',
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

      const categoriesTable = await queryRunner.hasTable('status');
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
              },
              {
                name: 'name',
                type: 'varchar',
                length: '255',
              },
              {
                name: 'description',
                type: 'varchar',
                length: '255',
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

      const productsTable = await queryRunner.hasTable('status');
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
              },
              {
                name: 'name',
                type: 'varchar',
                length: '255',
              },
              {
                name: 'description',
                type: 'varchar',
                length: '255',
              },
              {
                name: 'price',
                type: 'double precision',
                precision: 12,
                scale: 2,
              },
              {
                name: 'quantity',
                type: 'int',
              },
              {
                name: 'imageUrl',
                type: 'text',
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

      const usersTable = await queryRunner.hasTable('status');
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
              },
              {
                name: 'username',
                type: 'varchar',
                length: '255',
              },
              {
                name: 'password',
                type: 'varchar',
                length: '255',
              },
              {
                name: 'email',
                type: 'varchar',
                length: '255',
              },
              {
                name: 'name',
                type: 'varchar',
                length: '255',
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
      
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Migration failed:', error);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

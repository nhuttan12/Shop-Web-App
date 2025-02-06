import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class UpadateRelation11738574623067 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      //CATEGORY TABLE
      const categoryTable = await queryRunner.getTable('categories');
      //check exist foreign key status id of category table
      if (categoryTable) {
        //searching category fk
        const categoryFk  = categoryTable.foreignKeys.find(
          fk => fk.columnNames.includes('statusId')
        )
        if(!categoryFk){
          //create foreign key status id of category table
          await queryRunner.createForeignKey(
            'categories',
            new TableForeignKey({
              columnNames: ['statusId'],
              referencedTableName: 'status',
              referencedColumnNames: ['id'],
              onDelete: 'CASCADE',
            })
          );
        }
      }

      //PRODUCT TABLE
      const productTable = await queryRunner.getTable('products');
      if (productTable) {
        //check foreign key exist of product table
        const categoryFk = productTable.foreignKeys.some(
          fk => fk.columnNames.includes('categoryId')
        );
        const statusFk=productTable.foreignKeys.some(
          fk => fk.columnNames.includes('statusId')
        );
        const foreignKeysToAdd: TableForeignKey[] = [];
        if(!categoryFk){
          foreignKeysToAdd.push(
            new TableForeignKey({
              columnNames: ['categoryId'],
              referencedTableName: 'categories',
              referencedColumnNames: ['id'],
              onDelete: 'CASCADE',
            })
          )
        }
        if(!statusFk){
          foreignKeysToAdd.push(
            new TableForeignKey({
              columnNames: ['statusId'],
              referencedTableName: 'status',
              referencedColumnNames: ['id'],
              onDelete: 'CASCADE',
            }),
          )
        }
        //create foreign keys statusId and categoryId of product table
        await queryRunner.createForeignKeys('products', foreignKeysToAdd);
      }

      //ROLE TABLE
      //get role table
      const roleTable = await queryRunner.getTable('roles');
      if (roleTable) {
        //get foreign keys statusId of role table
        const roleFk = roleTable.foreignKeys.find(fk =>
          fk.columnNames.includes('statusId')
        );
        if (roleFk) {
          await queryRunner.dropForeignKey('roles', roleFk);
        }
        //create foreign key statusId of role table
        await queryRunner.createForeignKey(
          'roles',
          new TableForeignKey({
            columnNames: ['statusId'],
            referencedTableName: 'status',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          })
        );
      }

      //USER TABLE
      //get user table
      const userTable = await queryRunner.getTable('users');
      if (userTable) {
        //check exist foreign key of user table
        const roleFk = userTable.foreignKeys.some(
          fk => fk.columnNames.includes('roleId')
        );
        const statusFk=userTable.foreignKeys.some(
          fk => fk.columnNames.includes('statusId')
        );
        const foreignKeysToAdd: TableForeignKey[] = [];
        if(!roleFk){
          foreignKeysToAdd.push(
            new TableForeignKey({
              columnNames: ['statusId'],
              referencedTableName: 'status',
              referencedColumnNames: ['id'],
              onDelete: 'CASCADE',
            })
          );
        }
        if(!statusFk){
          foreignKeysToAdd.push(
            new TableForeignKey({
              columnNames: ['roleId'],
              referencedTableName: 'roles',
              referencedColumnNames: ['id'],
              onDelete: 'CASCADE',
            })
          );
        }
        // Create new foreign key for 'roleId'
        await queryRunner.createForeignKeys('users', foreignKeysToAdd);
      }
    } catch (error) {
      console.error('Migration failed:', error);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}

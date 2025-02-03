import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class UpadateRelation11738574623067 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      //get category table name
      const categoryTable = await queryRunner.getTable('categories');
      //check exist foreign key status id of category table
      if (categoryTable) {
        const categoryFk = categoryTable.foreignKeys.find(fk =>
          fk.columnNames.includes('statusId')
        );
        //drop foreign key
        if (categoryFk) {
          await queryRunner.dropForeignKey('categories', categoryFk);
        }
      }
      //check statusId exist in category table
      const statusIdFkCategory = categoryTable?.columns.find(column=>
        column.name==='statusId'
      );
      //adding statusId column
      if(!statusIdFkCategory){
        await queryRunner.addColumn(
          'categories',
          new TableColumn({
            name: 'statusId',
            type: 'int',
          })
        )
      }
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

      //get product table name
      const productTable = await queryRunner.getTable('products');
      if (productTable) {
        //check foreign key exist of product table
        const productFks = productTable.foreignKeys.filter(fk => {
          fk.columnNames.includes('categoryId') ||
            fk.columnNames.includes('statusId');
        });
        //drop foreign key
        for(const fk of productFks){
          await queryRunner.dropForeignKey('products', fk);
        }
      }
      //check statusId exist in category table
      const statusIdFkProduct = categoryTable?.columns.filter(column=>
        column.name==='statusId'
      );
      //adding statusId column
      if(!statusIdFkCategory){
        await queryRunner.addColumn(
          'categories',
          new TableColumn({
            name: 'statusId',
            type: 'int',
          })
        )
      }
      //create foreign keys statusId and categoryId of product table
      await queryRunner.createForeignKeys('products', [
        new TableForeignKey({
          columnNames: ['categoryId'],
          referencedTableName: 'categories',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        }),
        new TableForeignKey({
          columnNames: ['statusId'],
          referencedTableName: 'status',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        }),
      ]);

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

      //get user table
      const userTable = await queryRunner.getTable('users');
      if (userTable) {
        //check exist foreign key of user table
        const userFks=userTable.foreignKeys.filter(fk=>
          fk.columnNames.includes('roleId') ||
            fk.columnNames.includes('statusId')
        );
        //drop foreign key
        for(const fk of userFks){
          await queryRunner.dropForeignKey('users', fk);
        }
      }
      //create foreign keys statusId and roleId of user table
      await queryRunner.createForeignKeys('users', [
        new TableForeignKey({
          columnNames: ['statusId'],
          referencedTableName: 'status',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        }),
        new TableForeignKey({
          columnNames: ['roleId'],
          referencedTableName: 'roles',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        }),
      ]);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Migration failed:', error);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

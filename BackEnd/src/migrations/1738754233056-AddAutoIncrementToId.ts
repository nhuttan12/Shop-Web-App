import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAutoIncrementToId1738754233056 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table=['roles','users','products','categories', 'status']
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

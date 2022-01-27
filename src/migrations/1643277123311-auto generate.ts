import { MigrationInterface, QueryRunner } from 'typeorm';

export class autoGenerate1643277123311 implements MigrationInterface {
  name = 'autoGenerate1643277123311';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "phoneNumber" int`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`);
  }
}

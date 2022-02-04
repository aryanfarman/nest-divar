import { MigrationInterface, QueryRunner } from 'typeorm';

export class newEntity1643832857769 implements MigrationInterface {
  name = 'newEntity1643832857769';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ExceptionLog" ("id" int NOT NULL IDENTITY(1,1), "message" nvarchar(255) NOT NULL, "status" int NOT NULL, "creationTime" nvarchar(255) NOT NULL, CONSTRAINT "PK_11c7718f8cdc99fa806f213a6e7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "ExceptionLog"`);
  }
}

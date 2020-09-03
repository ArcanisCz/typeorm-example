import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1599133369533 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" RENAME COLUMN "text" TO "pokus"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" RENAME COLUMN text TO "text"`);
    }

}

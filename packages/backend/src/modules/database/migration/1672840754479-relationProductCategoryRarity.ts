import { MigrationInterface, QueryRunner } from "typeorm";

export class relationProductCategoryRarity1672840754479 implements MigrationInterface {
    name = 'relationProductCategoryRarity1672840754479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "product" ADD "rarityId" uuid`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_4b6ebcc5b2da3b031a13eae919f" FOREIGN KEY ("rarityId") REFERENCES "product_rarity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_4b6ebcc5b2da3b031a13eae919f"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "rarityId"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryId"`);
    }

}

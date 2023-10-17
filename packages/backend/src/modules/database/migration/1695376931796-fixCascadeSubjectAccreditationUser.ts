import { MigrationInterface, QueryRunner } from "typeorm";

export class FixCascadeSubjectAccreditationUser1695376931796 implements MigrationInterface {
    name = 'FixCascadeSubjectAccreditationUser1695376931796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject_accreditation" DROP CONSTRAINT "FK_c9851540532ff1c98c99096dff5"`);
        await queryRunner.query(`ALTER TABLE "subject_accreditation" ADD CONSTRAINT "FK_c9851540532ff1c98c99096dff5" FOREIGN KEY ("userAccreditedId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject_accreditation" DROP CONSTRAINT "FK_c9851540532ff1c98c99096dff5"`);
        await queryRunner.query(`ALTER TABLE "subject_accreditation" ADD CONSTRAINT "FK_c9851540532ff1c98c99096dff5" FOREIGN KEY ("userAccreditedId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}

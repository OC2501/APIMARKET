import { MigrationInterface, QueryRunner } from "typeorm";

export class CLONE1734092493157 implements MigrationInterface {
    name = 'CLONE1734092493157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_b2be25bd3e78455fe801c45e892"`);
        await queryRunner.query(`CREATE TABLE "warehouse" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "description" character varying NOT NULL, CONSTRAINT "PK_965abf9f99ae8c5983ae74ebde8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "stock" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "unit" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TYPE "public"."user_gender_enum" RENAME TO "user_gender_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "gender" TYPE "public"."user_gender_enum" USING "gender"::"text"::"public"."user_gender_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TYPE "public"."user_role_enum" RENAME TO "user_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum" USING "role"::"text"::"public"."user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'USER'`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "supplier" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supplier" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "price" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "postal_code" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."purchase_status_enum" AS ENUM('CREATED', 'MODIFIED', 'PENDING_APPROVAL', 'APPROVED', 'IN_PROCESS', 'PROCESSED', 'REJECTED', 'CANCELED')`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD "status" "public"."purchase_status_enum" NOT NULL DEFAULT 'CREATED'`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_b2be25bd3e78455fe801c45e892" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_b2be25bd3e78455fe801c45e892"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."purchase_status_enum"`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "postal_code" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "price" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supplier" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supplier" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum_old" AS ENUM('admin', 'user')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum_old" USING "role"::"text"::"public"."user_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_role_enum_old" RENAME TO "user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum_old" AS ENUM('M', 'F')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "gender" TYPE "public"."user_gender_enum_old" USING "gender"::"text"::"public"."user_gender_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_gender_enum_old" RENAME TO "user_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "unit"`);
        await queryRunner.query(`ALTER TABLE "stock" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "warehouse"`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_b2be25bd3e78455fe801c45e892" FOREIGN KEY ("warehouse_id") REFERENCES "warehouses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

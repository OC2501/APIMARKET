import { MigrationInterface, QueryRunner } from "typeorm";

export class Orders1734100015826 implements MigrationInterface {
    name = 'Orders1734100015826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employe" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "lastname" character varying NOT NULL, "firstname" character varying NOT NULL, "birthdate" date NOT NULL, "city" character varying NOT NULL, "photo" character varying NOT NULL, "note" character varying NOT NULL, CONSTRAINT "PK_7113be6659833171e74fa251a18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shipper" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "PK_b83858f68f5c3acfab73b61caa5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "order" date NOT NULL, "customer_id" uuid, "employee_id" uuid, "shipper_id" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "quantity" integer NOT NULL, "product_id" uuid, "warehouse_id" uuid, CONSTRAINT "PK_0afbab1fa98e2fb0be8e74f6b38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_cd7812c96209c5bdd48a6b858b0" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_08cafdcbae0d6407effc99cf7aa" FOREIGN KEY ("employee_id") REFERENCES "employe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_f1c2079aca31a2cae19e1f68a9c" FOREIGN KEY ("shipper_id") REFERENCES "shipper"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_985d5f728e1eebe4a3eabc43aac" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_9ee82133c845ff6dc0a4878ee96" FOREIGN KEY ("warehouse_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_9ee82133c845ff6dc0a4878ee96"`);
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_985d5f728e1eebe4a3eabc43aac"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_f1c2079aca31a2cae19e1f68a9c"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_08cafdcbae0d6407effc99cf7aa"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_cd7812c96209c5bdd48a6b858b0"`);
        await queryRunner.query(`DROP TABLE "order_detail"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "shipper"`);
        await queryRunner.query(`DROP TABLE "employe"`);
    }

}

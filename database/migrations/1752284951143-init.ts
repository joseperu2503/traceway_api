import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1752284951143 implements MigrationInterface {
    name = 'Init1752284951143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tracking_sessions_status" ("id" character varying NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_47e6800df770ef446a1706262e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tracking_sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" text NOT NULL, "destination_place_id" uuid NOT NULL, "radius" double precision NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE, "estimated_end_date" TIMESTAMP WITH TIME ZONE, "status_id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e05480a9ee8114dfd102272b8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "places" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "main_text" text NOT NULL, "secondary_text" text NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_1afab86e226b4c3bc9a74465c12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "password" text NOT NULL, "name" text NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_places" ("user_id" uuid NOT NULL, "place_id" uuid NOT NULL, "last_used_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_d68673164d9e06abbb75fd8ea03" PRIMARY KEY ("user_id", "place_id"))`);
        await queryRunner.query(`ALTER TABLE "tracking_sessions" ADD CONSTRAINT "FK_f15d87deac2dfa37cd574ec3849" FOREIGN KEY ("destination_place_id") REFERENCES "places"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tracking_sessions" ADD CONSTRAINT "FK_47e6800df770ef446a1706262e6" FOREIGN KEY ("status_id") REFERENCES "tracking_sessions_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_places" ADD CONSTRAINT "FK_c16398dbf7ee91b3ea49885d714" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_places" ADD CONSTRAINT "FK_2438851c7fdcb3ed425834460af" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_places" DROP CONSTRAINT "FK_2438851c7fdcb3ed425834460af"`);
        await queryRunner.query(`ALTER TABLE "user_places" DROP CONSTRAINT "FK_c16398dbf7ee91b3ea49885d714"`);
        await queryRunner.query(`ALTER TABLE "tracking_sessions" DROP CONSTRAINT "FK_47e6800df770ef446a1706262e6"`);
        await queryRunner.query(`ALTER TABLE "tracking_sessions" DROP CONSTRAINT "FK_f15d87deac2dfa37cd574ec3849"`);
        await queryRunner.query(`DROP TABLE "user_places"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "places"`);
        await queryRunner.query(`DROP TABLE "tracking_sessions"`);
        await queryRunner.query(`DROP TABLE "tracking_sessions_status"`);
    }

}

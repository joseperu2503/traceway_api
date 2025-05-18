import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1732679895559 implements MigrationInterface {
    name = 'Init1732679895559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address_tags" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_f73e82a7f1a16fbf1c8c2f381aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address_delivery_detail" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_9c3fa2556a29747df1c95759a0f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_dishes" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dish_id" integer, "user_id" integer, CONSTRAINT "PK_d2d47cee2f5cc435b4bf4ba27d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "restaurant_categories" ("id" SERIAL NOT NULL, "name" text NOT NULL, "image" text NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_e1df9e755a3494d1290f99fe1b3" UNIQUE ("name"), CONSTRAINT "PK_a20ac3db34f60a76122d5d1d821" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dish_categories" ("id" SERIAL NOT NULL, "name" text NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "restaurant_id" integer, CONSTRAINT "UQ_b8c36d6b332fbb316738bc854e5" UNIQUE ("name"), CONSTRAINT "PK_f36318db9c4d5e3d50303b5900d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "topping_categories" ("id" SERIAL NOT NULL, "description" text NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "maxToppings" integer NOT NULL, "minToppings" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "restaurant_id" integer, CONSTRAINT "PK_7895db653c80395ccfeb0a73c54" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_restaurants" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "restaurant_id" integer, "user_id" integer, CONSTRAINT "PK_a330ec4fa688ad09dd8c2b6b11c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "restaurants" ("id" SERIAL NOT NULL, "name" text NOT NULL, "address" text NOT NULL, "logo" text NOT NULL, "backdrop" text NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "open_time" TIME NOT NULL, "close_time" TIME NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "restaurant_category_id" integer, CONSTRAINT "UQ_dfeffbef9c31936dbac54733daa" UNIQUE ("name"), CONSTRAINT "PK_e2133a72eb1cc8f588f7b503e68" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "topping_dish_orders" ("id" SERIAL NOT NULL, "units" integer NOT NULL, "dish_order_id" integer, "topping_id" integer, CONSTRAINT "PK_73e44573ce78f4f742773c11c96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dish_orders" ("id" SERIAL NOT NULL, "units" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dish_id" integer, "order_id" integer, CONSTRAINT "PK_c73a0cd9e2eecc000efd8352aaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_statuses" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_59aa93a6953b828b98972f47661" UNIQUE ("name"), CONSTRAINT "PK_76c6dc5bccb3ef1a4a8510cab3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "subtotal" double precision NOT NULL, "delivery_fee" double precision NOT NULL, "service_fee" double precision NOT NULL, "total" double precision NOT NULL, "delivery_notification_read" boolean NOT NULL DEFAULT false, "delivered_date" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer, "address_id" integer, "restaurant_id" integer, "order_status_id" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "name" text NOT NULL, "surname" text NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "phone" text NOT NULL, "mp_customer_id" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "locality" text NOT NULL, "country" text NOT NULL, "address" text NOT NULL, "detail" text NOT NULL, "references" text NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer, "address_tag_id" integer, "address_delivery_id" integer, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carts" ("id" SERIAL NOT NULL, "subtotal" double precision NOT NULL, "user_id" integer, "restaurant_id" integer, "address_id" integer, CONSTRAINT "REL_2ec1c94a977b940d85a4f498ae" UNIQUE ("user_id"), CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "topping_dish_carts" ("id" SERIAL NOT NULL, "units" integer NOT NULL, "dish_cart_id" integer, "topping_id" integer, CONSTRAINT "PK_e364d20fcb9bd9231dd48529b11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dish_carts" ("id" SERIAL NOT NULL, "units" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dish_id" integer, "cart_id" integer, CONSTRAINT "PK_0afe63dd015947534cb9b449726" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dishes" ("id" SERIAL NOT NULL, "name" text NOT NULL, "image" text NOT NULL, "description" text NOT NULL, "price" double precision NOT NULL, "stock" integer NOT NULL DEFAULT '0', "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dish_category_id" integer, CONSTRAINT "PK_f4748c8e8382ad34ef517520b7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "toppings" ("id" SERIAL NOT NULL, "description" text NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "maxLimit" integer NOT NULL, "price" double precision NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "topping_category_id" integer, CONSTRAINT "PK_6a1c9185d307454dfadc29f3019" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dish_topping" ("dish_id" integer NOT NULL, "topping_id" integer NOT NULL, CONSTRAINT "PK_005e748dadcd44c8535c4332271" PRIMARY KEY ("dish_id", "topping_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cca9fb367ef3710ed57147c89f" ON "dish_topping" ("dish_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b57a0823be3a2f6ab082b4c3e4" ON "dish_topping" ("topping_id") `);
        await queryRunner.query(`ALTER TABLE "favorite_dishes" ADD CONSTRAINT "FK_aa1622b0e3b36f635c7c1fcd6d1" FOREIGN KEY ("dish_id") REFERENCES "dishes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_dishes" ADD CONSTRAINT "FK_6b70e98bf31fb7b780f6952ed05" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dish_categories" ADD CONSTRAINT "FK_7738548e8c148e87904fc8fbdef" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topping_categories" ADD CONSTRAINT "FK_2c647b59d64d18e1ae6a5a680f7" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_restaurants" ADD CONSTRAINT "FK_29a77529313254e82b11861203e" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_restaurants" ADD CONSTRAINT "FK_0c98259b50d4df4e78652d13fea" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurants" ADD CONSTRAINT "FK_802e4db69f9c6b2c239592d878d" FOREIGN KEY ("restaurant_category_id") REFERENCES "restaurant_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topping_dish_orders" ADD CONSTRAINT "FK_6e2867946172e9e19a8aa8e5658" FOREIGN KEY ("dish_order_id") REFERENCES "dish_orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topping_dish_orders" ADD CONSTRAINT "FK_0339e458b4ed50620533ad5bf27" FOREIGN KEY ("topping_id") REFERENCES "toppings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dish_orders" ADD CONSTRAINT "FK_ab7c7c04024b86794797ca789c3" FOREIGN KEY ("dish_id") REFERENCES "dishes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dish_orders" ADD CONSTRAINT "FK_6745a461194d7e55930c9245aa8" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_d39c53244703b8534307adcd073" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_85fdda5fcce2f397ef8f117a2c6" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_f51b75ebdfdef60d264f982a60f" FOREIGN KEY ("order_status_id") REFERENCES "order_statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_4c42d639d2e2c51d4a1a4999740" FOREIGN KEY ("address_tag_id") REFERENCES "address_tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_67c4bb02315f1fd981e4fd00373" FOREIGN KEY ("address_delivery_id") REFERENCES "address_delivery_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_ad50548131c585e38d765bde166" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_64d39f6b86964e5ce06f9fecf50" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topping_dish_carts" ADD CONSTRAINT "FK_ec4601db9046a24fb86663e080b" FOREIGN KEY ("dish_cart_id") REFERENCES "dish_carts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topping_dish_carts" ADD CONSTRAINT "FK_acd806b2153c047d58d9ebdd43e" FOREIGN KEY ("topping_id") REFERENCES "toppings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dish_carts" ADD CONSTRAINT "FK_02720a0b19b5c2fd1d9b2218731" FOREIGN KEY ("dish_id") REFERENCES "dishes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dish_carts" ADD CONSTRAINT "FK_bcc131bec7cf9e4c02d2091a0e3" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dishes" ADD CONSTRAINT "FK_36b75246bf937959cbc05ae52a3" FOREIGN KEY ("dish_category_id") REFERENCES "dish_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "toppings" ADD CONSTRAINT "FK_682f71f7be06dd3f792a29a8a42" FOREIGN KEY ("topping_category_id") REFERENCES "topping_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dish_topping" ADD CONSTRAINT "FK_cca9fb367ef3710ed57147c89f8" FOREIGN KEY ("dish_id") REFERENCES "dishes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "dish_topping" ADD CONSTRAINT "FK_b57a0823be3a2f6ab082b4c3e45" FOREIGN KEY ("topping_id") REFERENCES "toppings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dish_topping" DROP CONSTRAINT "FK_b57a0823be3a2f6ab082b4c3e45"`);
        await queryRunner.query(`ALTER TABLE "dish_topping" DROP CONSTRAINT "FK_cca9fb367ef3710ed57147c89f8"`);
        await queryRunner.query(`ALTER TABLE "toppings" DROP CONSTRAINT "FK_682f71f7be06dd3f792a29a8a42"`);
        await queryRunner.query(`ALTER TABLE "dishes" DROP CONSTRAINT "FK_36b75246bf937959cbc05ae52a3"`);
        await queryRunner.query(`ALTER TABLE "dish_carts" DROP CONSTRAINT "FK_bcc131bec7cf9e4c02d2091a0e3"`);
        await queryRunner.query(`ALTER TABLE "dish_carts" DROP CONSTRAINT "FK_02720a0b19b5c2fd1d9b2218731"`);
        await queryRunner.query(`ALTER TABLE "topping_dish_carts" DROP CONSTRAINT "FK_acd806b2153c047d58d9ebdd43e"`);
        await queryRunner.query(`ALTER TABLE "topping_dish_carts" DROP CONSTRAINT "FK_ec4601db9046a24fb86663e080b"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_64d39f6b86964e5ce06f9fecf50"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_ad50548131c585e38d765bde166"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_67c4bb02315f1fd981e4fd00373"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_4c42d639d2e2c51d4a1a4999740"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_f51b75ebdfdef60d264f982a60f"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_85fdda5fcce2f397ef8f117a2c6"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_d39c53244703b8534307adcd073"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`ALTER TABLE "dish_orders" DROP CONSTRAINT "FK_6745a461194d7e55930c9245aa8"`);
        await queryRunner.query(`ALTER TABLE "dish_orders" DROP CONSTRAINT "FK_ab7c7c04024b86794797ca789c3"`);
        await queryRunner.query(`ALTER TABLE "topping_dish_orders" DROP CONSTRAINT "FK_0339e458b4ed50620533ad5bf27"`);
        await queryRunner.query(`ALTER TABLE "topping_dish_orders" DROP CONSTRAINT "FK_6e2867946172e9e19a8aa8e5658"`);
        await queryRunner.query(`ALTER TABLE "restaurants" DROP CONSTRAINT "FK_802e4db69f9c6b2c239592d878d"`);
        await queryRunner.query(`ALTER TABLE "favorite_restaurants" DROP CONSTRAINT "FK_0c98259b50d4df4e78652d13fea"`);
        await queryRunner.query(`ALTER TABLE "favorite_restaurants" DROP CONSTRAINT "FK_29a77529313254e82b11861203e"`);
        await queryRunner.query(`ALTER TABLE "topping_categories" DROP CONSTRAINT "FK_2c647b59d64d18e1ae6a5a680f7"`);
        await queryRunner.query(`ALTER TABLE "dish_categories" DROP CONSTRAINT "FK_7738548e8c148e87904fc8fbdef"`);
        await queryRunner.query(`ALTER TABLE "favorite_dishes" DROP CONSTRAINT "FK_6b70e98bf31fb7b780f6952ed05"`);
        await queryRunner.query(`ALTER TABLE "favorite_dishes" DROP CONSTRAINT "FK_aa1622b0e3b36f635c7c1fcd6d1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b57a0823be3a2f6ab082b4c3e4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cca9fb367ef3710ed57147c89f"`);
        await queryRunner.query(`DROP TABLE "dish_topping"`);
        await queryRunner.query(`DROP TABLE "toppings"`);
        await queryRunner.query(`DROP TABLE "dishes"`);
        await queryRunner.query(`DROP TABLE "dish_carts"`);
        await queryRunner.query(`DROP TABLE "topping_dish_carts"`);
        await queryRunner.query(`DROP TABLE "carts"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "order_statuses"`);
        await queryRunner.query(`DROP TABLE "dish_orders"`);
        await queryRunner.query(`DROP TABLE "topping_dish_orders"`);
        await queryRunner.query(`DROP TABLE "restaurants"`);
        await queryRunner.query(`DROP TABLE "favorite_restaurants"`);
        await queryRunner.query(`DROP TABLE "topping_categories"`);
        await queryRunner.query(`DROP TABLE "dish_categories"`);
        await queryRunner.query(`DROP TABLE "restaurant_categories"`);
        await queryRunner.query(`DROP TABLE "favorite_dishes"`);
        await queryRunner.query(`DROP TABLE "address_delivery_detail"`);
        await queryRunner.query(`DROP TABLE "address_tags"`);
    }

}

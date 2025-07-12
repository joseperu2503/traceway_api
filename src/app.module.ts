import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PlacesModule } from './places/places.module';
import { SeedCommand } from './seed/seed.command';
import { SeedModule } from './seed/seed.module';
import { TrackingModule } from './tracking/tracking.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: false,
    }),
    SeedModule,
    AuthModule,
    PlacesModule,
    TrackingModule,
  ],
  providers: [SeedCommand],
})
export class AppModule {}

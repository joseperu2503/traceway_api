import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MercadoPagoModule } from 'src/mercado-pago/mercado-pago.module';
import { HttpModule } from '@nestjs/axios';
import { FacebookService } from './services/facebook/facebook.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, FacebookService],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: '720h',
          },
        };
      },
    }),
    HttpModule,
    MercadoPagoModule,
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule, AuthService],
})
export class AuthModule {}

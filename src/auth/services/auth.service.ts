import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DataSource, Repository } from 'typeorm';
import { AuthResponse } from '../dto/auth-response.dto';
import {
  LoginRequest,
  LoginUserFacebookDto,
  LoginUserGoogleDto,
} from '../dto/login-request.dto';
import { RegisterRequest } from '../dto/register-request.dto';
import { UserEntity } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from '../models/user.model';
import { FacebookService } from './facebook.service';
import { GoogleService } from './google.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
    private readonly facebookService: FacebookService,
    private readonly googleService: GoogleService,
  ) {}

  async register(registerUserDto: RegisterRequest): Promise<AuthResponse> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { password, ...userData } = registerUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.buildAuthResponse(user);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      if (error.code === '23505') {
        throw new BadRequestException(error.detail);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async login(loginUserDto: LoginRequest) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    //si el usuario con el email no existe
    if (!user) {
      throw new UnauthorizedException(`Credentials are not valid`);
    }

    //si la contraseña es incorrecta
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException(`Credentials are not valid`);
    }

    return this.buildAuthResponse(user);
  }

  async loginGoogle(
    loginUserDto: LoginUserGoogleDto,
  ): Promise<AuthResponse> {
    const { token } = loginUserDto;

    const email = await this.googleService.validateToken(token);

    if (!email) {
      throw new UnauthorizedException(`Invalid token`);
    }

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException(`Unregistered user`);
    }

    return this.buildAuthResponse(user);
  }

  async loginFacebook(
    loginUserDto: LoginUserFacebookDto,
  ): Promise<AuthResponse> {
    const { token: accessToken, platform } = loginUserDto;

    const email: string | null = await this.facebookService.validateToken(
      accessToken,
      platform,
    );

    if (!email) {
      throw new UnauthorizedException(`Invalid token`);
    }

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException(`Unregistered user`);
    }

    return this.buildAuthResponse(user);
  }

  private getJwt(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private buildAuthResponse(user: User): AuthResponse {
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        phone: user.phone,
      },
      token: this.getJwt({ id: user.id }),
    };
  }
}

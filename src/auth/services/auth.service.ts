import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { DataSource, Repository } from 'typeorm';
import {
  LoginUserDto,
  LoginUserFacebookDto,
  LoginUserGoogleDto,
} from '../dto/login-user-dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { User } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interfaces';
import { FacebookService } from './facebook.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
    private readonly facebookService: FacebookService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
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

      const me = this.me(user);

      return { user: me, token: this.getJwt({ id: user.id }) };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      if (error.code === '23505') {
        throw new BadRequestException(error.detail);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
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
    const me = this.me(user);
    return { user: me, token: this.getJwt({ id: user.id }) };
  }

  async loginGoogle(loginUserDto: LoginUserGoogleDto) {
    const { idToken } = loginUserDto;

    const client = new OAuth2Client({
      clientId: process.env.GOOGLE_CLIENT_ID,
    });

    const ticket = await client.verifyIdToken({
      idToken: idToken,
    });

    const payload: TokenPayload | undefined = ticket.getPayload();

    if (!payload) {
      throw new UnauthorizedException(`Invalid token`);
    }

    const email = payload.email;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException(`Unregistered user`);
    }

    const me = this.me(user);
    return { user: me, token: this.getJwt({ id: user.id }) };
  }

  async loginFacebook(loginUserDto: LoginUserFacebookDto) {
    const { accessToken, platform } = loginUserDto;

    let email: string | null = null;

    if (platform == 'android') {
      email = await this.facebookService.validateAndroidToken(accessToken);
    } else {
      email = await this.facebookService.validateIosJwt(accessToken);
    }

    if (!email) {
      throw new UnauthorizedException(`Invalid token`);
    }

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException(`Unregistered user`);
    }

    const me = this.me(user);
    return { user: me, token: this.getJwt({ id: user.id }) };
  }

  me(user: User) {
    const { id, email, name, surname, phone } = user;

    return {
      id,
      email,
      name,
      surname,
      phone,
    };
  }

  async update(user: User, UpdateAuthDto: UpdateAuthDto) {
    this.userRepository.merge(user, UpdateAuthDto);

    await this.userRepository.save(user);
    return this.me(user);
  }

  private getJwt(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async findOne(userId: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id: userId });
    return user;
  }
}

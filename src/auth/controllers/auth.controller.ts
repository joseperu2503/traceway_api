import { Body, Controller, Get, HttpCode, Post, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from '../decorators/get-user.decorator';
import { JwtAuth } from '../decorators/jwt-auth.decorator';
import {
  LoginUserDto,
  LoginUserFacebookDto,
  LoginUserGoogleDto,
} from '../dto/login-user-dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { User } from '../entities/user.entity';
import { AuthService } from '../services/auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register a new user',
    description:
      'Creates a new user account with email, password, name, surname, and phone.',
  })
  @ApiBody({
    type: RegisterUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully.',
  })
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({
    summary: 'User login',
    description:
      'Authenticates a user with their email and password, returning an access token.',
  })
  @ApiBody({
    type: LoginUserDto,
  })
  @ApiResponse({
    status: 200,
    description: 'User authenticated successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid email or password.',
  })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @ApiExcludeEndpoint()
  @Post('login-google')
  loginGoogle(@Body() loginUserDto: LoginUserGoogleDto) {
    return this.authService.loginGoogle(loginUserDto);
  }

  @ApiExcludeEndpoint()
  @Post('login-facebook')
  loginFacebook(@Body() loginUserDto: LoginUserFacebookDto) {
    return this.authService.loginFacebook(loginUserDto);
  }

  @Put('update')
  @ApiExcludeEndpoint()
  @JwtAuth()
  update(@GetUser() user: User, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(user, updateAuthDto);
  }

  @Get('me')
  @ApiOperation({
    summary: "Retrieve the authenticated user's details",
  })
  @JwtAuth()
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiBearerAuth()
  me(@GetUser() user: User) {
    return this.authService.me(user);
  }
}

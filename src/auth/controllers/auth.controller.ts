import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import {
  LoginRequest,
  LoginUserFacebookDto,
  LoginUserGoogleDto,
} from '../dto/login-request.dto';
import { RegisterRequest } from '../dto/register-request.dto';
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
    type: RegisterRequest,
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully.',
  })
  register(@Body() registerUserDto: RegisterRequest) {
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
    type: LoginRequest,
  })
  @ApiResponse({
    status: 200,
    description: 'User authenticated successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid email or password.',
  })
  login(@Body() loginUserDto: LoginRequest) {
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
}

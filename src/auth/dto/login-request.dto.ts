import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsString } from 'class-validator';

export class LoginRequest {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'test1@gmail.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Abc123',
  })
  @IsString()
  password: string;
}

export class LoginUserGoogleDto {
  @IsString()
  idToken: string;
}

export class LoginUserFacebookDto {
  @IsString()
  accessToken: string;

  @IsString()
  @IsIn(['android', 'ios'])
  platform: 'android' | 'ios';
}

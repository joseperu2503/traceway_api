import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'The password of the user, must contain uppercase, lowercase, and a number',
    example: 'Password123!',
    minLength: 6,
    maxLength: 50,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The surname of the user',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '+1234567890',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;
}

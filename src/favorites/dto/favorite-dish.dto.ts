import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class FavoriteDishDto {
  @ApiProperty({
    description: 'The dish ID',
    example: 1,
    minimum: 0,
  })
  @IsInt()
  @IsPositive()
  readonly dishId: number;
}

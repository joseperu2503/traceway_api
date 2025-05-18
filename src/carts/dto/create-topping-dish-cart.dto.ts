import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class CreateToppingDishCartDto {
  @IsInt()
  @IsPositive()
  readonly dishCartId: number;

  @ApiProperty({
    description: 'The ID of the topping to be added.',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  readonly toppingId: number;

  @ApiProperty({
    description: 'The number of units of the topping.',
    example: 2,
  })
  @IsInt()
  @IsPositive()
  readonly units: number;
}

import { IsInt, IsPositive } from 'class-validator';

export class JoinOrderDto {
  @IsInt()
  @IsPositive()
  readonly orderId: number;
}

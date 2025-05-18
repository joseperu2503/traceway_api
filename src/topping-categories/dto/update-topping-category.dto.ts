import { PartialType } from '@nestjs/mapped-types';
import { CreateToppingCategoryDto } from './create-topping-category.dto';

export class UpdateToppingCategoryDto extends PartialType(
  CreateToppingCategoryDto,
) {}

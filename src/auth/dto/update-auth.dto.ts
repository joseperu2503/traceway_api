import { PartialType } from '@nestjs/mapped-types';
import { RegisterRequest } from './register-request.dto';

export class UpdateAuthDto extends PartialType(RegisterRequest) {}

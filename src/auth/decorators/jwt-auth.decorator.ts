import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OptionalAuthGuard } from '../guards/optional-auth.guard';

export function JwtAuth(optional = false) {
  const guard = optional ? OptionalAuthGuard : AuthGuard();
  return applyDecorators(UseGuards(guard));
}

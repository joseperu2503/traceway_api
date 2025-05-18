import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const user = req.user;
  // Si no hay usuario, simplemente devuelve null
  return !data ? user : user?.[data];
});

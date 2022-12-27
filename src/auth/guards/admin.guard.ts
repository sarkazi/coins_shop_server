import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserEntity } from 'src/user/entities/user.entity'

export class OnlyAdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: UserEntity }>()
    const user = request.user

    if (!user.isAdmin) throw new ForbiddenException('Недостаточно прав')

    return user.isAdmin
  }
}

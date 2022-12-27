import { applyDecorators, UseGuards } from '@nestjs/common'
import { OnlyAdminGuard } from 'src/auth/guards/admin.guard'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

export const Auth = (role?: 'admin') =>
  applyDecorators(
    role ? UseGuards(JwtAuthGuard, OnlyAdminGuard) : UseGuards(JwtAuthGuard),
  )

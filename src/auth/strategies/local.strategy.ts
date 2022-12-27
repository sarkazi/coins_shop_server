import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { LoginUserDto } from '../dto/login-user.dto'
import { UserEntity } from 'src/user/entities/user.entity'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'login', passwordField: 'password' })
  }

  async validate(dto: LoginUserDto): Promise<UserEntity> {
    const user = await this.authService.validateUser(dto)
    if (!user) {
      throw new UnauthorizedException('Неверный логин или пароль!')
    }
    return user
  }
}

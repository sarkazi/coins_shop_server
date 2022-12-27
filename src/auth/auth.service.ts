import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { genSalt, compare, hash } from 'bcrypt'
import { UserEntity } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'
import { LoginUserDto } from './dto/login-user.dto'
import { RegUserDto } from './dto/reg-user.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(dto: LoginUserDto) {
    const user = await this.validateUser(dto)

    const accessToken = await this.jwtService.signAsync(
      { id: user.id, username: user.login },
      {
        expiresIn: '1h',
      },
    )
    const refreshToken = await this.jwtService.signAsync(
      { id: user.id, username: user.login },
      {
        expiresIn: '4h',
      },
    )

    return {
      ...user,
      accessToken,
      refreshToken,
    }
  }

  async registerUser(dto: RegUserDto) {
    const user = await this.userService.findOneByLogin(dto.login)

    if (user)
      throw new ForbiddenException(
        'Пользователь с таким логином уже зарегистрирован!',
      )

    const salt = await genSalt(10)

    const hashPassword = await hash(dto.password, salt)

    const newUser = this.userRepo.create({
      login: dto.login,
      password: hashPassword,
    })

    const saveUser = await this.userRepo.save(newUser)

    const accessToken = await this.jwtService.signAsync(
      { id: saveUser.id },
      {
        expiresIn: '1h',
      },
    )
    const refreshToken = await this.jwtService.signAsync(
      { id: saveUser.id },
      {
        expiresIn: '4h',
      },
    )

    return {
      ...saveUser,
      accessToken,
      refreshToken,
    }
  }

  async validateUser(dto: LoginUserDto) {
    const user = await this.userService.findOneByLogin(dto.login)

    if (!user)
      throw new ForbiddenException(
        'Пользователь с таким логином не найден. Перейдите к регистрации!',
      )

    const isValidPassword = await compare(dto.password, user.password)

    if (!isValidPassword)
      throw new UnauthorizedException('Неверный email или пароль!')

    return user
  }
}

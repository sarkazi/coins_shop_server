import { IsString, MinLength, IsEmail } from 'class-validator'

export class RegUserDto {
  @IsString()
  login: string

  @IsString()
  @MinLength(8, { message: 'Длина пароля не менее 8 символов!' })
  password: string
}

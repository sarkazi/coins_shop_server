import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
  UsePipes,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginUserDto } from './dto/login-user.dto'
import { RegUserDto } from './dto/reg-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  register(@Body() dto: RegUserDto) {
    return this.authService.registerUser(dto)
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  login(@Body() dto: LoginUserDto) {
    return this.authService.loginUser(dto)
  }
}

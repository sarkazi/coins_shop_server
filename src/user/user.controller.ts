import { Controller, Get, Param } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.userService.findOneUser(id)
  }

  @Get()
  finAll() {
    return this.userService.findAllUsers()
  }
}

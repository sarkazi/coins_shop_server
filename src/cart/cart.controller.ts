import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common'
import { Auth } from 'src/decorators/auth.decorator'
import { CartService } from './cart.service'
import { CreateCartDto } from './dto/create-cart.dto'
import { UpdateCartDto } from './dto/update-cart.dto'

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @HttpCode(200)
  //  @Auth()
  create(@Body() dto: CreateCartDto) {
    return this.cartService.create(dto.user_id)
  }

  @Get()
  @HttpCode(200)
  getAllCarts() {
    return this.cartService.getAllCart()
  }

  @Get('/:id')
  @HttpCode(200)
  getOneCart(@Param('id') id: number) {
    return this.cartService.findCartById(id)
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  UploadedFiles,
  Query,
} from '@nestjs/common'
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express'
import { CoinsService } from './coins.service'
import { UpdateCoinDto } from './dto/update-coin.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { Auth } from 'src/decorators/auth.decorator'
import { FileDto } from 'src/file/file.dto'
import { PutCoinDto } from './dto/put-coin.dto'
import { FindCoinDto } from './dto/find-coin.dto'
import { DeleteCoinDto } from './dto/delete-coin.dto'
import { SearchTermDto } from './dto/search-term.dto'

@Controller('coins')
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}

  @HttpCode(200)
  @Get()
  findAll(
    @Query('sort') sort?: 'ASC' | 'DESC',
    @Query('mainInfo') mainInfo?: string,
    @Query('country') country?: string,
    @Query('metal') metal?: string,
    @Query('quality') quality?: string,
    @Query('priceFrom') priceFrom?: string,
    @Query('priceTo') priceTo?: string,
    @Query('yearFrom') yearFrom?: string,
    @Query('yearTo') yearTo?: string,
  ) {
    return this.coinsService.findAll(
      sort,
      mainInfo,
      country,
      metal,
      quality,
      priceFrom,
      priceTo,
      yearFrom,
      yearTo,
    )
  }

  @HttpCode(200)
  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.coinsService.findOneById(id)
  }

  @HttpCode(200)
  @Get('/by-cat/:id')
  findByCat(
    @Param('id') id: number,
    @Query('take') take?: string,
    @Query('skip') skip?: string,
  ) {
    return this.coinsService.findAllByCat(id, take, skip)
  }

  @HttpCode(200)
  @Get('/similar/:id')
  findSimilar(@Param('id') id: number) {
    return this.coinsService.findSimilarCoins(id)
  }

  @HttpCode(200)
  //  @Auth()
  @Get('/by-cart/:id')
  findByCart(@Param('id') id: number) {
    return this.coinsService.findAllByCart(id)
  }

  @HttpCode(200)
  //  @Auth('admin')
  @Post()
  create() {
    return this.coinsService.createCoin()
  }

  @HttpCode(200)
  //  @Auth()
  @Patch('/put-coin-cart')
  putCoinCart(@Body() dto: PutCoinDto) {
    return this.coinsService.putCoinInCart(dto)
  }

  @HttpCode(200)
  @Patch('/delete-from-cart')
  deleteFromCart(@Body() dto: DeleteCoinDto) {
    return this.coinsService.deleteCoinFromCart(dto)
  }

  @HttpCode(200)
  //  @Auth('admin')
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.coinsService.deleteCoin(id)
  }

  @HttpCode(200)
  //  @Auth()
  @Patch('/change-views/:id')
  changeViews(@Param('id') id: number) {
    return this.coinsService.changeViews(id)
  }

  @HttpCode(200)
  //  @Auth('admin')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'frontImage', maxCount: 1 },
      { name: 'backImage', maxCount: 1 },
    ]),
  )
  @UsePipes(new ValidationPipe())
  @Patch('/:id')
  update(
    @Body() dto: UpdateCoinDto,
    @Param('id') id: number,
    @UploadedFiles()
    files?: FileDto,
  ) {
    return this.coinsService.updateCoin(dto, id, files)
  }
}

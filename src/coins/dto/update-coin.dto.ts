import { IsString, IsNumber } from 'class-validator'

export class UpdateCoinDto {
  //  @IsString()
  name?: string
  //  @IsString()
  description?: string
  //  @IsString()
  issuingCountry?: string
  //  @IsString()
  composition?: string
  //  @IsString()
  quality?: string
  //  @IsString()
  denomination?: string
  //  @IsNumber()
  year?: number
  //  @IsNumber()
  weight?: string
  //  @IsNumber()
  price?: number
  //  @IsString()
  category?: number
}

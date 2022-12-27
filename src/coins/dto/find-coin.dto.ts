import { IsString, IsNumber } from 'class-validator'

export class FindCoinDto {
  take?: number
  skip?: number
}

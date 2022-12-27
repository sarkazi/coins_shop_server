import { IsString, IsNumber } from 'class-validator'

export class PutCoinDto {
  user_id: number
  coin_id: number
}

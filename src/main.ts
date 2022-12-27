import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.setGlobalPrefix('api')
  const port = process.env.PORT
  await app.listen(process.env.PORT || 7100, () => {
    console.log(`Приложение запущено на ${port} порту`)
  })
}
bootstrap()

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { testMiddleware } from "./middleware"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  /**
   * class형태의 미들웨어 구현시 DI를 사용한다면 app.use에서 사용할 수 없다.
   * 아마, app이 실행되기 전이기 때문에 instantiated되지 않아서 일 것이다.
   * 사용하려면 AppModule에서 forRoot('*') 를 이용할 수 있다.
   * TypeError: Class constructor DiMiddleware cannot be invoked without 'new'
   */
  // app.use(testMiddleware, DiMiddleware)
  app.use(testMiddleware)
  await app.listen(3000)
}
bootstrap()

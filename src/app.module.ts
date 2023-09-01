import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { APP_FILTER } from "@nestjs/core"
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CatController } from './cats/cat.controller'
import { CatModule } from './cats/cat.module'
import { DogModule } from "./dogs/dog.module"
import { ExceptModule } from "./except/except.module"
import { AllExceptionsFilter } from "./filters/all.exception.filter"
import { LoggerMiddleware, testMiddleware } from "./middleware"

@Module({
  imports: [CatModule, ExceptModule, DogModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      /**
       * Filter에서 Di가 될 경우 useGlobalFilters를 이용한 전역 필터는 불가능하다.
       * 아래와 같이 AppModule에서 useClass를 이용하면 Di를 사용할 수 있다.
       * AppModule에 세팅되어 있으므로 사실상 전역 필터로 적용된다.
       */
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, testMiddleware)
      .exclude({ path: 'cats', method: RequestMethod.POST })
      // .forRoutes('cats')
      // .forRoutes({ path: 'cats', method: RequestMethod.POST }) // version?: VersionValue; // TODO: version option은 언제 쓰지??
      .forRoutes(CatController)
  }
}

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CatController } from './cats/cat.controller'
import { CatModule } from './cats/cat.module'
import { LoggerMiddleware, testMiddleware } from "./middleware"

@Module({
  imports: [CatModule],
  controllers: [AppController],
  providers: [AppService],
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

import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { DiMiddleware } from "../middleware"
import { CatController } from './cat.controller'
import { CatService } from './cat.service'

/*
 * modules are singletons by default
 * controller: 인스턴트화 대상의 컨트롤러 셋
 * providers: 인스턴트화 대상의 프로바이더 셋. 모듈내에서 공유할 수 있다.
 * imports: 해당 모듈에서 사용되는 외부 프로바이더를 사용하기 위한 외부 모듈 셋.
 * exports: 해당 모듈에서 사용되며 외부로 노출(공유)할 프로바이더 셋.
 */

// @Global() // Global scope의 모듈선언: 다른 모듈에서 import할 필요없이 글로벌로 inject되어 어디서든 사용할 수 있다. (추천하진 않는다.)
// 한번만 생성된다.
@Module({
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule implements NestModule {
  constructor(private catService: CatService) {
    // inject 가능
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DiMiddleware) // DiMiddleware에서 CatService를 inject하고 있다.
      .forRoutes('*')
  }
}

import { Catch, ArgumentsHost } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'

/**
 * BaseExceptionFilter를 확장하여 Filter를 구현가능
 * BaseFilter는 Framework에서 자체적으로 instantiated되기 때문에
 * controller나 method 스코프에서는 new 를 사용한 초기화를 하면 안된다.
 * (단, 클래스 주입은 됨.)
 * TypeError: Cannot read properties of undefined (reading 'isHeadersSent') 발생
 */
@Catch()
export class ExtendedExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host)
    console.log('### 111', 111)
  }
}

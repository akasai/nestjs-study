import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'

/**
 * guard는 단일 행동만을 갖는 객체.
 * 인증처리를 보통 middleware에서 처리하지만
 * nest의 middleware는 context의 다음 행동에 대한 판단이 불가능하다.
 * middleware보다는 pipe, intercepter, filter와 더 유사하다고 볼 수 있다.
 *
 * guard는 middleware다음 intercepter나 pipe 전에 실행된다.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  // Guard는 반드시 canActivate 함수를 상속받아야 하며, async|sync 다 가능하다.
  // if it returns true, the request will be processed.
  // if it returns false, Nest will deny the request.
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const request = context.switchToHttp().getRequest()
    return true
  }
}

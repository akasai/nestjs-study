import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException) // comma-separated list를 사용하여 다양한 exception을 필터링할 수 있다.
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    // platform-fastify 를 사용한다면 response.json() 대신 response.send() 을 사용한다.
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      description: 'http exception',
      path: request.url,
    })
  }
}

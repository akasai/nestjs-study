import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  HttpStatus, UseFilters
} from "@nestjs/common"
import { CustomException } from '../exceptions/custom.exception'
import { HttpExceptionFilter, MethodExceptionFilter } from "../filters"
import { ExtendedExceptionFilter } from "../filters/extended.exception.filter"

/**
 * @BuiltinExceptions
 * BadRequestException
 * UnauthorizedException
 * NotFoundException
 * ForbiddenException
 * NotAcceptableException
 * RequestTimeoutException
 * ConflictException
 * GoneException
 * HttpVersionNotSupportedException
 * PayloadTooLargeException
 * UnsupportedMediaTypeException
 * UnprocessableEntityException
 * InternalServerErrorException
 * NotImplementedException
 * ImATeapotException
 * MethodNotAllowedException
 * BadGatewayException
 * ServiceUnavailableException
 * GatewayTimeoutException
 * PreconditionFailedException
 */
@Controller('except')
@UseFilters(HttpExceptionFilter)
export class ExceptController {
  @Get()
  throwException() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
  }

  @Get('/custom-msg')
  throwCustomExceptionMessage() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      },
      HttpStatus.FORBIDDEN,
      {
        cause: new Error(), // 외부로 노출되진 않는다(default일 경우). exception filter에서 원인을 로깅할때 유용하다.
        description: 'cuz, this is custom',
      },
    )
  }

  @Get('/custom')
  throwCustomException() {
    throw new CustomException()
  }

  /**
   * 인스턴스 대신 클래스를 사용하여 필터를 적용.
   * Nest는 전체 모듈에서 동일한 클래스의 인스턴스를 쉽게 재사용할 수 있기 때문에 메모리 사용량을 줄일 수 있다.
   */
  @UseFilters(ExtendedExceptionFilter)
  @Get('/bad')
  throwBadRequestException() {
    throw new BadRequestException('Something bad happened', {
      cause: new Error(),
      description: 'Some error description',
    })
  }
}

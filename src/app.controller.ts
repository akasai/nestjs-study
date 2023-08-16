import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect
} from "@nestjs/common"
import { Observable, of } from 'rxjs'
import { AppService } from './app.service'
import { CreateDto } from "./models/dto"

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  creat(): string {
    return 'This action adds a new cat'
  }

  @Post('/user')
  creatUser(@Body() body: CreateDto): string {
    return `name: ${body.name}, age: ${body.age}`
  }

  @Post('/http-code')
  @HttpCode(202)
  @Header('Cache-Control', 'none')
  creat204Response(): string {
    return 'This action return 202'
  }

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('/re')
  @Redirect('/', 301)
  getRedirect(@Query('version') version?: string) {
    // 아래 형태의 Return은 위의 @redirect 데코레이터를 오버라이드합니다.
    if (version && version === 'v1') {
      return { url: '/hi', statusCode: 301 }
    }
  }

  @Get('/hi')
  getString(): string {
    return 'Hi World!'
  }

  @Get('/ob')
  findAll(): Observable<any[]> {
    return of([])
  }

  // 매개변수가 있는 라우트는 정적라우트 뒤에 선언해야한다.
  @Get('/:id(\\d+)') // regex 가능
  getParameter(@Param('id') id: number): string {
    return `${id} hi?`
  }
}

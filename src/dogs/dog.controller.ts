import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe, ParseUUIDPipe, Query
} from "@nestjs/common"

@Controller('dogs')
export class DogController {
  @Get()
  async find(
    @Query('id', ParseIntPipe) id: number
  ) {
    return id
  }

  /**
   * ParseIntPipe class를 그대로 주입하면 프레임워크에서 인스턴스화 시킵니다.
   * @param id
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return id
  }

  @Get(':uuid')
  async findUUID(@Param('uuid', new ParseUUIDPipe({ version: '3' })) uuid: number) {
    return uuid
  }

  /**
   * ParseIntPipe 인스턴스를 주입하면 부가적인 옵션을 사용할 수 있습니다.
   * @param id
   */
  @Get('/ids/:id')
  async findOneById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return id
  }
}

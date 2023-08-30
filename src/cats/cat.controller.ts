import { Controller, Get, Post } from '@nestjs/common'
import { CustomException } from "../exceptions"
import { CatService } from './cat.service'

@Controller('cats')
export class CatController {
  constructor(private catService: CatService) {}

  @Get()
  getCatList() {
    return []
  }

  @Get('/except')
  getCatException() {
    throw new CustomException()
  }

  @Post()
  createCat() {
    return this.catService.createCat()
  }
}

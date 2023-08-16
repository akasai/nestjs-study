import { Controller, Get, Post } from '@nestjs/common'
import { CatService } from './cat.service'

@Controller('cats')
export class CatController {
  constructor(private catService: CatService) {}

  @Get()
  getCatList() {
    return []
  }

  @Post()
  createCat() {
    return this.catService.createCat()
  }
}

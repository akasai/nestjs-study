import { Controller, Post } from '@nestjs/common'
import { CatService } from './cat.service'

@Controller('cats')
export class CatController {
  constructor(private catService: CatService) {}

  @Post('')
  createCat() {
    return this.catService.createCat()
  }
}

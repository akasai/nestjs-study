import { Test, TestingModule } from '@nestjs/testing'
import { CatService } from './cat.service'

describe('CatService', () => {
  let catService: CatService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [CatService],
    }).compile()

    catService = app.get<CatService>(CatService)
  })

  describe('root', () => {
    it('should return "created cat"', () => {
      expect(catService.createCat()).toBe('cat created')
    })
  })
})

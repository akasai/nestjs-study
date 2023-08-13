import { Test, TestingModule } from '@nestjs/testing'
import { CatController } from './cat.controller'
import { CatModule } from "./cat.module"

describe('CatController', () => {
  let catController: CatController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
			imports: [CatModule],
    }).compile()

    catController = app.get<CatController>(CatController)
  })

	describe('root', () => {
		it('should return "cat created"', () => {
			expect(catController.createCat()).toBe('cat created')
		})
	})
})

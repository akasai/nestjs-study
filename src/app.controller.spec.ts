import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!')
    })

    it('should return "Hi World!"', () => {
      expect(appController.getString()).toBe('Hi World!')
    })

    it('should return "undefined"', () => {
      expect(appController.getRedirect()).toBe(undefined)
    })

    it('should return "undefined"', () => {
      expect(appController.getRedirect('v2')).toBe(undefined)
    })

    it('should return "Object"', () => {
      expect(appController.getRedirect('v1')).toStrictEqual({"statusCode": 301, "url": "/hi"})
    })

    it('should return "1 hi?"', () => {
      expect(appController.getParameter(1)).toBe('1 hi?')
    })

    it('should return "This action adds a new cat"', () => {
      expect(appController.creat()).toBe('This action adds a new cat')
    })

    it('should return "This action return 202"', () => {
      expect(appController.creat204Response()).toBe('This action return 202')
    })
  })
})

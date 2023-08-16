import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })

  it('/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/1')
      .expect(200)
      .expect('1 hi?')
  })

  it('/re (GET)', () => {
    return request(app.getHttpServer())
      .get('/re')
      .expect(301)
      .expect('Location', '/')
  })

  it('/re?version=v1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/re')
      .query({ version: 'v1' })
      .expect(301)
      .expect('Location', '/hi')
  })

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/')
      .expect(201)
      .expect('This action adds a new cat')
  })

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({ name: 'ksj', age: 35 })
      .expect(201)
      .expect(`name: ksj, age: 35`)
  })

  it('/http-code (POST)', () => {
    return request(app.getHttpServer())
      .post('/http-code')
      .expect(202)
      .expect('This action return 202')
  })
})

describe('CatController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/cats (GET)', () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect([])
  })

  it('/cats (POST)', () => {
    return request(app.getHttpServer())
      .post('/cats')
      .send()
      .expect(201)
      .expect('cat created')
  })
})

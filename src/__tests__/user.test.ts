import supertest from 'supertest'
import web from '../middlewares/web'
import prisma from '../utils/client'
import { generateRefreshToken } from '../utils/jwt'

const getRefreshToken = (): string => {
  const dummyUser = {
    id: '5b5372cf-e5e1-44f7-a968-0e791df57eb3',
    email: 'test2@gmail.com',
    name: 'test 2',
    role: 'user'
  }

  return generateRefreshToken(dummyUser)
}

describe('user', () => {
  it('user login data valid', async () => {
    const response = await supertest(web).post('/api/v1/login').send({
      email: 'test2@gmail.com',
      password: '123456'
    })
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('login user successfully')
  })

  it('user login email invalid', async () => {
    const response = await supertest(web).post('/api/v1/login').send({
      email: 'tes@gmail.com',
      password: '123456'
    })
    expect(response.status).toBe(404)
    expect(response.body.error).toEqual('email or password wrong')
  })

  it('user login password invalid', async () => {
    const response = await supertest(web).post('/api/v1/login').send({
      email: 'test2@gmail.com',
      password: '12345'
    })
    expect(response.status).toBe(400)
    expect(response.body.error).toEqual('email or password wrong')
  })

  afterEach(async () => {
    await prisma.user.deleteMany({
      where: {
        email: 'test123@gmail.com'
      }
    })
  })

  it('register user data valid', async () => {
    const response = await supertest(web).post('/api/v1/register').send({
      email: 'test123@gmail.com',
      name: 'test 123',
      password: '123456',
      confirmPassword: '123456'
    })
    expect(response.status).toBe(201)
    expect(response.body.message).toEqual('register user successfully')
  })

  it('register user data invalid', async () => {
    const response = await supertest(web).post('/api/v1/register').send({
      email: 'test123@gmail.com',
      name: 'test 123',
      password: '1234567',
      confirmPassword: '123456'
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toEqual('register user failed')
  })

  it('refresh token valid', async () => {
    const response = await supertest(web)
      .get('/api/v1/refresh')
      .set('Authorization', `Bearer ${getRefreshToken()}`)
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('refresh token successfully')
    expect(response.body.accessToken).toBeDefined()
  })

  it('refresh token invalid', async () => {
    const response = await supertest(web)
      .get('/api/v1/refresh')
      .set('Authorization', `Bearer siiisee2343`)
    expect(response.status).toBe(401)
    expect(response.body.message).toEqual('Refresh token failed')
  })
})

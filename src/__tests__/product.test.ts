import supertest from 'supertest'
import { generateAccessToken } from '../utils/jwt'
import web from '../middlewares/web'
import prisma from '../utils/client'

const getAccessToken = (): string => {
  const dummyUser = {
    id: '5b5372cf-e5e1-44f7-a968-0e791df57eb3',
    email: 'test2@gmail.com',
    name: 'test 2',
    role: 'user'
  }

  return generateAccessToken(dummyUser)
}

describe('barang', () => {
  beforeEach(async () => {
    await prisma.product.create({
      data: {
        name: 'products 1 ',
        stock: 1000,
        price: 6300,
        productById: '5b5372cf-e5e1-44f7-a968-0e791df57eb3'
      }
    })
  })

  it('should get all data products', async () => {
    const token = getAccessToken()

    const response = await supertest(web)
      .get('/api/v1/products')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body.data).toBeDefined()
    expect(response.body.data.length).toBeGreaterThan(0)
    expect(response.body.message).toEqual('Get all Product successfully')
  })

  it('should not get all data products if no token', async () => {
    const response = await supertest(web).get('/api/v1/products')
    expect(response.status).toEqual(401)
    expect(response.body.message).toEqual('Please login first')
  })

  it('should get data products by id and token', async () => {
    const token = getAccessToken()

    const response = await supertest(web)
      .get('/api/v1/products/84')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body.data).toBeDefined()
    expect(response.body.message).toEqual('Get Product by Id successfully')
  })

  it('should not get data products by id if no token', async () => {
    const response = await supertest(web).get('/api/v1/products/1')

    expect(response.status).toEqual(401)
    expect(response.body.message).toEqual('Please login first')
  })

  it('should create product with token', async () => {
    const token = getAccessToken()

    const response = await supertest(web)
      .post('/api/v1/products')
      .send({
        name: 'products 6 ',
        stock: 1000,
        price: 6300
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(201)
    expect(response.body.message).toEqual(
      'create product data successfully save'
    )
  })

  it('should  not create product if no token', async () => {
    const response = await supertest(web).post('/api/v1/products').send({
      name: 'products 6 ',
      stock: 1000,
      price: 6300
    })
    expect(response.status).toEqual(401)
    expect(response.body.message).toEqual('Please login first')
  })

  it('should  not create product if data not valid', async () => {
    const token = getAccessToken()
    const response = await supertest(web)
      .post('/api/v1/products')
      .send({
        name: '',
        stock: 1000,
        price: 6300
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toEqual(400)
    expect(response.body.message).toEqual('Input data failed')
  })

  it('should update product with token', async () => {
    const token = getAccessToken()

    const response = await supertest(web)
      .put('/api/v1/products/84')
      .send({
        name: 'products 1 updated ',
        stock: 1000,
        price: 6300
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body.message).toEqual(
      'update product data successfully save'
    )
  })

  it('should  not update product if no token', async () => {
    const response = await supertest(web).put('/api/v1/products/84').send({
      name: 'products 6 updated updated',
      stock: 1000,
      price: 6300
    })
    expect(response.status).toEqual(401)
    expect(response.body.message).toEqual('Please login first')
  })

  it('should  not update product if data not valid', async () => {
    const token = getAccessToken()
    const response = await supertest(web)
      .put('/api/v1/products/1')
      .send({
        name: '',
        stock: 1000,
        price: 6300
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toEqual(400)
    expect(response.body.message).toEqual('Input data failed')
  })

  it('should  delete product with token', async () => {
    const token = getAccessToken()
    const response = await supertest(web)
      .delete('/api/v1/products/85')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toEqual(200)
    expect(response.body.message).toEqual('Delete Product successfully')
  })

  afterAll(async () => {
    await prisma.product.deleteMany({
      where: {
        name: 'products 6'
      }
    })
  })
  afterAll(async () => {
    await prisma.product.deleteMany({
      where: {
        name: 'products 1'
      }
    })
  })
})

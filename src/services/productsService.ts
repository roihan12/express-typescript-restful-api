import ProductsType from '../types/productsType'
import prisma from '../utils/client'

export const getProducts = async (): Promise<ProductsType[]> => {
  const data = await prisma.product.findMany()

  return data
}

export const getProductById = async (
  id: number
): Promise<ProductsType | null> => {
  const data = await prisma.product.findUnique({
    where: { id }
  })

  return data
}

export const insertProduct = async (
  payload: ProductsType
): Promise<ProductsType | null> => {
  console.log(payload)
  const data = await prisma.product.create({
    data: payload
  })

  return data
}

export const updateProduct = async (
  payload: ProductsType
): Promise<ProductsType | null> => {
  const data = await prisma.product.update({
    where: { id: payload.id },
    data: { ...payload }
  })

  return data
}

export const deleteProduct = async (
  id: number
): Promise<ProductsType | null> => {
  const data = await prisma.product.delete({
    where: { id }
  })

  return data
}

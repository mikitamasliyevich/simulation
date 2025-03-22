import api, { ApiErrorType } from './api'
import { Product } from './schemas'

export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get('/product/all')
    return response.data
  },

  addProduct: async (product: Product): Promise<Product> => {
    try {
      const response = await api.put('/product', product)
      return response.data
    } catch (error) {
      const apiError = error as ApiErrorType
      if (apiError.status === 400) {
        if (apiError.message.includes('product name already exists')) {
          throw new Error('A product with this name already exists.')
        } else if (apiError.message.includes('name is missing')) {
          throw new Error('Product name is required.')
        }
      }
      throw error
    }
  },
}

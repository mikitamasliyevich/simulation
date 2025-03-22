import api, { ApiErrorType } from './api'
import { InventoryItem } from './schemas'

export const inventoryService = {
  getInventory: async (): Promise<InventoryItem[]> => {
    const response = await api.get('/inventory')
    return response.data
  },

  updateInventory: async (
    inventory: InventoryItem[]
  ): Promise<InventoryItem[]> => {
    try {
      const response = await api.post('/inventory', inventory)
      return response.data
    } catch (error) {
      const apiError = error as ApiErrorType
      if (apiError.status === 400) {
        if (apiError.message.includes('missing in the products list')) {
          throw new Error(
            "Some items don't exist in the products list. Please add them as products first."
          )
        } else if (apiError.message.includes('missing attribute')) {
          throw new Error('Inventory items must have both name and quantity.')
        }
      }
      return Promise.reject(error)
    }
  },
}

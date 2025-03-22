import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { inventoryService } from '../services/inventory'
import { InventoryItem } from '../services/schemas'

export const useInventory = () => {
  const queryClient = useQueryClient()
  const [error, setError] = useState<string | null>(null)

  const inventoryQuery = useQuery({
    queryKey: ['inventory'],
    queryFn: inventoryService.getInventory,
  })

  const updateInventoryMutation = useMutation({
    mutationFn: inventoryService.updateInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] })
      setError(null)
    },
    onError: (error) => {
      setError(error.message || 'An error occurred while updating inventory')
    },
  })

  const addItem = (newItem: InventoryItem) => {
    const currentInventory = inventoryQuery.data || []

    const existingItemIndex = currentInventory.findIndex(
      (item) => item.name === newItem.name
    )

    let updatedInventory: InventoryItem[]
    if (existingItemIndex >= 0) {
      updatedInventory = [...currentInventory]
      updatedInventory[existingItemIndex] = {
        ...updatedInventory[existingItemIndex],
        quantity:
          updatedInventory[existingItemIndex].quantity + newItem.quantity,
      }
    } else {
      updatedInventory = [...currentInventory, newItem]
    }

    updateInventoryMutation.mutate(updatedInventory)
  }

  const removeItem = (name: string) => {
    const currentInventory = inventoryQuery.data || []
    const updatedInventory = currentInventory.filter(
      (item) => item.name !== name
    )
    updateInventoryMutation.mutate(updatedInventory)
  }

  return {
    inventory: inventoryQuery.data || [],
    isLoading: inventoryQuery.isLoading,
    isUpdating: updateInventoryMutation.isPending,
    error,
    addItem,
    removeItem,
    clearError: () => setError(null),
  }
}

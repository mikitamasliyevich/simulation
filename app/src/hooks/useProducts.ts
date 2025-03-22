import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useState } from 'react'
import { productService } from '../services/product'
import { Product } from '../services/schemas'

export const useProducts = () => {
  const queryClient = useQueryClient()
  const [error, setError] = useState<string | null>(null)

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: productService.getAllProducts,
  })

  const addProductMutation = useMutation({
    mutationFn: productService.addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      setError(null)
    },
    onError: (error) => {
      setError(error.message || 'An error occurred while adding product')
    },
  })

  const addProduct = (product: Product) => {
    addProductMutation.mutate(product)
  }

  return {
    products: productsQuery.data || [],
    isLoading: productsQuery.isLoading,
    isAdding: addProductMutation.isPending,
    error,
    addProduct,
    clearError: () => setError(null),
  }
}

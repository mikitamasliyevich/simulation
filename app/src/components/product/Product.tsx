import { useState } from 'react'
import { useProducts } from '../../hooks/useProducts'
import { ProductSchema } from '../../services/schemas'
import './Product.scss'

export const Product: React.FC = () => {
  const {
    isAdding: isAddingProduct,
    error: productsError,
    addProduct,
    clearError: clearProductError,
  } = useProducts()

  const [newProductName, setNewProductName] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleAddProduct = () => {
    if (!newProductName.trim()) {
      setValidationError('Product name is required')
      return
    }

    try {
      const product = ProductSchema.parse({
        name: newProductName.trim(),
      })

      addProduct(product)
      setNewProductName('')
      setValidationError(null)
    } catch (error) {
      if (error instanceof Error) {
        setValidationError(error.message)
      }
    }
  }

  return (
    <div className="product-container">
      {(productsError || validationError) && (
        <div className="error-box">
          <strong>Error:</strong> {productsError || validationError}
          <button
            onClick={() => {
              clearProductError()
              setValidationError(null)
            }}
          >
            Dismiss
          </button>
        </div>
      )}

      <h3>Add New Product</h3>
      <div className="input-group">
        <input
          type="text"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          placeholder="New product name"
          disabled={isAddingProduct}
          className="product-input"
        />
        <button
          onClick={handleAddProduct}
          disabled={!newProductName.trim() || isAddingProduct}
          className="product-button"
        >
          {isAddingProduct ? 'Adding...' : 'Add Product'}
        </button>
      </div>
    </div>
  )
}

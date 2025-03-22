import React, { useState } from 'react'
import { useInventory } from '../../hooks/useInventory'
import { useProducts } from '../../hooks/useProducts'
import { InventoryItemSchema } from '../../services/schemas'
import './Inventory.scss'

export const Inventory: React.FC = () => {
  const {
    inventory,
    isLoading: isLoadingInventory,
    isUpdating,
    error: inventoryError,
    addItem,
    removeItem,
    clearError: clearInventoryError,
  } = useInventory()

  const {
    products,
    isLoading: isLoadingProducts,
    error: productsError,
    clearError: clearProductError,
  } = useProducts()

  const [selectedProduct, setSelectedProduct] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleAddToInventory = () => {
    if (!selectedProduct) {
      setValidationError('Please select a product')
      return
    }

    try {
      const newItem = InventoryItemSchema.parse({
        name: selectedProduct,
        quantity,
      })

      addItem(newItem)
      setSelectedProduct('')
      setQuantity(1)
      setValidationError(null)
    } catch (error) {
      if (error instanceof Error) {
        setValidationError(error.message)
      }
    }
  }

  if (isLoadingInventory || isLoadingProducts) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="inventory-container">
      <h2>Inventory</h2>

      {(inventoryError || productsError || validationError) && (
        <div className="error-box">
          <strong>Error:</strong>{' '}
          {inventoryError || productsError || validationError}
          <button
            onClick={() => {
              clearInventoryError()
              clearProductError()
              setValidationError(null)
            }}
          >
            Dismiss
          </button>
        </div>
      )}

      {inventory.length === 0 ? (
        <p className="empty">No items in inventory</p>
      ) : (
        <ul className="inventory-list">
          {inventory.map((item) => (
            <div key={item.name} className="inventory-item">
              <span>
                {item.name} - {item.quantity}
              </span>
              <button
                onClick={() => removeItem(item.name)}
                disabled={isUpdating}
              >
                Remove
              </button>
            </div>
          ))}
        </ul>
      )}

      <div className="inventory-form">
        <h3>Add to Inventory</h3>
        <div className="form-group">
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            disabled={isUpdating}
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.name} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            disabled={isUpdating}
          />
          <button
            onClick={handleAddToInventory}
            disabled={!selectedProduct || isUpdating}
          >
            {isUpdating ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}

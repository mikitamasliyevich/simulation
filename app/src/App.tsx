import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Inventory } from './components/inventory/Inventory'
import { Product } from './components/product/Product'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'

const App: React.FC = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <header>
            <h1>Inventory System</h1>
            <nav>
              <ul>
                <li>
                  <Link to="/">Inventory</Link>
                </li>
                <li>
                  <Link to="/product">Create Product</Link>
                </li>
              </ul>
            </nav>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Inventory />} />
              <Route path="/product" element={<Product />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App

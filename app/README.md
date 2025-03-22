Inventory Management System
A modern React application for managing a store's product list and inventory. This application allows users to track products in inventory and add new products to the product catalog.
📋 Overview
This application was built to manage a store's inventory system where:

The store has a list of products
The inventory can only include products from the product list
Users can view the current inventory and add new products

The application consists of 2 main pages:

Inventory List: View and manage the current inventory
Product Creation: Add new products to the product catalog

🚀 Technologies Used

React with TypeScript for the frontend
React Router DOM for navigation
React Query (TanStack Query) for API data fetching and caching
Zod for runtime type validation of API responses
Vite as the build tool and development server
SCSS for styling

⭐ Key Features
React Query Implementation
The application leverages the modern React Query library which provides numerous advantages:

Automatic caching of API responses
Built-in loading and error states
Background data refetching
Optimistic updates
Request deduplication

Type Safety with Zod
Due to uncertainty about the exact structure of API responses, Zod validation was implemented on the frontend to ensure type safety and provide better error handling when working with external data.
Simplified State Management
Given the relatively small scope of the application (2 main components), a dedicated state management library was intentionally omitted to reduce bundle size and complexity.
Project Structure
Copysimulation/app/
├── node_modules/
├── public/
├── src/
│ ├── components/
│ │ ├── inventory/
│ │ └── product/
│ ├── hooks/
│ │ ├── useInventory.ts
│ │ └── useProducts.ts
│ ├── services/
│ │ ├── api.ts
│ │ ├── inventory.ts
│ │ ├── product.ts
│ │ └── schemas.ts
│ ├── App.css
│ ├── App.tsx
│ ├── main.tsx
│ └── vite-env.d.ts
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
Development Notes
This application was developed in just a few hours as a demonstration of React Query and modern React patterns. While functional, there are several areas for improvement and expansion that could be addressed in future iterations:

Add proper error handling and user feedback
Implement more sophisticated validation
Add unit and integration tests
Expand the UI with filtering and sorting capabilities
Add pagination for larger inventories
Implement user authentication

Available Scripts
jsonCopy"scripts": {
"dev": "vite", // Start the development server
"build": "tsc -b && vite build", // Type-check and build for production
"lint": "eslint .", // Run ESLint to find code issues
"preview": "vite preview", // Preview the production build locally
"format": "prettier --write ." // Format code with Prettier
}
Getting Started

Clone the repository
Install dependencies:
Copynpm install

Start the development server:
Copynpm run dev

Future Enhancements
Some areas for potential improvement to discuss:

Adding a more robust caching strategy
Implementing optimistic updates for better UX
Adding filtering and search capabilities
Expanding validation and error handling
Implementing user roles and permissions
Adding detailed analytics and reporting

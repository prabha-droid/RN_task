import { configureStore } from '@reduxjs/toolkit'
import productReducer from './shopping/productSice'
export const store = configureStore({
  reducer: {
    product: productReducer
  },
})
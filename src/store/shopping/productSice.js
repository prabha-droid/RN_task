import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  productList: [],
  cart: [],
  favourite: []
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {

      let dataToUpdate = state.productList.findIndex((item) => item.id === action.payload);
      state.productList[dataToUpdate] = { ...state.productList[dataToUpdate], selectedQuantity: state.productList[dataToUpdate]?.selectedQuantity ? state.productList[dataToUpdate]?.selectedQuantity + 1 : 1 };
      if (state.cart.findIndex((item) => item.id === action.payload) < 0) {
        state.cart = [...state.cart, state.productList[dataToUpdate]]
      } else {
        let cartToUpdate = state.cart.findIndex((item) => item.id === action.payload);
        state.cart[cartToUpdate] = { ...state.cart[cartToUpdate], selectedQuantity: state.cart[cartToUpdate]?.selectedQuantity ? state.cart[cartToUpdate]?.selectedQuantity + 1 : 1 };
      }
    },
    addToFavourite: (state, action) => {
      let dataToUpdate = state.productList.findIndex((item) => item.id === action.payload);
      state.productList[dataToUpdate] = { ...state.productList[dataToUpdate], favourite: state.productList[dataToUpdate]?.favourite ? !state.productList[dataToUpdate]?.favourite : true }

      if (state.favourite.findIndex((item) => item.id == action.payload) >= 0) {
        let favIndex = state.favourite.findIndex((item) => item.id === action.payload)
        state.favourite.splice(favIndex, 1)

      } else {
        state.favourite = [...state.favourite, state.productList[dataToUpdate]]

      }
    },
    removeProduct: (state, action) => {
      let dataToUpdate = state.productList.findIndex((item) => item.id === action.payload);
      state.productList[dataToUpdate] = { ...state.productList[dataToUpdate], selectedQuantity: state.productList[dataToUpdate]?.selectedQuantity ? state.productList[dataToUpdate]?.selectedQuantity - 1 : 1 };
      if (state.cart.findIndex((item) => item.id === action.payload) >= 0) {
        let cartToUpdate = state.cart.findIndex((item) => item.id === action.payload);
        if (state.cart[cartToUpdate].selectedQuantity > 1) {
          state.cart[cartToUpdate] = { ...state.cart[cartToUpdate], selectedQuantity: state.cart[cartToUpdate]?.selectedQuantity ? state.cart[cartToUpdate]?.selectedQuantity - 1 : 1 };
        } else {
          state.cart.splice(cartToUpdate, 1)
        }
      }
    },
    setProductList: (state, action) => {
      state.productList = [...action.payload]
    },

  },
})

// Action creators are generated for each case reducer function
export const { setProductList, addProduct, removeProduct, addToFavourite } = productSlice.actions

export default productSlice.reducer
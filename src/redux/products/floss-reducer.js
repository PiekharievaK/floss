import { createSlice } from '@reduxjs/toolkit';
import productsOperations from './floss-operation';

const productSlice = createSlice({
  name: 'products',
  initialState: { pending: false },
  reducers: {},
  extraReducers: {
    [productsOperations.getRequestProducts.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [productsOperations.getRequestProducts.fulfilled]: (state, {payload}) => {
      state.items = payload;
      state.isLoading = false;
    },
    [productsOperations.getRequestProducts.rejected]: (state, {payload}) => {
      state.isLoading = false;
      state.error = payload;
    },
    [productsOperations.getOneProduct.pending]: (state, action) => {
      state.isLoading = true;
    },
    [productsOperations.getOneProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [productsOperations.getOneProduct.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default productSlice.reducer
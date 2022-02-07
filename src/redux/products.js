import { createSlice } from '@reduxjs/toolkit'
import axios from '../utils/axios';

const initialState = {
    isLoading: false,
    products: [],
    product: {},
    error: false,
  }
export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        loading(state) {
            state.isLoading = true;
        },
        getProducts(state, action) {
            state.isLoading = false;
            state.products = action.payload;
        },
        getProduct(state, action) {
            state.isLoading = false;
            state.product = action.payload;
        },
        onErrors(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});


export const { getProducts, getProduct } = productsSlice.actions;

export function getProductsApi() {
    return async (dispatch) => {
        dispatch(productsSlice.actions.loading());
        try {
            const response = await axios.get(`products/`);
            dispatch(productsSlice.actions.getProducts(response.data));            
        } catch(errors) {
            dispatch(productsSlice.actions.onErrors(errors));
        }
    }
}

export function getProductApi(productId) {
    return async (dispatch) => {
        dispatch(productsSlice.actions.loading());
        try {
            const response = await axios.get(`products/${productId}/`);
            dispatch(productsSlice.actions.getProduct(response.data));            
        } catch(errors) {
            dispatch(productsSlice.actions.onErrors(errors));
        }
    }
}

export default productsSlice.reducer;






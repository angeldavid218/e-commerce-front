import { createSlice } from '@reduxjs/toolkit'
import axios from '../utils/axios';




const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState = {
    isLoading: false,
    cartItems: [],
    cart: {
        cartItems: cartItemsFromStorage
    },
    error: false,
  }
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        loading(state) {
            state.isLoading = true;
        },
        addItem(state, action) {
            const exist = state.cartItems.find((p) => p.product.id === action.payload.product._id);
            if (exist) {
                return state.cartItems.filter((p) => p.product.id === action.payload.product._id);
            }
            return state.cartItems.push(action.payload.product);
        },
        onErrors(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        getItems(state) {
            return state.cartItems;
        }
    }
});


export const { addItem, getItems } = cartSlice.actions;


export function addToCart (id, qty) {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`products/${id}`);
            dispatch(cartSlice.actions.addItem(data));
            localStorage.setItem('cartItems', JSON.stringify(dispatch(cartSlice.getItems)));
        } catch(error) {
            dispatch(cartSlice.actions.onErrors(error));
        }
        
    }
} 


export default cartSlice.reducer;






import { createSlice } from '@reduxjs/toolkit'
import axios from '../utils/axios';


const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const initialState = {
    isLoading: false,
    cartItems: cartItemsFromStorage,
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
                return {
                    ...state,
                    cartItems: state.cartItems.map((p) => p.product === exist.product ? action.payload : p)
                }
            }
            return {
                ...state, 
                cartItems: [...state.cartItems, action.payload]
            }
        },

        onErrors(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        getItems(state) {
            return state.cartItems;
        },

        removeItem(state, action) {
             state.cartItems = state.cartItems.filter((p) => p.product !== action.payload);
             return state;
        }
    }
});


export const { addItem, getItems } = cartSlice.actions;


export function addToCart (id, qty) {
    return async (dispatch, getState) => {
        try {
            const { data } = await axios.get(`products/${id}`);
            const payload = {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            };
            dispatch(cartSlice.actions.addItem(payload));
            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
        } catch(error) {
            console.log(error);
            dispatch(cartSlice.actions.onErrors(error));
        }
        
    }
} 

export function removeFromCart(id) {
    return (dispatch, getState) => {
        dispatch(cartSlice.actions.removeItem(id));
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    }
}


export default cartSlice.reducer;






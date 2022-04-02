import { createSlice } from '@reduxjs/toolkit'
import axios from '../utils/axios';

const initialState = {
    isLoading: false,
    products: [],
    order: {},
    error: false,
  }
export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        loading(state) {
            state.isLoading = true;
        },
        createOrderSuccess(state, action) {
            state.isLoading = false;
            state.order = action.payload;
        },
        onErrors(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        resetOrder(state) {
            state.order = {};
        }
    }
});


export const { createOrderSuccess, onErrors, resetOrder } = ordersSlice.actions;


export const createOrder = (order) => {
    return async (dispatch, getState) => {
        try {
            const { user } = getState();
            const config = {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${user.user?.token}`
                }
            };
            const { data } = await axios.post(`orders/add/`, order, config);
            dispatch(createOrderSuccess(data));
        } catch(error) {
            dispatch(onErrors(error?.response?.data?.detail));
        }
        
    }
}



export default ordersSlice.reducer;






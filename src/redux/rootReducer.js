import { combineReducers } from 'redux';
import productsReducer from './products';
import cartReducer from './cart';
import userReducer from './user';


export const  rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    user: userReducer
});





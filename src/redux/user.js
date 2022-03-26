import { createSlice } from '@reduxjs/toolkit'
import axios from '../utils/axios';

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;


const initialState = {
    isLoading: false,
    user: userInfoFromStorage,
    error: false,
    errors: {}    
  }
export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        loading(state) {
            state.isLoading = true;
        },

        userLoginSuccess(state, action) {
            state.isLoading = false;
            state.user = action.payload;
        },

        userRegisterSuccess(state, action) {
            state.isLoading = false;
            state.user = action.payload;
        },

        userDetailsSuccess(state, action) {
            state.isLoading = false;
            state.user = action.payload;
        },

        onErrors(state, action) {
            state.isLoading = false;
            state.error = true;
            state.errors = action.payload;
        },

        logoutSuccess(state) {
            state.isLoading = false;
            state.user = null;
        }
        
    }
});


export const { userLoginSuccess, loading, onErrors, logoutSuccess, userRegisterSuccess, userDetailsSuccess } = userSlice.actions;

export function login(email, password) {
    loading();
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    'content-type': 'application/json'
                }
            };
            const {data} = await axios.post('users/login/', {username: email, password}, config);
            console.log(data);
            dispatch(userLoginSuccess(data));
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch(error) {
            dispatch(onErrors(error?.response?.data?.detail));
        }
    }
}

export function logout() {
    return async (dispatch) => {
        localStorage.removeItem('userInfo');
        dispatch(logoutSuccess())
    }
    
}

export function register(email, password, name) {
    loading();
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    'content-type': 'application/json'
                }
            };
            const {data} = await axios.post('users/register', {username: email, password, name}, config);
            dispatch(userRegisterSuccess(data));
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch(error) {
            dispatch(onErrors(error?.response?.data?.detail));
        }
    }
}


export function getUserDetails(id) {
    loading();
    return async (dispatch, getState) => {
        try {
            const { user } = getState(); 
            const config = {
                headers: {
                    'content-type': 'application/json',
                     Authorization: `Bearer ${user.token}`
                }
            };
            const { data } = await axios.get(`users/${id}`, {}, config);
            dispatch(userDetailsSuccess(data));
        } catch(error) {
            dispatch(onErrors(error?.response?.data?.detail));
        }
    }
}

export function updateUserProfile(userRequest) {
    loading();
    return async (dispatch, getState) => {
        try {
            const { user } = getState(); 
            const config = {
                headers: {
                    'content-type': 'application/json',
                     Authorization: `Bearer ${user?.user?.token}`
                }
            };
            const { data } = await axios.put(`users/update`, userRequest, config);
            dispatch(userDetailsSuccess(data));
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch(error) {
            dispatch(onErrors(error?.response?.data?.detail));
        }
    }
}





export default userSlice.reducer;

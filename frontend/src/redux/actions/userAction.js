import axios from 'axios';
import * as userActionTypes from '../constants/userActionTypes';

//login
export const login = (email, password) => async (disptach) => {
    try {
        disptach({ type: userActionTypes.LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post(
            `/api/v1/login`,
            { email, password },
            config
        );

        disptach({ type: userActionTypes.LOGIN_SUCCESS, payload: data.user });

    } catch (error) {
        disptach({
            type: userActionTypes.LOGIN_FAIL,
            payload: error.response.data.message,
        });
    }
};
//register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: userActionTypes.REGISTER_USER_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`/api/v1/register`, userData, config);

        dispatch({ type: userActionTypes.REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type: userActionTypes.REGISTER_USER_FAIL,
            payload: error.response.data.message,
        })
    }
};
//load user 
export const loadUser = () => async (disptach) => {
    try {
        disptach({
            type: userActionTypes.LOAD_USER_REQUEST,
        });

        const { data } = await axios.get(`/api/v1/me`);
        disptach(
            {
                type: userActionTypes.LOAD_USER_SUCCESS,
                payload: data.user
            }
        );
    } catch (error) {
        disptach({
            type: userActionTypes.LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    };
};

//logout user

export const logout = () => async (disptach) => {
    try {
        await axios.get(`/api/v1/logout`);
        disptach({
            type: userActionTypes.LOGOUT_SUCCESS,
        });
    } catch (error) {
        disptach({
            type: userActionTypes.LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
};

//clearing errors
export const clearErrors = () => (disptach) => {
    disptach({
        type: userActionTypes.CLEAR_ERRORS
    })
}
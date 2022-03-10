import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../actions/types";

const initialState = {
    isAuth: false,
    errors: [],
    username: "",
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                errors: [],
                username: action.username,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                errors: action.errors,
                isAuth: false,
            };
        case LOGOUT:
            return {
                ...state,
                isAuth: false,
                errors: [],
                username: "",
            };
        default:
            return state;
    }
};

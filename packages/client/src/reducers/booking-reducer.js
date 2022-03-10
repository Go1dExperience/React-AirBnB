import {
    FETCH_BOOKINGS,
    FETCH_BOOKINGS_ERR,
    CLEAN_UP_BOOKINGS,
} from "../actions/types";

const initialState = {
    data: [],
    errors: [],
};

export const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOOKINGS:
            return {
                ...state,
                bookings: action.payload,
            };
        case FETCH_BOOKINGS_ERR:
            return {
                ...state,
                errors: action.errors,
            };
        case CLEAN_UP_BOOKINGS:
            return {
                ...state,
                bookings: null,
            };
        default:
            return state;
    }
};

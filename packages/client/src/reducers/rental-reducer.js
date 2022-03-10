import {
    FETCH_RENTALS,
    FETCH_BY_ID,
    CLEAN_UP,
    FETCH_ERRORS,
    CLEAN_UP_RENTALS,
} from "../actions/types";

const initState = {
    rentals: [],
    rental: {},
    errors: [],
};
export const rentalReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_RENTALS:
            return {
                ...state,
                rentals: action.payload,
            };
        case FETCH_BY_ID:
            return {
                ...state,
                rental: action.payload,
            };
        case CLEAN_UP:
            return {
                ...state,
                rental: action.payload,
                errors: [],
            };
        case CLEAN_UP_RENTALS:
            return {
                ...state,
                rentals: [],
            };
        // If no rentals found when searching by cities
        case FETCH_ERRORS:
            return {
                ...state,
                errors: action.payload,
            };
        default:
            return state;
    }
};
// const initSate = {
//     rentals: {
//         data: [],
//     },
//     rental: {
//         data: {}
//     }
// }
// export const rentalReducer = (state = initSate.rentals, action) => {
//     switch(action.type){
//         case FETCH_RENTALS:
//             return {
//                 ...state,
//                data: action.rentals
//             }
//         default:
//             return state
//     }
// }
// export const selectedRentalReducer = (state = initSate.rental, action) => {
//     switch(action.type){
//         case FETCH_BY_ID_SUCCESS:
//             return {
//                 ...state,
//                 data: action.rental
//             }
//         case FETCH_BY_ID_INIT:
//             return {
//                 ...state,
//                 data: {}
//             }
//         default:
//             return state
//     }
// }

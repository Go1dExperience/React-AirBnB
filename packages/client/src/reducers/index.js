import * as redux from "redux";
import { rentalReducer } from "./rental-reducer";
import { authReducer } from "./auth-reducer";
import { bookingReducer } from "./booking-reducer";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";

export const init = () => {
  const rootReducer = redux.combineReducers({
    data: rentalReducer,
    form: formReducer,
    auth: authReducer,
    bookings: bookingReducer,
  });

  const store = redux.createStore(
    rootReducer,
    redux.compose(
      redux.applyMiddleware(thunk)
    )
  );

  return store;
};

import {
  FETCH_RENTALS,
  FETCH_BY_ID,
  CLEAN_UP,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  FETCH_ERRORS,
  CLEAN_UP_RENTALS,
  FETCH_BOOKINGS,
  FETCH_BOOKINGS_ERR,
  CLEAN_UP_BOOKINGS,
} from "./types";
import axios from "axios";
import authService from "../services/auth-service";
import axiosService from "../services/axios-service";
// import {FETCH_BY_ID_SUCCESS} from './types';

const axiosInstance = axiosService.getInstance();

///////////////////////////Rental Actions///////////////////////////
export const fetchRentals = city => {
  // If no city is provided, search for all rentals
  const url = city ? `/rentals?city=${city}` : "/rentals";
  return dispatch => {
    axiosInstance
      .get(url)
      .then(rentals => {
        dispatch({
          type: FETCH_RENTALS,
          payload: rentals.data,
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_ERRORS,
          payload: err.response.data.errors,
        });
      });
  };
};
// CleanUp by empty object
export const cleanUp = () => dispatch => {
  dispatch({
    type: CLEAN_UP,
    payload: {},
  });
};

export const fetchRentalById = rentalId => dispatch => {
  // Stimulate a server call
  axios.get(`/api/v1/rentals/${rentalId}`).then(rental => {
    dispatch({
      type: FETCH_BY_ID,
      payload: rental.data,
    });
  });
  // setTimeout(() => {
  //   const rental = rentals.find(Rental => Rental.id === rentalId);
  //   // dispatch(fetchRentalByIdSuccess(rental))
  //   dispatch({
  //     type: FETCH_BY_ID,
  //     payload: rental
  //   })
  // }, 1000);
};

// Fetch a user's rentals
export const fetchUserRentals = () => {
  return axiosInstance
    .get("/rentals/manage")
    .then(res => res.data)
    .catch(err => Promise.reject(err.response.data.errors));
};
// Clean up previous data before unmounting
export const cleanUpRentals = () => dispatch => {
  dispatch({
    type: CLEAN_UP_RENTALS,
    payload: {},
  });
};

// export const fetchById = (rentalId) => {
//   return function(dispatch) {
//     dispatch(fetchByIdInit());
//     // Server Call
//     setTimeout(() => {
//       const rental = rentals.find((rental) => rental.id === rentalId);
//       dispatch(fetchByIdSuccess(rental));
//     }, 1000);

//   }
// }
// Create Rental
export const createRental = data => {
  return axiosInstance
    .post("/rentals", data)
    .then(res => res.data)
    .catch(err => Promise.reject(err.response.data.errors));
};
// Delete Rental
export const deleteRental = rentalId => {
  return axiosInstance
    .delete(`/rentals/${rentalId}`)
    .then(res => res.data)
    .catch(errors => Promise.reject(errors.response.data.errors));
};
/////////////////////////////////////////////////////////////////////
///////////////////////////Booking Actions///////////////////////////
export const createBooking = booking => {
  return axiosInstance
    .post("/bookings", booking)
    .then(res => res.data)
    .catch(err => Promise.reject(err.response.data.errors));
};
/////////////////////////////////////////////////////////////////////
///////////////////////////Auth Actions//////////////////////////////
// Register//
export const register = data => {
  return axios
    .post("/api/v1/users/register", data)
    .then(res => res.data)
    .catch(err => Promise.reject(err.response.data.errors));
};
// Check Auth State
// Dispatch is required because this is conditional dispatch, without it function will
// return null which causes error when dispatching it in App
export const checkAuthState = () => dispatch => {
  if (authService.isAuthenticated()) {
    const username = authService.getUsername();
    dispatch({
      type: LOGIN_SUCCESS,
      username,
    });
  }
};
//Login//
export const login = data => dispatch => {
  return axios
    .post("/api/v1/users/auth", data)
    .then(res => res.data)
    .then(token => {
      authService.addToken(token);
      const username = authService.getUsername();
      dispatch({
        type: LOGIN_SUCCESS,
        username,
      });
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAILURE,
        errors: err.response.data.errors,
      });
    });
};
export const logOut = () => {
  authService.removeToken();
  return {
    type: LOGOUT,
  };
};
/////////////////////////////////////////////////////////////////////
///////////////////////////Fetch User's bookings/////////////////////
export const fetchUserBookings = () => dispatch => {
  return axiosInstance
    .get("/bookings/manage")
    .then(({ data }) =>
      dispatch({
        type: FETCH_BOOKINGS,
        payload: data,
      })
    )
    .catch(err => {
      console.log(err.response.data.errors);
      dispatch({
        type: FETCH_BOOKINGS_ERR,
        errors: err.response.data.errors,
      });
    });
};
export const cleanUpBookings = () => dispatch => {
  dispatch({
    type: CLEAN_UP_BOOKINGS,
  });
};
/////////////////////////////////////////////////////////////////////
///////////////////////////Upload Image//////////////////////////////
export const uploadImage = image => {
  const formData = new FormData();
  // First arg is the same as upload single fieldName in server side
  formData.append("image", image);

  return axiosInstance
    .post("/image/upload", formData)
    .then(res => res.data.imageUrl)
    .catch(err => {
      console.log({ err });
      return Promise.reject(err.response.data.errors);
    });
};

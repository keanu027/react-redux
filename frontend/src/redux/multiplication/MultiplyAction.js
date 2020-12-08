import {
  FETCH_MULTIPLY_REQUEST,
  FETCH_MULTIPLY_FAILURE,
  FETCH_MULTIPLYLIST_SUCCESS,
} from './types';

export const fetchMultiplyRequest = () => {
  return {
    type: FETCH_MULTIPLY_REQUEST,
    payload: false,
    open: false,
  };
};

export const FetchMultiplyListSuccess = (users, grandtotal) => {
  return {
    type: FETCH_MULTIPLYLIST_SUCCESS,
    payload: users,
    grandtotal: grandtotal,
  };
};

export const fetchMultiplyFailure = (error, open, severity) => {
  return {
    type: FETCH_MULTIPLY_FAILURE,
    payload: error,
    open: open,
    severity: severity,
  };
};

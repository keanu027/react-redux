import {
  FETCH_DIVIDE_REQUEST,
  FETCH_DIVIDE_FAILURE,
  FETCH_DIVIDELIST_SUCCESS,
} from './types';

export const fetchDivideRequest = () => {
  return {
    type: FETCH_DIVIDE_REQUEST,
    payload: false,
    open: false,
  };
};

export const FetchDivideListSuccess = (users, grandtotal) => {
  return {
    type: FETCH_DIVIDELIST_SUCCESS,
    payload: users,
    grandtotal: grandtotal,
  };
};

export const fetchDivideFailure = (error, open, severity) => {
  return {
    type: FETCH_DIVIDE_FAILURE,
    payload: error,
    open: open,
    severity: severity,
  };
};

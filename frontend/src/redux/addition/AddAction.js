import {
  FETCH_ADD_REQUEST,
  FETCH_ADD_FAILURE,
  FETCH_ADDLIST_SUCCESS,
} from './types';

export const fetchAddRequest = () => {
  return {
    type: FETCH_ADD_REQUEST,
    payload: false,
    open: false,
  };
};

export const FetchAddListSuccess = (users, grandtotal) => {
  return {
    type: FETCH_ADDLIST_SUCCESS,
    payload: users,
    grandtotal: grandtotal,
  };
};

export const fetchAddFailure = (error, open, severity) => {
  return {
    type: FETCH_ADD_FAILURE,
    payload: error,
    open: open,
    severity: severity,
  };
};

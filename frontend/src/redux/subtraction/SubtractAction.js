import {
  FETCH_SUBTRACT_REQUEST,
  FETCH_SUBTRACT_FAILURE,
  FETCH_SUBTRACTLIST_SUCCESS,
} from './types';

export const fetchSubtractRequest = () => {
  return {
    type: FETCH_SUBTRACT_REQUEST,
    payload: false,
    open: false,
  };
};

export const FetchSubtractListSuccess = (users, grandtotal) => {
  return {
    type: FETCH_SUBTRACTLIST_SUCCESS,
    payload: users,
    grandtotal: grandtotal,
  };
};

export const fetchSubtractFailure = (error, open, severity) => {
  return {
    type: FETCH_SUBTRACT_FAILURE,
    payload: error,
    open: open,
    severity: severity,
  };
};

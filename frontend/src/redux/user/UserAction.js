import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  NO_DATA_TEXTFIELDS,
  SHOW_MESSAGE,
  FETCH_USERSLIST_SUCCESS,
} from './types';

// import axios from 'axios';

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
    payload: false,
    open: false,
  };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
    open: false,
  };
};

export const FetchUsersListSuccess = (users) => {
  return {
    type: FETCH_USERSLIST_SUCCESS,
    payload: users,
  };
};

export const fetchUsersFailure = (error, open, severity) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
    open: open,
    severity: severity,
  };
};

export const NoDataTextfields = () => {
  return {
    type: NO_DATA_TEXTFIELDS,
    payload: 'Complete TextField',
    open: true,
    severity: 'warning',
  };
};

export const HandleClose = () => {
  return {
    type: NO_DATA_TEXTFIELDS,
    open: false,
  };
};

export const ShowMessage = (open, message, severity) => {
  return {
    type: SHOW_MESSAGE,
    payload: message,
    open: open,
    severity: severity,
  };
};

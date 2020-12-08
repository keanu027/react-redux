import {
  FETCH_ADD_REQUEST,
  FETCH_ADD_FAILURE,
  FETCH_ADDLIST_SUCCESS,
} from './types';

const initialState = {
  loading: true,
  open: false,
  message: '',
  severity: 'error',
  data: [],
  grandtotal: 0,
};

const addReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADD_REQUEST:
      return {
        ...state,
        loading: action.payload,
        open: action.open,
      };
    case FETCH_ADDLIST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        grandtotal: action.grandtotal,
      };
    case FETCH_ADD_FAILURE:
      return {
        ...state,
        message: action.payload,
        open: action.open,
        severity: action.severity,
      };
    default:
      return state;
  }
};

export default addReducer;

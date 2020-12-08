import {
  FETCH_MULTIPLY_REQUEST,
  FETCH_MULTIPLY_FAILURE,
  FETCH_MULTIPLYLIST_SUCCESS,
} from './types';

const initialState = {
  loading: true,
  open: false,
  message: '',
  severity: 'error',
  data: [],
  grandtotal: 0,
};

const multiplyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MULTIPLY_REQUEST:
      return {
        ...state,
        loading: action.payload,
        open: action.open,
      };
    case FETCH_MULTIPLYLIST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        grandtotal: action.grandtotal,
      };
    case FETCH_MULTIPLY_FAILURE:
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

export default multiplyReducer;

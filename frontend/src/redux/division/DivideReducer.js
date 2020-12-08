import {
  FETCH_DIVIDE_REQUEST,
  FETCH_DIVIDE_FAILURE,
  FETCH_DIVIDELIST_SUCCESS,
} from './types';

const initialState = {
  loading: true,
  open: false,
  message: '',
  severity: 'error',
  data: [],
  grandtotal: 0,
};

const DivideReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DIVIDE_REQUEST:
      return {
        ...state,
        loading: action.payload,
        open: action.open,
      };
    case FETCH_DIVIDELIST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        grandtotal: action.grandtotal,
      };
    case FETCH_DIVIDE_FAILURE:
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

export default DivideReducer;

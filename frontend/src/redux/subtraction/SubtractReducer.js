import {
  FETCH_SUBTRACT_REQUEST,
  FETCH_SUBTRACT_FAILURE,
  FETCH_SUBTRACTLIST_SUCCESS,
} from './types';

const initialState = {
  loading: true,
  open: false,
  message: '',
  severity: 'error',
  data: [],
  grandtotal: 0,
};

const subtractReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBTRACT_REQUEST:
      return {
        ...state,
        loading: action.payload,
        open: action.open,
      };
    case FETCH_SUBTRACTLIST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        grandtotal: action.grandtotal,
      };
    case FETCH_SUBTRACT_FAILURE:
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

export default subtractReducer;

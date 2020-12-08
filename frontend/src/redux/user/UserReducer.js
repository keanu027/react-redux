import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  NO_DATA_TEXTFIELDS,
  SHOW_MESSAGE,
  FETCH_USERSLIST_SUCCESS,
} from './types';

const initialState = {
  loading: true,
  // userdata: {},
  userdata: [],
  open: false,
  message: '',
  severity: 'error',
  data: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: action.payload,
        open: action.open,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        userdata: action.payload,
      };
    case FETCH_USERSLIST_SUCCESS:
      return {
        ...state,
        // loading: false,
        // data: [...state.data, action.payload],
        data: action.payload,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        message: action.payload,
        open: action.open,
        severity: action.severity,
      };
    case NO_DATA_TEXTFIELDS:
      return {
        ...state,
        open: action.open,
      };
    case SHOW_MESSAGE:
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

export default userReducer;

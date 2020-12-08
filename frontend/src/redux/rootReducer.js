import { combineReducers } from 'redux';
import userReducer from './user/UserReducer';
import addReducer from './addition/AddReducer';
import subtractReducer from './subtraction/SubtractReducer';
import multiplyReducer from './multiplication/MultiplyReducer';
import DivideReducer from './division/DivideReducer';

const rootReducer = combineReducers({
  user: userReducer,
  addition: addReducer,
  subtraction: subtractReducer,
  multiplication: multiplyReducer,
  division: DivideReducer,
});

export default rootReducer;

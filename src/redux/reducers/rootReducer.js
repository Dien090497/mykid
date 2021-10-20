import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import videoCallReducer from './videoCallReducer';
import commonInfoReducer from './commonInfoReducer';

const rootReducer = combineReducers({
  loginReducer: loginReducer,
  videoCallReducer: videoCallReducer,
  commonInfoReducer: commonInfoReducer
});

export default rootReducer;

import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import videoCallReducer from './videoCallReducer';

const rootReducer = combineReducers({ 
  loginReducer: loginReducer,
  videoCallReducer: videoCallReducer
});

export default rootReducer;

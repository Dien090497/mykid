import { combineReducers } from 'redux';
import chatReducer from './chatReducer';
import loginReducer from './loginReducer';
import videoCallReducer from './videoCallReducer';

const rootReducer = combineReducers({ 
  loginReducer: loginReducer,
  videoCallReducer: videoCallReducer,
  chatReducer: chatReducer
});

export default rootReducer;

import { combineReducers } from 'redux';
import chatReducer from './chatReducer';
import loginReducer from './loginReducer';
import videoCallReducer from './videoCallReducer';
import commonInfoReducer from './commonInfoReducer';

const rootReducer = combineReducers({
  loginReducer: loginReducer,
  videoCallReducer: videoCallReducer,
  chatReducer: chatReducer,
  commonInfoReducer: commonInfoReducer
});

export default rootReducer;

import {CommonActionList, userDeleteDevice} from "../actions/commonInfoAction";

const initData = {
  selectDevice: null,
  navigate: null,
  replace: null,
  userDeleteDevice: false,
  isInComing: null
};

const commonInfoReducer = (state = initData, { payload, type }) => {
  switch (type) {
    case CommonActionList.selectDevice:
      return {
        ...state,
        selectDevice: payload,
      }
    case CommonActionList.navigate:
      return {
        ...state,
        navigate: payload.navigate,
        deviceId: payload.deviceId,
        selectDevice: null,
      }
    case CommonActionList.reset:
      return {
        ...state,
        selectDevice: null,
        deviceId: null,
        navigate: null,
        replace: null,
        userDeleteDevice: false
      }
    case CommonActionList.replace:
      return {
        ...state,
        navigate: null,
        deviceId: null,
        selectDevice: null,
        replace: payload.replace
      }
     case CommonActionList.userDeleteDevice:
      return {
        ...state,
        userDeleteDevice: payload.userDeleteDevice
      }
    case CommonActionList.isInComing:
      return {
        ...state,
        isInComing: payload.isInComing
      }
    default:
      return state;
  }
};
export default commonInfoReducer;

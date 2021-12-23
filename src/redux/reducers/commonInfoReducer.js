import { CommonActionList } from "../actions/commonInfoAction";

const initData = {
  selectDevice: null,
  navigate: null,
  replace: null
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
      }
    case CommonActionList.replace:
      return {
        ...state,
        navigate: null,
        deviceId: null,
        selectDevice: null,
        replace: payload.replace
      }
    default:
      return state;
  }
};
export default commonInfoReducer;

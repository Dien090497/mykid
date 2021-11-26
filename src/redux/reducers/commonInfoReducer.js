import { CommonActionList } from "../actions/commonInfoAction";

const initData = {
  selectDevice: null,
  navigate: null
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
    default:
      return state;
  }
};
export default commonInfoReducer;

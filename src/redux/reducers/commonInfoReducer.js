import { CommonActionList } from "../actions/commonInfoAction";

const initData = {
  selectDevice: null,
};

const commonInfoReducer = (state = initData, { payload, type }) => {
  switch (type) {
    case CommonActionList.selectDevice:
      return {
        ...state,
        selectDevice: payload,
      }
    case CommonActionList.reset:
      return {
        ...state,
        selectDevice: null,
      }
    default:
      return state;
  }
};
export default commonInfoReducer;

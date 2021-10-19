export const selectDevice = payload => ({
  type: CommonActionList.selectDevice,
  payload,
});

export const reset = payload => ({
  type: CommonActionList.reset,
  payload,
});

export default {
  selectDevice,
  reset
};


export const CommonActionList = {
  selectDevice: 'selectDevice',
  reset: 'RESET'
}

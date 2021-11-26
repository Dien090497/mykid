export const selectDevice = payload => ({
  type: CommonActionList.selectDevice,
  payload,
});

export const navigate = payload => ({
  type: CommonActionList.navigate,
  payload,
});

export const reset = payload => ({
  type: CommonActionList.reset,
  payload,
});

export default {
  selectDevice,
  navigate,
  reset
};


export const CommonActionList = {
  selectDevice: 'selectDevice',
  navigate: 'navigate',
  reset: 'RESET'
}

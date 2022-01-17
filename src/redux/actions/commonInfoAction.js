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

export const replace = payload => ({
  type: CommonActionList.replace,
  payload,
});

export const userDeleteDevice = payload => ({
  type: CommonActionList.userDeleteDevice,
  payload,
});

export default {
  selectDevice,
  navigate,
  reset,
  replace,
  userDeleteDevice
};


export const CommonActionList = {
  selectDevice: 'selectDevice',
  navigate: 'navigate',
  reset: 'RESET',
  replace: 'replace',
  userDeleteDevice: 'userDeleteDevice'
}

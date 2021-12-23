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

export default {
  selectDevice,
  navigate,
  reset,
  replace
};


export const CommonActionList = {
  selectDevice: 'selectDevice',
  navigate: 'navigate',
  reset: 'RESET',
  replace: 'replace'
}

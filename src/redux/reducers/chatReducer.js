const initData = {
  dataInfo: [],
};

const chatReducer = (state = initData, { type, payload }) => {
  switch (type) {
    case 'UPDATE_MESSAGE':
      Object.assign(state.dataInfo, payload);
      return {
        ...state,
        dataInfo: payload,
      };
    default:
      return state;
  }
};
export default chatReducer;

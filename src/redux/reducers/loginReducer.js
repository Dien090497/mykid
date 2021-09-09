const initData = {
  dataInfo: {},
  isLoading: false,
  error: '',
};

const loginReducer = (state = initData, { type, payload }) => {
  switch (type) {
    case 'HANDLE_LOGIN':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGIN_SUCCESS':
      Object.assign(state.dataInfo, payload);
      return {
        ...state,
        dataInfo: payload,
        isLoading: false,
        error: '',
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
export default loginReducer;

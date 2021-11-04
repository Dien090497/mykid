const initData = {
  dataInfo: {},
  isLoading: false,
  isLogout: true,
  error: '',
};

const loginReducer = (state = initData, { type, payload }) => {
  switch (type) {
    case 'HANDLE_LOGIN':
      return {
        ...state,
        isLoading: true,
        isLogout: false,
      };
    case 'LOGIN_SUCCESS':
      Object.assign(state.dataInfo, payload);
      return {
        ...state,
        dataInfo: payload,
        isLoading: false,
        isLogout: false,
        error: '',
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoading: false,
        isLogout: true,
        error: payload,
      };
    default:
      return state;
  }
};
export default loginReducer;

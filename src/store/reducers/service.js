const initialState = { services: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case 'service/list': {
      return {
        ...state,
        services: action.payload
      };
    }
    default:
      return state;
  }
};

export default function (state = {}, action) {
  switch (action.type) {
    case 'FETCH_USER_FULFILLED':
      return {
        ...state,
        // `login` is the username
        [action.payload.login]: action.payload
      };
    case 'FETCH_USER_REJECTED':
      return {
        ...state,
        [action.error]: action.payload
      };
    default:
      return state;
  }
};

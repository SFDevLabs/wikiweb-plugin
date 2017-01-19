import {
  REQUEST_PROFILE,
  RECEIVE_PROFILE,
  RECEIVE_NOT_AUTH,
} from '../actions/user';

const userReducer = (state = {
  profile: {},
  isLoggedIn: false,
}, action) => {
  switch (action.type) {
    case REQUEST_PROFILE: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case RECEIVE_PROFILE: {
      const {
        profile,
      } = action;
      return {
        ...state,
        profile,
        isLoggedIn: true,
        isFetching: false,
      };
    }
    case RECEIVE_NOT_AUTH: {
      return {
        ...state,
        isLoggedIn: false,
        isFetching: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;

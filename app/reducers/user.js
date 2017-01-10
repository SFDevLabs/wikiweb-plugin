import {
  REQUEST_USER,
  RECEIVE_USER,
  //RECEIVE_ERROR,
} from '../actions/user';

const user = (state = {
  isFetching: false,
  entityCount: 0,
  title: '',
  superEdges: [],
  queryLink: '',
  canonicalLink: '',
}, action) => {
  switch (action.type) {
    case REQUEST_USER: {
      return {
        ...state,
        isFetching: true
      };
    }
    case RECEIVE_USER: {
      return {
        ...state,
        isFetching: true
      };
    }
    default: {
      return state;
    }
  }
};

export default user;

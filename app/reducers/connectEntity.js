import {
  REQUEST_CONNECT_SEARCH,
  RECEIVE_CONNECTED_SEARCH,
  //RECEIVE_ERROR,
} from '../actions/entity';

const connectEntity = (state = {
  isFetching: false,
  title: '',
  id: '',
  isURL: false,
}, action) => {
  switch (action.type) {
    case REQUEST_CONNECT_SEARCH: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case RECEIVE_CONNECTED_SEARCH: {
      const {
        id,
        title,
        isURL,
      } = action;
      return {
        ...state,
        isURL,
        id,
        title,
        isFetching: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default connectEntity;

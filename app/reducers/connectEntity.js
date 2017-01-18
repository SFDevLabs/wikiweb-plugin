import {
  REQUEST_CONNECT_SEARCH,
  RECEIVE_CONNECTED_SEARCH,
} from '../actions/edge';

import {
  RECEIVE_ERROR,
} from '../actions/error';


const connectEntity = (state = {
  isFetching: false,
  title: '',
  id: '',
  isURL: false,
  messages: [],
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
    case RECEIVE_ERROR: {
      const {
        messages,
      } = action;
      return {
        ...state,
        messages,
      };
    }
    default: {
      return state;
    }
  }
};

export default connectEntity;

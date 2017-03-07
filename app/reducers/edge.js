import {
  REQUEST_EDGE,
  RECEIVE_EDGE,
} from '../actions/edge';

import {
  RECEIVE_EDGE_ERROR,
} from '../actions/edge';


const edge = (state = {
  isFetching: false,
  title: '',
  id: '',
  isURL: false,
  messages: [],
}, action) => {
  switch (action.type) {
    case REQUEST_EDGE: {
      return {
        ...state,
        isFetching: true,
        messages:[],
      };
    }
    case RECEIVE_EDGE: {
      return {
        ...state,
        isFetching: false,
        messages:[{"type":"success","text":"SUCCESS! You made a connection"}]
      };
    }
    case RECEIVE_EDGE_ERROR: {
      const {
        messages,
      } = action;
      return {
        ...state,
        isFetching: false,
        messages,
      };
    }
    default: {
      return state;
    }
  }
};

export default edge;

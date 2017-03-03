import {
  REQUEST_SEARCH,
  RECEIVE_CURRENT_PAGE,
} from '../actions/currentPage';

import {
  RECEIVE_HEART,
} from '../actions/heart';


const currentPage = (state = {
  id: '',
  isFetching: false,
  entityCount: 0,
  title: '',
  superEdges: [],
  queryLink: '',
  canonicalLink: '',
  tabId: 0,
  heartCount: 0,
  heartValue: false,
}, action) => {
  switch (action.type) {
    case REQUEST_SEARCH: {
      const {
        tabId,
      } = action;
      return {
        ...state,
        isFetching: true,
        tabId,
      };
    }
    case RECEIVE_CURRENT_PAGE: {
      const {
        id,
        entityCount,
        title,
        superEdges,
        queryLink,
        canonicalLink,
        heartCount,
        heartValue,
      } = action;
      return {
        ...state,
        id,
        entityCount,
        title,
        superEdges,
        queryLink,
        canonicalLink,
        heartCount,
        heartValue,
        isFetching: false,
      };
    }
    case RECEIVE_HEART: {
      const {
        heartValue,
        heartCount,
      } = action;
      return {
        ...state,
        heartCount,
        heartValue,
      };
    }

    default: {
      return state;
    }
  }
};

export default currentPage;

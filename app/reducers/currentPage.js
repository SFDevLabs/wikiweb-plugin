import {
  REQUEST_SEARCH,
  RECEIVE_CURRENT_PAGE,
  RECEIVE_SEARCH_ERROR,
  REQUEST_CURRENT_PAGE,
  REQUEST_CURRENT_PAGE_LINKS,
  RECEIVE_CURRENT_PAGE_LINKS,
} from '../actions/currentPage';

import {
  RECEIVE_HEART,
} from '../actions/heart';

const defaultVals = {
  id: '',
  isFetching: true, // Initaly set to true to prevent inital app flicker
  isParsed: false,
  entityCount: 0,
  title: '',
  superEdges: [],
  queryLink: '',
  canonicalLink: '',
  tabId: 0,
  heartCount: 0,
  heartValue: false,
  links: [],
  messages: [],
};

const currentPage = (state = defaultVals, action) => {
  switch (action.type) {
    case REQUEST_SEARCH: {
      return {
        ...state,
        isFetching: true
      };
    }
    case REQUEST_CURRENT_PAGE: {
      return {
        ...state,
        messages: [],
        isFetching: true,
      };
    }

    case REQUEST_CURRENT_PAGE_LINKS: {
      return {
        messages: [],
        isFetching: true,
        ...state,
      };
    }

    case RECEIVE_CURRENT_PAGE_LINKS: {
      const {
        links,
        isParsed,
      } = action;
      return {
        ...state,
        links,
        isParsed
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
        links,
        isParsed,
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
        links,
        isFetching: false,
        isParsed,
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
    case RECEIVE_SEARCH_ERROR: {
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

export default currentPage;

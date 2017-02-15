import {
  REQUEST_SEARCH,
  RECEIVE_ENTITY,
} from '../actions/entity';

const entity = (state = {
  id: '',
  isFetching: false,
  entityCount: 0,
  title: '',
  superEdges: [],
  queryLink: '',
  canonicalLink: '',
  tabId: 0,
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
    case RECEIVE_ENTITY: {
      const {
        id,
        entityCount,
        title,
        superEdges,
        queryLink,
        canonicalLink,
      } = action;
      return {
        ...state,
        id,
        entityCount,
        title,
        superEdges,
        queryLink,
        canonicalLink,
        isFetching: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default entity;

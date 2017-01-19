import {
  REQUEST_SEARCH,
  RECEIVE_ENTITY,
  RECEIVE_EDGE,
  //RECEIVE_ERROR,
} from '../actions/entity';

const entity = (state = {
  id: '',
  isFetching: false,
  entityCount: 0,
  title: '',
  superEdges: [],
  queryLink: '',
  canonicalLink: '',
}, action) => {
  switch (action.type) {
    case REQUEST_SEARCH: {
      return {
        ...state,
        isFetching: true,
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
      };
    }
    case RECEIVE_EDGE: {
      // @TODO push in data required @jeffj
      const {
        superEdge,
      } = action;
      superEdge.isNew = true;
      const superEdges = state.superEdges.push(superEdge);

      return {
        ...state,
        superEdges,
      };
    }

    default: {
      return state;
    }
  }
};

export default entity;

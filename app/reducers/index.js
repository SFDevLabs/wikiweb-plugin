import { combineReducers } from 'redux'
import {
  REQUEST_SEARCH,
  RECEIVE_NODE,
  RECEIVE_ERROR,
} from '../actions'

const node = (state = {
  isFetching: false,
  entityCount: 0,
  title: '',
  superEdges:[],
  queryLink: '',
  canonicalLink: '',
}, action) => {
  switch (action.type) {
    case REQUEST_SEARCH:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_NODE:
      const {
        entityCount,
        title,
        superEdges,
        queryLink,
        canonicalLink,
      } = action;
      return {
        ...state,
        entityCount,
        title,
        superEdges,
        queryLink,
        canonicalLink,
      }
    default:
      return state
  }
}



const rootReducer = combineReducers({
  node
})

export default rootReducer

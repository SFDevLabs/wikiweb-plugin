import { combineReducers } from 'redux'
import {
  SELECT_REDDIT, INVALIDATE_REDDIT,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'


const posts = (state = {
  isFetching: false,
  entityCount: null
}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_POSTS:
      const entityCount = action.entityCount;
      return {
        ...state,
        entityCount,
      }
    default:
      return state
  }
}



const rootReducer = combineReducers({
  posts
})

export default rootReducer

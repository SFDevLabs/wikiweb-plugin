import { combineReducers } from 'redux';
import entity from './currentPage';
import connectEntity from './connectEntity';
import user from './user';
import edge from './edge';


const rootReducer = combineReducers({
  entity,
  connectEntity,
  user,
  edge,
});

export default rootReducer;

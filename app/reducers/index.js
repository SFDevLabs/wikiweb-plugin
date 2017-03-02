import { combineReducers } from 'redux';
import currentPage from './currentPage';
import connectEntity from './connectEntity';
import user from './user';
import edge from './edge';


const rootReducer = combineReducers({
  currentPage,
  connectEntity,
  user,
  edge,
});

export default rootReducer;

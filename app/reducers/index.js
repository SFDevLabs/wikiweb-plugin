import { combineReducers } from 'redux';
import entity from './entity';
import connectEntity from './connectEntity';
import user from './user';


const rootReducer = combineReducers({
  entity,
  connectEntity,
  user,
});

export default rootReducer;

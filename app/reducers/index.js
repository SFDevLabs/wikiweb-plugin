import { combineReducers } from 'redux';
import entity from './entity';
import connectEntity from './connectEntity';

const rootReducer = combineReducers({
  entity,
  connectEntity,
});

export default rootReducer;

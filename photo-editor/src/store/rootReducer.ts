import { combineReducers } from 'redux';
import photoReducer from './photo/reducer';

const rootReducer = combineReducers({
  photo: photoReducer,
});

export default rootReducer;

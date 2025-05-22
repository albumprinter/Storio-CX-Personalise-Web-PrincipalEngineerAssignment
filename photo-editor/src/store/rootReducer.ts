import { combineReducers } from 'redux';
import photoReducer from './photo/reducer';
import historyReducer from './history/reducer';

const rootReducer = combineReducers({
  photo: photoReducer,
  history: historyReducer
});

export type RootReducerState = ReturnType<typeof rootReducer>;
export default rootReducer;

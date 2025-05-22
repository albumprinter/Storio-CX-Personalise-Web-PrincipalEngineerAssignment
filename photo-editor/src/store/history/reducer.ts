import {
  HistoryState,
  HistoryActionTypes,
  UNDO,
  REDO,
  CLEAR_HISTORY,
  RECORD_HISTORY
} from './types';

const HISTORY_LIMIT = 20;

const initialState: HistoryState = {
  past: [],
  future: [],
  limit: HISTORY_LIMIT
};

const historyReducer = (
  state = initialState,
  action: HistoryActionTypes
): HistoryState => {
  switch (action.type) {
    case RECORD_HISTORY:
      console.log('Recording history:', action.payload, state);
      return {
        ...state,
        past: [
          ...state.past.slice(-state.limit + 1),
          action.payload
        ],
        future: []
      };

    case UNDO: {
      if (state.past.length === 0) return state;
      
      const newPast = state.past.slice(0, state.past.length - 1);
      const lastState = state.past[state.past.length - 1];
      
      return {
        ...state,
        past: newPast,
        future: [lastState, ...state.future]
      };
    }

    case REDO: {
      if (state.future.length === 0) return state;
      
      const nextState = state.future[0];
      const newFuture = state.future.slice(1);
      
      return {
        ...state,
        past: [...state.past, nextState],
        future: newFuture
      };
    }

    case CLEAR_HISTORY:
      return initialState;

    default:
      return state;
  }
};

export default historyReducer;

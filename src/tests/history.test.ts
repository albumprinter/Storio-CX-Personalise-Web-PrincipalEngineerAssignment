import historyReducer from '../store/history/reducer';
import {
  UNDO,
  REDO,
  CLEAR_HISTORY,
  RECORD_HISTORY
} from '../store/history/types';
import { PhotoFilter } from '../store/photo/types';

describe('History Reducer', () => {
  const initialState = {
    past: [],
    future: [],
    limit: 20
  };

  const samplePhotoState = {
    photo: {
      dimensions: {
        width: 500,
        height: 300
      },
      source: 'data:image/png;base64,...',
      rotation: 0,
      filters: [] as PhotoFilter[]
    }
  };

  const modifiedPhotoState = {
    photo: {
      dimensions: {
        width: 500,
        height: 300
      },
      source: 'data:image/png;base64,...',
      rotation: 90,
      filters: [PhotoFilter.SEPIA]
    }
  };

  it('should return the initial state', () => {
    expect(historyReducer(undefined, { type: 'UNKNOWN' } as any)).toEqual(initialState);
  });

  it('should handle RECORD_HISTORY', () => {
    const newState = historyReducer(initialState, {
      type: RECORD_HISTORY,
      payload: samplePhotoState
    });

    expect(newState.past).toEqual([samplePhotoState]);
    expect(newState.future).toEqual([]);
  });

  it('should limit the history size', () => {
    // Create an array with limit + 5 states
    const statesToRecord = Array(25).fill(0).map((_, i) => ({
      photo: {
        dimensions: { width: 500, height: 300 },
        source: 'data:image/png;base64,...',
        rotation: i * 10, // Different rotation for each state
        filters: []
      }
    }));

    // Reduce over the states to simulate recording each one
    const finalState = statesToRecord.reduce<any>((state, photoState) => {
      return historyReducer(state, {
        type: RECORD_HISTORY,
        payload: photoState
      });
    }, initialState);

    // Should have the last 20 states (limit)
    expect(finalState.past.length).toBe(20);
    expect(finalState.past[finalState.past.length - 1].photo.rotation).toBe(240);
  });

  it('should handle UNDO', () => {
    // Set up a state with some history
    const stateWithHistory = {
      past: [samplePhotoState, samplePhotoState],
      future: [],
      limit: 20
    };

    const newState = historyReducer(stateWithHistory, { type: UNDO });

    expect(newState.past).toEqual([samplePhotoState]);
    expect(newState.future).toEqual([samplePhotoState]);
  });

  it('should handle REDO', () => {
    // Set up a state with some future history
    const stateWithFuture = {
      past: [],
      future: [modifiedPhotoState],
      limit: 20
    };

    const newState = historyReducer(stateWithFuture, { type: REDO });

    expect(newState.past).toEqual([modifiedPhotoState]);
    expect(newState.future).toEqual([]);
  });

  it('should handle CLEAR_HISTORY', () => {
    // Set up a state with both past and future
    const stateWithPastAndFuture = {
      past: [samplePhotoState],
      future: [modifiedPhotoState],
      limit: 20
    };

    const newState = historyReducer(stateWithPastAndFuture, { type: CLEAR_HISTORY });

    expect(newState).toEqual(initialState);
  });

  it('should do nothing if no past history for UNDO', () => {
    const state = historyReducer(initialState, { type: UNDO });
    expect(state).toEqual(initialState);
  });

  it('should do nothing if no future history for REDO', () => {
    const state = historyReducer(initialState, { type: REDO });
    expect(state).toEqual(initialState);
  });
});

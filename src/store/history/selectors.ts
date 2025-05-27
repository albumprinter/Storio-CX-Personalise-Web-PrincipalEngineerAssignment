import { RootState } from '../index';

export const selectHistory = (state: RootState) => state.history;
export const selectPast = (state: RootState) => state.history.past;
export const selectFuture = (state: RootState) => state.history.future;
export const selectCanUndo = (state: RootState) => state.history.past.length > 0;
export const selectCanRedo = (state: RootState) => state.history.future.length > 0;

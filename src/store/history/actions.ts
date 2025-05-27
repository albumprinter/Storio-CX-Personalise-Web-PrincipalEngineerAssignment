import {
  UNDO,
  REDO,
  CLEAR_HISTORY,
  RECORD_HISTORY,
  UndoAction,
  RedoAction,
  ClearHistoryAction,
  RecordHistoryAction
} from './types';
import { PhotoState } from '../photo/types';

export const undo = (): UndoAction => ({
  type: UNDO
});

export const redo = (): RedoAction => ({
  type: REDO
});

export const clearHistory = (): ClearHistoryAction => ({
  type: CLEAR_HISTORY
});

export const recordHistory = (state: PhotoState): RecordHistoryAction => ({
  type: RECORD_HISTORY,
  payload: state
});

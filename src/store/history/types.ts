import { PhotoState } from '../photo/types';

export interface HistoryState {
  past: PhotoState[];
  future: PhotoState[];
  limit: number;
}

export const UNDO = 'history/UNDO';
export const REDO = 'history/REDO';
export const CLEAR_HISTORY = 'history/CLEAR_HISTORY';
export const RECORD_HISTORY = 'history/RECORD_HISTORY';

export interface UndoAction {
  type: typeof UNDO;
  [key: string]: any;
}

export interface RedoAction {
  type: typeof REDO;
  [key: string]: any;
}

export interface ClearHistoryAction {
  type: typeof CLEAR_HISTORY;
  [key: string]: any;
}

export interface RecordHistoryAction {
  type: typeof RECORD_HISTORY;
  payload: PhotoState;
  [key: string]: any;
}

export type HistoryActionTypes =
  | UndoAction
  | RedoAction
  | ClearHistoryAction
  | RecordHistoryAction;

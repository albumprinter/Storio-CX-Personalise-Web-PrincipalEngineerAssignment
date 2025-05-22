import { takeLatest, takeEvery, select, put, all, call } from 'redux-saga/effects';
import {
  UNDO,
  REDO
} from './types';
import { selectPast, selectFuture } from './selectors';
import { setPhoto } from '../photo/actions';
import { PhotoState } from '../photo/types';
import { recordHistory } from './actions';
import {
  SET_PHOTO,
  RESET_ROTATION,
  ROTATE_PHOTO,
  PAN_ZOOM_PHOTO,
  ADD_FILTER,
  REMOVE_FILTER,
  PhotoActionTypes
} from '../photo/types';

function* undoSaga() {
  const past: PhotoState[] = yield select(selectPast);
  
  console.log(past);
  if (past.length > 0) {
    const previousState = past[past.length - 1];
    
    if (previousState.photo) {
      // Set recordInHistory to false to prevent creating a new history entry
      yield put(setPhoto(previousState.photo, false));
    }
  }
}

function* redoSaga() {
  const future: PhotoState[] = yield select(selectFuture);
  
  if (future.length > 0) {
    const nextState = future[0];
    
    if (nextState.photo) {
      // Set recordInHistory to false to prevent creating a new history entry
      yield put(setPhoto(nextState.photo, false));
    }
  }
}

function* recordHistorySaga(action: PhotoActionTypes) {
  // Skip recording if this action is from undo/redo operations
  if (action.type === SET_PHOTO && action.meta && action.meta.recordInHistory === false) {
    return;
  }
  
  const currentPhotoState: PhotoState = yield select(state => ({
    photo: state.photo.photo
  }));
  
  if (currentPhotoState.photo) {
    yield put(recordHistory(currentPhotoState));
  }
}

function* watchHistoryActions() {
  yield takeLatest(UNDO, undoSaga);
  yield takeLatest(REDO, redoSaga);
}

function* watchPhotoActionsForHistory() {
  yield takeEvery(
    [
      SET_PHOTO,
      RESET_ROTATION,
      ROTATE_PHOTO,
      PAN_ZOOM_PHOTO,
      ADD_FILTER,
      REMOVE_FILTER
    ],
    recordHistorySaga
  );
}

export default function* historySagas() {
  yield all([
    watchHistoryActions(),
    watchPhotoActionsForHistory()
  ]);
}

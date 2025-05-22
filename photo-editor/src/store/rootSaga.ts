import { all } from 'redux-saga/effects';
import photoSagas from './photo/sagas';
import historySagas from './history/sagas';

export default function* rootSaga() {
  yield all([
    photoSagas(),
    historySagas()
  ]);
}

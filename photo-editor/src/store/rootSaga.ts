import { all } from 'redux-saga/effects';
// We'll import our photo sagas here later
// import photoSagas from './photo/sagas';

export default function* rootSaga() {
  yield all([
    // We'll add our photo sagas here later
    // ...photoSagas,
  ]);
}

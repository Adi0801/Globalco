import { all } from 'redux-saga/effects'
import { jobsSaga } from '../features/jobs/jobsSaga'

export function* rootSaga() {
  yield all([jobsSaga()])
}

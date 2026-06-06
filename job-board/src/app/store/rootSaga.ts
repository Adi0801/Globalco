import { all } from 'redux-saga/effects'
import { jobsSaga } from '../../features/jobs/redux/jobsSaga'

export function* rootSaga() {
  yield all([jobsSaga()])
}

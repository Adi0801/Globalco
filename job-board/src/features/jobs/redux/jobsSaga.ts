import { delay, put, takeLatest, throttle } from 'redux-saga/effects'
import { mockJobs } from '../../../data/jobs'
import { jobsActions } from './jobsSlice'

function* bootstrapJobs() {
  try {
    yield delay(350)
    yield put(jobsActions.bootstrapSucceeded(mockJobs))
  } catch {
    yield put(jobsActions.bootstrapFailed('Unable to load jobs. Please try again.'))
  }
}

function* commitSearch(action: ReturnType<typeof jobsActions.searchChanged>) {
  yield delay(300)
  yield put(jobsActions.searchCommitted(action.payload))
}

function* commitLoadMore() {
  yield delay(180)
  yield put(jobsActions.loadMoreCommitted())
}

export function* jobsSaga() {
  yield takeLatest(jobsActions.bootstrapRequested.type, bootstrapJobs)
  yield takeLatest(jobsActions.searchChanged.type, commitSearch)
  yield throttle(200, jobsActions.loadMoreRequested.type, commitLoadMore)
}

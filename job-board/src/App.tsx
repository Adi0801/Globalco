import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './app/store/hooks'
import { jobsActions } from './features/jobs/redux/jobsSlice'
import { selectJobsState } from './features/jobs/redux/jobsSelectors'
import { JobsPage } from './features/jobs/pages/JobsPage'
import { SavedJobsPage } from './features/jobs/pages/SavedJobsPage'
import { ApplyJobPage } from './features/jobs/pages/ApplyJobPage'
import { TrackJobPage } from './features/jobs/pages/TrackJobPage'
import { JobDetailPage } from './features/jobs/pages/JobDetailPage'
import { ToastMessage } from './components/common/ToastMessage'
import { AppShell } from './components/layout/AppShell'
import './App.css'

export function App() {
  const dispatch = useAppDispatch()
  const jobsState = useAppSelector(selectJobsState)

  useEffect(() => {
    dispatch(jobsActions.bootstrapRequested())
  }, [dispatch])

  // Dismiss toast after a delay if active
  useEffect(() => {
    if (jobsState.toast) {
      const timer = setTimeout(() => {
        dispatch(jobsActions.toastDismissed())
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [jobsState.toast, dispatch])

  return (
    <AppShell>
      <ToastMessage text={jobsState.toast} />
      
      <Routes>
        <Route path="/" element={<JobsPage />} />
        <Route path="/saved" element={<SavedJobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/apply/:id" element={<ApplyJobPage />} />
        <Route path="/track" element={<TrackJobPage />} />
        <Route path="/track/:id" element={<TrackJobPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}

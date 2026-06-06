import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Department, Job, Seniority, SortOption, WorkMode } from '../../types/job'

type JobsState = {
  allJobs: Job[]
  currentPage: 'jobs' | 'saved' | 'apply' | 'track'
  searchInput: string
  query: string
  workMode: WorkMode | 'All'
  department: Department | 'All'
  seniority: Seniority | 'All'
  sortBy: SortOption
  selectedJobId: string | null
  trackedJobId: string | null
  savedJobIds: string[]
  appliedJobIds: string[]
  loadedCount: number
  loading: boolean
  loadingMore: boolean
  error: string | null
  toast: string | null
}

const initialState: JobsState = {
  allJobs: [],
  currentPage: 'jobs',
  searchInput: '',
  query: '',
  workMode: 'All',
  department: 'All',
  seniority: 'All',
  sortBy: 'relevance',
  selectedJobId: null,
  trackedJobId: null,
  savedJobIds: [],
  appliedJobIds: [],
  loadedCount: 30,
  loading: false,
  loadingMore: false,
  error: null,
  toast: null,
}

const resetPaging = (state: JobsState) => {
  state.loadedCount = 30
}

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    bootstrapRequested(state) {
      state.loading = true
      state.error = null
    },
    bootstrapSucceeded(state, action: PayloadAction<Job[]>) {
      state.allJobs = action.payload
      state.loading = false
      state.selectedJobId = action.payload[0]?.id ?? null
    },
    bootstrapFailed(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    searchChanged(state, action: PayloadAction<string>) {
      state.searchInput = action.payload
    },
    searchCommitted(state, action: PayloadAction<string>) {
      state.query = action.payload.trim().toLowerCase()
      resetPaging(state)
    },
    workModeChanged(state, action: PayloadAction<WorkMode | 'All'>) {
      state.workMode = action.payload
      resetPaging(state)
    },
    departmentChanged(state, action: PayloadAction<Department | 'All'>) {
      state.department = action.payload
      resetPaging(state)
    },
    seniorityChanged(state, action: PayloadAction<Seniority | 'All'>) {
      state.seniority = action.payload
      resetPaging(state)
    },
    sortChanged(state, action: PayloadAction<SortOption>) {
      state.sortBy = action.payload
      resetPaging(state)
    },
    loadMoreRequested(state) {
      state.loadingMore = true
    },
    loadMoreCommitted(state) {
      state.loadedCount += 20
      state.loadingMore = false
    },
    jobSelected(state, action: PayloadAction<string>) {
      state.selectedJobId = action.payload
    },
    pageChanged(state, action: PayloadAction<JobsState['currentPage']>) {
      state.currentPage = action.payload
      state.toast = null
      resetPaging(state)
    },
    applyStarted(state, action: PayloadAction<string>) {
      if (state.appliedJobIds.includes(action.payload)) {
        state.trackedJobId = action.payload
        state.currentPage = 'track'
        state.toast = 'This role was already submitted. Continue tracking it here.'
        return
      }

      state.selectedJobId = action.payload
      state.currentPage = 'apply'
      state.toast = 'Application draft opened. Review the role and submit when ready.'
    },
    applicationSubmitted(state, action: PayloadAction<string>) {
      if (!state.appliedJobIds.includes(action.payload)) {
        state.appliedJobIds.push(action.payload)
      }
      state.trackedJobId = action.payload
      state.selectedJobId =
        state.allJobs.find((job) => !state.appliedJobIds.includes(job.id))?.id ?? action.payload
      state.currentPage = 'track'
      state.toast = 'Application submitted successfully. Track the hiring status from this page.'
    },
    jobSaved(state, action: PayloadAction<string>) {
      if (!state.savedJobIds.includes(action.payload)) {
        state.savedJobIds.push(action.payload)
      }
      state.selectedJobId = action.payload
      state.currentPage = 'saved'
      state.toast = 'Role saved. You can compare it from your saved jobs workspace.'
      resetPaging(state)
    },
    savedJobRemoved(state, action: PayloadAction<string>) {
      state.savedJobIds = state.savedJobIds.filter((jobId) => jobId !== action.payload)
      state.toast = 'Role removed from saved jobs.'
    },
    toastDismissed(state) {
      state.toast = null
    },
    filtersReset(state) {
      state.searchInput = ''
      state.query = ''
      state.workMode = 'All'
      state.department = 'All'
      state.seniority = 'All'
      state.sortBy = 'relevance'
      resetPaging(state)
    },
  },
})

export const jobsActions = jobsSlice.actions
export default jobsSlice.reducer

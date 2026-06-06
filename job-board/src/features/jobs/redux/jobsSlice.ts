import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Department, Job, Seniority, SortOption, WorkMode } from '../../../types/job'

export type JobsState = {
  allJobs: Job[]
  searchInput: string
  query: string
  workMode: WorkMode | 'All'
  department: Department | 'All'
  seniority: Seniority | 'All'
  sortBy: SortOption
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
  searchInput: '',
  query: '',
  workMode: 'All',
  department: 'All',
  seniority: 'All',
  sortBy: 'relevance',
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
    applicationSubmitted(state, action: PayloadAction<string>) {
      if (!state.appliedJobIds.includes(action.payload)) {
        state.appliedJobIds.push(action.payload)
      }
      state.savedJobIds = state.savedJobIds.filter((jobId) => jobId !== action.payload)
      state.toast = 'Application submitted successfully. Track the hiring status from this page.'
    },
    jobSaved(state, action: PayloadAction<string>) {
      if (!state.savedJobIds.includes(action.payload)) {
        state.savedJobIds.push(action.payload)
        state.toast = 'Role saved. You can view it from your saved jobs.'
      }
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

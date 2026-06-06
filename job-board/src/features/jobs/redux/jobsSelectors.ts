import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../../app/store/store'
import type { Job } from '../../../types/job'

export const selectJobsState = (state: RootState) => state.jobs

export const selectAllJobs = (state: RootState) => state.jobs.allJobs

export const selectJobById = (id: string | undefined) =>
  createSelector([selectAllJobs], (jobs) => jobs.find((job) => job.id === id) ?? null)

export const selectFilteredJobs = createSelector([selectJobsState], (jobsState) => {
  const query = jobsState.query

  const filtered = jobsState.allJobs.filter((job) => {
    const queryText = [
      job.title,
      job.company,
      job.location,
      job.department,
      job.workMode,
      job.seniority,
      ...job.skills,
    ]
      .join(' ')
      .toLowerCase()

    const matchesQuery = !query || queryText.includes(query)
    const matchesWorkMode = jobsState.workMode === 'All' || job.workMode === jobsState.workMode
    const matchesDepartment =
      jobsState.department === 'All' || job.department === jobsState.department
    const matchesSeniority = jobsState.seniority === 'All' || job.seniority === jobsState.seniority

    return matchesQuery && matchesWorkMode && matchesDepartment && matchesSeniority
  })

  return filtered.sort((a, b) => sortJobs(a, b, jobsState.sortBy, query))
})

// Jobs that have NOT been applied to — these show in the main list
export const selectUnappliedJobs = createSelector(
  [selectFilteredJobs, selectJobsState],
  (jobs, jobsState) => jobs.filter((job) => !jobsState.appliedJobIds.includes(job.id)),
)

export const selectVisibleJobs = createSelector(
  [selectUnappliedJobs, selectJobsState],
  (jobs, jobsState) => jobs.slice(0, jobsState.loadedCount),
)

export const selectSavedJobs = createSelector([selectAllJobs, selectJobsState], (jobs, jobsState) =>
  jobs.filter((job) => jobsState.savedJobIds.includes(job.id) && !jobsState.appliedJobIds.includes(job.id)),
)

export const selectVisibleSavedJobs = createSelector(
  [selectSavedJobs, selectJobsState],
  (jobs, jobsState) => jobs.slice(0, jobsState.loadedCount),
)

export const selectJobStats = createSelector([selectFilteredJobs], (jobs) => {
  const remoteCount = jobs.filter((job) => job.workMode === 'Remote').length
  const featuredCount = jobs.filter((job) => job.featured).length
  const salaryMin = jobs.length ? Math.min(...jobs.map((job) => job.salaryMin)) : 0
  const salaryMax = jobs.length ? Math.max(...jobs.map((job) => job.salaryMax)) : 0

  return {
    total: jobs.length,
    remoteCount,
    featuredCount,
    salaryRange: jobs.length ? `${salaryMin}-${salaryMax} LPA` : 'No range',
  }
})

const sortJobs = (a: Job, b: Job, sortBy: RootState['jobs']['sortBy'], query: string) => {
  if (sortBy === 'newest') {
    return a.postedDaysAgo - b.postedDaysAgo
  }

  if (sortBy === 'salary') {
    return b.salaryMax - a.salaryMax
  }

  return scoreJob(b, query) - scoreJob(a, query) || a.postedDaysAgo - b.postedDaysAgo
}

const scoreJob = (job: Job, query: string) => {
  let score = job.featured ? 6 : 0
  score += job.workMode === 'Remote' ? 2 : 0
  score += Math.max(0, 8 - job.postedDaysAgo / 4)

  if (query) {
    if (job.title.toLowerCase().includes(query)) score += 8
    if (job.company.toLowerCase().includes(query)) score += 4
    if (job.skills.some((skill) => skill.toLowerCase().includes(query))) score += 3
  }

  return score
}

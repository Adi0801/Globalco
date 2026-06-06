import { useAppSelector } from '../../../app/store/hooks'
import {
  selectVisibleJobs,
  selectJobStats,
  selectJobsState,
} from '../redux/jobsSelectors'
import { JobList } from '../components/JobList'
import { JobSearchFilters } from '../components/JobSearchFilters'
import { JobStats } from '../components/JobStats'
import { PageHeader } from '../../../components/common/PageHeader'

export function JobsPage() {
  const jobsState = useAppSelector(selectJobsState)
  const visibleJobs = useAppSelector(selectVisibleJobs)
  const stats = useAppSelector(selectJobStats)

  const isDebouncing = jobsState.searchInput.trim().toLowerCase() !== jobsState.query

  return (
    <div>
      <PageHeader
        subtitle="Talent marketplace"
        title="Find the right role faster"
        description="Search curated enterprise openings, compare details quickly, and review the full hiring journey before applying."
      />

      <JobStats {...stats} />

      <JobSearchFilters
        searchInput={jobsState.searchInput}
        workMode={jobsState.workMode}
        department={jobsState.department}
        seniority={jobsState.seniority}
        sortBy={jobsState.sortBy}
        isDebouncing={isDebouncing}
      />

      <JobList
        jobs={visibleJobs}
        savedJobIds={jobsState.savedJobIds}
        appliedJobIds={jobsState.appliedJobIds}
        loadingMore={jobsState.loadingMore}
      />
    </div>
  )
}

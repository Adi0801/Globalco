import { Spin, Empty } from 'antd'
import type { Job } from '../../../types/job'
import { JobRow } from './JobRow'
import './JobList.css'

type JobListProps = {
  jobs: Job[]
  savedJobIds: string[]
  appliedJobIds: string[]
  loadingMore: boolean
}

export function JobList({
  jobs,
  savedJobIds,
  appliedJobIds,
  loadingMore,
}: JobListProps) {
  if (!jobs.length) {
    return <Empty description="No roles match this search. Try another keyword or reset filters." />
  }

  return (
    <div className="job-list-shell">
      <div className="job-list">
        {jobs.map((job) => (
          <div key={job.id} className="job-row-container">
            <JobRow
              job={job}
              isSaved={savedJobIds.includes(job.id)}
              isApplied={appliedJobIds.includes(job.id)}
            />
          </div>
        ))}
      </div>
      {loadingMore ? (
        <div style={{ textAlign: 'center', padding: '16px' }}>
          <Spin size="small" /> Loading more roles...
        </div>
      ) : null}
    </div>
  )
}

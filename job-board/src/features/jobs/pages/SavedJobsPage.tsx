import { Button } from 'antd'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../app/store/hooks'
import {
  selectVisibleSavedJobs,
  selectJobsState,
} from '../redux/jobsSelectors'
import { JobList } from '../components/JobList'
import { PageHeader } from '../../../components/common/PageHeader'

export function SavedJobsPage() {
  const navigate = useNavigate()
  const jobsState = useAppSelector(selectJobsState)
  const visibleSavedJobs = useAppSelector(selectVisibleSavedJobs)

  return (
    <div>
      <Button
        type="text"
        onClick={() => navigate('/')}
        icon={<ArrowLeft size={16} />}
        style={{ marginBottom: '16px' }}
      >
        Back to jobs
      </Button>

      <PageHeader
        title="Saved Jobs"
        description={`You have ${jobsState.savedJobIds.length} saved role${jobsState.savedJobIds.length !== 1 ? 's' : ''}`}
      />

      <JobList
        jobs={visibleSavedJobs}
        savedJobIds={jobsState.savedJobIds}
        appliedJobIds={jobsState.appliedJobIds}
        loadingMore={jobsState.loadingMore}
      />
    </div>
  )
}

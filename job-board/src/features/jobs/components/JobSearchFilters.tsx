import { Card, Space, Input, Select, Button, Segmented, Row, Col } from 'antd'
import { RotateCcw } from 'lucide-react'
import { useAppDispatch } from '../../../app/store/hooks'
import { jobsActions } from '../redux/jobsSlice'
import type { Department, Seniority, SortOption, WorkMode } from '../../../types/job'

type JobSearchFiltersProps = {
  searchInput: string
  workMode: WorkMode | 'All'
  department: Department | 'All'
  seniority: Seniority | 'All'
  sortBy: SortOption
  isDebouncing: boolean
}

const workModes: Array<WorkMode | 'All'> = ['All', 'Remote', 'Hybrid', 'On-site']
const departments: Array<Department | 'All'> = [
  'All',
  'Engineering',
  'Design',
  'Product',
  'Data',
  'Marketing',
  'Operations',
]
const seniorities: Array<Seniority | 'All'> = ['All', 'Associate', 'Mid-level', 'Senior', 'Lead']

export function JobSearchFilters({
  searchInput,
  workMode,
  department,
  seniority,
  sortBy,
}: JobSearchFiltersProps) {
  const dispatch = useAppDispatch()

  return (
    <Card style={{ marginBottom: '20px' }}>
      <Space orientation="vertical" style={{ width: '100%' }} size="middle">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} lg={14}>
            <Input.Search
              placeholder="Search title, company, skill, or location"
              value={searchInput}
              onChange={(e) => dispatch(jobsActions.searchChanged(e.target.value))}
              enterButton
              allowClear
              size="large"
            />
          </Col>
          <Col xs={24} sm={8} lg={4}>
            <Select
              value={sortBy}
              onChange={(value) => dispatch(jobsActions.sortChanged(value))}
              options={[
                { label: 'Relevance', value: 'relevance' },
                { label: 'Newest', value: 'newest' },
                { label: 'Salary', value: 'salary' },
              ]}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={12} sm={4} lg={3}>
            <Button
              icon={<RotateCcw size={16} />}
              onClick={() => dispatch(jobsActions.filtersReset())}
              style={{ width: '100%' }}
            >
              Reset
            </Button>
          </Col>
        </Row>

        <div>
          <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Work Mode</div>
          <Segmented
            block
            options={workModes}
            value={workMode}
            onChange={(value) => dispatch(jobsActions.workModeChanged(value as WorkMode | 'All'))}
          />
        </div>

        <div>
          <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Department</div>
          <Segmented
            block
            options={departments}
            value={department}
            onChange={(value) => dispatch(jobsActions.departmentChanged(value as Department | 'All'))}
          />
        </div>

        <div>
          <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Seniority</div>
          <Segmented
            block
            options={seniorities}
            value={seniority}
            onChange={(value) => dispatch(jobsActions.seniorityChanged(value as Seniority | 'All'))}
          />
        </div>
      </Space>
    </Card>
  )
}

import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button, Space, Tag, Descriptions, Table, Collapse, Avatar, Empty, Typography } from 'antd'
import { ArrowLeft, MapPin, BriefcaseBusiness, Building2, Wallet, Send, Bookmark } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '../../../app/store/hooks'
import { selectJobById, selectJobsState } from '../redux/jobsSelectors'
import { jobsActions } from '../redux/jobsSlice'
import './JobDetailPage.css'

const { Text } = Typography

export function JobDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const job = useAppSelector(selectJobById(id))
  const jobsState = useAppSelector(selectJobsState)

  if (!job) {
    return (
      <div className="job-detail-page">
        <Button
          type="text"
          onClick={() => navigate('/')}
          icon={<ArrowLeft size={16} />}
          style={{ marginBottom: '16px' }}
        >
          Back to jobs
        </Button>
        <Card>
          <Empty description="Job not found" />
        </Card>
      </div>
    )
  }

  const isSaved = jobsState.savedJobIds.includes(job.id)
  const isApplied = jobsState.appliedJobIds.includes(job.id)

  const collapseItems = [
    {
      key: 'responsibilities',
      label: 'What you will do',
      children: (
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          {job.responsibilities.map((resp) => (
            <li key={resp} style={{ marginBottom: '8px' }}>
              {resp}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: 'requirements',
      label: 'What we are looking for',
      children: (
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          {job.requirements.map((req) => (
            <li key={req} style={{ marginBottom: '8px' }}>
              {req}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: 'benefits',
      label: 'Benefits',
      children: (
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          {job.benefits.map((benefit) => (
            <li key={benefit} style={{ marginBottom: '8px' }}>
              {benefit}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: 'hiringStages',
      label: 'Hiring process',
      children: (
        <Table
          columns={[{ title: 'Stage', dataIndex: 'stage', render: (text: string) => <span>{text}</span> }]}
          dataSource={job.hiringStages.map((stage, index) => ({ key: index, stage }))}
          pagination={false}
          size="small"
        />
      ),
    },
  ]

  return (
    <div className="job-detail-page">
      <Button
        type="text"
        onClick={() => navigate('/')}
        icon={<ArrowLeft size={16} />}
        className="back-link"
      >
        Back to jobs
      </Button>

      <div className="job-detail-layout">
        <div className="job-detail-main">
          <Card>
            <div className="job-detail-header">
              <Avatar size={56} style={{ backgroundColor: '#14b8a6', flexShrink: 0 }}>
                {job.company.charAt(0).toUpperCase()}
              </Avatar>
              <div>
                <Text type="secondary" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {job.company}
                </Text>
                <h1 className="job-detail-title">{job.title}</h1>
                <p className="job-detail-summary">{job.summary}</p>
              </div>
            </div>

            <Descriptions
              size="small"
              column={{ xs: 1, sm: 2 }}
              style={{ marginTop: '24px' }}
              items={[
                {
                  key: '1',
                  label: (
                    <>
                      <Building2 size={14} style={{ marginRight: '4px' }} />
                      Department
                    </>
                  ),
                  children: job.department,
                },
                {
                  key: '2',
                  label: (
                    <>
                      <MapPin size={14} style={{ marginRight: '4px' }} />
                      Location
                    </>
                  ),
                  children: job.location,
                },
                {
                  key: '3',
                  label: (
                    <>
                      <BriefcaseBusiness size={14} style={{ marginRight: '4px' }} />
                      Mode
                    </>
                  ),
                  children: job.workMode,
                },
                {
                  key: '4',
                  label: (
                    <>
                      <Wallet size={14} style={{ marginRight: '4px' }} />
                      Salary
                    </>
                  ),
                  children: `${job.salaryMin}-${job.salaryMax} LPA`,
                },
              ]}
            />

            <div style={{ marginTop: '24px' }}>
              <div style={{ marginBottom: '8px', fontWeight: 600 }}>Skills</div>
              <Space wrap>
                {job.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </Space>
            </div>

            <div style={{ marginTop: '24px' }}>
              <Collapse items={collapseItems} size="small" defaultActiveKey={['responsibilities']} />
            </div>
          </Card>
        </div>

        <div className="job-detail-sidebar">
          <Card className="job-detail-actions-card">
            <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
              <Button
                type="primary"
                size="large"
                block
                icon={<Send size={16} />}
                onClick={() => {
                  if (isApplied) {
                    navigate(`/track/${job.id}`)
                  } else {
                    navigate(`/apply/${job.id}`)
                  }
                }}
              >
                {isApplied ? 'View Application' : 'Apply Now'}
              </Button>
              <Button
                size="large"
                block
                icon={<Bookmark size={16} />}
                onClick={() => dispatch(jobsActions.jobSaved(job.id))}
                type={isSaved ? 'default' : 'default'}
              >
                {isSaved ? '✓ Saved' : 'Save Role'}
              </Button>
              {isApplied && (
                <Tag color="green" style={{ textAlign: 'center', padding: '6px 12px', fontSize: '14px', width: '100%' }}>
                  ✓ Already Applied
                </Tag>
              )}
            </Space>
          </Card>
        </div>
      </div>
    </div>
  )
}

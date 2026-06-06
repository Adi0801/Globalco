import { Card, Steps, Space, Tag, Row, Col, Typography, Button, Empty, Badge } from 'antd'
import { ArrowLeft } from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../app/store/hooks'
import { selectJobById, selectJobsState } from '../redux/jobsSelectors'
import { PageHeader } from '../../../components/common/PageHeader'

const { Text } = Typography

export function TrackJobPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const job = useAppSelector(selectJobById(id))
  const jobsState = useAppSelector(selectJobsState)

  const appliedJobs = jobsState.allJobs.filter((j) => jobsState.appliedJobIds.includes(j.id))

  if (!job) {
    return (
      <div>
        <PageHeader
          title="Track Applications"
          description="View and track the status of all your submitted job applications."
        />
        {appliedJobs.length === 0 ? (
          <Card style={{ textAlign: 'center', padding: '48px 24px', borderRadius: '8px' }}>
            <Empty
              description={
                <span style={{ color: '#64748b', fontSize: '15px' }}>
                  You haven't applied to any roles yet.
                </span>
              }
            >
              <Button type="primary" size="large" onClick={() => navigate('/')} style={{ marginTop: '12px' }}>
                Browse Open Jobs
              </Button>
            </Empty>
          </Card>
        ) : (
          <Row gutter={[16, 16]}>
            {appliedJobs.map((appliedJob) => (
              <Col xs={24} sm={12} md={8} key={appliedJob.id}>
                <Card
                  hoverable
                  style={{ borderRadius: '8px', height: '100%' }}
                  styles={{ body: { height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } }}
                >
                  <Space direction="vertical" size="small" style={{ width: '100%', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text type="secondary" style={{ fontSize: '12px' }}>{appliedJob.company}</Text>
                      <Badge status="processing" text="Applied" style={{ fontSize: '12px' }} />
                    </div>
                    <h3 style={{ margin: '4px 0', fontSize: '16px', fontWeight: 600 }}>{appliedJob.title}</h3>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{appliedJob.workMode} · {appliedJob.location}</Text>
                  </Space>
                  <Button
                    type="primary"
                    ghost
                    block
                    onClick={() => navigate(`/track/${appliedJob.id}`)}
                  >
                    Track Progress
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    )
  }


  const stages = [
    { title: 'Application submitted', description: 'Completed just now' },
    { title: 'Recruiter review', description: 'In progress' },
    { title: 'Interview scheduling', description: 'Waiting for previous stage' },
    { title: 'Final decision', description: 'Waiting for previous stage' },
  ]

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

      <PageHeader title="Track Application" />

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Text type="secondary" style={{ textTransform: 'uppercase', fontSize: '12px' }}>
                  Application Tracker
                </Text>
              </div>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>{job.title}</h2>
              <Text>{job.company}</Text>
              <Tag>{job.location}</Tag>
              <Space orientation="vertical" size="small">
                <Text>
                  <strong>{jobsState.appliedJobIds.length}</strong> submitted application{jobsState.appliedJobIds.length === 1 ? '' : 's'}
                </Text>
              </Space>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card title="Hiring Status">
            <Steps
              direction="vertical"
              items={stages.map((stage, index) => ({
                title: stage.title,
                description: stage.description,
                status: index === 0 ? 'finish' : index === 1 ? 'process' : 'wait',
              }))}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

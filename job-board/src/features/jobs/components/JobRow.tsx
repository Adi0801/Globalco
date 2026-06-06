import { Card, Tag, Space, Typography } from 'antd'
import { MapPin, BriefcaseBusiness, Building2, Wallet } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Job } from '../../../types/job'
import './JobRow.css'

const { Text } = Typography

type JobRowProps = {
  job: Job
  isSaved: boolean
  isApplied: boolean
}

export function JobRow({ job, isSaved, isApplied }: JobRowProps) {
  const navigate = useNavigate()

  return (
    <Card
      className={`job-row ${isSaved ? 'saved' : ''}`}
      onClick={() => navigate(`/jobs/${job.id}`)}
      style={{ cursor: 'pointer', marginBottom: '12px' }}
      hoverable
    >
      <div className="job-row-content">
        <div className="job-row-info">
          <Space orientation="vertical" size={4} style={{ width: '100%' }}>
            <Space size={8} style={{ flexWrap: 'wrap' }}>
              <Text strong style={{ fontSize: '15px' }}>
                {job.title}
              </Text>
              {job.featured && <Tag color="gold">Featured</Tag>}
              {isSaved && <Tag color="teal">Saved</Tag>}
              {isApplied && <Tag color="green">Applied</Tag>}
            </Space>
            <Text type="secondary">{job.company}</Text>
            <Space wrap size="small">
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                <MapPin size={14} style={{ marginRight: '4px' }} />
                {job.location}
              </span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                <Building2 size={14} style={{ marginRight: '4px' }} />
                {job.department}
              </span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                <BriefcaseBusiness size={14} style={{ marginRight: '4px' }} />
                {job.workMode}
              </span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                <Wallet size={14} style={{ marginRight: '4px' }} />
                {job.salaryMin}-{job.salaryMax} LPA
              </span>
            </Space>
            <div style={{ marginTop: '8px' }}>
              {job.skills.slice(0, 3).map((skill) => (
                <Tag key={skill} style={{ marginRight: '4px', marginBottom: '4px' }}>
                  {skill}
                </Tag>
              ))}
              {job.skills.length > 3 && (
                <Tag style={{ marginRight: '4px', marginBottom: '4px' }}>+{job.skills.length - 3}</Tag>
              )}
            </div>
          </Space>
        </div>
      </div>
    </Card>
  )
}

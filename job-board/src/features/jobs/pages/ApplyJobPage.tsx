import { Form, Input, Upload, Button, Alert, Space, Card, Typography, Modal } from 'antd'
import { Upload as UploadIcon, Send, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../app/store/hooks'
import { selectJobById, selectJobsState } from '../redux/jobsSelectors'
import { jobsActions } from '../redux/jobsSlice'
import { PageHeader } from '../../../components/common/PageHeader'
import './ApplyJobPage.css'

const { Text } = Typography

export function ApplyJobPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const job = useAppSelector(selectJobById(id))
  const jobsState = useAppSelector(selectJobsState)
  const [form] = Form.useForm()
  const [resumeFile, setResumeFile] = useState<File | null>(null)

  const isApplied = job ? jobsState.appliedJobIds.includes(job.id) : false

  const handleSubmit = () => {
    if (!resumeFile) {
      Modal.error({
        title: 'Resume Required',
        content: 'Please upload a resume file before submitting the application.',
      })
      return
    }

    if (job) {
      dispatch(jobsActions.applicationSubmitted(job.id))
      navigate(`/track/${job.id}`)
    }
  }

  if (!job) {
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
        <PageHeader title="Apply for Job" />
        <Alert
          type="warning"
          title="Job not found"
          description="This job may no longer be available. Browse other openings."
          style={{ marginBottom: '20px' }}
        />
      </div>
    )
  }

  return (
    <div>
      <Button
        type="text"
        onClick={() => navigate(`/jobs/${job.id}`)}
        icon={<ArrowLeft size={16} />}
        style={{ marginBottom: '16px' }}
      >
        Back to job details
      </Button>

      <PageHeader title={`Apply for ${job.title}`} />

      <div className="apply-page-layout">
        <Card className="apply-summary" style={{ marginBottom: '20px' }}>
          <Space orientation="vertical" size="middle">
            <Text type="secondary" style={{ textTransform: 'uppercase', fontSize: '12px' }}>
              Application for
            </Text>
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>{job.title}</h2>
            <Text>{job.company}</Text>
            <Text>
              {job.workMode} · {job.location}
            </Text>
            <Text type="secondary">{job.summary}</Text>
          </Space>
        </Card>

        <Card className="apply-form-card">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              name: 'Aditya Sinha',
              email: 'aditya@example.com',
              address: 'Bengaluru, Karnataka, India',
              note: `I am interested in the ${job.title} role and would like to discuss how my experience matches the team needs.`,
            }}
          >
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: 'Please enter your full name' }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input size="large" type="email" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please enter your address' }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item
              label="Resume"
              required
              rules={[
                {
                  validator: () => (resumeFile ? Promise.resolve() : Promise.reject()),
                  message: 'Please upload a resume',
                },
              ]}
            >
              <Upload.Dragger
                accept=".pdf,.doc,.docx"
                maxCount={1}
                onChange={(info) => {
                  const file = info.fileList[0]?.originFileObj
                  setResumeFile(file || null)
                }}
              >
                <UploadIcon size={32} style={{ marginBottom: '8px', color: '#14b8a6' }} />
                <p>Upload PDF, DOC, or DOCX resume</p>
                <p style={{ fontSize: '12px', color: '#64748b' }}>
                  {resumeFile ? `Selected: ${resumeFile.name}` : 'Drag and drop or click to select'}
                </p>
              </Upload.Dragger>
            </Form.Item>

            <Form.Item
              label="Short Note"
              name="note"
              rules={[{ max: 500, message: 'Note must be less than 500 characters' }]}
            >
              <Input.TextArea rows={5} />
            </Form.Item>

            <Button
              type="primary"
              size="large"
              htmlType="submit"
              block
              icon={<Send size={16} />}
            >
              {isApplied ? 'Update Application' : 'Submit Application'}
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  )
}

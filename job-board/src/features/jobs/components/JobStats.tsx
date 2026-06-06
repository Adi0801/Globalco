import { Card, Row, Col, Statistic } from 'antd'
import { BriefcaseIcon, Wifi, Sparkles, WalletCards } from 'lucide-react'

export type JobStatsProps = {
  total: number
  remoteCount: number
  featuredCount: number
  salaryRange: string
}

export function JobStats({ total, remoteCount, featuredCount, salaryRange }: JobStatsProps) {
  const stats = [
    { label: 'Open roles', value: total, icon: BriefcaseIcon },
    { label: 'Remote', value: remoteCount, icon: Wifi },
    { label: 'Featured', value: featuredCount, icon: Sparkles },
    { label: 'Salary range', value: salaryRange, icon: WalletCards },
  ]

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Col key={stat.label} xs={24} sm={12} md={6}>
            <Card hoverable style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Icon size={20} style={{ marginBottom: '8px', opacity: 0.6 }} />
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>{stat.label}</div>
              <Statistic
                value={stat.value}
                styles={{
                  content: {
                    fontSize: '24px',
                    fontWeight: 600,
                    color: '#0f172a',
                  }
                }}
              />
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}

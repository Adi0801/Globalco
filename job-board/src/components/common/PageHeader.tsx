import { Divider, Space, Typography } from 'antd'
import type { ReactNode } from 'react'

const { Title, Text } = Typography

export function PageHeader({
  title,
  subtitle,
  description,
  extra,
}: {
  title: string
  subtitle?: string
  description?: string
  extra?: ReactNode
}) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <Space orientation="vertical" style={{ width: '100%' }} size={0}>
        {subtitle && (
          <Text type="secondary" style={{ textTransform: 'uppercase', fontSize: '12px' }}>
            {subtitle}
          </Text>
        )}
        <Title level={1} style={{ marginBottom: 0 }}>
          {title}
        </Title>
        {description && (
          <Text type="secondary" style={{ fontSize: '16px', maxWidth: '600px', display: 'block' }}>
            {description}
          </Text>
        )}
      </Space>
      {extra && (
        <>
          <Divider style={{ margin: '16px 0' }} />
          <div>{extra}</div>
        </>
      )}
    </div>
  )
}

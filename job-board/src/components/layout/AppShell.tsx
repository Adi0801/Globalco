import { Layout, Menu, Badge, Space, Typography } from 'antd'
import { Briefcase, Bookmark, Activity, Globe } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../app/store/hooks'
import { selectJobsState } from '../../features/jobs/redux/jobsSelectors'
import type { ReactNode } from 'react'
import './AppShell.css'

const { Header, Content } = Layout
const { Text } = Typography

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation()
  const { savedJobIds, appliedJobIds } = useAppSelector(selectJobsState)

  // Determine active menu key based on current pathname
  let activeKey = '/'
  if (location.pathname.startsWith('/saved')) {
    activeKey = '/saved'
  } else if (location.pathname.startsWith('/track')) {
    activeKey = '/track'
  }

  const menuItems = [
    {
      key: '/',
      label: (
        <Link to="/">
          <Space size={6}>
            <Briefcase size={16} />
            <span>Jobs</span>
          </Space>
        </Link>
      ),
    },
    {
      key: '/saved',
      label: (
        <Link to="/saved">
          <Space size={6}>
            <Bookmark size={16} />
            <span>Saved</span>
            {savedJobIds.length > 0 && (
              <Badge
                count={savedJobIds.length}
                size="small"
                style={{ backgroundColor: '#14b8a6', boxShadow: 'none' }}
              />
            )}
          </Space>
        </Link>
      ),
    },
    {
      key: '/track',
      label: (
        <Link to="/track">
          <Space size={6}>
            <Activity size={16} />
            <span>Track</span>
            {appliedJobIds.length > 0 && (
              <Badge
                count={appliedJobIds.length}
                size="small"
                style={{ backgroundColor: '#0ea5e9', boxShadow: 'none' }}
              />
            )}
          </Space>
        </Link>
      ),
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Header className="app-shell-header">
        <div className="header-container">
          <Link to="/" className="brand-link">
            <Space size={8}>
              <div className="logo-container">
                <Globe size={20} className="logo-icon" />
              </div>
              <Text strong className="brand-text">
                Globalco <span className="brand-subtext">Job Board</span>
              </Text>
            </Space>
          </Link>
          <Menu
            mode="horizontal"
            selectedKeys={[activeKey]}
            items={menuItems}
            className="header-menu"
            disabledOverflow
          />
        </div>
      </Header>
      <Content className="app-shell-content">
        <div className="content-container">
          {children}
        </div>
      </Content>
    </Layout>
  )
}

import { ConfigProvider, App } from 'antd'
import { Provider } from 'react-redux'
import type { ReactNode } from 'react'
import { store } from '../store/store'

// Enterprise theme tokens: teal primary, 8px radius, compact spacing, white cards, slate text
const themeConfig = {
  token: {
    colorPrimary: '#14b8a6', // Teal
    borderRadius: 8,
    fontSize: 14,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    // Compact spacing
    margin: 12,
    marginXS: 4,
    marginSM: 8,
    marginMD: 12,
    marginLG: 16,
    marginXL: 24,
    padding: 12,
    paddingXS: 4,
    paddingSM: 8,
    paddingMD: 12,
    paddingLG: 16,
    paddingXL: 24,
    colorTextBase: '#334155', // Slate text
    colorBgBase: '#ffffff', // White background
  },
  components: {
    Card: {
      colorBgContainer: '#ffffff',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    },
    Button: {
      borderRadius: 8,
      controlHeight: 36,
    },
    Input: {
      borderRadius: 8,
      controlHeight: 36,
    },
    Select: {
      borderRadius: 8,
      controlHeight: 36,
    },
    Segmented: {
      borderRadius: 8,
    },
    Tag: {
      borderRadius: 6,
    },
    Table: {
      headerBg: '#f8fafc',
    },
  },
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ConfigProvider theme={themeConfig}>
        <App>{children}</App>
      </ConfigProvider>
    </Provider>
  )
}

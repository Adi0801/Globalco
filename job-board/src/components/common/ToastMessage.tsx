import { App } from 'antd'
import { useEffect } from 'react'

export function ToastMessage({ text }: { text: string | null }) {
  const { message } = App.useApp()
  
  useEffect(() => {
    if (text) {
      message.success(text)
    }
  }, [text, message])

  return null
}

import { useCallback, useState, useEffect } from 'react'

export function useResponsiveLayout() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const checkMobile = useCallback(() => {
    return typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  }, [])

  return {
    isMobile,
    checkMobile,
  }
}

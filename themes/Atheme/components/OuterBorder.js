import { useEffect, useState } from 'react'
import { siteConfig } from '@/lib/config'

const OuterBorder = ({ children }) => {
  const [hasFocus, setHasFocus] = useState(false)

  useEffect(() => {
    // 监听 window 的 focus 和 blur 事件
    const handleFocus = () => setHasFocus(true)
    const handleBlur = () => setHasFocus(false)

    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)

    // 清理事件监听器
    return () => {
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [])

  return (
    <div
      // id='theme-gitbook'
      className={`${siteConfig('FONT_STYLE')} relative m-6 rounded-lg scroll-smooth bg-white ${hasFocus ? 'focused' : ''}  justify-center  items-center dark:text-gray-300 border outer-border overflow-y-auto flex scroll-hidden divide divide-gray-950`}
      style={{
        height: 'calc(100vh - 3rem)'
      }}>
         <div className="absolute inset-0 -z-10 bg-gray-100 rounded-lg transform scale-105"></div>
      {children}
    </div>
  )
}

export default OuterBorder

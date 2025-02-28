import React, { useState, useEffect } from 'react'
import ScrollVelocity from './animation/ScrollVelocity'

function DesktopOnlyOverlay() {
  // 控制是否显示覆盖层
  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    // 可以根据自己的需求，调整这些阈值
    const widthThreshold = 1280
    const heightThreshold = 720

    const handleResize = () => {
      // 如果宽度或高度小于阈值，则显示提示
      if (
        window.innerWidth < widthThreshold ||
        window.innerHeight < heightThreshold
      ) {
        setShowOverlay(true)
      } else {
        setShowOverlay(false)
      }
    }

    // 组件挂载时先执行一次
    handleResize()
    // 监听窗口大小变化
    window.addEventListener('resize', handleResize)

    // 组件卸载时移除监听
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      {/* 只有当 showOverlay = true 时，才渲染这个覆盖层 */}
      {showOverlay && (
        <div className='absolute inset-0 flex flex-col h-full w-full items-center justify-center bg-gray-900 text-black z-50 gap-y-10 overflow-hidden'>
          <div className ='bg-yellow-300 py-5 -rotate-12'>
            <ScrollVelocity
              texts={['响应式布局施工中 ⚠️ Dynamic Layout Under Construction ⚠️']}
              velocity={200}
              className='text-7xl'
            />
          </div>
          <div className ='bg-yellow-300 py-5 -rotate-12 text-xl'>
            <ScrollVelocity
              texts={['请使用电脑端访问 😊 Visit From Desktop Device 😊']}
              velocity={-100}
              className='text-3xl'
            />
          </div>
        </div>
      )}
    </>
  )
}

export default DesktopOnlyOverlay

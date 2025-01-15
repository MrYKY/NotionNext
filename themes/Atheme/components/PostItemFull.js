import Badge from '@/components/Badge'
import Collapse from '@/components/Collapse'
import { siteConfig } from '@/lib/config'
import React, { useEffect, useRef, useState } from 'react'
import BlogPostCardFull from './BlogPostCardFull'
import Masonry from 'react-masonry-css'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * 导航列表
 * @param posts 所有文章
 * @param tags 所有标签
 * @returns {JSX.Element}
 * @constructor
 */
const PostItemFull = props => {
  const { group, expanded, toggleItem, sortmethod, showmethod } = props // 接收传递的展开状态、切换函数和排序方法
  const hoverExpand = siteConfig('GITBOOK_FOLDER_HOVER_EXPAND')
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const gridRef = useRef(null) // 父组件的引用
  const [columnCount, setColumnCount] = useState(3) // 默认栏数

  // 监听父组件宽度变化
  useEffect(() => {
    const updateColumnCount = () => {
      if (gridRef.current) {
        const width = gridRef.current.clientWidth
        if (width >= 768) setColumnCount(3)
        else if (width >= 512) setColumnCount(2)
        else setColumnCount(1)
      }
    }

    // 初始化列数
    updateColumnCount()

    const resizeObserver = new ResizeObserver(updateColumnCount)
    if (gridRef.current) {
      resizeObserver.observe(gridRef.current) // 开始监听
    }

    return () => {
      if (gridRef.current) {
        resizeObserver.unobserve(gridRef.current) // 停止监听
      }
    }
  }, [])

  // 定义断点和对应的列数
  const breakpointColumnsObj = {
    default: columnCount,
    1100: Math.min(columnCount, 3),
    700: Math.min(columnCount, 2),
    500: 1
  }

  // 检测是否为触摸设备
  useEffect(() => {
    const checkTouchDevice = () => {
      if (window.matchMedia('(pointer: coarse)').matches) {
        setIsTouchDevice(true)
      }
    }
    checkTouchDevice()

    // 可选：监听窗口大小变化时重新检测
    window.addEventListener('resize', checkTouchDevice)
    return () => {
      window.removeEventListener('resize', checkTouchDevice)
    }
  }, [])

  // 当展开状态改变时触发切换函数，并根据传入的展开状态更新内部状态
  const toggleOpenSubMenu = () => {
    toggleItem() // 调用父组件传递的切换函数
  }
  const onHoverToggle = () => {
    // 允许鼠标悬停时自动展开，而非点击展开
    if (!hoverExpand || isTouchDevice) {
      return
    }
    toggleOpenSubMenu()
  }

  const groupHasLatest = group?.items?.some(post => post.isLatest)

  const sortedItems = group?.items ? [...group.items] : []
  sortedItems.sort((a, b) => b.time - a.time) // 从新到旧排序

  if (group?.category && sortmethod === 'category') {
    return (
      <>
        <div
          onMouseEnter={onHoverToggle}
          onClick={toggleOpenSubMenu}
          className='group cursor-pointer relative flex justify-between text-md p-2 hover:bg-zinc-200 duration-300 rounded-md dark:hover:bg-yellow-100 dark:hover:text-yellow-600'
          key={group?.category}>
          <span className={`${expanded && 'font-semibold'}`}>
            {group?.category}
          </span>
          <div className='inline-flex items-center select-none pointer-events-none '>
            <div className='absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center'>
              <div
                className={`w-3 h-0.5 bg-gray-500 rounded transition-all duration-150 ${
                  expanded
                    ? '!w-2 !h-2 !border-t-2 !border-r-2 !border-gray-500 !bg-transparent !rounded-none transform rotate-135 '
                    : 'group-hover:w-3 group-hover:h-3 group-hover:border-2 group-hover:border-gray-500 group-hover:bg-transparent group-hover:rounded-full'
                }`}></div>
            </div>
          </div>
        </div>
        <Collapse isOpen={expanded} onHeightChange={props.onHeightChange}>
          <div ref={gridRef} className='w-full'>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className='my-masonry-grid'
              columnClassName='my-masonry-grid_column'>
              {sortedItems.map((post, index) => (
                <motion.div
                  key={index}
                  className='grid-item'
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}>
                  <BlogPostCardFull post={post} showmethod={showmethod} />
                </motion.div>
              ))}
            </Masonry>
          </div>
        </Collapse>
      </>
    )
  } else {
    return (
      <div ref={gridRef} className='w-full'>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className='my-masonry-grid'
          columnClassName='my-masonry-grid_column'>
          {sortedItems.map((post, index) => (
            <motion.div
              key={index}
              className='grid-item'
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}>
              <BlogPostCardFull post={post} showmethod={showmethod} />
            </motion.div>
          ))}
        </Masonry>
      </div>
    )
  }
}

export default PostItemFull

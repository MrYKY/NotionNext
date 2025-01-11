import Badge from '@/components/Badge'
import Collapse from '@/components/Collapse'
import { siteConfig } from '@/lib/config'
import { useEffect, useState } from 'react'
import BlogPostCard from './BlogPostCard'

/**
 * 导航列表
 * @param posts 所有文章
 * @param tags 所有标签
 * @returns {JSX.Element}
 * @constructor
 */
const NavPostItem = props => {
  const { group, expanded, toggleItem, sortmethod } = props; // 接收传递的展开状态、切换函数和排序方法
  const hoverExpand = siteConfig('GITBOOK_FOLDER_HOVER_EXPAND')
  const [isTouchDevice, setIsTouchDevice] = useState(false)

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

  const sortedItems = group?.items ? [...group.items] : [];
  sortedItems.sort((a, b) => b.time - a.time); // 从新到旧排序

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
          {sortedItems.map((post, index) => (
            <div key={index} >
              <BlogPostCard post={post} />
            </div>
          ))}
        </Collapse>
      </>
    )
  } else {
    return (
      <>
        {sortedItems.map((post, index) => (
          <div key={index} >
            <BlogPostCard className='text-md py-2' post={post} />
          </div>
        ))}
      </>
    )
  }
}

export default NavPostItem

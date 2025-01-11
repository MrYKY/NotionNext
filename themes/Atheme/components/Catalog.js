import { isBrowser } from '@/lib/utils'
import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import { useCallback, useEffect, useState } from 'react'

/**
 * 目录导航组件
 * @param toc
 * @returns {JSX.Element}
 * @constructor
 */
const Catalog = ({ post }) => {
  const toc = post?.toc
  // console.log('Enter Catalog: ', post)
  // 同步选中目录事件
  const [activeSection, setActiveSection] = useState(null)

  // 监听滚动事件
  useEffect(() => {
    const scrollContainer = document.getElementById('center-wrapper');
    scrollContainer.addEventListener('scroll', actionSectionScrollSpy)
    actionSectionScrollSpy()
    return () => {
      scrollContainer.removeEventListener('scroll', actionSectionScrollSpy)
    }
  }, [post] )

  const throttleMs = 200
  const actionSectionScrollSpy = useCallback(
    throttle(() => {
      const sections = document.getElementsByClassName('notion-h')
      let prevBBox = null
      let currentSectionId = null
      for (let i = 0; i < sections.length; ++i) {
        const section = sections[i]
        if (!section || !(section instanceof Element)) continue
        if (!currentSectionId) {
          currentSectionId = section.getAttribute('data-id')
        }
        const bbox = section.getBoundingClientRect()
        const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0
        const offset = Math.max(150, prevHeight / 4)
        // GetBoundingClientRect returns values relative to viewport
        if (bbox.top - offset < 0) {
          currentSectionId = section.getAttribute('data-id')
          prevBBox = bbox
          continue
        }
        // No need to continue loop, if last element has been detected
        break
      }
      setActiveSection(currentSectionId)
      const tocIds = post?.toc?.map(t => uuidToId(t.id)) || []
      const index = tocIds.indexOf(currentSectionId) || 0
      if (isBrowser && tocIds?.length > 0) {
        for (const tocWrapper of document?.getElementsByClassName(
          'toc-wrapper'
        )) {
          tocWrapper?.scrollTo({ top: 16 * index - 180, behavior: 'smooth' })
        }
      }
    }, throttleMs)
  )

  // 无目录就直接返回空
  if (!toc || toc?.length < 1) {
    return <></>
  }

  return (
    <div
      id='toc-wrapper'
      className='toc-wrapper overflow-y-auto my-2 max-h-96 overscroll-none scroll-hidden transition-all duration-500 ease-in-out'>
       
      <nav className=''>
        {toc?.map(tocItem => {
          const id = uuidToId(tocItem.id)
          const isActive = activeSection === id
          const lineWidth = 16 + (16 - tocItem.indentLevel * 8)

          return (
            <a
              key={id}
              href={`#${id}`}
              style={{ '--dynamic-w': `${lineWidth}px` }}
              onClick={() => {
                // 1. 立马更新选中状态
                setActiveSection(uuidToId(tocItem.id))}}
              // 当条目处于 active 时或 hover 时，通过 Tailwind 的 group/hover 等类名实现动态展示
              className={`
                relative
                group
                transition-all
                duration-1000
                ease-in-out
                flex
                items-center
                justify-start
                px-2
                py-0.5
                notion-table-of-contents-item-indent-level-${tocItem.indentLevel}
                ${
                  isActive
                    ? 'text-xs py-2' // activeSection 时：文字加粗 + 较大间距
                    : 'hover:py-2'
                }
              `}>
              {/* 圆角灰色短横线 */}
              <span
                className={`
                  flex
                  h-1
                  bg-gray-300
                  rounded-full
                  transition-all
                  duration-0
                  ease-in-out
                  w-[var(--dynamic-w)]
                  ${
                    isActive
                      ? ' opacity-0 hidden' // active 时，短横线淡出 + 宽度收缩
                      : ' group-hover:opacity-0 group-hover:w-0 '
                  }
                `}
              />

              {/* 文字内容（active 时或 hover 时显示） */}
              <span
                className={`
                  whitespace-nowrap
                  overflow-hidden
                  text-ellipsis
                  max-w-40
                  duration-300
                  transition-[opacity,scale,padding]
                  text-gray-500
                  bg-gray-200
                  rounded-md
                  ease-in-out
                  p-0
                  text-xs
                   ${
                     isActive
                       ? 'opacity-100 font-medium p-1'
                       : 'opacity-0 scale-0 group-hover:opacity-100 leading-none group-hover:scale-100 group-hover:p-1'
                   }
                `}>
                {tocItem.text}
              </span>
            </a>
          )
        })}
      </nav>
    </div>
  )
}

export default Catalog

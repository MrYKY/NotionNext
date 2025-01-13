import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CONFIG from '../config'
import PostItemFull from './PostItemFull'

/**
 * 博客列表滚动分页
 * @param posts 所有文章
 * @param tags 所有标签
 * @returns {JSX.Element}
 * @constructor
 */
const AllPostList = props => {
  const { filteredNavPages } = props
  const { locale, currentSearch } = useGlobal()
  const router = useRouter()

  // 按分类将文章分组成文件夹
  const categoryFolders = groupArticles(filteredNavPages)

  // 存放被展开的分组
  const [expandedGroups, setExpandedGroups] = useState([])

  // 是否排他折叠，一次只展开一个文件夹
  const GITBOOK_EXCLUSIVE_COLLAPSE = siteConfig(
    'GITBOOK_EXCLUSIVE_COLLAPSE',
    null,
    CONFIG
  )

  // 排序方法状态
  const [sortMethod, setSortMethod] = useState('time') // 默认按时间排序
  const [emoji, setEmoji] = useState('🕒') // 默认 Emoji 是钟表

  // 切换排序方法
  const toggleSortMethod = () => {
    if (sortMethod === 'time') {
      setSortMethod('category')
      setEmoji('🗂️') // 切换到存档表情
    } else {
      setSortMethod('time')
      setEmoji('🕒') // 切换到钟表表情
    }
  }

  useEffect(() => {
    // 展开文件夹
    setTimeout(() => {
      const currentPath = decodeURIComponent(router.asPath.split('?')[0])
      const defaultOpenIndex = getDefaultOpenIndexByPath(
        categoryFolders,
        currentPath
      )
      setExpandedGroups([defaultOpenIndex])
    }, 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, filteredNavPages])

  // 折叠项切换，当折叠或展开数组时会调用
  const toggleItem = index => {
    let newExpandedGroups = [...expandedGroups] // 创建一个新的展开分组数组

    // 如果expandedGroups中不存在，增加入，若存在则移除
    if (expandedGroups.includes(index)) {
      // 如果expandedGroups中包含index，则移除index
      newExpandedGroups = newExpandedGroups.filter(
        expandedIndex => expandedIndex !== index
      )
    } else {
      // 如果expandedGroups中不包含index，则加入index
      newExpandedGroups.push(index)
    }
    // 是否排他
    if (GITBOOK_EXCLUSIVE_COLLAPSE) {
      // 如果折叠菜单排他性为 true，则只展开当前分组，关闭其他已展开的分组
      newExpandedGroups = newExpandedGroups.filter(
        expandedIndex => expandedIndex === index
      )
    }

    // 更新展开分组数组
    setExpandedGroups(newExpandedGroups)
  }

  // 空数据返回
  if (!categoryFolders || categoryFolders.length === 0) {
    // 空白内容
    return (
      <div className='flex w-full items-center justify-center min-h-screen mx-auto md:-mt-20'>
        <p className='text-gray-500 dark:text-gray-300'>
          {locale.COMMON.NO_RESULTS_FOUND}{' '}
          {currentSearch && <div>{currentSearch}</div>}
        </p>
      </div>
    )
  }
  // 如果href
  const href = siteConfig('GITBOOK_INDEX_PAGE') + ''

  const homePost = {
    id: '-1',
    title: siteConfig('DESCRIPTION'),
    href: href.indexOf('/') !== 0 ? '/' + href : href
  }

  const allPosts =
    sortMethod === 'time' ? categoryFolders.flatMap(group => group.items) : null

  return (
    <div
      id='posts-wrapper'
      className='w-full flex-grow space-y-0.5 px-2 tracking-wider pt-4 items-center justify-center'>
      {/* 右上角按钮 */}
      <div className='flex items-center justify-between border-b pb-2 mb-2'>
        <div className='px-1 font-bold text-xl '>所有文章</div>
        <button
          onClick={toggleSortMethod}
          className='p-2 text-xl hover:bg-zinc-200 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 '
          aria-label='切换排序方式'
          style={{ width: '2em', height: '2em' }} // 设置为正方形
        >
          <span className='emoji-container flex items-center justify-center w-full h-full'>
            <span className='emoji'>{emoji}</span>
          </span>
        </button>
      </div>
      <div className='w-full space-y-0.5 mx-auto max-w-4xl'>
        {/* 文章列表 */}
        {sortMethod === 'time' ? (
          // 如果 sortmethod 是 time，将所有文章作为一个分组传递
          <PostItemFull
            group={{ items: allPosts }} // 将所有文章作为一个分组传递
            onHeightChange={props.onHeightChange}
            expanded={true} // 默认展开
            toggleItem={() => {}} // 无需切换
            sortmethod={sortMethod} // 传递排序方法
          />
        ) : (
          // 否则按分类渲染
          categoryFolders.map((group, index) => (
            <PostItemFull
              key={index}
              group={group}
              onHeightChange={props.onHeightChange}
              expanded={expandedGroups.includes(index)} // 将展开状态传递给子组件
              toggleItem={() => toggleItem(index)} // 将切换函数传递给子组件
              sortmethod={sortMethod} // 传递排序方法
            />
          ))
        )}
      </div>
    </div>
  )
}

// 按照分类将文章分组成文件夹
function groupArticles(filteredNavPages) {
  if (!filteredNavPages) {
    return []
  }
  const groups = []
  const AUTO_SORT = siteConfig('GITBOOK_AUTO_SORT', true, CONFIG)

  for (let i = 0; i < filteredNavPages.length; i++) {
    const item = filteredNavPages[i]
    const categoryName = item?.category ? item?.category : '' // 将category转换为字符串

    let existingGroup = null
    // 开启自动分组排序；将同分类的自动归到同一个文件夹，忽略Notion中的排序
    if (AUTO_SORT) {
      existingGroup = groups.find(group => group.category === categoryName) // 搜索同名的最后一个分组
    } else {
      existingGroup = groups[groups.length - 1] // 获取最后一个分组
    }

    // 添加数据
    if (existingGroup && existingGroup.category === categoryName) {
      existingGroup.items.push(item)
    } else {
      groups.push({ category: categoryName, items: [item] })
    }
  }
  return groups
}

/**
 * 查看当前路由需要展开的菜单索引
 * 路过都没有，则返回0，即默认展开第一个
 * @param {*} categoryFolders
 * @param {*} path
 * @returns {number} 返回需要展开的菜单索引
 */
function getDefaultOpenIndexByPath(categoryFolders, path) {
  // 查找满足条件的第一个索引
  const index = categoryFolders.findIndex(group => {
    return group.items.some(post => path === post.href)
  })

  // 如果找到满足条件的索引，则设置为该索引
  if (index !== -1) {
    return index
  }

  return 0
}

export default AllPostList

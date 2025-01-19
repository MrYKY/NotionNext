'use client'

import Comment from '@/components/Comment'
import LoadingCover from '@/components/LoadingCover'
import NotionIcon from '@/components/NotionIcon'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import DashboardBody from '@/components/ui/dashboard/DashboardBody'
import DashboardHeader from '@/components/ui/dashboard/DashboardHeader'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { getShortId } from '@/lib/utils/pageId'
import { SignIn, SignUp } from '@clerk/nextjs'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback
} from 'react'
import ArticleAround from './components/ArticleAround'
import ArticleInfo from './components/ArticleInfo'
import { ArticleLock } from './components/ArticleLock'
import BlogArchiveItem from './components/BlogArchiveItem'
import BottomMenuBar from './components/BottomMenuBar'
import Catalog from './components/Catalog'
import CategoryItem from './components/CategoryItem'
import Footer from './components/Footer'
import Header from './components/Header'
import JumpToTopButton from './components/JumpToTopButton'
import NavPostList from './components/NavPostList'
import PageNavDrawer from './components/PageNavDrawer'
import TagItemMini from './components/TagItemMini'
import OuterBorder from './components/OuterBorder'
import CONFIG from './config'
import { Style } from './style'
import LazyImage from '@/components/LazyImage'
import AllPostList from './components/AllPostList'
import { motion, AnimatePresence } from 'framer-motion'
import panels from './mainpage_panels'

// 主题全局变量
const ThemeGlobalGitbook = createContext()
export const useGitBookGlobal = () => useContext(ThemeGlobalGitbook)

/**
 * 给最新的文章标一个红点
 */
function getNavPagesWithLatest(allNavPages, latestPosts, post) {
  // localStorage 保存id和上次阅读时间戳： posts_read_time = {"${post.id}":"Date()"}
  const postReadTime = JSON.parse(
    localStorage.getItem('post_read_time') || '{}'
  )
  if (post) {
    postReadTime[getShortId(post.id)] = new Date().getTime()
  }
  // 更新
  localStorage.setItem('post_read_time', JSON.stringify(postReadTime))

  return allNavPages?.map(item => {
    const res = {
      short_id: item.short_id,
      title: item.title || '',
      date: item.date || '',
      time: item.time || '',
      pageCoverThumbnail: item.pageCoverThumbnail || '',
      category: item.category || null,
      tags: item.tags || null,
      summary: item.summary || null,
      slug: item.slug,
      href: item.href,
      pageIcon: item.pageIcon || '',
      lastEditedDate: item.lastEditedDate
    }
    // 属于最新文章通常6篇 && (无阅读记录 || 最近更新时间大于上次阅读时间)
    if (
      latestPosts.some(post => post?.id.indexOf(item?.short_id) === 14) &&
      (!postReadTime[item.short_id] ||
        postReadTime[item.short_id] < new Date(item.lastEditedDate).getTime())
    ) {
      return { ...res, isLatest: true }
    } else {
      return res
    }
  })
}

/**
 * 基础布局
 * 采用左右两侧布局，移动端使用顶部导航栏
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const {
    children,
    post,
    allNavPages,
    latestPosts,
    slotLeft,
    slotRight,
    slotTop
  } = props
  const { fullWidth } = useGlobal()
  const router = useRouter()
  const [tocVisible, changeTocVisible] = useState(false)
  const [pageNavVisible, changePageNavVisible] = useState(false)
  const [filteredNavPages, setFilteredNavPages] = useState(allNavPages)

  const searchModal = useRef(null)

  useEffect(() => {
    setFilteredNavPages(getNavPagesWithLatest(allNavPages, latestPosts, post))
  }, [router])

  const GITBOOK_LOADING_COVER = siteConfig(
    'GITBOOK_LOADING_COVER',
    true,
    CONFIG
  )
  return (
    <ThemeGlobalGitbook.Provider
      value={{
        searchModal,
        tocVisible,
        changeTocVisible,
        filteredNavPages,
        setFilteredNavPages,
        allNavPages,
        pageNavVisible,
        changePageNavVisible
      }}>
      <Style />

      <OuterBorder>
        {GITBOOK_LOADING_COVER && <LoadingCover />}
        {slotTop}
        {children}
      </OuterBorder>
    </ThemeGlobalGitbook.Provider>
  )
}

/**
 * 首页
 * 重定向到某个文章详情页
 * @param {*} props
 * @returns
 */
const LayoutIndex = props => {
  const router = useRouter()
  const basePath = router.asPath.split('?')[0]
  const {
    children,
    post,
    allNavPages,
    latestPosts,
    slotLeft,
    slotRight,
    slotTop
  } = props
  const { fullWidth } = useGlobal()
  const [filteredNavPages, setFilteredNavPages] = useState(allNavPages)

  useEffect(() => {
    setFilteredNavPages(getNavPagesWithLatest(allNavPages, latestPosts, post))
  }, [router])

  // 检查当前路由是否在文章列表内
  const isRouteInPostList = () => {
    const currentPath = decodeURIComponent(basePath)
    const allPosts = filteredNavPages || []
    return allPosts.some(post => post.href === currentPath)
  }

  return (
    <div className='w-full h-full'>
      <main
        id='wrapper'
        className={`${
          siteConfig('LAYOUT_SIDEBAR_REVERSE') ? 'flex-row-reverse' : ''
        } relative flex justify-between w-full h-full mx-auto`}>
        {/* 顶部导航栏 */}
        <Header {...props} />
        {/* 左侧推拉抽屉 */}
        {!fullWidth && isRouteInPostList() ? (
          <div className={'hidden md:block relative z-10 w-full max-w-80'}>
            <div className='sticky top-0 h-full flex justify-between flex-col border-r'>
              {/* 导航 */}
              <div className='overflow-y-scroll scroll-hidden pt-2'>
                {/* 嵌入 */}
                {slotLeft}

                {/* 所有文章列表 */}
                <NavPostList filteredNavPages={allNavPages} {...props} />
              </div>
              {/* 页脚 */}
              {/* <Footer {...props} /> */}
            </div>
          </div>
        ) : null}

        {/* 中间内容区域 */}
        <div
          id='center-wrapper'
          className='flex flex-col justify-start items-center w-full h-full overflow-y-auto scroll-hidden relative z-10'>
          <div
            id='container-inner'
            className={` ${
              fullWidth ? 'px-5' : ''
            } w-full mx-auto flex item-center justify-center`}>
            {slotTop}
            {basePath?.indexOf('blog') > 0 ? <_LayoutBlogHome /> : children}
          </div>

          {/* 底部 */}
          <div className='md:hidden'>
            <Footer {...props} />
          </div>
        </div>

        {/*  右侧 */}
        {fullWidth ? null : (
          <div
            className={
              'min-w-60 hidden 2xl:flex dark:border-transparent h-full flex-col items-start justify-center relative z-10 border-l bg-zinc-50'
            }>
            <div>
              {/* <ArticleInfo post={props?.post ? props?.post : props.notice} /> */}
              <div>
                {/* 桌面端目录 */}
                <Catalog {...props} />
                {slotRight}
              </div>

              {/* <AdSlot type='in-article' /> */}
              {/* <Live2D /> */}
            </div>
          </div>
        )}
      </main>

      {/* 回顶按钮 */}
      <JumpToTopButton />

      {/* 移动端导航抽屉 */}
      <PageNavDrawer {...props} filteredNavPages={filteredNavPages} />

      {/* 移动端底部导航栏 */}
      <BottomMenuBar {...props} />
    </div>
  )
}

const LayoutMainPage = props => {

  const [current, setCurrent] = useState(0)
  const [scrolling, setScrolling] = useState(false)

  const handleScroll = useCallback(
    e => {
      if (scrolling) return

      if (e.deltaY > 0 && current < panels.length - 1) {
        setCurrent(prev => prev + 1)
        setScrolling(true)
      } else if (e.deltaY < 0 && current > 0) {
        setCurrent(prev => prev - 1)
        setScrolling(true)
      }
    },
    [current, scrolling, panels.length]
  )

  useEffect(() => {
    const onWheel = e => handleScroll(e)

    window.addEventListener('wheel', onWheel)

    return () => {
      window.removeEventListener('wheel', onWheel)
    }
  }, [handleScroll])

  // 允许滚动完成后再次响应滚动
  useEffect(() => {
    if (scrolling) {
      const timer = setTimeout(() => {
        setScrolling(false)
      }, 700) // 动画持续时间（毫秒）稍大于动画时间
      return () => clearTimeout(timer)
    }
  }, [scrolling])

  return (
    <div className='w-full h-full overflow-hidden'>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0 }}
          className='w-full h-full'>
          {panels[current].content}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

const _LayoutBlogHome = () => {
  // 置顶文章列表
  const topPosts = [
    { title: '探索 React 18 的新特性', link: '/blog/react-18' },
    { title: '如何设计一个高效的算法', link: '/blog/algorithm-design' },
    { title: '我的前端开发工具箱', link: '/blog/frontend-tools' }
  ]

  return (
    <div className='w-full h-full flex flex-col justify-center items-center bg-white text-black px-4 pt-96'>
      {/* 自我介绍 */}
      <div className='text-center max-w-2xl'>
        <h1 className='text-6xl font-bold mb-4'>
          你好，我是{' '}
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient'>
            Kyan
          </span>{' '}
          🫡
        </h1>
        <p className='text-2xl text-gray-700 mb-8'>
          欢迎来到我的互联网自留地
          🌱，这里记录了我的技术探索、生活感悟和创作灵感。
        </p>
      </div>

      {/* 置顶文章列表 */}
      <div className='w-full max-w-2xl'>
        <h2 className='text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500'>
          置顶文章 📌
        </h2>
        <ul className='space-y-4'>
          {topPosts.map((post, index) => (
            <li
              key={index}
              className='text-2xl text-gray-700 hover:text-gray-900 transition-colors'>
              <Link href={post.link} className='flex items-center'>
                <span className='mr-2'>👉</span>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 返回主页链接 */}
      <div className='mt-12 text-xl text-blue-500 hover:text-blue-400 transition-colors'>
        <Link href='/'>🏠 返回主页</Link>
      </div>
    </div>
  )
}

/**
 * 文章列表 无
 * 全靠页面导航
 * @param {*} props
 * @returns
 */
const LayoutPostList = props => {
  const { allNavPages } = props
  return (
    <LayoutIndex {...props}>
      <AllPostList filteredNavPages={allNavPages} {...props} />
    </LayoutIndex>
  )
}

/**
 * 文章详情
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, prev, next, siteInfo, lock, validPassword } = props
  const headerImage = post?.pageCover ? post.pageCover : siteInfo?.pageCover
  const router = useRouter()
  // 如果是文档首页文章，则修改浏览器标签
  const index = siteConfig('GITBOOK_INDEX_PAGE', 'about', CONFIG)
  const basePath = router.asPath.split('?')[0]
  const title =
    basePath?.indexOf(index) > 0
      ? `${post?.title} | ${siteInfo?.description}`
      : `${post?.title} | ${siteInfo?.title}`

  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
  useEffect(() => {
    // 404
    if (!post) {
      setTimeout(() => {
        if (isBrowser) {
          const article = document.querySelector(
            '#article-wrapper #notion-article'
          )
          if (!article) {
            router.push('/404').then(() => {
              console.warn('找不到页面', router.asPath)
            })
          }
        }
      }, waiting404)
    }
  }, [post])
  return (
    <LayoutIndex {...props}>
      <Head>
        <title>{title}</title>
      </Head>

      {/* 文章锁 */}
      {lock && <ArticleLock validPassword={validPassword} />}

      {!lock && (
        <div id='container' className='max-w-3xl px-3 lg:px-0 '>
          {/* title */}
          <div
            id='post-cover-wrapper'
            className='absolute top-0 left-0 w-full h-[25vh] max-h-[25vh] overflow-hidden'>
            <LazyImage
              id='post-cover'
              className='w-full max-h-[400px] object-cover'
              src={headerImage}
            />
          </div>
          <div
            id='header'
            className='flex flex-col mt-[25vh] justify-between items-start'>
            <div
              id='post-icon'
              className='flex items-center text-8xl z-30 leading-none -translate-y-1/2 '>
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon icon={post?.pageIcon} />
              )}
            </div>
            <h1 className='text-4xl font-black dark:text-gray-300'>
              {post?.title}
            </h1>
          </div>

          {/* Notion文章主体 */}
          {post && (
            <section className=''>
              <div id='article-wrapper'>
                <NotionPage post={post} className='' />
              </div>

              {/* 分享 */}
              <ShareBar post={post} />
              {/* 文章分类和标签信息 */}
              <div className='flex justify-between'>
                {siteConfig('POST_DETAIL_CATEGORY') && post?.category && (
                  <CategoryItem category={post.category} />
                )}
                <div>
                  {siteConfig('POST_DETAIL_TAG') &&
                    post?.tagItems?.map(tag => (
                      <TagItemMini key={tag.name} tag={tag} />
                    ))}
                </div>
              </div>

              {post?.type === 'Post' && (
                <ArticleAround prev={prev} next={next} />
              )}

              {/* <AdSlot />
              <WWAds className='w-full' orientation='horizontal' /> */}

              <Comment frontMatter={post} />
            </section>
          )}

          {/* 文章目录 */}
          {/* <CatalogDrawerWrapper {...props} /> */}
        </div>
      )}
    </LayoutIndex>
  )
}

/**
 * 没有搜索
 * 全靠页面导航
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  return <LayoutIndex {...props}></LayoutIndex>
}

/**
 * 归档页面基本不会用到
 * 全靠页面导航
 * @param {*} props
 * @returns
 */
const LayoutArchive = props => {
  const { archivePosts } = props

  return (
    <LayoutIndex {...props}>
      <div className='mb-10 pb-20 md:py-12 py-3  min-h-full'>
        {Object.keys(archivePosts)?.map(archiveTitle => (
          <BlogArchiveItem
            key={archiveTitle}
            archiveTitle={archiveTitle}
            archivePosts={archivePosts}
          />
        ))}
      </div>
    </LayoutIndex>
  )
}

/**
 * 404
 */
const Layout404 = props => {
  return (
    <LayoutIndex {...props}>
      <div className='w-full h-96 py-80 flex justify-center items-center'>
        404 Not found.
      </div>
    </LayoutIndex>
  )
}

/**
 * 分类列表
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  const { locale } = useGlobal()
  return (
    <LayoutIndex {...props}>
      <div className='bg-white dark:bg-gray-700 py-10'>
        <div className='dark:text-gray-200 mb-5'>
          <i className='mr-4 fas fa-th' />
          {locale.COMMON.CATEGORY}:
        </div>
        <div id='category-list' className='duration-200 flex flex-wrap'>
          {categoryOptions?.map(category => {
            return (
              <Link
                key={category.name}
                href={`/category/${category.name}`}
                passHref
                legacyBehavior>
                <div
                  className={
                    'hover:text-black dark:hover:text-white dark:text-gray-300 dark:hover:bg-gray-600 px-5 cursor-pointer py-2 hover:bg-gray-100'
                  }>
                  <i className='mr-4 fas fa-folder' />
                  {category.name}({category.count})
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </LayoutIndex>
  )
}

/**
 * 标签列表
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  const { locale } = useGlobal()

  return (
    <LayoutIndex {...props}>
      <div className='bg-white dark:bg-gray-700 py-10'>
        <div className='dark:text-gray-200 mb-5'>
          <i className='mr-4 fas fa-tag' />
          {locale.COMMON.TAGS}:
        </div>
        <div id='tags-list' className='duration-200 flex flex-wrap'>
          {tagOptions?.map(tag => {
            return (
              <div key={tag.name} className='p-2'>
                <TagItemMini key={tag.name} tag={tag} />
              </div>
            )
          })}
        </div>
      </div>
    </LayoutIndex>
  )
}

/**
 * 登录页面
 * @param {*} props
 * @returns
 */
const LayoutSignIn = props => {
  const { post } = props
  const enableClerk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  return (
    <>
      <div className='grow mt-20'>
        {/* clerk预置表单 */}
        {enableClerk && (
          <div className='flex justify-center py-6'>
            <SignIn />
          </div>
        )}
        <div id='article-wrapper'>
          <NotionPage post={post} />
        </div>
      </div>
    </>
  )
}

/**
 * 注册页面
 * @param {*} props
 * @returns
 */
const LayoutSignUp = props => {
  const { post } = props
  const enableClerk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  return (
    <>
      <div className='grow mt-20'>
        {/* clerk预置表单 */}
        {enableClerk && (
          <div className='flex justify-center py-6'>
            <SignUp />
          </div>
        )}
        <div id='article-wrapper'>
          <NotionPage post={post} />
        </div>
      </div>
    </>
  )
}

/**
 * 仪表盘
 * @param {*} props
 * @returns
 */
const LayoutDashboard = props => {
  const { post } = props

  return (
    <>
      <div className='container grow'>
        <div className='flex flex-wrap justify-center -mx-4'>
          <div id='container-inner' className='w-full p-4'>
            {post && (
              <div id='article-wrapper' className='mx-auto'>
                <NotionPage {...props} />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* 仪表盘 */}
      <DashboardHeader />
      <DashboardBody />
    </>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutDashboard,
  LayoutIndex,
  LayoutMainPage,
  LayoutPostList,
  LayoutSearch,
  LayoutSignIn,
  LayoutSignUp,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}

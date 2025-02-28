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
import ASCIIText from '@/components/animation/ASCIIText'
import Noise from '@/components/animation/Noise'
import GridDistortion from '@/components/animation/GridDistortion'
import DesktopOnlyOverlay from '@/components/DesktopOnlyOverlay'
import MainPagePanels from './mainpage_panels'
import Resume from './cv2025'
import Footer from '@/components/Footer'

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
        <DesktopOnlyOverlay />
        {GITBOOK_LOADING_COVER && <LoadingCover />}
        {slotTop}
        {children}
        <Footer />
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
            } w-full h-full mx-auto flex item-center justify-center`}>
            {slotTop}
            {basePath?.indexOf('blog') > 0 ? <_LayoutBlogHome /> : children}
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
      {/* <JumpToTopButton /> */}

      {/* 移动端导航抽屉 */}
      {/* <PageNavDrawer {...props} filteredNavPages={filteredNavPages} /> */}

      {/* 移动端底部导航栏 */}
      {/* <BottomMenuBar {...props} /> */}
    </div>
  )
}

const LayoutMainPage = props => {
  return (
    <div className='w-full h-full overflow-hidden'>
      <MainPagePanels />
    </div>
  )
}

const _LayoutBlogHome = () => {
  return (
    <section className='flex flex-col w-full h-full justify-center items-center text-black/80 font-normal '>
      <div className = 'absolute top-0 left-0 w-full h-full z-0 '>
        <GridDistortion
          imageSrc='https://pic1.zhimg.com/v2-7bacc3d54b12a9b1998baa0cde5b6280_r.jpg'
          grid={10}
          mouse={0.1}
          strength={0.15}
          relaxation={0.9}
          className='custom-class'
        />
      </div>
      <div className='max-w-3xl text-base leading-relaxed gap-y-4 flex flex-col pointer-events-none z-10 bg-white/20 backdrop-blur-md p-5 rounded-lg'>
        <h1 className='leading-relaxed font-black text-lg'>你好，朋友。</h1>
        <p className=''>
          欢迎来到我的博客，也是我的“互联网自留地”，一片城市钢铁森林中的虚拟后花园。
        </p>
        <p className=''>
          这里没有固定的主题框架，只有真实的生活切片。我会记录不同阶段的思考：可能是某本书带来的启发，
          某个技术问题的解决过程，或是对生活的阶段性梳理。这些文字不追求严密的逻辑，更像是与自己的对话实录，
          偶尔带着些许不确定和模糊，却真实反映着我的内心世界。
        </p>
        <p className=''>
          创建这个空间，源于对信息洪流的抵抗。在数字时代，社交媒体不断切割我们的注意力，刺激瞬时的反馈和碎片化的观点，
          而我希望在这里找到一片相对宁静的土壤，保持一种缓慢而持续的记录状态。这里没有急功近利的追求，也不需要扮演某个领域的专家角色。
          无需刻意展示“正确”的价值观或追求公众的认同，重要的是诚实面对自己的局限与成长，给自己留出足够的时间去思考和表达。
        </p>
        <p className=''>
          留言区始终开放。如果你对某些内容产生共鸣或疑问，欢迎用简单的文字交流；
          如果你只是安静地阅读，默默地从这些文字中汲取一丝思考的养分，同样是对这片自留地的滋养。这里的讨论不必走向结论，
          重要的是保留思考的温度，让每个人在这里都有属于自己的空间和节奏。
        </p>
        <p className=''>
          感谢你推开这扇门，来到这里。愿我们都能在数字时代里，开辟出属于普通人的精神角落——不必繁花似锦，
          只需容得下真实的生长痕迹。希望无论是你一时的驻足，还是常来的访问，都能带走一些有意义的东西。
        </p>
        <p className='text-sm text-gray-600 text-right'>Kyan 2024年12月 北京</p>
      </div>
    </section>
  )
}

const LayoutCV = props => {
  return (
    <LayoutIndex {...props}>
      <Resume />
    </LayoutIndex>
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
              {/* <ShareBar post={post} /> */}
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

              {/* {post?.type === 'Post' && (
                <ArticleAround prev={prev} next={next} />
              )} */}

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
      <div className='w-full h-full flex flex-col'>
        <div className='absolute h-full w-full z-50 pointer-events-none'>
          <Noise
            patternSize={500}
            patternScaleX={1.5}
            patternScaleY={1.5}
            patternRefreshInterval={2}
            patternAlpha={20}
          />
        </div>
        <div className=''>
          <ASCIIText
            text='404'
            enableWaves={false}
            asciiFontSize={20}
            planeBaseHeight={6}
          />
        </div>
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
  LayoutCV,
  LayoutPostList,
  LayoutSearch,
  LayoutSignIn,
  LayoutSignUp,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}

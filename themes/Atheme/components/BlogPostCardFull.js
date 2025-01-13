import Badge from '@/components/Badge'
import NotionIcon from '@/components/NotionIcon'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LazyImage from '@/components/LazyImage'

const BlogPostCardFull = ({ post, className }) => {
  const router = useRouter()
  console.log('post: ', post)
  const currentSelected =
    decodeURIComponent(router.asPath.split('?')[0]) === post?.href

  return (
    <Link href={post?.href} passHref>
      <div
        key={post.id}
        className={`${className} relative my-1 cursor-pointer rounded-xl duration-300 merge-out border border-gray-200 overflow-hidden
                    ${currentSelected ? 'text-white dark:bg-yellow-100 dark:text-yellow-600 bg-slate-800 ' : ' dark:hover:bg-yellow-100 dark:hover:text-yellow-600 hover:bg-zinc-200 '}`}>
        {/* 文章图片 */}
        <LazyImage
          id='post-cover'
          className='w-full object-cover'
          src={post.pageCoverThumbnail}
        />
        <div className='w-full select-none flex items-start p-2'>
          <div className='text-3xl my-auto mr-2'>
            {siteConfig('POST_TITLE_ICON') && (
              <NotionIcon icon={post?.pageIcon} />
            )}{' '}
          </div>
          <div className='flex flex-col items-start'>
            <div className='flex flex-wrap gap-2'>
              <span className='text-sm text-gray-400 bg-zinc-200 rounded-md px-2'>{post?.category}</span>
              {post?.tags?.map((tag, index) => (
                <span key={index} className='text-sm text-gray-400'>
                 #{tag}
                </span>
              ))}
            </div>
            <span className='text-base'>{post.title}</span>
            <span className='text-sm text-gray-400'>{post?.date}</span>
            <span className='text-sm text-gray-400'>{post?.summary}</span>
          </div>
        </div>
        {/* 最新文章加个红点 */}
        {/* {post?.isLatest && siteConfig('GITBOOK_LATEST_POST_RED_BADGE') && (
          <Badge />
        )} */}
      </div>
    </Link>
  )
}

export default BlogPostCardFull

import Badge from '@/components/Badge'
import NotionIcon from '@/components/NotionIcon'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import { useRouter } from 'next/router'

const BlogPostCard = ({ post, className }) => {
  const router = useRouter()
  const currentSelected =
    decodeURIComponent(router.asPath.split('?')[0]) === post?.href

  return (
    <Link href={post?.href} passHref>
      <div
        key={post.id}
        className={`${className} relative py-1.5 cursor-pointer px-1.5 rounded-md hover:bg-gray-50
                    ${currentSelected ? 'text-green-500 dark:bg-yellow-100 dark:text-yellow-600 font-semibold' : ' dark:hover:bg-yellow-100 dark:hover:text-yellow-600'}`}>
        <div className='w-full select-none flex items-center justify-between'>
          <div>
            {siteConfig('POST_TITLE_ICON') && (
              <NotionIcon icon={post?.pageIcon} />
            )}{' '}
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-sm'>{post.title}</span>
            <span className='text-xs text-gray-400'>{post?.date}</span>
          </div>
        </div>
        {/* 最新文章加个红点 */}
        {post?.isLatest && siteConfig('GITBOOK_LATEST_POST_RED_BADGE') && (
          <Badge />
        )}
      </div>
    </Link>
  )
}

export default BlogPostCard

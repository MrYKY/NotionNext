import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { getGlobalData, getPostBlocks } from '@/lib/db/getSiteData'
import { generateRobotsTxt } from '@/lib/robots.txt'
import { generateRss } from '@/lib/rss'
import { generateSitemapXml } from '@/lib/sitemap.xml'
import { DynamicLayout } from '@/themes/theme'

/**
 * 首页布局
 * @param {*} props
 * @returns
 */
const BlogPage = props => {
  return null
}

/**
 * SSG 获取数据
 * @returns
 */
export async function getStaticProps(req) {

  return 
   null
}

export default BlogPage

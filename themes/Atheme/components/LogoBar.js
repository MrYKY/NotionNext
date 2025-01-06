import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import CONFIG from '../config'

/**
 * Logo区域
 * @param {*} props
 * @returns
 */
export default function LogoBar(props) {
  const { siteInfo } = props
  return (
    <div id='logo-wrapper' className='w-full flex items-center pt-4 pl-4'>
      <Link
        href={`/${siteConfig('GITBOOK_INDEX_PAGE', '', CONFIG)}`}
        className='flex text-4xl font-extrabold font-serif md:text-2xl dark:text-gray-200'>
        <LazyImage
          src={siteInfo?.icon}
          width={48}
          height={48}
          alt={siteConfig('AUTHOR')}
          className='mr-4 hidden md:block rounded-full border outer-border'
        />
        <div className='flex items-center'>
          {siteInfo?.title || siteConfig('TITLE')}
        </div>
      </Link>
    </div>
  )
}

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
    <div
      id='logo-wrapper'
      className='w-full flex pt-2 flex-col justify-between '>
      <Link
        href={`/${siteConfig('GITBOOK_INDEX_PAGE', '', CONFIG)}`}
        className='flex text-3xl font-extrabold md:text-2xl dark:text-gray-200 gap-x-2 hover:bg-zinc-200 duration-300 mx-2 p-2 rounded-lg'>
        <LazyImage
          src={siteInfo?.icon}
          width={48}
          height={48}
          alt={siteConfig('AUTHOR')}
          className='mr-4 hidden md:block rounded-full border outer-border my-auto'
        />
        <div className=' flex flex-col'>
          <img
            src='/kyan.svg' // SVG 文件路径
            alt={siteInfo?.title || siteConfig('TITLE')}
            className='h-8 w-auto' // 调整尺寸
          />
          <span className='text-sm font-normal text-gray-400'>
            {siteInfo?.description || siteConfig('DESCRIPTION')}
          </span>
        </div>
      </Link>
    </div>
  )
}

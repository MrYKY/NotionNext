import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const router = useRouter()

  if (!link || !link.show) {
    return null
  }
  const hasSubMenu = link?.subMenus?.length > 0
  const selected = router.pathname === link.href || router.asPath === link.href
  return (
    <li
      className='cursor-pointer list-none items-center flex font-semibold w-full flex-col justify-between '
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}>
      {!hasSubMenu && (
        <div
          className={
            'h-full whitespace-nowrap duration-300 text-lg justify-between dark:text-gray-300 cursor-pointer flex flex-nowrap items-center w-full flex-col pt-3 pb-3 ' +
            (selected
              ? 'bg-slate-800 text-white hover:text-white'
              : 'hover:text-indigo-800 hover:bg-zinc-200')
          }>
          <Link href={link?.href} target={link?.target}>
            {link?.icon && <i className={link?.icon} />} {link?.name}
          </Link>
        </div>
      )}

      {/* 包含子菜单 */}
      {hasSubMenu && (
        <>
          <div
            className={
              'h-full whitespace-nowrap duration-300 text-lg justify-between dark:text-gray-300 cursor-pointer flex flex-nowrap items-center pt-3 pb-3 pl-6 pr-4 ' +
              (selected
                ? 'bg-green-600 text-white hover:text-white'
                : 'hover:text-green-600')
            }>
            <div>
              {link?.icon && <i className={link?.icon} />} {link?.name}
              {' '}{hasSubMenu && (
                <i
                  className={`fas fa-chevron-down duration-500 transition-all ${show ? ' rotate-180' : ''}`}></i>
              )}
            </div>
          </div>
          {/* 下拉菜单内容 */}
          <ul
            className={`${show ? 'visible opacity-100 top-12 ' : 'invisible opacity-0 top-10 '} border-gray-100  bg-white  dark:bg-black dark:border-gray-800 transition-all duration-300 z-20 absolute block drop-shadow-lg `}>
            {link?.subMenus?.map((sLink, index) => {
              return (
                <li
                  key={index}
                  className='not:last-child:border-b-0 border-b text-gray-700 dark:text-gray-200  hover:bg-gray-50 dark:hover:bg-gray-900 tracking-widest transition-all duration-200  dark:border-gray-800 py-3 pr-6 pl-3'>
                  <Link href={sLink.href} target={link?.target}>
                    <span className='text-xs'>
                      {link?.icon && <i className={sLink?.icon}> &nbsp; </i>}
                      {sLink.title}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </li>
  )
}
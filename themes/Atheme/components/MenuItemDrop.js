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
      className='cursor-pointer list-none items-center flex font-semibold w-full flex-col justify-between px-2 '
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}>
      {!hasSubMenu && (
        <Link
          href={link?.href}
          target={link?.target}
          className={
            'h-full whitespace-nowrap duration-300 text-base justify-between dark:text-gray-300 cursor-pointer flex flex-nowrap items-start w-full flex-col py-3 my-1 pl-2 rounded-lg ' +
            (selected
              ? 'bg-slate-800 text-white hover:text-white'
              : 'hover:text-indigo-800 hover:bg-zinc-200')
          }>
          <div>
            {link?.icon && <i className={link?.icon} />} {link?.name}
          </div>
        </Link>
      )}

      {/* 包含子菜单 */}
      {hasSubMenu && (
        <>
          <div
            className={
              'h-full whitespace-nowrap duration-300 text-base justify-between dark:text-gray-300 cursor-pointer flex flex-nowrap items-center w-full flex-col py-3 my-1 rounded-lg ' +
              (selected
                ? 'bg-slate-800 text-white hover:text-white'
                : 'hover:text-indigo-800 hover:bg-zinc-200')
            }>
            <div>
              {link?.icon && <i className={link?.icon} />} {link?.name}{' '}
              {hasSubMenu && (
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

'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { InfiniteSlider } from './animation/InfiniteSlider'

const poweredBy = [
  {
    name: 'NotionNext',
    tag: 'NotionNext',
    logo: '/logos/notionnext.svg',
    url: 'https://github.com/tangly1024/NotionNext'
  },
  {
    name: 'Notion',
    tag: 'Notion',
    logo: '/logos/notion.svg', // 本地路径或外部URL
    url: 'https://www.notion.so/'
  },
  {
    name: 'Twikoo',
    tag: 'Twikoo',
    logo: 'https://twikoo.js.org/twikoo-logo-home.png',
    url: 'https://twikoo.js.org/'
  }
]

const builtWith = [
  {
    name: 'Next.js',
    tag: 'Next.js',
    logo: '/logos/nextjs.svg', // 本地路径或外部URL
    url: 'https://nextjs.org'
  },
  {
    name: 'Tailwind CSS',
    tag: 'Tailwind CSS',
    logo: '/logos/tailwind.svg',
    url: 'https://tailwindcss.com'
  },
  {
    name: 'JavaScript',
    tag: 'JavaScript',
    logo: '/logos/javascript.svg', // 本地路径或外部URL
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
  },
  {
    name: 'TypeScript',
    tag: 'TypeScript',
    logo: '/logos/typescript.svg', // 本地路径或外部URL
    url: 'https://www.typescriptlang.org/'
  },
  {
    name: 'React',
    tag: 'React',
    logo: '/logos/react.svg', // 本地路径或外部URL
    url: 'https://react.dev/'
  },
  {
    name: 'ReactBits',
    tag: 'ReactBits',
    logo: '/logos/reactbits.svg',
    url: 'https://www.reactbits.dev/'
  },
  {
    name: 'Cult UI',
    tag: 'Cult UI',
    logo: '/logos/cultui.svg',
    url: 'https://www.reactbits.dev/'
  }
]

const madeWith = [
  {
    name: 'ChatGPT',
    tag: 'ChatGPT',
    logo: '/logos/chatgpt.svg',
    url: 'https://chatgpt.com/'
  },
  {
    name: 'DeepSeek',
    tag: 'DeepSeek',
    logo: '/logos/deepseek.svg',
    url: 'https://www.deepseek.com/'
  }
]

const hostedOn = [
  {
    name: 'Vercel',
    tag: 'Vercel',
    logo: '/logos/vercel.svg',
    url: 'https://vercel.com'
  },
  {
    name: 'MongoDB',
    tag: 'MongoDB',
    logo: '/logos/mongodb.svg',
    url: 'https://www.mongodb.com/atlas'
  }
]

const Logo = ({ item }) => (
  <a
    key={item.name}
    href={item.url}
    target='_blank'
    rel='noopener noreferrer'
    className='group relative flex items-center justify-center transition-opacity'>
    {/* Logo 图像 */}
    <img
      src={item.logo}
      alt={item.name}
      className='h-10 w-auto max-w-64 object-contain transition-transform'
    />
    {/* Hover提示框 */}
    {/* <div className='absolute z-[70] hidden flex-col translate-y-10 items-center justify-center group-hover:flex'>
                      <div className='rounded-md bg-white/90 px-1 py-1 text-sm shadow-lg backdrop-blur'>
                        <div className='font-medium text-gray-900'>
                          {item.name}
                        </div>
                      </div>
                    </div> */}
  </a>
)

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className='fixed bottom-0 z-[60] left-1/2 '>
        {/* 独立控制的箭头按钮 */}
        <motion.div
          className='left-1/2 z-[60] cursor-pointer relative '
          style={{
            top: 'auto',
            bottom: '1rem'
          }}
          whileHover={{ scaleX: 1.3 }}
          whileTap={{ scaleX: 1.1 }}>
          <div
            className='absolute h-4 w-60 -translate-x-1/2 pt-2'
            onClick={() => setIsOpen(!isOpen)} // 点击事件仅绑定在箭头上
          >
            <div className='absolute left-1/2 h-1 -translate-x-1/2 w-48 rounded-full bg-black/70 ' />
          </div>
        </motion.div>
      </div>

      {/* 全屏覆盖层 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 1, y: '100vh' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: '100vh' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='absolute inset-0 h-full w-full z-[60] bg-black/50 backdrop-blur-lg font-extralight'
            onClick={() => setIsOpen(!isOpen)}>
            {/* 内容容器 */}
            <div className='flex h-full flex-col items-center justify-center py-16 text-center text-white'>
              <div>
                <div className='text-2xl font-extralight text-black pt-10 py-5 opacity-80'>
                  Powered By
                </div>
                <div className='gap-10 flex '>
                  {poweredBy.map(item => (
                    <Logo item={item} />
                  ))}
                </div>
              </div>
              <div>
                <div className='text-2xl font-extralight text-black pt-10 py-5 opacity-80'>
                  Built With
                </div>
                <div className='gap-10 flex flex-wrap items-center justify-center'>
                  {builtWith.map(item => (
                    <Logo item={item} />
                  ))}
                </div>
              </div>
              <div>
                <div className='text-2xl font-extralight text-black pt-10 py-5 opacity-80'>
                  Made With
                </div>
                <div className='gap-10 flex '>
                  {madeWith.map(item => (
                    <Logo item={item} />
                  ))}
                </div>
              </div>
              <div>
                <div className='text-2xl font-extralight text-black pt-10 py-5 opacity-80'>
                  Hosted On
                </div>
                <div className='gap-10 flex '>
                  {hostedOn.map(item => (
                    <Logo item={item} />
                  ))}
                </div>
              </div>

              {/* 版权信息 */}
              <div className='space-y-2 pt-20'>
                <div className='opacity-75'>
                  © {new Date().getFullYear()} Kyan. All rights reserved.
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

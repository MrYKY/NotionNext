'use client'

import Link from 'next/link'
// import { createContext, useContext } from 'react'
// import { motion, useReducedMotion } from 'framer-motion'
// import {
//   DynamicContainer,
//   DynamicDescription,
//   DynamicDiv,
//   DynamicIsland,
//   DynamicIslandProvider,
//   DynamicTitle,
//   SizePresets,
//   useDynamicIslandSize,
//   useScheduledAnimations,
//   DynamicAction
// } from './components/DynamicIsland'


const panels = [
  {
    id: 1,
    content: (
      <div className='flex flex-col items-start justify-center'>
        <div className=' ml-96 '>
          <h1 className='text-6xl font-bold'>
            你好👋，我是
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient'>
              Kyan
            </span>
          </h1>
          <p className='text-2xl text-gray-700 mb-8'>
            欢迎来到我的互联网自留地。
          </p>
          <div className='flex space-x-4'>
            <Link
              href='/blog'
              className='text-xl text-blue-600 hover:text-blue-500 transition-colors'>
              进入博客主页
            </Link>
            <Link
              href='/resume'
              className='text-xl text-green-600 hover:text-green-500 transition-colors'>
              进入简历
            </Link>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    content: (
      <div className='w-full h-full flex flex-col justify-center items-center bg-white text-black'>
        页面 2
      </div>
    )
  },
  {
    id: 3,
    content: (
      <div className='w-full h-full flex flex-col justify-center items-center bg-white text-black'>
        页面 3
      </div>
    )
  }
]

export default panels

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
import { LightBoard } from './components/LightBoard'
import FractalDotGrid from './components/FractalGrid'
import LazyImage from '@/components/LazyImage'

const panels = [
  {
    id: 1,
    content: (
      <div className='flex flex-col items-start justify-start w-full h-full bg-neutral-50 relative'>
        <div className='absolute h-full w-full z-10'>
          <FractalDotGrid
            dotSize={1}
            dotSpacing={20}
            dotOpacity={0.7}
            waveIntensity={5}
            waveRadius={500}
            dotColor='rgba(100, 100, 255, 1)'
            glowColor='rgba(100, 100, 255, 1)'
            enableNoise={true}
            noiseOpacity={0.03}
            enableMouseGlow={false}
            initialPerformance='medium'
          />
        </div>
        <div className=' ml-[10%] mt-[5%] mb-[2%] z-20'>
          <h1 className='text-8xl font-bold pb-2 flex items-center justify-center'>
            你好👋，我是
            <LazyImage
              src={'https://i.postimg.cc/bww1M8Vt/image.png'}
              width={96}
              height={96}
              alt={'Kyan'}
              className='mx-4 hidden md:block rounded-full border outer-border my-auto'
            />
            <div className=' flex flex-col'>
              <img
                src='/kyan.svg' // SVG 文件路径
                className='h-24 w-auto' // 调整尺寸
              />
            </div>
          </h1>
          <p className='text-3xl text-gray-700 mb-2'>
            欢迎来到我的互联网自留地。
          </p>
        </div>
        <div className='w-full flex flex-col z-20'>
          <LightBoard
            rows={10}
            lightSize={20}
            gap={2}
            text='Think less, do more'
            font='default'
            updateInterval={100}
            disableDrawing={false}
            colors={{
              background: '#E9C46A',
              textDim: '#2A9D8F',
              drawLine: '#E76F51',
              textBright: '#E9C46A'
            }}
          />
          <LightBoard
            rows={5}
            lightSize={35}
            gap={4}
            text='Be brave'
            font='default'
            updateInterval={200}
            disableDrawing={false}
            colors={{
              background: '#FEFAE0',
              textDim: '#CCD5AE',
              drawLine: '#D4A373',
              textBright: '#FEFAE0'
            }}
          />
          <LightBoard
            rows={7}
            lightSize={30}
            gap={4}
            text='jie fang si xiang  shi shi qiu shi'
            font='default'
            updateInterval={100}
            disableDrawing={false}
            colors={{
              background: '#FFB703',
              textDim: '#023047',
              drawLine: '#8ECAE6',
              textBright: '#FFB703'
            }}
          />
        </div>
        <div className='flex flex-col text-xl ml-[10%] mt-[2%] z-20'>
          <div>
            想看我写的文字，请到我的
            <Link
              href='/blog'
              className='group inline-flex items-center text-blue-600 hover:text-blue-500 transition-colors relative px-2 py-1 rounded-lg hover:bg-blue-50'>
              博客
              <span className='ml-1 transition-transform transform group-hover:translate-x-1 group-hover:-translate-y-1'>
                ↗
              </span>
            </Link>
            。
          </div>
          <div>
            如果想了解我的专业技能，请看我的
            <Link
              href='/cv'
              className='group inline-flex items-center text-green-600 hover:text-green-500 transition-colors relative px-2 py-1 rounded-lg hover:bg-green-50'>
              简历
              <span className='ml-1 transition-transform transform group-hover:translate-x-1 group-hover:-translate-y-1'>
                ↗
              </span>
            </Link>
            。
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

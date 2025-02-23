'use client'

import Link from 'next/link'
import { createContext, useContext, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
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
import { TextEffect } from '@/components/animation/TextEffect'
import { GlowEffect } from '@/components/animation/GlowEffect'

const panels = [
  {
    id: 1,
    content: (
      <div className='flex flex-col items-start justify-start w-full h-full bg-[#f6eedc] relative'>
        <div className='absolute h-full w-full z-10'>
          <FractalDotGrid
            dotSize={1}
            dotSpacing={20}
            dotOpacity={0.7}
            waveIntensity={5}
            waveRadius={500}
            dotColor='rgba(50, 50, 50, 1)'
            glowColor='rgba(100, 100, 255, 1)'
            enableNoise={true}
            noiseOpacity={0.03}
            enableMouseGlow={false}
            initialPerformance='medium'
          />
        </div>
        <div className=' ml-[10%] mt-[5%] mb-[2%] z-20'>
          <h1 className='text-8xl font-bold pb-2 flex items-center justify-center'>
            <TextEffect
              per='char'
              as='span'
              preset='blur'
              delay={0}
              speedSegment={0.7}>
              你好
            </TextEffect>
            <AnimatePresence mode='wait'>
              <motion.div
                key='emoji'
                initial={{ opacity: 0 }} // 初始状态：完全透明
                animate={{ opacity: 1 }} // 淡入动画：完全不透明
                exit={{
                  opacity: 0, // 退出时逐渐消失
                  y: -100 // 退出时向上飞出
                }}
                transition={{ duration: 1, delay: 1 }} // 淡入动画持续 1 秒
              >
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }} // 旋转动画：小幅度左右旋转
                  transition={{
                    duration: 2, // 每次旋转动画持续 2 秒
                    repeat: Infinity, // 无限循环
                    repeatType: 'mirror', // 镜像循环（平滑过渡）
                    ease: 'easeInOut' // 缓动函数
                  }}
                  style={{
                    display: 'inline-block',
                    transformOrigin: '80% 80%'
                  }} // 确保 span 可以旋转
                >
                  👋 {/* Emoji */}
                </motion.span>
              </motion.div>
            </AnimatePresence>
            <TextEffect
              per='char'
              as='span'
              preset='blur'
              delay={2}
              speedSegment={0.7}>
              ，我是
            </TextEffect>
            <motion.div
              initial={{ scale: 0, rotate: 0 }} // 初始状态：缩小到 0，旋转角度为 0
              animate={{ scale: 1, rotate: 360 }} // 动画状态：放大到 1，旋转 360 度
              transition={{
                type: 'spring', // 使用弹簧动画
                damping: 10, // 阻尼，控制回弹力度
                stiffness: 100, // 刚度，控制动画的强度
                mass: 1, // 质量，影响惯性
                velocity: 0, // 初始速度
                delay: 2.8
              }}>
              <GlowEffect
                colors={['#FFBE0B', '#FB5607', '#FF006E', '#8338EC', '#3A86FF']}
                mode='colorShift'
                blur='none'
                scale = {1.15}
                duration = {3}
                className='h-24 w-24 rounded-full mx-4 -z-10 border outer-border'
              />
              <LazyImage
                src={'https://i.postimg.cc/bww1M8Vt/image.png'}
                width={96}
                height={96}
                alt={'Kyan'}
                className='mx-4 hidden md:block rounded-full my-auto'
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring', // 使用弹簧动画
                damping: 10, // 阻尼，控制回弹力度
                stiffness: 100, // 刚度，控制动画的强度
                mass: 1, // 质量，影响惯性
                velocity: 0, // 初始速度
                delay: 2.8
              }} // 动画时长和缓动函数
            >
              <div className=' flex flex-col'>
                <img
                  src='/kyan.svg' // SVG 文件路径
                  className='h-24 w-auto'
                />
              </div>
            </motion.div>
          </h1>
          <motion.div
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{
              type: 'spring', // 使用弹簧动画
              damping: 10, // 阻尼，控制回弹力度
              stiffness: 50, // 刚度，控制动画的强度
              mass: 1, // 质量，影响惯性
              velocity: 0, // 初始速度
              delay: 3.8
            }} // 动画时长和缓动函数
          >
            <p className='text-3xl text-gray-700 mb-2'>
              欢迎来到我的互联网自留地。
            </p>
          </motion.div>
        </div>
        <div className='w-full flex flex-col z-20'>
          <motion.div
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{
              type: 'spring', // 使用弹簧动画
              damping: 10, // 阻尼，控制回弹力度
              stiffness: 100, // 刚度，控制动画的强度
              mass: 1, // 质量，影响惯性
              velocity: 0, // 初始速度
              delay: 3.8
            }} // 动画时长和缓动函数
          >
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
          </motion.div>
          <motion.div
            initial={{ x: '100vw' }}
            animate={{ x: 0 }}
            transition={{
              type: 'spring', // 使用弹簧动画
              damping: 10, // 阻尼，控制回弹力度
              stiffness: 100, // 刚度，控制动画的强度
              mass: 1, // 质量，影响惯性
              velocity: 0, // 初始速度
              delay: 4
            }} // 动画时长和缓动函数
          >
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
          </motion.div>
          <motion.div
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{
              type: 'spring', // 使用弹簧动画
              damping: 10, // 阻尼，控制回弹力度
              stiffness: 100, // 刚度，控制动画的强度
              mass: 1, // 质量，影响惯性
              velocity: 0, // 初始速度
              delay: 4.2
            }} // 动画时长和缓动函数
          >
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
          </motion.div>
        </div>

        <div className='flex flex-col text-xl ml-[10%] mt-[2%] z-20'>
          <motion.div
            initial={{ y: '100vh' }}
            animate={{ y: 0 }}
            transition={{
              type: 'spring', // 使用弹簧动画
              damping: 10, // 阻尼，控制回弹力度
              stiffness: 100, // 刚度，控制动画的强度
              mass: 1, // 质量，影响惯性
              velocity: 0, // 初始速度
              delay: 4.4
            }} // 动画时长和缓动函数
          >
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
          </motion.div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    content: (
      <motion.div className='w-full h-full flex flex-col justify-center items-center bg-white text-black'>
        页面 2
      </motion.div>
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

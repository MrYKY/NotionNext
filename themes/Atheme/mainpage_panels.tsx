'use client'

import Link from 'next/link'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { styled } from 'styled-components'
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
import Noise from '@/components/animation/Noise'

// 动画通用配置变量
const global_duration = 0.5

const MainPagePanels = () => {
  const [activePanel, setActivePanel] = useState(0)
  const [isSwitching, setIsSwitching] = useState(false)

  // 鼠标滚轮事件处理
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isSwitching) return

      setIsSwitching(true)
      const direction = e.deltaY > 0 ? 1 : -1
      setActivePanel(prev => Math.max(0, Math.min(1, prev + direction)))

      setTimeout(() => setIsSwitching(false), 1000)
    }

    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [isSwitching])

  return (
    <div className='w-full h-full'>
      <div className='absolute h-full w-full z-50 pointer-events-none'>
        <Noise
          patternSize={500}
          patternScaleX={1.5}
          patternScaleY={1.5}
          patternRefreshInterval={2}
          patternAlpha={20}
        />
      </div>
      {/* 面板1 */}
      <AnimatePresence mode='wait'>
        {activePanel === 0 && (
          <motion.div
            className='flex flex-col items-start justify-start w-full h-full bg-[#f6eedc] relative'
            exit={{ opacity: 0 }}
            transition={{ duration: 2, delay: 0 }}>
            <AnimatePresence propagate>
              // 背景
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
              // 大标题
              <div className=' ml-[10%] mt-[5%] mb-[2%] z-20'>
                <h1 className='text-8xl font-bold pb-2 flex items-center justify-center'>
                  <motion.div
                    initial={{ y: '5vh', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{
                      opacity: 0,
                      y: '-5vh',
                      transition: {
                        duration: global_duration,
                        delay: 0
                      }
                    }}
                    transition={{
                      duration: global_duration,
                      ease: 'easeOut',
                      delay: 0
                    }}>
                    你好
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

                  <motion.div
                    initial={{ y: '5vh', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{
                      opacity: 0,
                      y: '-5vh',
                      transition: {
                        duration: global_duration,
                        delay: 0
                      }
                    }}
                    transition={{
                      duration: global_duration,
                      ease: 'easeOut',
                      delay: 1
                    }}>
                    ，我是
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0, rotate: 0 }} // 初始状态：缩小到 0，旋转角度为 0
                    animate={{ scale: 1, rotate: 360 }} // 动画状态：放大到 1，旋转 360 度
                    exit={{
                      opacity: 0,
                      y: '-5vh',
                      transition: {
                        duration: global_duration,
                        delay: 0
                      }
                    }}
                    transition={{
                      type: 'spring', // 使用弹簧动画
                      damping: 10, // 阻尼，控制回弹力度
                      stiffness: 50, // 刚度，控制动画的强度
                      mass: 1, // 质量，影响惯性
                      velocity: 0, // 初始速度
                      delay: 1.5
                    }}>
                    {/* <GlowEffect
                      colors={[
                        '#FFBE0B',
                        '#FB5607',
                        '#FF006E',
                        '#8338EC',
                        '#3A86FF'
                      ]}
                      mode='colorShift'
                      blur='none'
                      scale={1.15}
                      duration={3}
                      className='h-24 w-24 rounded-full mx-4 -z-10 border outer-border'
                    /> */}
                    <LazyImage
                      src={'https://i.postimg.cc/bww1M8Vt/image.png'}
                      width={96}
                      height={96}
                      alt={'Kyan'}
                      className='mx-4 hidden md:block rounded-full my-auto'
                    />
                  </motion.div>
                  <motion.div
                    initial={{ y: '5vh', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{
                      opacity: 0,
                      y: '-5vh',
                      transition: {
                        duration: global_duration,
                        delay: 0
                      }
                    }}
                    transition={{
                      duration: global_duration,
                      ease: 'easeOut',
                      delay: 1.5
                    }}>
                    <div className=' flex flex-col'>
                      <img
                        src='/kyan.svg' // SVG 文件路径
                        className='h-24 w-auto pl-2 translate-y-1/4 scale-105'
                      />
                    </div>
                  </motion.div>
                </h1>
                <motion.div
                  initial={{ y: '5vh', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{
                    opacity: 0,
                    y: '-5vh',
                    transition: {
                      duration: global_duration,
                      delay: 0
                    }
                  }}
                  transition={{
                    duration: global_duration,
                    ease: 'easeOut',
                    delay: 2.5
                  }}>
                  <p className='text-3xl text-gray-700 mb-2'>
                    欢迎来到我的互联网自留地。
                  </p>
                </motion.div>
              </div>
              // 光点版
              <div className='w-full flex flex-col z-20 '>
                <motion.div
                  initial={{ x: '-100vw', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{
                    opacity: 0,
                    x: '-100vw',
                    transition: {
                      duration: global_duration,
                      delay: 0
                    }
                  }}
                  transition={{
                    duration: 1.5,
                    ease: 'easeOut',
                    delay: 3.5
                  }}>
                  <LightBoard
                    rows={5}
                    lightSize={35}
                    gap={6}
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
                  initial={{ x: '100vw', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{
                    opacity: 0,
                    x: '100vw',
                    transition: {
                      duration: global_duration,
                      delay: 0
                    }
                  }}
                  transition={{
                    duration: 1.5,
                    ease: 'easeOut',
                    delay: 3.8
                  }}>
                  <LightBoard
                    rows={5}
                    lightSize={35}
                    gap={6}
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
                  initial={{ x: '-100vw', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{
                    opacity: 0,
                    x: '-100vw',
                    transition: {
                      duration: global_duration,
                      delay: 0
                    }
                  }}
                  transition={{
                    duration: 1.5,
                    ease: 'easeOut',
                    delay: 4.1
                  }}>
                  <LightBoard
                    rows={5}
                    lightSize={35}
                    gap={6}
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
              // 底部链接
              <div className='flex flex-col text-xl ml-[10%] mt-[2%] z-20'>
                <motion.div
                  initial={{ y: '5vh', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{
                    opacity: 0,
                    y: '5vh',
                    transition: {
                      duration: global_duration,
                      delay: 0
                    }
                  }}
                  transition={{
                    duration: global_duration,
                    ease: 'easeOut',
                    delay: 5.5
                  }}>
                  <div>
                    这里是我的
                    <Link
                      href='/blog'
                      className='group inline-flex items-center text-blue-600 hover:text-blue-500 transition-colors relative px-2 py-1 rounded-lg hover:bg-blue-50'>
                      Blog
                      <span className='ml-1 transition-transform transform group-hover:translate-x-1 group-hover:-translate-y-1'>
                        ↗
                      </span>
                    </Link>
                  </div>
                  <div>
                    这里是我的
                    <Link
                      href='/cv'
                      className='group inline-flex items-center text-green-600 hover:text-green-500 transition-colors relative px-2 py-1 rounded-lg hover:bg-green-50'>
                      简历
                      <span className='ml-1 transition-transform transform group-hover:translate-x-1 group-hover:-translate-y-1'>
                        ↗
                      </span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 面板2 */}
      <AnimatePresence>
        {activePanel === 1 && (
          <motion.div
            key='panel-1'
            className='panel'
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <AnimatePresence propagate>
              {/* 元素1 */}
              <AnimatePresence>
                <motion.div
                  className='element'
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                />
              </AnimatePresence>

              {/* 元素2 */}
              <AnimatePresence>
                <motion.div
                  className='element'
                  initial={{ opacity: 0, scale: 1.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, rotate: -180 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                />
              </AnimatePresence>

              {/* 元素3 */}
              <AnimatePresence>
                <motion.div
                  className='element'
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ clipPath: 'inset(0 0 100% 0)' }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                />
              </AnimatePresence>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainPagePanels

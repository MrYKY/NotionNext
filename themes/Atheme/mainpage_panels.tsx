'use client'

import Link from 'next/link'
import { useRouter } from 'next/router';
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
import Dock from '@/components/animation/Dock'

// 动画通用配置变量
const global_duration = 0.5

const MainPagePanels = () => {
  const [activePanel, setActivePanel] = useState(0)
  const [isSwitching, setIsSwitching] = useState(false)
  const router = useRouter()

  // 鼠标滚轮事件处理
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // if (isSwitching) return

      // setIsSwitching(true)
      // const direction = e.deltaY > 0 ? 1 : -1
      // setActivePanel(prev => Math.max(0, Math.min(1, prev + direction)))

      // setTimeout(() => setIsSwitching(false), 1000)
      setActivePanel(0)
    }

    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [isSwitching])

  const items = [
    {
      icon: '🏠',
      label: 'Blog',
      onClick: () => router.push('/blog')
    },
    {
      icon: 'ℹ️',
      label: 'About',
      onClick: () => router.push('/about')
    }
  ]

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
            className='flex flex-col items-start justify-between w-full h-full bg-[#f6eedc] relative'
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
              <div className=' ml-[10%] mt-[5%] mb-[2%] z-30'>
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
              <div className='w-full flex flex-col z-20 absolute top-[28%]'>
                <motion.div
                  initial={{ x: '-50vw', opacity: 0 }}
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
                    updateInterval={300}
                    disableDrawing={false}
                    colors={{
                      background: 'rgba(233, 196, 106, 1)', // 加入透明度
                      textDim: 'rgba(42, 157, 143, 1)', // 加入透明度
                      drawLine: 'rgba(231, 111, 81, 1)', // 加入透明度
                      textBright: 'rgba(233, 196, 106, 1)' // 加入透明度
                    }}
                  />
                </motion.div>
                <motion.div
                  initial={{ x: '50vw', opacity: 0 }}
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
                    updateInterval={400}
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
                  initial={{ x: '-50vw', opacity: 0 }}
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
                    updateInterval={200}
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
              <div className='z-30 absolute left-1/2 bottom-2'>
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
                  <Dock
                    items={items}
                    className = 'text-3xl'
                    panelHeight={40}
                    baseItemSize={60}
                    magnification={70}
                  />
                </motion.div>
              </div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 面板2 */}
      {/* <AnimatePresence mode='wait'>
        {activePanel === 1 && (
          <motion.div
            className='flex flex-col items-center justify-center w-full h-full bg-[#f6eedc] relative'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, delay: 0 }}>
            <AnimatePresence propagate>
              <div className='flex items-center justify-center w-[1280px] h-[720px] bg-[#938a75]'></div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  )
}

export default MainPagePanels

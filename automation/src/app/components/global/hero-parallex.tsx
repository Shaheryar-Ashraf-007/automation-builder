'use client'
import React from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export const HeroParallax = ({
  products = [],
}: {
  products: {
    title: string
    link: string
    thumbnail: string
  }[]
}) => {
  // Ensure no body overflow during component lifecycle
  React.useEffect(() => {
    const originalOverflow = document.body.style.overflowX
    document.body.style.overflowX = 'hidden'
    document.documentElement.style.overflowX = 'hidden'
    
    return () => {
      document.body.style.overflowX = originalOverflow
      document.documentElement.style.overflowX = 'auto'
    }
  }, [])

  const firstRow = products.slice(0, 5)
  const secondRow = products.slice(5, 10)
  const thirdRow = products.slice(10, 15)
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 }

  // Much smaller transform values to prevent any overflow
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 50]),
    springConfig
  )
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -50]),
    springConfig
  )
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  )
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  )
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  )
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-400, 200]),
    springConfig
  )

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div
        ref={ref}
        className="min-h-[300vh] w-full max-w-full antialiased relative flex flex-col [perspective:1000px] [transform-style:preserve-3d] overflow-hidden"
        style={{ 
          width: '100%',
          maxWidth: '100vw',
          overflowX: 'hidden'
        }}
      >
        <Header />
        <div className="w-full max-w-full relative overflow-hidden" style={{ overflowX: 'hidden' }}>
          <motion.div
            style={{
              rotateX,
              rotateZ,
              translateY,
              opacity,
            }}
            className="w-full max-w-full overflow-hidden"
          >
            {/* First Row */}
            <div 
              className="w-full max-w-full mb-8 sm:mb-12 lg:mb-16 xl:mb-20 relative overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100" 
              style={{ 
                width: '100%',
                maxWidth: '100vw',
                overflowY: 'hidden'
              }}
            >
              <motion.div 
                className="flex flex-row-reverse space-x-reverse space-x-4 sm:space-x-8 lg:space-x-12 xl:space-x-20 px-4 sm:px-6 lg:px-8"
                style={{
                  width: 'fit-content',
                  minWidth: '100%'
                }}
              >
                {firstRow.map((product) => (
                  <ProductCard
                    product={product}
                    translate={translateX}
                    key={product.title}
                  />
                ))}
              </motion.div>
            </div>

            {/* Second Row */}
            <div 
              className="w-full max-w-full mb-8 sm:mb-12 lg:mb-16 xl:mb-20 relative overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100" 
              style={{ 
                width: '100%',
                maxWidth: '100vw',
                overflowY: 'hidden'
              }}
            >
              <motion.div 
                className="flex flex-row space-x-4 sm:space-x-8 lg:space-x-12 xl:space-x-20 px-4 sm:px-6 lg:px-8"
                style={{
                  width: 'fit-content',
                  minWidth: '100%'
                }}
              >
                {secondRow.map((product) => (
                  <ProductCard
                    product={product}
                    translate={translateXReverse}
                    key={product.title}
                  />
                ))}
              </motion.div>
            </div>

            {/* Third Row */}
            <div 
              className="w-full max-w-full relative overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100" 
              style={{ 
                width: '100%',
                maxWidth: '100vw',
                overflowY: 'hidden'
              }}
            >
              <motion.div 
                className="flex mb-72 flex-row-reverse space-x-reverse space-x-4 sm:space-x-8 lg:space-x-12 xl:space-x-20 px-4 sm:px-6 lg:px-8 mr-4"
                style={{
                  width: 'fit-content',
                  minWidth: '100%'
                }}
              >
                {thirdRow.map((product) => (
                  <ProductCard
                    product={product}
                    translate={translateX}
                    key={product.title}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold backdrop-blur-md dark:text-white">
        The Ultimate <br className="hidden sm:block" />
        <span className="sm:hidden">Ultimate </span>
        development studio
      </h1>
      <p className="max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl mt-4 sm:mt-6 lg:mt-8 text-white/80 leading-relaxed">
        We build beautiful products with the latest technologies and frameworks.
        We are a team of passionate developers and designers that love to build amazing products.
      </p>
    </div>
  )
}


export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string
    link: string
    thumbnail: string
  }
  translate: MotionValue<number>
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      key={product.title}
      className="group/product h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80 xl:h-96 xl:w-[30rem] relative flex-shrink-0 rounded-lg overflow-hidden shadow-lg"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl transition-shadow duration-300"
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-center absolute h-full w-full inset-0 transition-transform duration-300 group-hover/product:scale-105"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-60 bg-black pointer-events-none transition-opacity duration-300"></div>
      <h2 className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 lg:bottom-4 lg:left-4 opacity-0 group-hover/product:opacity-100 text-white text-xs sm:text-sm lg:text-base font-medium transition-opacity duration-300">
        {product.title}
      </h2>
    </motion.div>
  )
}
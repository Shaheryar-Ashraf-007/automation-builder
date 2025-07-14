'use client'

import { cn } from '../../../lib/utils'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export const InfiniteMovingCards = ({
  items = [],
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
}: {
  items?: {
    href: string
  }[]
  direction?: 'left' | 'right'
  speed?: 'fast' | 'normal' | 'slow'
  pauseOnHover?: boolean
  className?: string
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLUListElement>(null)

  const [start, setStart] = useState(false)

  useEffect(() => {
    if (items.length > 0) {
      addAnimation()
    }
  }, [items])

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        '--animation-direction',
        direction === 'left' ? 'forwards' : 'reverse'
      )
    }
  }

  const getSpeed = () => {
    if (containerRef.current) {
      const duration =
        speed === 'fast' ? '20s' : speed === 'normal' ? '40s' : '80s'
      containerRef.current.style.setProperty('--animation-duration', duration)
    }
  }

  if (!items || !Array.isArray(items)) {
    console.error('❌ Invalid items:', items)
    return null
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex min-w-full shrink-0 gap-10 py-4 w-max flex-nowrap',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {items.map((item, idx) => (
          <Image
            key={idx}
            width={170}
            height={1}
            src={item.href}
            alt={`logo-${idx}`}
            className="relative rounded-2xl object-contain opacity-50"
          />
        ))}
      </ul>
    </div>
  )
}

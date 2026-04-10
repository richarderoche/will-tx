'use client'

import { cn } from '@/lib/utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'

export function BlockNumberedList({ block }) {
  const olRef = useRef<HTMLOListElement>(null)
  gsap.registerPlugin(ScrollTrigger)

  useGSAP(
    () => {
      if (!olRef.current) return
      gsap.set('li', { opacity: 0, y: 30 })
      gsap.to('li', {
        scrollTrigger: {
          trigger: olRef.current,
          start: 'top 90%',
          markers: false,
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.12,
      })
    },
    { scope: olRef }
  )

  return (
    <ol
      ref={olRef}
      className={cn(
        block.textStyle || 'ts-p-md',
        block.color,
        block.balanceLines ? 'text-balance' : 'text-pretty',
        'flex flex-col gap-[1.4em]'
      )}
    >
      {block.listItems.map((item, index) => (
        <li
          key={index}
          className={cn(block.fontWeight, 'flex items-baseline gap-gut-25')}
        >
          <span className="text-fg-subtle ts-ol-num">
            <LeadingZero n={index + 1} />
          </span>
          {item.textContent}
        </li>
      ))}
    </ol>
  )
}

export function LeadingZero({ n }: { n: number }) {
  return n < 10 ? '0' + n : n
}

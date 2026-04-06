'use client'

import { cn, formatHtmlId, getGridClasses, getOuterSettings } from '@/lib/utils'
import { BigCircle, PbPipeline, SmallCircle } from '@/sanity.types'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'
import PipelineHorizontal from '../icons/PipelineHorizontal'
import PipelineVertical from '../icons/PipelineVertical'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'

export default function SectionPipeline({ section }: { section: PbPipeline }) {
  const { rowWidth, smallCircle, bigCircle } = section
  const textContainerRef = useRef<HTMLDivElement>(null)
  // Prep attributes
  const outerSettings = getOuterSettings(rowWidth)
  const outerClasses = outerSettings ? getGridClasses(outerSettings) : ''

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(
    () => {
      if (!textContainerRef.current) return
      gsap.set('li', { opacity: 0, x: -20 })
      gsap.to('li', {
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: 'top 90%',
          markers: false,
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.12,
      })
    },
    { scope: textContainerRef }
  )

  return (
    <SiteWidth>
      <SiteGrid>
        <div className={cn(outerClasses, 'relative')}>
          <PipelineHorizontal className="hidden md:block" />
          <PipelineVertical className="md:hidden" />
          <div
            ref={textContainerRef}
            className="absolute inset-0 flex justify-between max-md:flex-col items-center md:items-end"
          >
            {smallCircle && (
              <PipelineCircle
                data={smallCircle}
                className="w-250/469 md:w-250/888"
              />
            )}
            {bigCircle && (
              <PipelineCircle
                data={bigCircle}
                className="w-full md:w-469/888"
              />
            )}
          </div>
        </div>
      </SiteGrid>
    </SiteWidth>
  )
}

export const PipelineCircle = ({
  data,
  className,
}: {
  data: SmallCircle | BigCircle
  className: string
}) => {
  const { label, list } = data || {}
  return (
    <ul
      className={cn(
        'aspect-square rounded-full grid grid-cols-[max-content] place-content-center ts-p-sm max-w-full',
        className
      )}
    >
      {label && (
        <li className="text-left font-medium mb-[.5em] origin-left">{label}</li>
      )}
      {list &&
        list.map((item, index) => (
          <li
            key={formatHtmlId(`${item}-${index}`)}
            className="text-left origin-left"
          >
            {item}
          </li>
        ))}
    </ul>
  )
}

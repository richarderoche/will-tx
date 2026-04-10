import { PbHero } from '@/sanity.types'

import { cn, getOuterSettings } from '@/lib/utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'
import ImageBasic from '../shared/ImageBasic'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth, { SITE_MAX_WIDTH } from '../shared/SiteWidth'
import GridCol from './GridCol'

gsap.registerPlugin(ScrollTrigger)
export default function SectionHero({
  section,
  sectionKey,
  isFirst,
}: {
  section: PbHero
  sectionKey: string
  isFirst: boolean
}) {
  const { pbBlocks, imageGrid } = section
  const hasBlocks = pbBlocks && pbBlocks.length > 0
  const hasImageGrid = imageGrid && imageGrid.length > 0
  // trim imageGrid to 9, 4, or 1
  let trimmedImageGrid = hasImageGrid ? imageGrid?.slice(0, 9) : []
  if (trimmedImageGrid?.length < 9) {
    trimmedImageGrid = trimmedImageGrid?.slice(0, 4)
  }
  if (trimmedImageGrid?.length < 4) {
    trimmedImageGrid = trimmedImageGrid?.slice(0, 1)
  }
  const imgCount = trimmedImageGrid?.length
  const colCount = imgCount === 9 ? 3 : imgCount === 4 ? 2 : 1
  const imgColClass =
    colCount === 3
      ? 'grid-cols-3'
      : colCount === 2
        ? 'grid-cols-2'
        : 'grid-cols-1'

  const imageGridRef = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      if (!imageGridRef.current) return
      ScrollTrigger.create({
        trigger: imageGridRef.current,
        start: 'top 95%',
        markers: false,
        onEnter: () => {
          gsap.from('.hero-grid-image', {
            filter: 'blur(10px)',
            scale: 0.8,
            opacity: 0,
            duration: 2,
            ease: 'expo.out',
            stagger: 0.12,
          })
        },
      })
    },
    { scope: imageGridRef }
  )

  if (!hasBlocks && !hasImageGrid) {
    return null
  }

  return (
    <SiteWidth className="py-header">
      <SiteGrid yAlignment="items-center max-lg:pt-gut gap-y-gut-200">
        {hasBlocks && (
          <GridCol
            col={{
              _key: sectionKey,
              pbBlocks,
              revealEffect: 'stagger',
              columnSettings: {
                _type: 'pbColSettings',
                size: {
                  mobile: 12,
                  tablet: 6,
                  desktop: 5,
                },
                start: {
                  mobile: 0,
                  tablet: 0,
                  desktop: 0,
                },
              },
              spaceBetweenBlocks: 'gap-gut-50',
            }}
            outerSettings={getOuterSettings(12)}
          />
        )}
        {hasImageGrid && (
          <div
            ref={imageGridRef}
            className={cn(
              'col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-8 grid',
              imgColClass
            )}
          >
            {trimmedImageGrid.map((image) => {
              if (!image.image) {
                return null
              }
              return (
                <div className="hero-grid-image" key={image._key}>
                  <ImageBasic
                    image={image.image}
                    alt={image.imageAltText || ''}
                    ratio={0.75}
                    priority={isFirst ? true : false}
                    sizes={GridImageSizes(colCount)}
                    maxDimension={
                      colCount === 3 ? 200 : colCount === 2 ? 300 : 600
                    }
                  />
                </div>
              )
            })}
          </div>
        )}
      </SiteGrid>
    </SiteWidth>
  )
}

export function GridImageSizes(colCount: number) {
  const m = (12 / 12 / colCount) * 100
  const t = (6 / 12 / colCount) * 100
  const d = (5 / 12 / colCount) * 100

  const mVw = m + 'vw'
  const tVw = t === m ? null : '(min-width: 768px) ' + t + 'vw, '
  const dVw =
    d === t ? null : d === m ? null : '(min-width: 1024px) ' + d + 'vw, '
  const maxVw =
    '(min-width: ' +
    SITE_MAX_WIDTH +
    'px) ' +
    SITE_MAX_WIDTH * (d / 100) +
    'px, '

  return `${maxVw}${dVw ? dVw : ''}${tVw ? tVw : ''}${mVw}`
}

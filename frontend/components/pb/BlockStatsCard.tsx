'use client'

import { cn } from '@/lib/utils'
import { PbBlockStatsCard } from '@/sanity.types'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'
import Card from '../shared/Card'

gsap.registerPlugin(ScrollTrigger)

export function BlockStatsCard({ block }: { block: PbBlockStatsCard }) {
  const { title, stats } = block
  const hasStats = stats && stats.length > 0

  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = cardRef.current
      if (!el) return

      gsap.set('.line-in', { opacity: 0, y: 20 })
      gsap.set(el, { visibility: 'visible' })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 66%',
            markers: false,
          },
        })
        .from(el, {
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: 'circ.out',
        })
        .to(
          '.line-in',
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'circ.out',
            stagger: 0.2,
          },
          '<0.2'
        )
        .from(
          '.count-in',
          {
            textContent: 0,
            duration: 1.5,
            snap: { textContent: 1 },
            onUpdate: function () {
              this.targets().forEach((node) => {
                const n = parseInt(
                  String(node.textContent).replace(/,/g, ''),
                  10
                )
                if (!Number.isNaN(n)) node.textContent = n.toLocaleString()
              })
            },
          },
          '<'
        )
    },
    { scope: cardRef }
  )

  return (
    <Card
      ref={cardRef}
      bgColorClass={block.bgColor}
      style={{ visibility: 'hidden' }}
    >
      {title && <h2 className="line-in ts-h2 mb-gut-900">{title}</h2>}
      {hasStats && (
        <ul className="flex flex-col gap-[1.25em] mb-gut-25">
          {stats.map((stat) => (
            <li
              className="line-in flex items-baseline justify-between gap-gut-25 border-b border-divider pb-gut-25"
              key={stat._key}
            >
              {stat.label}
              <div className="font-mono uppercase">
                {stat.modifier && <span>{formatModifier(stat.modifier)}</span>}
                {stat.includeDollarSign && <span>$</span>}
                {stat.value && (
                  <span className="relative text-right">
                    <span className="opacity-0">{formatValue(stat.value)}</span>
                    <span
                      className={cn(
                        stat.value > 9 && 'count-in',
                        'absolute left-0 w-full'
                      )}
                      aria-hidden="true"
                    >
                      {stat.value}
                    </span>
                  </span>
                )}
                {stat.unit && <span>{stat.unit}</span>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

function formatValue(value: number) {
  if (value > 9) {
    const n = parseInt(String(value).replace(/,/g, ''), 10)
    if (!Number.isNaN(n)) return n.toLocaleString()
  }

  return value
}

function formatModifier(modifier: string) {
  switch (modifier) {
    case 'less':
      return '< '
    case 'more':
      return '> '
    case 'plus':
      return '+ '
    case 'minus':
      return '- '
    case 'about':
      return '~ '
    default:
      return ''
  }
}

'use client'

import { cn, formatHtmlId } from '@/lib/utils'
import { PbSections } from '@/sanity.types'
import { PageBuilderData } from '@/types'
import ImageBasic from '../shared/ImageBasic'
import {
  SanityPathSegment,
  SanityVisualEditingPath,
  useSanityDataAttribute,
} from './SanityVisualEditingContext'
import SectionGridDouble from './SectionGridDouble'
import SectionGridMulti from './SectionGridMulti'
import SectionGridSingle from './SectionGridSingle'
import SectionPipeline from './SectionPipeline'

export interface PageBuilderContentProps {
  data: PageBuilderData
  baseUrl: string
  firstPbSectionKey: string
}

export default function PageBuilderSections({
  pbSections,
  firstPbSectionKey,
}: {
  pbSections: PbSections
  firstPbSectionKey: string
}) {
  const { getDataAttribute } = useSanityDataAttribute()
  if (!pbSections?.length) return null

  return (
    <div className="flex flex-col">
      {pbSections.map((section) => {
        const { _key, sectionSettings } = section
        const {
          backgroundImage,
          backgroundImageOpacity = 50,
          colorTheme = 'light-theme',
          enableSection = true,
          marginBottom,
          marginTop,
          enableAnchorLink,
          sectionTitle,
        } = sectionSettings || {}

        if (!enableSection) return null

        const sectionPath: SanityPathSegment[] = ['pbSections', { _key }]
        const isFirst = _key === firstPbSectionKey

        return (
          <section
            id={
              enableAnchorLink && sectionTitle
                ? formatHtmlId(sectionTitle)
                : 'section-' + _key
            }
            key={_key}
            className={cn(
              colorTheme,
              backgroundImage && 'relative overflow-hidden'
            )}
            data-sanity={getDataAttribute(sectionPath)}
          >
            {backgroundImage && (
              <ImageBasic
                image={backgroundImage}
                alt={''}
                sizes="100vw"
                priority={isFirst ? true : false}
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            {backgroundImage && (
              <div
                className="absolute inset-0 bg-overlay"
                style={{
                  opacity: `${backgroundImageOpacity / 100}`,
                }}
              ></div>
            )}
            <div
              className="relative z-1"
              style={{
                paddingTop: marginTop
                  ? `calc(var(--gut) * ${marginTop})`
                  : undefined,
                paddingBottom: marginBottom
                  ? `calc(var(--gut) * ${marginBottom})`
                  : undefined,
              }}
            >
              <SanityVisualEditingPath path={[...sectionPath]}>
                {section._type === 'pbGridMulti' && (
                  <SectionGridMulti section={section} />
                )}
                {section._type === 'pbGridSingle' && (
                  <SectionGridSingle section={section} sectionKey={_key} />
                )}
                {section._type === 'pbGridDouble' && (
                  <SectionGridDouble section={section} sectionKey={_key} />
                )}
                {section._type === 'pbPipeline' && (
                  <SectionPipeline section={section} />
                )}
              </SanityVisualEditingPath>
            </div>
          </section>
        )
      })}
    </div>
  )
}

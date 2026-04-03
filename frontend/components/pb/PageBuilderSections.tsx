'use client'

import { formatHtmlId } from '@/lib/utils'
import { PbSections } from '@/sanity.types'
import { PageBuilderData } from '@/types'
import {
  SanityPathSegment,
  SanityVisualEditingPath,
  useSanityDataAttribute,
} from './SanityVisualEditingContext'
import SectionGridDouble from './SectionGridDouble'
import SectionGridMulti from './SectionGridMulti'
import SectionGridSingle from './SectionGridSingle'

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
          backgroundImageOpacity,
          colorTheme = 'light-theme',
          enableSection = true,
          marginBottom,
          marginTop,
          enableAnchorLink,
          sectionTitle,
        } = sectionSettings || {}

        if (!enableSection) return null

        const sectionPath: SanityPathSegment[] = ['pbSections', { _key }]

        return (
          <section
            id={
              enableAnchorLink && sectionTitle
                ? formatHtmlId(sectionTitle)
                : 'section-' + _key
            }
            key={_key}
            className={colorTheme}
            data-sanity={getDataAttribute(sectionPath)}
          >
            <div
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
              </SanityVisualEditingPath>
            </div>
          </section>
        )
      })}
    </div>
  )
}

import { getGridClasses, getOuterSettings } from '@/lib/utils'
import { PbGridSingle, PbSections } from '@/sanity.types'

import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import GridCol from './GridCol'
import SectionCard from './SectionCard'

export default function SectionGridSingle({
  section,
  sectionKey,
}: {
  section: PbGridSingle
  sectionKey: string
}) {
  const { rowWidth, pbBlocks, cardMode, revealEffect, spaceBetweenBlocks } =
    section
  // Skip if no blocks yet
  if (!pbBlocks || pbBlocks.length === 0) {
    return null
  }
  // Prep attributes
  const outerSettings = getOuterSettings(rowWidth)
  const outerClasses = outerSettings ? getGridClasses(outerSettings) : ''

  return (
    <SiteWidth>
      <SiteGrid>
        <div className={outerClasses}>
          <SectionCard section={section as NonNullable<PbSections>[number]}>
            <GridCol
              col={{
                _key: sectionKey,
                pbBlocks,
                revealEffect,
                spaceBetweenBlocks,
              }}
              outerSettings={outerSettings}
              cardMode={cardMode}
            />
          </SectionCard>
        </div>
      </SiteGrid>
    </SiteWidth>
  )
}

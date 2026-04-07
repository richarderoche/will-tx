import { getGridClasses, getOuterSettings } from '@/lib/utils'
import { PbGridMulti, PbSections } from '@/sanity.types'

import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import GridCol from './GridCol'
import {
  SanityVisualEditingPath,
  useSanityDataAttribute,
} from './SanityVisualEditingContext'
import SectionCard from './SectionCard'

export default function SectionGridMulti({
  section,
  isFirst,
}: {
  section: PbGridMulti
  isFirst: boolean
}) {
  const { rowWidth = 12, columns } = section
  const { path: sectionPath } = useSanityDataAttribute()
  // Skip if no columns yet
  if (!columns || columns.length === 0) {
    return null
  }
  // Prep attributes
  const outerSettings = getOuterSettings(rowWidth)
  const outerClasses = outerSettings ? getGridClasses(outerSettings) : ''

  return (
    <SiteWidth>
      <SiteGrid>
        <div className={outerClasses}>
          <SectionCard
            section={section as NonNullable<PbSections>[number]}
            isFirst={isFirst}
          >
            <SiteGrid yGaps={true} looseColSpacing={false}>
              {columns.map((col) => (
                <SanityVisualEditingPath
                  key={col._key}
                  path={[...sectionPath, 'columns', { _key: col._key }]}
                >
                  <GridCol
                    col={col}
                    outerSettings={outerSettings}
                    cardMode={col.cardMode}
                    blockWidths={col.blockWidths}
                  />
                </SanityVisualEditingPath>
              ))}
            </SiteGrid>
          </SectionCard>
        </div>
      </SiteGrid>
    </SiteWidth>
  )
}

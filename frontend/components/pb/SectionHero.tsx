import { PbHero } from '@/sanity.types'

import { getOuterSettings } from '@/lib/utils'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import GridCol from './GridCol'

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

  if (!hasBlocks && !hasImageGrid) {
    return null
  }

  return (
    <SiteWidth className="py-header">
      <SiteGrid yGaps={true} yAlignment="items-center">
        {hasBlocks && (
          <GridCol
            col={{
              _key: sectionKey,
              pbBlocks,
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
      </SiteGrid>
    </SiteWidth>
  )
}

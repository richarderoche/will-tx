import { cn, getOuterSettings, getTrueSizes } from '@/lib/utils'
import { PbSections } from '@/sanity.types'
import ImageBasic from '../shared/ImageBasic'

export default function SectionCard({
  children,
  section,
  isFirst,
}: {
  children: React.ReactNode
  section: NonNullable<PbSections>[number]
  isFirst: boolean
}) {
  if (section._type === 'pbHero') {
    return children
  }
  const { cardMode, cardBannerImage, cardBannerImageAlt } =
    section.sectionSettings || {}

  if (!cardMode || !cardBannerImage) {
    return children
  }

  const outerSettings = getOuterSettings(section.rowWidth)
  const trueSizes = outerSettings.size
    ? getTrueSizes(outerSettings.size)
    : '100vw'
  return (
    <div className="card-container">
      <div className={cn('corner bg-bg-subtle')}>
        {cardBannerImage && (
          <div className="card-banner-image">
            <ImageBasic
              image={cardBannerImage}
              alt={cardBannerImageAlt || ''}
              sizes={trueSizes}
              ratio={2.25}
              priority={isFirst ? true : false}
            />
          </div>
        )}
        <div className="card-padding">{children}</div>
      </div>
    </div>
  )
}

import { cn } from '@/lib/utils'
import { PbSections } from '@/sanity.types'

export default function SectionCard({
  children,
  section,
}: {
  children: React.ReactNode
  section: NonNullable<PbSections>[number]
}) {
  const { cardMode, cardBannerImage } = section.sectionSettings || {}
  if (!cardMode) {
    return children
  }
  return (
    <div className="corner-container">
      <div className={cn('corner p-gut bg-bg-subtle')}>{children}</div>
    </div>
  )
}

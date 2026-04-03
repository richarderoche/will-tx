import PageBuilder from '@/components/pb/PageBuilder'
import PageWrapper from '@/components/shared/PageWrapper'
import StyleGuide from '@/components/shared/StyleGuide'
import { getFirstSectionInfo } from '@/lib/utils'
import { sanityFetch } from '@/sanity/lib/live'
import { homePageQuery } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'

export default async function IndexRoute() {
  const { data } = await sanityFetch({ query: homePageQuery })

  if (!data) {
    notFound()
  }

  const { firstIsHero, firstPbSectionKey } = getFirstSectionInfo(data)

  return (
    <PageWrapper className={firstIsHero ? '' : 'pt-header'}>
      <div className="dark-theme py-gut-300 hidden">
        <StyleGuide />
      </div>
      <PageBuilder data={data} firstPbSectionKey={firstPbSectionKey ?? ''} />
    </PageWrapper>
  )
}

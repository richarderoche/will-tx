'use client'
import { useStore } from '@/lib/store'
import { useMeasure } from '@/lib/useMeasure'
import { cn, formatHtmlId } from '@/lib/utils'
import { HomeNavQueryResult } from '@/sanity.types'
import Link from 'next/link'
import { Ref, useEffect } from 'react'
import Logo from '../icons/Logo'
import SiteWidth from '../shared/SiteWidth'
import MobileNav from './MobileNav'
import SkipLink from './SkipLink'

export default function Navbar(props: { navData: HomeNavQueryResult }) {
  const { navData } = props
  const anchorLinks = navData?.anchorLinks || []
  const hasAnchorLinks = anchorLinks && anchorLinks.length > 0
  const headerColorMode = useStore((state) => state.headerColorMode)
  const setHeaderHeight = useStore((state) => state.setHeaderHeight)
  const [headerRef, headerDimensions] = useMeasure()

  useEffect(() => {
    if (headerDimensions.height && headerDimensions.height > 0) {
      setHeaderHeight(headerDimensions.height)
    }
  }, [headerDimensions.height, setHeaderHeight])

  return (
    <header
      ref={headerRef as Ref<HTMLDivElement>}
      className={cn(
        'h-header fixed top-0 left-0 w-full z-99 theme-vars-only',
        headerColorMode
      )}
    >
      <SkipLink />
      <SiteWidth className="h-full flex items-center justify-between gap-x-gut ts-main-nav text-body transition-colors duration-200">
        {hasAnchorLinks && (
          <nav className="max-lg:hidden flex items-center gap-x-gut">
            {anchorLinks.map(({ _key, sectionTitle }) => (
              <div key={`nav-${_key}`} className="group">
                <Link href={`#${formatHtmlId(sectionTitle || '')}`}>
                  {sectionTitle}
                </Link>
                <div className="h-1 w-full bg-body opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-50 translate-y-3 scale-x-1 group-hover:scale-x-100"></div>
              </div>
            ))}
          </nav>
        )}
        <MobileNav navData={navData} />

        <Link href="/#">
          <Logo className="w-auto h-btn" aria-hidden="true" />
          <span className="sr-only">Will Therapeutics</span>
        </Link>
      </SiteWidth>
    </header>
  )
}

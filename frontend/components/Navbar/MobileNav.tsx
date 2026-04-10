'use client'

import { useGSAP } from '@gsap/react'
import { CloseIcon, MenuIcon } from '@sanity/icons'
import { FocusTrap } from 'focus-trap-react'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'

import { useStore } from '@/lib/store'
import { formatHtmlId } from '@/lib/utils'
import { HomeNavQueryResult } from '@/sanity.types'
import Link from 'next/link'

interface NavbarProps {
  navData: HomeNavQueryResult
}

export default function MobileNav(props: NavbarProps) {
  const { navData } = props
  const anchorLinks = navData?.anchorLinks || []
  const hasAnchorLinks = anchorLinks && anchorLinks.length > 0
  const headerCTA = navData?.headerCTA || null
  const hasHeaderCTA = headerCTA && headerCTA.title && headerCTA.url
  const isMobileNavOpen = useStore((state) => state.isMobileNavOpen)
  const setIsMobileNavOpen = useStore((state) => state.setIsMobileNavOpen)
  const setPauseLenis = useStore((state) => state.setPauseLenis)

  const handleOpenMobileNav = () => {
    setIsMobileNavOpen(true)
    setPauseLenis(true)
  }

  const handleCloseMobileNav = () => {
    setIsMobileNavOpen(false)
    setPauseLenis(false)
  }

  const handleToggleMobileNav = () => {
    if (isMobileNavOpen) {
      handleCloseMobileNav()
    } else {
      handleOpenMobileNav()
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileNavOpen(false)
        setPauseLenis(false)
      }
    }
    if (isMobileNavOpen) {
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileNavOpen, setIsMobileNavOpen, setPauseLenis])

  const navRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to(navRef.current, {
        x: isMobileNavOpen ? 0 : '100%',
        duration: 0.6,
        ease: 'expo.out',
      })
    },
    { dependencies: [isMobileNavOpen] }
  )

  return (
    <FocusTrap active={isMobileNavOpen}>
      <div className="lg:hidden">
        <button
          onClick={handleToggleMobileNav}
          aria-expanded={isMobileNavOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle Menu"
          className="-translate-x-[24%] pointer-events-auto"
        >
          <MenuIcon style={{ fontSize: 40 }} />
        </button>

        <nav
          id="mobile-nav"
          ref={navRef}
          className="fixed top-0 bottom-0 right-0 w-full light-theme z-1 overflow-auto translate-x-full px-gut pointer-events-auto"
          data-lenis-prevent
          role="navigation"
          aria-label="Mobile Navigation"
          inert={!isMobileNavOpen}
        >
          <div className="h-header flex items-center">
            <button
              onClick={handleToggleMobileNav}
              aria-expanded={isMobileNavOpen}
              aria-controls="mobile-nav"
              aria-label="Toggle Menu"
              className="-translate-x-[24%]"
            >
              <CloseIcon style={{ fontSize: 40 }} />
            </button>
          </div>
          <div className="flex flex-col gap-y-gut pt-gut pb-header ts-main-nav">
            {hasAnchorLinks &&
              anchorLinks.map(({ _key, sectionTitle }) => (
                <Link
                  key={`nav-${_key}`}
                  href={`#${formatHtmlId(sectionTitle || '')}`}
                  onClick={handleCloseMobileNav}
                >
                  {sectionTitle}
                </Link>
              ))}
            {hasHeaderCTA && (
              <Link
                href={headerCTA.url || ''}
                onClick={handleCloseMobileNav}
                target="_blank"
                rel="noopener noreferrer"
              >
                {headerCTA.title}
              </Link>
            )}
          </div>
        </nav>
      </div>
    </FocusTrap>
  )
}

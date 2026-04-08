import Link from 'next/link'

import { cn } from '@/lib/utils'
import { resolveHref } from '@/sanity/lib/utils'
import { NavItem } from '@/types'
import IconCaret from '../icons/IconCaret'

interface ButtonProps {
  text?: string
  path?: string
  navItem?: NavItem
  style?: 'main' | 'alt' | 'secondary'
  className?: string
  download?: boolean
}

export default function Button(props: ButtonProps) {
  const { text, path, navItem, className, download } = props
  let href: string | undefined = ''
  let buttonText: string | undefined = ''

  if (navItem) {
    const { page, title, url } = navItem
    href = page ? resolveHref(page.type, page.slug) : url
    buttonText = title || page?.title || ''
  } else {
    if (!text || !path) return null
    href = path || ''
    buttonText = text || ''
  }

  const isExternal = href?.startsWith('http')

  return (
    <Link
      href={href || ''}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cn(
        'rounded-full w-fit flex items-center h-btn relative group ts-p-xs',
        className
      )}
      download={download}
    >
      <div className="absolute left-0 top-0 h-btn w-btn group-hover:w-full rounded-full bg-accent -z-1 transition-all duration-200 ease-out"></div>
      <IconCaret className="size-btn group-hover:opacity-35 group-hover:translate-x-[.5em] transition-all duration-200 ease-out" />
      <span className=" leading-none! nice-underline group-hover:decoration-transparent whitespace-nowrap pl-[.5em] pr-[1.2em] relative bottom-[.05em] transition-all duration-200">
        {buttonText}
      </span>
    </Link>
  )
}

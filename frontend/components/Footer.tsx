import SiteWidth from '@/components/shared/SiteWidth'
import Logo from './icons/Logo'
import CurrentYear from './shared/CurrentYear'
import SiteGrid from './shared/SiteGrid'

export default function Footer() {
  return (
    <footer className="bottom-0 dark-theme py-gut-150">
      <SiteWidth>
        <SiteGrid>
          <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col items-start gap-gut-50">
            <Logo className="w-auto h-gut-200 md:h-gut" />
            <p className="ts-p-xs text-fg-subtle">
              &copy; <CurrentYear /> WILL TX, Inc.
            </p>
          </div>
        </SiteGrid>
      </SiteWidth>
    </footer>
  )
}

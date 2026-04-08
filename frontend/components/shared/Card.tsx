import { cn } from '@/lib/utils'

export default function Card({
  children,
  bgColorClass = 'bg-bg-subtle',
  ...props
}: {
  children: React.ReactNode
  bgColorClass?: string
} & React.HTMLProps<HTMLDivElement>) {
  return (
    <div className="card-container light-theme theme-vars-only" {...props}>
      <div className={cn('corner card-padding text-body', bgColorClass)}>
        {children}
      </div>
    </div>
  )
}

import { cn } from '@/lib/utils'

export default function Card({
  children,
  bgColorClass = 'bg-bg-subtle',
}: {
  children: React.ReactNode
  bgColorClass?: string
}) {
  return (
    <div className="card-container">
      <div className={cn('corner card-padding', bgColorClass)}>{children}</div>
    </div>
  )
}

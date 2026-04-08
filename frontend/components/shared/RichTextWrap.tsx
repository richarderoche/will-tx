import { cn } from '@/lib/utils'

export default function RichTextWrap({
  children,
  className = 'ts-p-md',
  ...rest
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'prose prose-siteColor prose-strong:font-medium',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

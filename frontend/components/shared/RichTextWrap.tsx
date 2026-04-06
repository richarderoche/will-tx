import { cn } from '@/lib/utils'

export default function RichTextWrap({
  children,
  className = 'ts-p-md',
  ...rest
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('prose prose-siteColor', className)} {...rest}>
      {children}
    </div>
  )
}

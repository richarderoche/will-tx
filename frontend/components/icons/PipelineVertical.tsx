export default function PipelineVertical({
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 469 888"
      {...props}
    >
      <path
        stroke="var(--color-divider)"
        strokeMiterlimit="10"
        d="M112.06 99.5 6.56 600M356.29 99.5 461.79 600"
      />
      <path
        stroke="currentColor"
        strokeMiterlimit="10"
        d="M.5 653.12c0 129.05 104.62 233.66 233.67 233.66s233.67-104.61 233.67-233.66-104.62-233.67-233.67-233.67S.5 524.05.5 653.12ZM109.56 125.06c0 68.8 55.76 124.56 124.56 124.56 68.79 0 124.56-55.77 124.56-124.56C358.68 56.26 302.9.5 234.12.5c-68.8 0-124.56 55.77-124.56 124.56Z"
      />
    </svg>
  )
}

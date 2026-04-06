export default function PipelineHorizontal({
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 888 469"
      {...props}
    >
      <path
        stroke="var(--color-divider)"
        strokeMiterlimit="10"
        d="M71.62 230.74 545.58 26.63M128.01 467.85h524.7"
      />
      <path
        stroke="currentColor"
        strokeMiterlimit="10"
        d="M125.06 467.85c68.8 0 124.56-55.77 124.56-124.56 0-68.8-55.77-124.56-124.56-124.56C56.26 218.73.5 274.5.5 343.29c0 68.8 55.77 124.56 124.56 124.56ZM653.05 467.84c129.05 0 233.67-104.62 233.67-233.67S782.1.5 653.05.5 419.38 105.12 419.38 234.17 524 467.84 653.05 467.84Z"
      />
    </svg>
  )
}

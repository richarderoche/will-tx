import { useCallback, useRef, useState, type RefCallback } from 'react'

export type MeasureDimensions = {
  width: number | null
  height: number | null
}

export function useMeasure(): [RefCallback<HTMLElement>, MeasureDimensions] {
  const [dimensions, setDimensions] = useState<MeasureDimensions>({
    width: null,
    height: null,
  })

  const previousObserver = useRef<ResizeObserver | null>(null)

  const customRef = useCallback<RefCallback<HTMLElement>>((node) => {
    if (previousObserver.current) {
      previousObserver.current.disconnect()
      previousObserver.current = null
    }

    if (node) {
      const observer = new ResizeObserver(([entry]) => {
        const box = entry?.borderBoxSize?.[0]
        if (box) {
          const { inlineSize: width, blockSize: height } = box
          setDimensions({ width, height })
        }
      })

      observer.observe(node)
      previousObserver.current = observer
    }
  }, [])

  return [customRef, dimensions]
}

import { useEffect, useState } from 'react'
export const usePosition = () => {
  const [variables, setVariables] = useState<{ element: HTMLElement | null; event: MouseEvent | null }>({ element: null, event: null })
  const [positions, setPositions] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const { element, event } = variables

    if (!element || !event) return
    const { offsetLeft, offsetTop, clientWidth, clientHeight } = element
    const { clientX: X, clientY: Y } = event

    const localX = X - offsetLeft - clientWidth / 2 + 3
    const localY = Y - offsetTop - clientHeight / 2 + 3

    setPositions(() => ({ x: localX, y: localY }))
  }, [variables])

  return [positions, setVariables] as const
}

import { useEffect } from 'react'

const useClickWithoutMove = (element, handler) => {
  useEffect(() => {
    let pointerWasMoved = false

    const onPointerDown = () => {
      pointerWasMoved = false
    }

    const onPointerMove = () => {
      pointerWasMoved = true
    }

    const onPointerUp = (event) => {
      if (event.button !== 0) return
      if (pointerWasMoved) return // prevent pointer move
      handler(event)
    }

    element.addEventListener('pointerdown', onPointerDown)
    element.addEventListener('pointermove', onPointerMove)
    element.addEventListener('pointerup', onPointerUp)

    return () => {
      element.removeEventListener('pointerdown', onPointerDown)
      element.removeEventListener('pointermove', onPointerMove)
      element.removeEventListener('pointerup', onPointerUp)
    }
  }, [element, handler])
}

export default useClickWithoutMove

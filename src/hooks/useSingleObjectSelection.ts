import { useThree } from 'react-three-fiber'
import { useEffect } from 'react'
import * as THREE from 'three'

interface SingleObjectSelectionOptions {
  enabled?: boolean
  onChange: (object: THREE.Object3D | null) => void
}

const useSingleObjectSelection = (options: SingleObjectSelectionOptions) => {
  const { enabled = true, onChange } = options

  const three = useThree()

  useEffect(() => {
    if (!enabled) {
      return
    }

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

      const intersects = three.raycaster.intersectObject(three.scene, true)
      if (!intersects.length) {
        onChange(null)
      } else {
        const object = intersects[0].object
        onChange(object)
      }
    }

    three.gl.domElement.addEventListener('pointerdown', onPointerDown)
    three.gl.domElement.addEventListener('pointermove', onPointerMove)
    three.gl.domElement.addEventListener('pointerup', onPointerUp)

    return () => {
      three.gl.domElement.removeEventListener('pointerdown', onPointerDown)
      three.gl.domElement.removeEventListener('pointermove', onPointerMove)
      three.gl.domElement.removeEventListener('pointerup', onPointerUp)
    }
  }, [enabled, three])
}

export default useSingleObjectSelection

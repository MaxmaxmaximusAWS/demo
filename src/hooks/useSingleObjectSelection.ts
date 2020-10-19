import { useThree } from 'react-three-fiber'
import * as THREE from 'three'
import useClickWithoutMove from './useClickWithoutMove'

interface SingleObjectSelectionOptions {
  enabled?: boolean
  onChange: (object: THREE.Object3D | null) => void
}

const useSingleObjectSelection = (options: SingleObjectSelectionOptions) => {
  const { enabled = true, onChange } = options
  const three = useThree()

  useClickWithoutMove(three.gl.domElement, () => {
    if (!enabled) return

    const intersects = three.raycaster.intersectObject(three.scene, true)

    if (intersects.length) {
      onChange(intersects[0].object)
    } else {
      onChange(null)
    }
  })
}

export default useSingleObjectSelection

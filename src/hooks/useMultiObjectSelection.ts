import * as THREE from 'three'
import { useEffect } from 'react'
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox'
import SelectionHelper from '../lib/SelectionHelper'
import { useThree } from 'react-three-fiber'

interface MultiObjectSelectionOptions {
  enabled?: boolean
  selectionCssClass: string
  onChange: (object: THREE.Object3D[]) => void
}

const useMultiObjectSelection = (options: MultiObjectSelectionOptions) => {
  const { enabled = true, selectionCssClass, onChange } = options
  const three = useThree()

  useEffect(() => {
    if (!enabled) {
      return
    }

    const selectionBox = new SelectionBox(three.camera, three.scene)

    const helper = new SelectionHelper(
      selectionBox,
      three.gl,
      selectionCssClass
    )

    const onPointerDown = (event) => {
      selectionBox.startPoint.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
      )
    }

    const onPointerMove = (event) => {
      if (helper['isDown']) {
        selectionBox.endPoint.set(
          (event.clientX / window.innerWidth) * 2 - 1,
          -(event.clientY / window.innerHeight) * 2 + 1,
          0.5
        )

        const allSelected = selectionBox.select()
        onChange(allSelected)
      }
    }

    const onPointerUp = function (event) {
      selectionBox.endPoint.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
      )
      const allSelected = selectionBox.select()
      onChange(allSelected)
    }

    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      helper.destroy()
    }
  }, [enabled, selectionCssClass, three, three.scene, three.camera, three.gl])
}

export default useMultiObjectSelection

import * as THREE from 'three'
import { useFrame, useThree } from 'react-three-fiber'
import SelectionBox from '../lib/SelectionBox'
import { useEffect } from 'react'
import SelectionHelper from '../lib/SelectionHelper'

interface MultiObjectSelectionOptions {
  enabled?: boolean
  selectionCssClass: string
  onChange: (object: THREE.Object3D[]) => void
}

const useMultiObjectSelection = (options: MultiObjectSelectionOptions) => {
  const { enabled = true, selectionCssClass, onChange } = options
  const three = useThree()

  // useFrame(() => {
  //   const selectionBox = new SelectionBox(three.camera, three.scene)
  //   const allSelected = selectionBox.select()
  //   console.log('allSelected', allSelected)
  // })



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

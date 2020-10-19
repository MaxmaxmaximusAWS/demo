import React, { FC, useEffect, useState } from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const CameraControls: FC = () => {
  const three = useThree()
  const [controls, setControls] = useState<any>()

  useFrame(() => {
    controls['update']()
  })

  useEffect(() => {
    var controls = new OrbitControls(three.camera, three.gl.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableKeys = false
    // controls.enableZoom = false
    controls.rotateSpeed = 0.8

    setControls(controls)

    return () => {
      controls.dispose()
    }
  }, [three, three.camera])

  return null
}

export default CameraControls

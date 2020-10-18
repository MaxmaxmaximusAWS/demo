import React, { FC } from 'react'
import boxUrl from '../../blender/box.glb'
import { useGLTF } from '@react-three/drei/useGLTF'


const Box: FC = () => {
  const boxGLTF = useGLTF(boxUrl)

  return <primitive object={boxGLTF.scene} />
}

export default Box

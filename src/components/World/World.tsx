import React, { FC, Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import style from './World.scss'
import Scene from './Scene'

const World: FC = () => {

  return (
    <Canvas className={style.host} camera={{ position: [1, 1, 1] }}>
      <Suspense fallback={null}>
        <Scene/>
      </Suspense>
    </Canvas>
  )
}

export default World

import React, { FC } from 'react'
import styles from './SelectedSide.scss'
import * as THREE from 'three'

interface SelectedSideProps {
  side: THREE.Mesh
}

const SelectedSide: FC<SelectedSideProps> = ({ side }) => {
  const { name } = side.userData
  const color = `#` + side.material['color'].getHexString()

  return (
    <div className={styles.host} style={{ backgroundColor: color }}>
      <div>Имя: {name}</div>
      <div>Цвет: {color}</div>
    </div>
  )
}

export default SelectedSide

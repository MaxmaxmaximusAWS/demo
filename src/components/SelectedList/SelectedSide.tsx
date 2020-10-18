import React, { FC } from 'react'
import styles from './SelectedSide.scss'
import * as THREE from 'three'

interface SelectedSideProps {
  side: THREE.Mesh
}

const SelectedSide: FC<SelectedSideProps> = ({ side }) => {
  const { name } = side.userData
  const color = side.material['color'].getHexString()

  return (
    <div className={styles.host}>
      <div className={styles.info}>Имя: {name}</div>
      <div className={styles.info}>Цвет: #{color}</div>
    </div>
  )
}

export default SelectedSide

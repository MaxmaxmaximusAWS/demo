import React, { FC } from 'react'
import styles from './SelectedList.scss'
import SceneController from '../../controllers/SelectedController'
import { observer } from 'mobx-react-lite'
import SelectedSide from './SelectedSide'

const SelectedList: FC = () => {
  const { selectedSides } = SceneController

  return (
    <div className={styles.host}>
      {selectedSides.map((side) => (
        <SelectedSide key={side.uuid} side={side} />
      ))}
    </div>
  )
}

export default observer(SelectedList)
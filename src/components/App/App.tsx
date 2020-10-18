import styles from './App.scss'
import React, { FC } from 'react'
import World from '../World/World'
import SelectedList from '../SelectedList/SelectedList'

const App: FC = () => {
  return (
    <div className={styles.host}>
      <World />
      <SelectedList />
    </div>
  )
}

export default App

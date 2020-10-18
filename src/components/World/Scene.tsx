import React, { FC } from 'react'
import Light from './Light'
import Box from './Box'
import useKeyDown from '../../hooks/useKeyDown'
import useSingleObjectSelection from '../../hooks/useSingleObjectSelection'
import SelectedController from '../../controllers/SelectedController'
import useMultiObjectSelection from '../../hooks/useMultiObjectSelection'
import style from './World.scss'
import CameraControls from './CameraControls'

const Scene: FC = () => {
  const shift = useKeyDown('ShiftLeft')

  useSingleObjectSelection({
    enabled: !shift,
    onChange: (side) => {
      SelectedController.selectOrToggle(side)
    },
  })

  useMultiObjectSelection({
    enabled: shift,
    selectionCssClass: style.selection,
    onChange: (sides) => {
      SelectedController.setSelectedSides(sides)
    },
  })

  return (
    <>
      {!shift && <CameraControls />}
      <Light />
      <Box />
    </>
  )
}

export default Scene

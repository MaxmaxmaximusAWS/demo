import { makeAutoObservable } from 'mobx'
import * as THREE from 'three'

class SelectedController {
  selectedSides: THREE.Mesh[] = []
  orbitControlsEnabled: boolean = true

  constructor() {
    makeAutoObservable(this)
  }

  enableOrbitControls = () => {
    this.orbitControlsEnabled = true
  }

  disableOrbitControls = () => {
    this.orbitControlsEnabled = false
  }

  setSelectedSides = (sides) => {
    this.unselectAllSides()
    sides.forEach((side) => {
      this.selectSide(side)
    })
  }

  unselectAllSides = () => {
    this.selectedSides.slice().forEach((side) => {
      this.unselectSide(side)
    })
  }

  selectOneSide = (side) => {
    this.unselectAllSides()
    this.selectSide(side)
  }

  selectSide = (side) => {
    if (this.isSelected(side)) return
    side.material.emissive.set(0x555555)
    this.selectedSides = [...this.selectedSides, side]
  }

  unselectSide = (side) => {
    if (!this.isSelected(side)) return
    side.material.emissive.set(0x000000)
    this.selectedSides = this.selectedSides.filter(
      (selectedSide) => selectedSide !== side
    )
  }

  isSelected = (side) => {
    return this.selectedSides.includes(side)
  }

  selectOrToggle = (side) => {
    if (!side) {
      this.unselectAllSides()
    } else if (this.isSelected(side) && this.selectedSides.length === 1) {
      this.unselectSide(side)
      return
    } else {
      this.selectOneSide(side)
    }
  }

  toggleSlide = (side) => {
    if (this.isSelected(side)) {
      this.unselectSide(side)
    } else {
      this.selectSide(side)
    }
  }
}

export default new SelectedController()

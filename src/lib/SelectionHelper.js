import { Vector2 } from 'three'

export default class SelectionHelper {
  constructor(selectionBox, renderer, cssClassName) {
    this.element = document.createElement('div')
    this.element.classList.add(cssClassName)
    this.element.style.pointerEvents = 'none'

    this.renderer = renderer

    this.startPoint = new Vector2()
    this.pointTopLeft = new Vector2()
    this.pointBottomRight = new Vector2()

    this.isDown = false

    this.renderer.domElement.addEventListener('mousedown', this.onMouseDown)
    this.renderer.domElement.addEventListener('mousemove', this.onMouseMove)
    this.renderer.domElement.addEventListener('mouseup', this.onMouseUp)
  }

  destroy = () => {
    this.renderer.domElement.removeEventListener('mousedown', this.onMouseDown)
    this.renderer.domElement.removeEventListener('mousemove', this.onMouseMove)
    this.renderer.domElement.removeEventListener('mouseup', this.onMouseUp)
    this.removeHelperElement()
  }

  onMouseDown = (event) => {
    this.isDown = true
    this.onSelectStart(event)
  }

  onMouseMove = (event) => {
    if (this.isDown) {
      this.onSelectMove(event)
    }
  }

  onMouseUp = (event) => {
    this.isDown = false
    this.onSelectOver(event)
  }

  onSelectStart = (event) => {
    this.renderer.domElement.parentElement.appendChild(this.element)

    this.element.style.left = event.clientX + 'px'
    this.element.style.top = event.clientY + 'px'
    this.element.style.width = '0px'
    this.element.style.height = '0px'

    this.startPoint.x = event.clientX
    this.startPoint.y = event.clientY
  }

  onSelectMove = (event) => {
    this.pointBottomRight.x = Math.max(this.startPoint.x, event.clientX)
    this.pointBottomRight.y = Math.max(this.startPoint.y, event.clientY)
    this.pointTopLeft.x = Math.min(this.startPoint.x, event.clientX)
    this.pointTopLeft.y = Math.min(this.startPoint.y, event.clientY)

    this.element.style.left = this.pointTopLeft.x + 'px'
    this.element.style.top = this.pointTopLeft.y + 'px'
    this.element.style.width =
      this.pointBottomRight.x - this.pointTopLeft.x + 'px'
    this.element.style.height =
      this.pointBottomRight.y - this.pointTopLeft.y + 'px'
  }

  onSelectOver = () => {
    this.removeHelperElement()
  }

  removeHelperElement = () => {
    this.element.parentElement?.removeChild(this.element)
  }
}

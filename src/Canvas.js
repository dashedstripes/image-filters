class Canvas {
  constructor(width, height) {
    this.width = 640
    this.height = 480
    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d')
    this.canvas.width = width
    this.canvas.height = height
    document.body.appendChild(this.canvas)
  }
}

export default Canvas
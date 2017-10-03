import Canvas from './Canvas'
import ImageFilter from './ImageFilter'

const width = 640
const height = 480
const canvas = new Canvas(width, height)
const filter = new ImageFilter()
const image = new Image()

image.onload = function () {
  canvas.context.drawImage(this, 0, 0)
  let imageData = canvas.context.getImageData(0, 0, width, height)
  let filtered = filter.convolution(imageData, filter.sharpen)
  canvas.context.putImageData(filtered, 0, 0)
}
image.src = 'rose.jpg'
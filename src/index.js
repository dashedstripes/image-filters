import Canvas from './Canvas'
import ImageFilter from './ImageFilter'

const width = 450
const height = 450
const canvas = new Canvas(width, height)
const filter = new ImageFilter()
const image = new Image()

image.onload = function () {
  canvas.context.drawImage(this, 0, 0)
  let imageData = canvas.context.getImageData(0, 0, width, height)
  filter.grayscale(imageData)
  filter.sepia(imageData)
  filter.convolution(imageData, filter.gaussian)
  canvas.context.putImageData(imageData, 0, 0)
}
image.src = 'rose.jpg'

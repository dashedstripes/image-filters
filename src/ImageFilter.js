class ImageFilter {

  constructor() {
    this.none =
      [
        0, 0, 0,
        0, 1, 0,
        0, 0, 0
      ]

    this.sharpen =
      [
        -1, -1, -1,
        -1, 9, -1,
        -1, -1, -1
      ]

    this.blur =
      [
        0, 0, 2, 0, 0,
        0, 2, 2, 2, 0,
        2, 2, 2, 2, 2,
        0, 2, 2, 2, 0,
        0, 0, 2, 0, 0,
      ]

    this.gaussian =
      [
        2, 2, 2, 2, 2, 2, 2,
        2, 5, 5, 5, 5, 5, 2,
        2, 5, 7, 7, 7, 5, 2,
        2, 5, 7, 12, 7, 5, 2,
        2, 5, 7, 7, 7, 5, 2,
        2, 5, 5, 5, 5, 5, 2,
        2, 2, 2, 2, 2, 2, 2,
      ]

    this.motionBlur =
      [
        1, 0, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 0, 1,
      ]

    this.mean =
      [
        1, 1, 1,
        1, 1, 1,
        1, 1, 1
      ]
  }

  grayscale(imageData) {
    let data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      let avg = (data[i] + data[i + 1] + data[i + 2]) / 3
      data[i] = avg
      data[i + 1] = avg
      data[i + 2] = avg
    }

    return imageData
  }

  sepia(imageData) {
    let data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      data[i] += 112 / 2 % 255
      data[i + 1] += 66 / 2 % 255
      data[i + 2] += 20 / 2 % 255
    }

    return imageData
  }

  polaroid(imageData) {
    let data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      data[i] += 0 % 255
      data[i + 1] += 66 % 255
      data[i + 2] += 100 % 255
    }

    return imageData
  }

  outrun(imageData) {
    let data = imageData.data
    let width = imageData.width
    let height = imageData.height

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        data[(y * width + x) * 4] += (y / 3) % 255
        data[(y * width + x) * 4 + 1] += (x / 3) % 255
        data[(y * width + x) * 4 + 2] += (x / 3) % 255
      }
    }

    return imageData
  }

  convolution(imageData, filter) {
    let data = imageData.data
    let width = imageData.width
    let height = imageData.height

    let fl = Math.round(Math.sqrt(filter.length)) // Filter Length
    let tv = filter.reduce((prev, current) => prev + current, 0) // Sum of all values in filter

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {

        let r = 0; let g = 0; let b = 0;

        for (let fy = 0; fy < fl; fy++) {
          for (let fx = 0; fx < fl; fx++) {

            let ix = (x - Math.floor(fl / 2) + fx + width) % width // ImageX
            let iy = (y - Math.floor(fl / 2) + fy + height) % height // ImageY

            r += data[(iy * width + ix) * 4] * filter[fy * fl + fx] / tv
            g += data[(iy * width + ix) * 4 + 1] * filter[fy * fl + fx] / tv
            b += data[(iy * width + ix) * 4 + 2] * filter[fy * fl + fx] / tv

          }
        }

        data[(y * width + x) * 4] = r
        data[(y * width + x) * 4 + 1] = g
        data[(y * width + x) * 4 + 2] = b
      }
    }

    return imageData
  }

}

export default ImageFilter
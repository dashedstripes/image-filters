# Image Filters

A collection of low level image manipulation filters.

## Getting Started

Each method takes an ImageData object that can be obtained from 
```javascript 
context.getImageData()
```

### Available methods

```javascript

filter.grayscale(imageData) // Returns a grayscale version of the image

filter.outrun(imageData) // Returns a purple toned version

filter.convolution(imageData, filter.sharpen)
filter.convolution(imageData, filter.gaussian)
filter.convolution(imageData, filter.motionBlur)
filter.convolution(imageData, filter.edges)
filter.convolution(imageData, filter.emboss)
```

After returning the new imageData, you will be able to render it to the canvas with 

```javascript
canvas.context.putImageData(newImageData, 0, 0)
```

## Sources

Based on information found in this article: http://lodev.org/cgtutor/filtering.html
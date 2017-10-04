/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Canvas__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ImageFilter__ = __webpack_require__(3);



const width = 640;
const height = 480;
const canvas = new __WEBPACK_IMPORTED_MODULE_0__Canvas__["a" /* default */](width, height);
const filter = new __WEBPACK_IMPORTED_MODULE_1__ImageFilter__["a" /* default */]();
const image = new Image();

image.onload = function () {
  canvas.context.drawImage(this, 0, 0);
  let imageData = canvas.context.getImageData(0, 0, width, height);
  filter.grayscale(imageData);
  filter.sepia(imageData);
  filter.convolution(imageData, filter.gaussian);
  canvas.context.putImageData(imageData, 0, 0);
};
image.src = 'rose.jpg';

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Canvas {
  constructor(width, height) {
    this.width = 640;
    this.height = 480;
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = width;
    this.canvas.height = height;
    document.body.appendChild(this.canvas);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Canvas);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ImageFilter {

  constructor() {
    this.none = [0, 0, 0, 0, 1, 0, 0, 0, 0];

    this.sharpen = [-1, -1, -1, -1, 9, -1, -1, -1, -1];

    this.blur = [0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 0, 0, 2, 0, 0];

    this.gaussian = [2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 5, 2, 2, 5, 7, 7, 7, 5, 2, 2, 5, 7, 12, 7, 5, 2, 2, 5, 7, 7, 7, 5, 2, 2, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2];

    this.motionBlur = [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1];

    this.mean = [1, 1, 1, 1, 1, 1, 1, 1, 1];
  }

  grayscale(imageData) {
    let data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }

    return imageData;
  }

  sepia(imageData) {
    let data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      data[i] += 112 / 2 % 255;
      data[i + 1] += 66 / 2 % 255;
      data[i + 2] += 20 / 2 % 255;
    }

    return imageData;
  }

  polaroid(imageData) {
    let data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      data[i] += 0 % 255;
      data[i + 1] += 66 % 255;
      data[i + 2] += 100 % 255;
    }

    return imageData;
  }

  outrun(imageData) {
    let data = imageData.data;
    let width = imageData.width;
    let height = imageData.height;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        data[(y * width + x) * 4] += y / 3 % 255;
        data[(y * width + x) * 4 + 1] += x / 3 % 255;
        data[(y * width + x) * 4 + 2] += x / 3 % 255;
      }
    }

    return imageData;
  }

  convolution(imageData, filter) {
    let data = imageData.data;
    let width = imageData.width;
    let height = imageData.height;

    let fl = Math.round(Math.sqrt(filter.length)); // Filter Length
    let tv = filter.reduce((prev, current) => prev + current, 0); // Sum of all values in filter

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {

        let r = 0;let g = 0;let b = 0;

        for (let fy = 0; fy < fl; fy++) {
          for (let fx = 0; fx < fl; fx++) {

            let ix = (x - Math.floor(fl / 2) + fx + width) % width; // ImageX
            let iy = (y - Math.floor(fl / 2) + fy + height) % height; // ImageY

            r += data[(iy * width + ix) * 4] * filter[fy * fl + fx] / tv;
            g += data[(iy * width + ix) * 4 + 1] * filter[fy * fl + fx] / tv;
            b += data[(iy * width + ix) * 4 + 2] * filter[fy * fl + fx] / tv;
          }
        }

        data[(y * width + x) * 4] = r;
        data[(y * width + x) * 4 + 1] = g;
        data[(y * width + x) * 4 + 2] = b;
      }
    }

    return imageData;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (ImageFilter);

/***/ })
/******/ ]);
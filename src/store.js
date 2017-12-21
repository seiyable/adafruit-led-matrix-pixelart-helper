/* =================================================
 state
================================================== */
const state = {
  dimension: {width: 32, height: 32},
  pixels: null,
  selectedColorBit: 3,
  selectedColor: {r: 0, g: 0, b: 0},
  selectedBgColorValue: '#000000',
  drawingMode: 'one-by-one'
}

/* =================================================
 mutations
================================================== */
const mutations = {
  initPixels (state) {
    console.log('initializing pixels..')
    let row = new Array(state.dimension.width)
    let col = new Array(state.dimension.height)
    for (let i = 0; i < col.length; i++) {
      col[i] = row.slice()
    }

    for (let y = 0; y < col.length; y++) {
      for (let x = 0; x < row.length; x++) {
        let model = {
          x: x,
          y: y,
          color: {r: 0, g: 0, b: 0},
          bgColorValue: '#000000',
          isActive: false
        }
        col[y][x] = model
      }
    }

    state.pixels = col
  },
  updatePixel (state, {x, y, isActive}) {
    console.log('updating pixel', {x, y, isActive})
    if (x < 0 || x >= state.dimension.width || y < 0 || y >= state.dimension.height) return

    let pixel = state.pixels[y][x]
    pixel.isActive = isActive
    pixel.color.r = state.selectedColor.r
    pixel.color.g = state.selectedColor.g
    pixel.color.b = state.selectedColor.b
    pixel.bgColorValue = state.selectedBgColorValue
  },
  updateSelectedColorBit (state, {colorBit}) {
    state.selectedColorBit = colorBit
    state.selectedColor = {r: 0, g: 0, b: 0}
    state.selectedBgColorValue = '#000000'
  },
  updateSelectedColor (state, {r, g, b}) {
    if (r) state.selectedColor.r = r
    if (g) state.selectedColor.g = g
    if (b) state.selectedColor.b = b

    // update selected bg color value, too
    state.selectedBgColorValue =
      'rgb(' + getColor8bitValue(state.selectedColor.r) +
      ', ' + getColor8bitValue(state.selectedColor.g) +
      ', ' + getColor8bitValue(state.selectedColor.b) + ')'

    function getColor8bitValue (val) {
      return val * Math.pow(2, 8 - state.selectedColorBit)
    }
  },
  updateDrawingMode (state, {drawingMode}) {
    state.drawingMode = drawingMode
  }
}

/* =================================================
 actions
================================================== */
const actions = {
}

/* =================================================
 getters
================================================== */
const getters = {
  getActivePixels: (state) => {
    let activePixels = []
    for (let y = 0; y < state.dimension.height; y++) {
      for (let x = 0; x < state.dimension.width; x++) {
        let pixel = state.pixels[y][x]
        if (pixel.isActive) {
          activePixels.push(pixel)
        }
      }
    }
    return activePixels
  }
}

/* =================================================
 export
================================================== */
export default {
  state,
  mutations,
  actions,
  getters
}

/* =================================================
 state
================================================== */
const state = {
  dimension: {width: 32, height: 32},
  pixels: [],
  selectedColorBit: 3,
  selectedColor: {r: 0, g: 0, b: 0},
  drawingMode: 'one-by-one'
}

/* =================================================
 mutations
================================================== */
const mutations = {
  addSelectedPixels (state, {pixelToAdd}) {
    if (!state.pixels.includes(pixelToAdd)) {
      console.log('added', pixelToAdd)
      state.pixels.push(pixelToAdd)
    } else {
      console.log('already exist. could not add', pixelToAdd)
    }
  },
  removeSelectedPixels (state, {pixelToRemove}) {
    let indexToRemove = state.pixels.findIndex((element) => (pixelToRemove.x === element.x && pixelToRemove.y === element.y))
    if (indexToRemove >= 0) {
      console.log('removed', pixelToRemove)
      state.pixels.splice(indexToRemove, 1)
    } else {
      console.log('not exist. could not remove', pixelToRemove)
    }
  },
  updateSelectedColorBit (state, {colorBit}) {
    state.selectedColorBit = colorBit
    state.pixels = []
    state.selectedColor = {r: 0, g: 0, b: 0}
  },
  updateSelectedColor (state, {r, g, b}) {
    if (r) state.selectedColor.r = r
    if (g) state.selectedColor.g = g
    if (b) state.selectedColor.b = b
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

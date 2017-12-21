<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div class="color-config-wrapper">
    <h3>Color Config</h3>
    <div class="color-bit-wrapper">
      <input type="radio" id="three-bit" value="3" v-model.number="colorBit">
      <label for="three-bit">3-bit</label>
      <input type="radio" id="four-bit" value="4" v-model.number="colorBit">
      <label for="four-bit">4-bit</label>
      <span class="reset-warning">(switching will reset values)</span>
    </div>
    <table class="color-slider-container">
      <tr class="color-slider-row">
        <td>R: {{red}}</td><td><input v-model="red" type="range" :min="getMin" :max="getMax" value="0" class="slider"></td>
      </tr>
      <tr class="color-slider-row">
        <td>G: {{green}}</td><td><input v-model="green" type="range" :min="getMin" :max="getMax" value="0" class="slider"></td>
      </tr>
      <tr class="color-slider-row">
        <td>B: {{blue}}</td><td><input v-model="blue" type="range" :min="getMin" :max="getMax" value="0" class="slider"></td>
      </tr>
    </table>
    <div class="color-preview-wrapper">
      <div class="color-preview" :style="{'background-color': $store.state.selectedBgColorValue}"></div>
    </div>
    <h3>Drawing Mode</h3>
    <div class="drawing-option-wrapper">
      <div>
        <input type="radio" id="one-by-one" value="one-by-one" v-model="drawingMode">
        <label for="one-by-one">One by one</label>
      </div>
      <div>
        <input type="radio" id="keep-painting" value="keep-painting" v-model="drawingMode">
        <label for="keep-painting">Keep painting</label>
      </div>
      <div>
        <input type="radio" id="keep-painting-large" value="keep-painting-large" v-model="drawingMode">
        <label for="keep-painting-large">Keep painting large</label>
      </div>
      <div>
        <input type="radio" id="keep-erasing" value="keep-erasing" v-model="drawingMode">
        <label for="keep-erasing">Keep erasing</label>
      </div>
    </div>
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'left-side-bar',
  computed: {
    getMin () {
      return 0
    },
    getMax () {
      return Math.pow(2, this.colorBit) - 1
    },
    colorBit: {
      get () {
        return this.$store.state.selectedColorBit
      },
      set (val) {
        this.$store.commit('updateSelectedColorBit', {colorBit: val})
        this.$store.commit('initPixels')
      }
    },
    red: {
      get () {
        return this.$store.state.selectedColor.r
      },
      set (val) {
        this.$store.commit('updateSelectedColor', {r: val})
      }
    },
    green: {
      get () {
        return this.$store.state.selectedColor.g
      },
      set (val) {
        this.$store.commit('updateSelectedColor', {g: val})
      }
    },
    blue: {
      get () {
        return this.$store.state.selectedColor.b
      },
      set (val) {
        this.$store.commit('updateSelectedColor', {b: val})
      }
    },
    drawingMode: {
      get () {
        return this.$store.state.drawingMode
      },
      set (val) {
        this.$store.commit('updateDrawingMode', {drawingMode: val})
      }
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.color-config-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 450px;
  height: 100%;
  background-color: whitesmoke;
  padding: 20px;
}

h3 {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
  user-select: none;
}

.color-bit-wrapper {
  padding: 20px 0;
  text-align: center;
}

span.reset-warning {
  padding-left: 20px;
  color: red;
  font-size: 0.8em;
}

table.color-slider-container {
  margin: 0 auto;
}

.color-label {
  width: 40px;
}

input.slider {
  width: 200px;
  margin-left: 20px;
}

.color-slider-row {
  margin-top: 5px;
}

.color-preview-wrapper {
  width: 100%;
  padding: 50px 0;
}

.color-preview {
  width: 100px;
  height: 100px;
  border-style: solid;
  border-width: 1px;
  margin: 0 auto;
}
</style>

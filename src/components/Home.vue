<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div class="page-wrapper">
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
          <td>R: {{red}}</td><td><input v-model="red" type="range" min="0" :max="getMax" value="0" class="slider"></td>
        </tr>
        <tr class="color-slider-row">
          <td>G: {{green}}</td><td><input v-model="green" type="range" min="0" :max="getMax" value="0" class="slider"></td>
        </tr>
        <tr class="color-slider-row">
          <td>B: {{blue}}</td><td><input v-model="blue" type="range" min="0" :max="getMax" value="0" class="slider"></td>
        </tr>
      </table>
      <div class="color-preview-wrapper">
        <div class="color-preview" :style="{'background-color': getColorPreviewBgColor}"></div>
      </div>
    </div>
    <div class="pixel-container">
      <div v-for="y in 32" class="pixel-row">
        <pixel
          v-for="x in 32"
          :key="y + '-' + x"
          :x="x - 1"
          :y="y - 1"
          :selected-color="{red, green, blue}"
          :selected-bg-color="getColorPreviewBgColor"
          :selected-bit="colorBit"
          @added="addSelectedPixels"
          @removed="removeSelectedPixels"
          />
      </div>
    </div>
    <ul class="selected-pixel-list-container">
      <h3>Generated Code</h3>
      <li v-for="p in selectedPixels" class="selected-pixel">
        matrix.drawPixel( {{p.x}}, {{p.y}}, {{getMatrixColorText + '(' + p.color.red + ', ' + p.color.green + ', ' + p.color.blue + ')'}} );
      </li>
    </ul>
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import Pixel from '@/components/Pixel.vue'
export default {
  name: 'home',
  data () {
    return {
      selectedPixels: [],
      colorBit: 3,
      red: 0,
      green: 0,
      blue: 0
    }
  },
  components: {
    Pixel
  },
  watch: {
    colorBit (val) {
      this.resetValues()
    }
  },
  computed: {
    getMax () {
      return Math.pow(2, this.colorBit) - 1
    },
    getColorPreviewBgColor () {
      return 'rgb(' + this.getColor8bitValue(this.red) + ', ' + this.getColor8bitValue(this.green) + ', ' + this.getColor8bitValue(this.blue) + ')'
    },
    getMatrixColorText () {
      let funcName = (this.colorBit === 3) ? 'Color333' : 'Color444'
      return 'matrix.' + funcName
    }
  },
  methods: {
    getColor8bitValue (val) {
      return val * Math.pow(2, 8 - this.colorBit)
    },
    resetValues () {
      this.selectedPixels = []
      this.red = 0
      this.green = 0
      this.blue = 0
    },
    addSelectedPixels (pixelToAdd) {
      if (!this.selectedPixels.includes(pixelToAdd)) {
        console.log('added', pixelToAdd)
        this.selectedPixels.push(pixelToAdd)
      } else {
        console.log('already exist. could not add', pixelToAdd)
      }
    },
    removeSelectedPixels (pixelToRemove) {
      let indexToRemove = this.selectedPixels.find((element, index, array) => {
        if (pixelToRemove.x === element.x && pixelToRemove.y === element.y) {
          return index
        } else {
          return false
        }
      })
      if (indexToRemove) {
        console.log('removed', pixelToRemove)
        this.selectedPixels.splice(indexToRemove, 1)
      } else {
        console.log('not exist. could not remove', pixelToRemove)
      }
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.page-wrapper {
  height: 100%;
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

.pixel-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.selected-pixel-list-container {
  position: fixed;
  right: 0;
  top: 0;
  width: 400px;
  height: 100%;
  background-color: whitesmoke;
  padding: 20px;
  overflow-y: scroll;
  user-select: text;
}

.selected-pixel {
  margin-top: 5px;
  list-style-type: square;
  list-style-position: inside;
}

.color-config-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 400px;
  height: 100%;
  background-color: whitesmoke;
  padding: 20px;
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
  padding-top: 50px;
}

.color-preview {
  width: 100px;
  height: 100px;
  border-style: solid;
  border-width: 1px;
  margin: 0 auto;
}

</style>

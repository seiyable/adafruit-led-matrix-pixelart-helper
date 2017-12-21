<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div class="selected-pixel-list-container">
    <h3>Generated Code</h3>
    <ul>
      <li v-for="p in $store.getters.getActivePixels" class="selected-pixel">
        matrix.drawPixel( {{p.x}}, {{p.y}}, {{getMatrixColorText + '(' + p.color.r + ', ' + p.color.g + ', ' + p.color.b + ')'}} );
      </li>
    </ul>
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'right-side-bar',
  computed: {
    getMatrixColorText () {
      let funcName = (this.$store.state.selectedColorBit === 3) ? 'Color333' : 'Color444'
      return 'matrix.' + funcName
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.selected-pixel-list-container {
  position: fixed;
  right: 0;
  top: 0;
  width: 450px;
  height: 100%;
  background-color: whitesmoke;
  padding: 20px;
  overflow-y: scroll;
  user-select: text;
}

h3 {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
  user-select: none;
}

.selected-pixel {
  margin-top: 5px;
  list-style-type: square;
  list-style-position: inside;
}
</style>

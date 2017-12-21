<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div class="pixel" :style="{'background-color': getBgColor}" @click="toggle()" @mouseover="hover($event)">
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'pixel',
  props: {
    x: Number,
    y: Number,
    bgColorValue: String,
    isActive: Boolean
  },
  computed: {
    getBgColor () {
      return this.isActive ? this.bgColorValue : 'darkgrey'
    }
  },
  methods: {
    toggle () {
      if (this.$store.state.drawingMode === 'one-by-one') {
        this.$store.commit('updatePixel', {x: this.x, y: this.y, isActive: !this.isActive})
      }
    },
    hover (e) {
      if (e.buttons !== 1) return

      switch (this.$store.state.drawingMode) {
        case 'keep-painting':
          this.$store.commit('updatePixel', {x: this.x, y: this.y, isActive: true})
          break
        case 'keep-painting-large':
          this.$store.commit('updatePixel', {x: this.x, y: this.y, isActive: true})
          this.$store.commit('updatePixel', {x: this.x, y: this.y - 1, isActive: true})
          this.$store.commit('updatePixel', {x: this.x, y: this.y + 1, isActive: true})
          this.$store.commit('updatePixel', {x: this.x - 1, y: this.y - 1, isActive: true})
          this.$store.commit('updatePixel', {x: this.x - 1, y: this.y, isActive: true})
          this.$store.commit('updatePixel', {x: this.x - 1, y: this.y + 1, isActive: true})
          this.$store.commit('updatePixel', {x: this.x + 1, y: this.y - 1, isActive: true})
          this.$store.commit('updatePixel', {x: this.x + 1, y: this.y, isActive: true})
          this.$store.commit('updatePixel', {x: this.x + 1, y: this.y + 1, isActive: true})
          break
        case 'keep-erasing':
          if (this.isActive) {
            this.$store.commit('updatePixel', {x: this.x, y: this.y, isActive: false})
          }
          break
      }
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.pixel {
  width: 20px;
  height: 20px;
  float: left;
  border-width: 1px;
  border-style: dashed;
}
</style>

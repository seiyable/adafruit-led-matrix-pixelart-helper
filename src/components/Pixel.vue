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
    y: Number
  },
  data () {
    return {
      isActive: false,
      color: {},
      bgColor: ''
    }
  },
  watch: {
    selectedBit (val) {
      this.resetValues()
    }
  },
  computed: {
    getBgColor () {
      return this.isActive ? this.bgColor : 'darkgrey'
    }
  },
  methods: {
    toggle () {
      if (this.$store.state.drawingMode === 'one-by-one') {
        this.isActive = !this.isActive
        if (this.isActive) {
          this.addToList()
        } else {
          this.removeFromList()
        }
      }
    },
    hover (e) {
      if (e.buttons !== 1) return

      if (this.$store.state.drawingMode === 'keep-painting') {
        if (!this.isActive) {
          this.isActive = true
          this.addToList()
        }
      } else if (this.$store.state.drawingMode === 'keep-erasing') {
        if (this.isActive) {
          this.isActive = false
          this.removeFromList()
        }
      }
    },
    addToList () {
      this.color = this.$store.state.selectedColor
      this.bgColor = this.$store.state.selectedBgColor
      this.$emit('added', {x: this.x, y: this.y, color: this.color})
    },
    removeFromList () {
      this.$emit('removed', {x: this.x, y: this.y})
    },
    resetValues () {
      this.isActive = false
      this.color = {}
      this.bgColor = ''
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

<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div class="pixel" :style="{'background-color': getBgColor}" @click="toggle()" >
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
    selectedColor: Object,
    selectedBgColor: String,
    selectedBit: Number
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
      // if (e.buttons === 1) {
      this.isActive = !this.isActive
      if (this.isActive) {
        this.color = this.selectedColor
        this.bgColor = this.selectedBgColor
        this.$emit('added', {x: this.x, y: this.y, color: this.color})
      } else {
        this.$emit('removed', {x: this.x, y: this.y})
      }
      // }
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

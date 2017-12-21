<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div class="page-wrapper">
    <left-side-bar/>
    <div class="pixel-container">
      <div v-for="row in $store.state.pixels" class="pixel-row">
        <pixel
          v-for="pixel in row"
          :key="pixel.x + '-' + pixel.y"
          :x="pixel.x"
          :y="pixel.y"
          :bgColorValue="pixel.bgColorValue"
          :isActive="pixel.isActive"
          />
      </div>
    </div>
    <right-side-bar />
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import LeftSideBar from '@/components/LeftSidebar.vue'
import RightSideBar from '@/components/RightSidebar.vue'
import Pixel from '@/components/Pixel.vue'
export default {
  name: 'home',
  components: {
    LeftSideBar, RightSideBar, Pixel
  },
  created () {
    this.$store.commit('initPixels')
  },
  computed: {
    pixels () {
      return this.$store.state.pixels
    }
  },
  methods: {
    getPixelBgColorValue (x, y) {
      let pixel = this.pixels[y][x]
      console.log('get pixel bg in home', pixel)
      return pixel.bgColorValue
    },
    getPixelIsActive (x, y) {
      let pixel = this.pixels[y][x]
      console.log('get pixel active in home', pixel)
      return pixel.isActive
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

.pixel-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>

<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div class="page-wrapper">
    <left-side-bar/>
    <div class="pixel-container">
      <div v-for="y in $store.state.dimension.height" class="pixel-row">
        <pixel
          v-for="x in $store.state.dimension.width"
          :key="y + '-' + x"
          :x="x - 1"
          :y="y - 1"
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

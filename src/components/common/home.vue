<template>
  <div class="home">
    <div class="container" ref="container">
      <v-header></v-header>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
import vHeader from './header.vue'
import vFooter from './footer.vue'
export default {
  components: {
    vHeader,
    vFooter
  },
  mounted: function() {
    this.$nextTick(function() {
      this.$refs.container.style.minHeight = document.documentElement.clientHeight - 60 + 'px';
    })
  }
}

</script>
<style scoped>


</style>

<template>
  <div id="layout">
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
import Lenis from "@studio-freight/lenis";
export default {
  data() {
    return {
      lenis: null,
    };
  },
  mounted() {
    this.$nuxt.$on("scrollTop", this.scrollTop);

    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      smoothTouch: true,
    });

    this.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  },

  methods: {
    scrollTop() {
      this.lenis.scrollTo(0);
    },
  },
};
</script>

<style lang="scss" scoped>
#layout {
  position: relative;
  overflow-x: hidden;
}
</style>

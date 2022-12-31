<template>
  <div id="layout">
    <custom-cursor />
    <navbar />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import CustomCursor from '../components/CustomCursor.vue';
import Footer from '../components/Footer.vue';
export default {
  name: 'DefaultLayout',
  components: { CustomCursor, Footer },
  data() {
    return {
      lenis: null,
    };
  },
  mounted() {
    this.$nuxt.$on('scrollTop', this.scrollTop);

    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      smoothTouch: false,
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
    enter() {
      const tl = gsap.timeline();
      tl.to(
        this.$refs.overlay,
        {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.in',
        },
        0,
      );
      tl.set(this.$refs.overlay, { display: 'none' });
    },
  },
};
</script>

<style lang="scss" scoped>
#layout {
  padding-bottom: 100px;
}
</style>

<template>
  <div id="layout">
    <div ref="overlay" class="introduction-overlay">
      <div class="overlay-content">
        <p class="fs-intro">
          Bienvenue sur revolution-bas-rhin.fr, un blog qui essaye de relater les évènements militaires qui se sont déroulés durant la
          période de la Révolution Française et du 1er Empire dans le département du Bas-Rhin. Il se subdivise en plusieurs grandes parties
          présentant le fruit de plusieurs années de recherche.
        </p>
        <button class="fs-cta" @click="enter">Entrer</button>
      </div>
    </div>
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
export default {
  name: 'DefaultLayout',
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
  position: relative;
  // overflow-x: hidden;

  .introduction-overlay {
    position: absolute;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    background: $black;
    border: 5px solid $white;

    .overlay-content {
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -60%);

      p {
        width: 80vw;
      }

      button {
        border: 2px solid $white;
        padding: 10px 20px;
        margin-top: 40px;
        color: $white;
      }
    }
  }
}
</style>

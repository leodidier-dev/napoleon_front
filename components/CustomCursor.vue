<template>
  <div id="cursor" ref="cursor">
    <BeeSVG />
  </div>
</template>

<script>
import { gsap } from 'gsap';
import BeeSVG from '../components/BeeSVG.vue';

export default {
  components: { BeeSVG },
  data() {
    return {
      lastX: 0,
      lastY: 0,
      triggers: [],
      svg: null,
    };
  },

  watch: {
    $route() {
      // setTimeout(() => {
      //   this.routeLoaded();
      // }, 2);
    },
  },
  mounted() {
    this.svg = this.$refs.cursor.querySelector('svg');
    gsap.set(this.$refs.cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(this.$refs.cursor, 'x', { duration: 0.7, ease: 'sine' });
    const yTo = gsap.quickTo(this.$refs.cursor, 'y', { duration: 0.7, ease: 'sine' });
    const rotateTo = gsap.quickTo(this.$refs.cursor, 'rotation', { duration: 0.4, ease: 'sine' });

    window.addEventListener('mousemove', (e) => {
      xTo(e.clientX);
      yTo(e.clientY);

      if (this.lastX < e.clientX && this.lastY < e.clientY) rotateTo(135); // droite bas
      else if (this.lastX < e.clientX && this.lastY > e.clientY) rotateTo(45); // droite haut
      else if (this.lastX > e.clientX && this.lastY < e.clientY) rotateTo(225); // gauche bas
      else if (this.lastX > e.clientX && this.lastY > e.clientY) rotateTo(315); // gauche haut

      this.lastX = e.clientX;
      this.lastY = e.clientY;
    });

    this.$router.onReady(() => this.routeLoaded());
  },

  methods: {
    onEnter() {
      this.svg.style.transform = 'scale(0)';
    },

    onLeave() {
      this.svg.style.transform = 'scale(1)';
    },

    routeLoaded() {
      this.triggers = [...document.querySelectorAll('[data-cursor]')];
      this.triggers.forEach((trigger) => trigger.addEventListener('mouseenter', this.onEnter));
      this.triggers.forEach((trigger) => trigger.addEventListener('mouseleave', this.onLeave));
      console.log(this.triggers);
    },
  },
};
</script>

<style lang="scss">
#cursor {
  width: 18px;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;

  svg {
    width: 100%;
    height: auto;

    #right-wing {
      animation: 0.1s linear infinite alternate rightWing;
      transform-origin: 50%;

      @keyframes rightWing {
        from {
          transform: rotate(20deg);
        }
        to {
          transform: rotate(-90deg);
        }
      }
    }

    #left-wing {
      animation: 0.1s linear infinite alternate leftWing;
      transform-origin: 50%;

      @keyframes leftWing {
        from {
          transform: rotate(-20deg);
        }
        to {
          transform: rotate(90deg);
        }
      }
    }
  }
}
</style>

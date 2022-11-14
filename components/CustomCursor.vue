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
  mounted() {
    this.svg = this.$refs.cursor.querySelector('svg');
    gsap.set(this.$refs.cursor, { xPercent: -80, yPercent: -80 });

    const xTo = gsap.quickTo(this.$refs.cursor, 'x', { duration: 0.7, ease: 'sine' });
    const yTo = gsap.quickTo(this.$refs.cursor, 'y', { duration: 0.7, ease: 'sine' });
    const rotateTo = gsap.quickTo(this.$refs.cursor, 'rotation', { duration: 0.4, ease: 'sine' });

    window.addEventListener('mousemove', (e) => {
      xTo(e.pageX);
      yTo(e.pageY);

      if (this.lastX < e.pageX && this.lastY < e.pageY) rotateTo(135); // droite bas
      else if (this.lastX < e.pageX && this.lastY > e.pageY) rotateTo(45); // droite haut
      else if (this.lastX > e.pageX && this.lastY < e.pageY) rotateTo(225); // gauche bas
      else if (this.lastX > e.pageX && this.lastY > e.pageY) rotateTo(315); // gauche haut

      this.lastX = e.pageX;
      this.lastY = e.pageY;
    });

    this.triggers = [...document.querySelectorAll('[data-cursor]')];

    this.triggers.forEach((trigger) => trigger.addEventListener('mouseenter', this.onEnter));
    this.triggers.forEach((trigger) => trigger.addEventListener('mouseleave', this.onLeave));
  },

  methods: {
    onEnter() {
      this.svg.style.transform = 'scale(0)';
    },

    onLeave() {
      this.svg.style.transform = 'scale(1)';
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

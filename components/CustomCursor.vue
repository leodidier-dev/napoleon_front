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
      const tl = gsap.timeline();
      tl.to(this.svg, { scale: '4', repeat: -1, duration: 0.4 });
    },

    onLeave() {
      this.svg.style.transform = 'scale(1)';
    },
  },
};
</script>

<style lang="scss">
#cursor {
  width: 25px;
  z-index: 1000;
  height: 25px;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;

  svg {
    width: 100%;
    height: auto;
  }
}
</style>

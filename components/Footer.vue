<template>
  <footer class="footer fs-caption black">©Alain KLEIN</footer>
</template>

<script>
export default {
  name: 'FooterComp',
};
</script>

<style lang="scss" scoped>
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 2px solid $black;
  padding: 14px 0;
  text-align: center;
  max-width: 1920px;
}
</style>

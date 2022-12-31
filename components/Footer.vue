<template>
  <footer class="footer fs-caption black">
    <span class="copyright">©Alain KLEIN</span>
    <a href="mailto:contact@revolution-empire-67.fr" class="contact fs-caption black">Me contacter<MailSVG /></a>
  </footer>
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

  .copyright {
    @include mobile-only {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .contact {
    display: flex;
    align-items: center;
    column-gap: 8px;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);

    @include hover {
      svg {
        transform: translateX(2px);
      }
    }
  }
}
</style>

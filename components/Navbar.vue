<template>
  <div class="header">
    <div class="top">
      <h3 class="date fs-date">{{ currentDate }}</h3>
    </div>
    <nav>
      <ul class="menu">
        <li class="item"></li>
        <li v-for="parent in parents" :key="parent.id" class="item" data-cursor>
          <nuxt-link :to="`/categorie/${parent.attributes.slug}`">
            {{ parent.attributes.name }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavbarComp',
};
</script>

<style lang="scss" scoped>
$height: 100px;

.header {
  position: relative;

  .top {
    display: flex;
    position: relative;

    .sitename {
      width: 100%;
      padding: 60px 10%;
      text-align: center;
      background: $red;
      color: $white;
      text-transform: uppercase;
    }

    .date {
      position: absolute;
      right: 10px;
      bottom: 12px;
      color: $white;
    }
  }
}

nav {
  .menu {
    border-top: 2px solid $white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    row-gap: 10px;
    align-items: center;
    text-align: center;
    border-bottom: 2px solid $black;

    @include mobile-large {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      margin-left: auto;
      padding: 16px 44px;
    }

    @include tablet {
      padding: 20px 24px;
      width: fit-content;
      column-gap: 40px;
      justify-content: start;
    }

    li,
    a {
      color: $black;
      display: inline;
      @include thunder-semi-bold;
      font-size: 26rem;
      letter-spacing: 0.05em;
      position: relative;
      text-transform: uppercase;
      max-width: 250px;

      @include tablet {
        max-width: none;
        font-size: 28rem;
      }
    }

    .item {
      a {
        &:before {
          content: '';
          position: absolute;
          z-index: 3;
          bottom: -8px;
          width: 100%;
          height: 2px;
          background-color: $black;
          transform: scale(0);
          transition: transform 0.4s ease-out;
        }
      }

      @include hover {
        a {
          &:before {
            transform: scale(1);
          }
        }
      }
    }
  }
}
</style>

<template>
  <nav>
    <nuxt-link to="/" class="fs-nav-title"
      >Premier empire dans le Bas-Rhin</nuxt-link
    >
    <ul class="menu">
      <li class="item">
        <nuxt-link to="/about"> A propos </nuxt-link>
      </li>
      <li v-for="parent in parents" :key="parent.id" class="item">
        <button>{{ parent.attributes.name }}</button>
        <ul class="dropdown">
          <li
            v-for="child in childs(parent.attributes)"
            :key="child.attributes.slug"
          >
            <nuxt-link :to="`/article/${child.attributes.slug}`">
              {{ child.attributes.title }}
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
    <div class="burger-cta" ref="burgerCta" @click="toggleMbMenu">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="mb-menu" ref="mbMenu">
      <ul>
        <li class="fs-li-menu-mb">
          <nuxt-link to="/about"> A propos </nuxt-link>
        </li>
        <li
          v-for="parent in parents"
          :key="parent.id"
          class="fs-sub-li-menu-mb parent-li-mb"
        >
          {{ parent.attributes.name }}
          <ul>
            <li
              v-for="child in childs(parent.attributes)"
              :key="child.attributes.slug"
              class="fs-li-menu-mb"
            >
              <nuxt-link :to="`article/${child.attributes.slug}`">
                {{ child.attributes.title }}
              </nuxt-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import getCategories from "~/graphql/getCategories";
export default {
  name: "Navbar",
  data() {
    return {
      categories: {},
    };
  },
  apollo: {
    categories: {
      prefetch: true,
      query: getCategories,
    },
  },
  computed: {
    parents() {
      return this.categories.data;
    },
    childs() {
      return (parent) => parent.articles.data;
    },
  },

  mounted() {},

  methods: {
    toggleMbMenu() {
      this.$refs.burgerCta.classList.toggle("open");
      this.$refs.mbMenu.classList.toggle("open");
    },
  },
};
</script>

<style lang="scss" scoped>
$height: 100px;
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 24px;
  box-shadow: 15px 0.5px 1px rgba($black, 1);

  .menu {
    display: none;

    @include tablet {
      display: flex;
      column-gap: 20px;
    }

    li,
    button {
      color: $black;
      display: inline;
      @include thunder-semi-bold;
      font-size: 20rem;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      position: relative;
    }

    .item {
      button {
        &:before {
          content: "";
          position: absolute;
          z-index: 3;
          bottom: -8px;
          width: 100%;
          height: 1px;
          background-color: $gold;
          transform: scale(0);
          transition: transform 0.4s ease-out;
        }
      }

      .dropdown {
        overflow: hidden;
        position: absolute;
        right: -10px;
        top: 100%;
        z-index: 1;
        opacity: 0;
        transform: translate(-10px, 10px);
        min-width: 100px;
        background: $white;
        transition: all 0.2s ease-in;
        padding-bottom: 6px;

        li {
          display: block;
          padding: 6px 10px;

          &:first-of-type {
            padding-top: 30px;
          }
        }
      }

      &:hover {
        button {
          &:before {
            transform: scale(1);
          }
        }

        .dropdown {
          opacity: 1;
          transform: translate(0, 0);
          z-index: 2;
          transition: all 0.4s ease-out;
        }
      }
    }
  }

  .burger-cta {
    align-self: center;
    cursor: pointer;
    position: relative;
    width: 40px;
    height: 23px;
    transform: rotate(0deg);
    transition: 0.4s ease-in-out;

    span {
      display: block;
      position: absolute;
      height: 3px;
      width: 100%;
      background: $black;
      border-radius: 9px;
      opacity: 1;
      left: 0;
      transform: rotate(0deg);
      transition: 0.4s ease-in-out;

      &:nth-child(1) {
        top: 0px;
      }
      &:nth-child(2),
      &:nth-child(3) {
        top: 10px;
      }
      &:nth-child(4) {
        top: 20px;
      }
    }

    &.open {
      span {
        &:nth-child(1) {
          top: 10px;
          width: 0;
          left: 50%;
        }
        &:nth-child(2) {
          transform: rotate(45deg);
        }
        &:nth-child(3) {
          transform: rotate(-45deg);
        }
        &:nth-child(4) {
          top: 10px;
          width: 0;
          left: 50%;
        }
      }
    }
    @include tablet {
      display: none;
    }
  }

  .mb-menu {
    padding: 32px 32px 68px 32px;
    transform: translateX(100%);
    height: calc(100vh - 62px);
    width: 100vw;
    position: absolute;
    inset: 62px 0 0 0;
    z-index: 99;
    background-color: $white;
    transition: transform 0.2s ease-in;

    &.open {
      transform: translateX(0);
      transition: transform 0.4s ease-out;
    }

    ul {
      text-align: center;
      row-gap: 40px;
      display: flex;
      flex-direction: column;

      .parent-li-mb {
        ul {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="header">
    <div class="top">
      <nuxt-link to="/" class="sitename fs-sitename">Les militaires du Bas-Rhin sous la Révolution et le Premier Empire</nuxt-link>
      <h3 class="date fs-date">{{ currentDate }}</h3>
    </div>
    <nav>
      <ul class="menu">
        <li class="item">
          <nuxt-link to="/a-propos" data-cursor> A propos </nuxt-link>
        </li>
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
import getCategories from '~/graphql/getCategories';
export default {
  name: 'NavbarComp',
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
    currentDate() {
      const mois = [
        'janvier',
        'février',
        'mars',
        'avril',
        'mai',
        'juin',
        'juillet',
        'août',
        'septembre',
        'octobre',
        'novembre',
        'décembre',
      ];

      const today = new Date();
      const year = today.getFullYear();
      const dayNumber = today.getDate();
      const month = mois[today.getMonth()];
      const weekday = today.toLocaleDateString('fr-FR', { weekday: 'long' });
      const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('').toLowerCase();
      const aujourdhui = `${capitalize(weekday)}, le ${dayNumber} ${month} ${year}`;

      return aujourdhui;
    },
  },

  mounted() {},

  methods: {
    toggleMbMenu() {
      this.$refs.burgerCta.classList.toggle('open');
      this.$refs.mbMenu.classList.toggle('open');
    },
  },
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

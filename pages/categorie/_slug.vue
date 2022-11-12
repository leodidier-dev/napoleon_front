<template>
  <section id="category" class="page">
    <h1 class="fs-article-category">Catégorie</h1>
    <div class="types">
      <button
        v-for="(type, index) in types"
        ref="typeCta"
        :key="index"
        class="fs-article-title type"
        :class="index === 0 ? 'selected-type' : ''"
        @click="updateSelectedTypes(type, index)"
      >
        {{ type }}
      </button>
    </div>
    <ul>
      <li v-for="article in filteredArticles" :key="article.id" class="fs-cta black">
        <nuxt-link :to="`/article/${article.attributes.slug}`">{{ article.attributes.title }}</nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import getArticlesByCat from '~/graphql/getArticlesByCat';
export default {
  async asyncData({ app, params }) {
    const client = app.apolloProvider.defaultClient;
    const { slug } = params;

    const res = await client.query({
      query: getArticlesByCat,
      variables: {
        slug,
      },
    });

    const { articles } = res.data;

    return {
      articles,
    };
  },

  data() {
    return {
      selectedTypes: [],
    };
  },

  computed: {
    types() {
      const types = this.articles.data.map((el) => {
        return el.attributes.type.data.attributes.name;
      });
      return [...new Set(types)];
    },
    filteredArticles() {
      return this.articles.data.filter((el) => {
        return this.selectedTypes.includes(el.attributes.type.data.attributes.name);
      });
    },
  },

  mounted() {
    this.selectedTypes = [...this.types];
    this.selectedTypes.length = 1;
  },

  methods: {
    updateSelectedTypes(type, index) {
      this.$refs.typeCta[index].classList.toggle('selected-type');
      const currIndex = this.selectedTypes.indexOf(type);
      if (currIndex === -1) this.selectedTypes.push(type);
      else this.selectedTypes.splice(currIndex, 1);
    },
  },
};
</script>

<style lang="scss">
#category {
  color: $black;
  width: 80%;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  padding-bottom: 200px;

  .types {
    margin-top: 10px;
    display: flex;
    column-gap: 40px;

    .type {
      font-size: 80rem;
      &:not(.selected-type) {
        opacity: 0.4;
      }
    }
  }

  ul {
    margin-top: 30px;

    li {
      font-size: 36rem;
      position: relative;
      list-style: inside;
      width: fit-content;
      margin-bottom: 16px;

      &:before {
        content: '';
        position: absolute;
        z-index: 3;
        bottom: -2px;
        width: calc(100% - 39px);
        height: 1px;
        background-color: $black;
        transform: scale(0);
        transition: transform 0.4s ease-out;
      }

      @include hover {
        &:before {
          transform: scale(1);
        }
      }
    }
  }
}
</style>

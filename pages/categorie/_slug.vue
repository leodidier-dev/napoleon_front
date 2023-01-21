<template>
  <section id="category" class="page">
    <h1 v-if="articles.data.length > 0" class="fs-article-category">{{ category }}</h1>
    <div class="types">
      <button
        v-for="(type, index) in types"
        ref="typeCta"
        :key="index"
        class="type"
        :class="index === 0 ? 'selected-type' : ''"
        @click="updateSelectedTypes(type, index)"
      >
        {{ type }}
      </button>
    </div>
    <ul v-if="articles">
      <li v-for="article in filteredArticles" :key="article.attributes.slug" class="fs-cta black">
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

  head() {
    return {
      title: 'Révolution Empire 67 - ' + this.category,
    };
  },

  computed: {
    category() {
      return this.articles.data[0] ? this.articles.data[0].attributes.category.data.attributes.name : "Pas d'articles";
    },
    types() {
      const types = this.articles.data.map((el) => {
        return el.attributes.type.data ? el.attributes.type.data.attributes.name : '';
      });
      return [...new Set(types)];
    },
    filteredArticles() {
      return this.articles.data.filter((el) => {
        return el.attributes.type.data ? this.selectedTypes.includes(el.attributes.type.data.attributes.name) : el;
      });
    },
  },

  mounted() {
    if (this.types) {
      this.selectedTypes = [...this.types];
      this.selectedTypes.length = 1;
    }
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
  min-height: 100vh;

  .types {
    margin-top: 16px;
    display: flex;
    column-gap: 40px;
    flex-wrap: wrap;

    .type {
      font-size: 80rem;
      transition: transform 0.4s ease, opacity 0.4s ease;
      @include thunder-bold;
      font-size: 40rem;
      letter-spacing: 0;
      text-transform: uppercase;
      color: #a81b1c;
      margin-top: 8px;
      width: 100%;
      text-align: start;

      @include tablet {
        width: auto;
        font-size: 80rem;
      }

      @include desktop {
        font-size: 50rem;
      }

      &:not(.selected-type) {
        opacity: 0.4;
      }

      @include hover {
        opacity: 0.4;
        transform: translate(2px, 2px);

        &:not(.selected-type) {
          opacity: 1;
        }
      }
    }
  }

  ul {
    margin-top: 30px;
    padding: 0;

    li {
      font-size: 30rem;
      margin-bottom: 16px;
      transition: transform 0.4s ease-out;
      text-transform: initial;

      @include hover {
        transform: translateX(2px);
      }

      a {
        display: block;
      }
    }
  }
}
</style>

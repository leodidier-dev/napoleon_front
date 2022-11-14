<template>
  <section id="article-content" ref="articleW" class="page">
    <h2 class="fs-article-category">{{ category }}</h2>
    <h1 class="fs-article-title">{{ title }}</h1>
    <button @click="scrollTop">
      <img src="~/assets/icons/up-arrow.svg" alt="" />
      <span class="fs-caption">Retour en haut</span>
    </button>
  </section>
</template>

<script>
import getArticle from '~/graphql/getArticle';
export default {
  async asyncData({ app, params }) {
    const client = app.apolloProvider.defaultClient;
    const { slug } = params;

    const res = await client.query({
      query: getArticle,
      variables: {
        slug,
      },
    });

    const { articles } = res.data;

    return {
      articles,
    };
  },
  computed: {
    category() {
      return this.articles.data[0].attributes.category.data.attributes.name;
    },
    title() {
      return this.articles.data[0].attributes.title;
    },
    content() {
      return this.articles.data[0].attributes.content;
    },
  },

  mounted() {
    const formattedContent = this.content.replaceAll('/uploads/', process.env.API_STORAGE);
    const htmlContent = this.convertStringToHTML(`<section class="content">${formattedContent}</section>`);
    this.$refs.articleW.append(htmlContent);
  },

  methods: {
    convertStringToHTML(content) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      return doc.body.firstChild;
    },
    scrollTop() {
      this.$nuxt.$emit('scrollTop');
    },
  },
};
</script>

<style lang="scss">
#article-content {
  color: $black;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  padding-bottom: 200px;

  button {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: absolute;
    bottom: 40px;
    width: 120px;
    left: 50%;
    transform: translateX(-50%);

    img {
      width: 100%;
    }
  }

  .content {
    @include tablet {
      columns: 2;
      column-gap: 80px;
      margin-top: 16px;
    }

    @include desktop {
      margin-top: 32px;
    }

    h1 {
      @include fs-h1;
      margin-top: 32px;
    }

    h2 {
      @include fs-h2;
    }

    h3 {
      @include fs-h3;
    }

    p {
      @include fs-p;
      text-align: justify;
      text-indent: 40px;
      margin-top: 16px;

      &:first-of-type {
        &::first-letter {
          font-size: 150%;
          font-weight: 800;
        }
      }
    }

    ol,
    ul {
      @include fs-p;
      > li::marker {
        font-weight: bold;
      }
    }
    blockquote {
      margin: 0;
      font-style: italic;
    }

    figure.image {
      // max-width: 800px;
      margin-top: 32px;
      margin-left: auto;
      margin-right: auto;

      img {
        width: 100%;
      }

      figcaption {
        @include fs-caption;
        margin-top: 8px;
        text-align: right;
      }
    }

    figure.table {
      width: 100%;
      margin-top: 32px;
      margin-left: auto;
      margin-right: auto;

      table {
        width: 100%;

        thead {
          @include fs-caption;
          text-align: left;
          background-color: $black;
          color: $white;

          th {
            padding: 4px 10px;
          }
        }
        tbody {
          @include fs-p;

          td {
            padding: 4px 16px;
          }
        }
      }
    }
  }
}
</style>

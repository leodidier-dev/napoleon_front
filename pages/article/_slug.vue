<template>
  <section id="article-content" ref="articleW" class="page">
    <h2 class="fs-article-category">{{ category }}</h2>
    <h1 class="fs-article-title">{{ title }}</h1>
    <button ref="scrollTopCta" @click="scrollTop">
      <img src="~/assets/icons/up-arrow.svg" alt="" />
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

  head() {
    return {
      title: 'Révolution Empire 67 - ' + this.title,
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

    const links = this.$refs.articleW.querySelectorAll('a');

    links.forEach((link) => {
      link.setAttribute('target', '_blank');
    });

    window.addEventListener('resize', this.onResize);

    if (document.documentElement.scrollHeight <= window.innerHeight) this.$refs.scrollTopCta.style.display = 'none';
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
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
    onResize() {
      if (document.documentElement.scrollHeight <= window.innerHeight) this.$refs.scrollTopCta.style.display = 'none';
      else this.$refs.scrollTopCta.style.display = 'block';
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
  padding-bottom: 100px;

  button {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: absolute;
    bottom: 60px;
    width: 100px;
    left: 50%;
    transform: translateX(-50%);
    transition: transform 0.4s ease;

    @include tablet {
      transform: unset;
      left: unset;
      right: 20px;
    }

    img {
      width: 100%;
    }

    @include hover {
      transform: translateY(-10px);
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

    a {
      text-decoration: underline;
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

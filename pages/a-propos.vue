<template>
  <section id="about-content" ref="aboutW" class="page">
    <h1 class="fs-article-title">{{ title }}</h1>
    <button ref="scrollTopCta" @click="scrollTop">
      <img src="~/assets/icons/up-arrow.svg" alt="" />
    </button>
  </section>
</template>

<script>
import getAbout from '~/graphql/getAbout';
export default {
  async asyncData({ app }) {
    const client = app.apolloProvider.defaultClient;

    const res = await client.query({
      query: getAbout,
    });

    const { about } = res.data;

    return {
      about,
    };
  },

  head() {
    return {
      title: 'Révolution Empire 67 - ' + this.title,
    };
  },
  computed: {
    title() {
      return this.about.data.attributes.title;
    },
    content() {
      return this.about.data.attributes.content;
    },
  },

  mounted() {
    console.log(this.content.length > 1500);
    const formattedContent = this.content.replaceAll('/uploads/', process.env.API_STORAGE);
    const htmlContent = this.convertStringToHTML(`<section class="content">${formattedContent}</section>`);
    this.$refs.aboutW.append(htmlContent);

    const links = this.$refs.aboutW.querySelectorAll('a');

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
#about-content {
  color: $black;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  padding-bottom: 250px;

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

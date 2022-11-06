<template>
  <section>
    <h1 class="title">Les articles du jour</h1>
    <div class="content">
      <nuxt-link class="side top-side" :to="`/article/${articles.data[dayArticles[1]].attributes.slug}`">
        <div class="side-category">{{ articles.data[dayArticles[1]].attributes.category.data.attributes.name }}</div>
        <div class="side-title">{{ articles.data[dayArticles[1]].attributes.title }}</div>
        <div class="picture-w">
          <img :src="formattedUrlImage(articles.data[dayArticles[1]])" alt="" />
        </div>
      </nuxt-link>
      <nuxt-link class="side bottom-side" :to="`/article/${articles.data[dayArticles[2]].attributes.slug}`">
        <div class="side-category">{{ articles.data[dayArticles[2]].attributes.category.data.attributes.name }}</div>
        <div class="side-title">{{ articles.data[dayArticles[2]].attributes.title }}</div>
        <div class="picture-w">
          <img :src="formattedUrlImage(articles.data[dayArticles[2]])" alt="" />
        </div>
      </nuxt-link>
      <nuxt-link class="main" :to="`/article/${articles.data[dayArticles[0]].attributes.slug}`">
        <div class="picture-w">
          <img :src="formattedUrlImage(articles.data[dayArticles[0]])" alt="" />
          <h2 class="article-title">{{ articles.data[dayArticles[0]].attributes.title }}</h2>
        </div>
      </nuxt-link>
    </div>
    <div class="footer"></div>
  </section>
</template>

<script>
// import { gsap } from 'gsap';
import getArticles from '~/graphql/getArticles';

export default {
  name: 'IndexPage',

  async asyncData({ app }) {
    const client = app.apolloProvider.defaultClient;

    const res = await client.query({
      query: getArticles,
    });

    const { articles } = res.data;

    return {
      articles,
    };
  },

  data() {
    return {};
  },

  computed: {
    formattedUrlImage() {
      return (article) => article.attributes.image.data.attributes.url.replace('/uploads/', process.env.API_STORAGE);
    },
    dayArticles() {
      const msPerDay = 24 * 60 * 60 * 1000;
      // (new Date()).getTime() gets the number of ms since 1 January 1970 00:00:00 UTC
      // we divide by ms_per_day and floor to get the number of 24-hour cycles (this will increment each UTC day)
      const daySinceEpoch = Math.floor(new Date('2020-05-12T23:50:21.817Z').getTime() / msPerDay);

      // we mod by the length of phones to get a number in the range [0, phones.length)
      const firstIndex = daySinceEpoch % this.articles.data.length;
      const secondIndex = firstIndex + 1 <= this.articles.data.length ? firstIndex + 1 : firstIndex - 1;
      const thirdIndex = firstIndex - 1 >= 0 ? firstIndex - 1 : this.articles.data.length - 1;

      return [firstIndex, secondIndex, thirdIndex];
    },
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
section {
  .title {
    @include thunder-semi-bold;
    color: $red;
    font-size: 50rem;
    border-bottom: solid 1px $black;
    padding: 20px 0;
    text-align: center;
  }

  .content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    min-height: 100vh;

    .top-side {
      grid-area: 1 / 1 / 2 / 2;
      border: 1px solid $black;
    }

    .bottom-side {
      grid-area: 2 / 1 / 3 / 2;
      border: 1px solid $black;
    }

    .side {
      padding: 20px;

      .side-category {
        @include thunder-semi-bold;
        color: $blue;
        font-size: 20rem;
      }

      .side-title {
        @include thunder-semi-bold;
        color: $black;
        font-size: 50rem;
      }

      .picture-w {
        position: relative;
        height: 70%;
        width: 100%;

        &:before {
          content: '';
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: rgba($black, 0.1);
          z-index: 1;
        }

        img {
          position: relative;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    .main {
      grid-area: 1 / 2 / 3 / 4;
      border: 1px solid $black;
      padding: 20px;

      .picture-w {
        position: relative;
        height: 80%;
        width: 100%;
        background: $black;

        &:before {
          content: '';
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: rgba($black, 0.1);
          z-index: 1;
        }

        .article-title {
          position: absolute;
          top: 40px;
          left: 50%;
          transform: translateX(-50%);
          @include thunder-bold;
          color: $white;
          font-size: 90rem;
          z-index: 2;
          text-align: center;
        }

        img {
          position: relative;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }

  .footer {
    width: 100%;
    height: 200px;
    border: 1px solid $black;
  }

  .embla {
    display: none;
  }
}
</style>

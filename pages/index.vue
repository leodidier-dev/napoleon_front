<template>
  <section>
    <h1 class="title">A la une aujourd'hui,</h1>
    <div class="content">
      <nuxt-link class="main" :to="`/article/${dayArticles[0].attributes.slug}`">
        <div class="picture-w">
          <img :src="formattedUrlImage(dayArticles[0])" alt="" />
          <h2 class="article-title">{{ dayArticles[0].attributes.title }}</h2>
        </div>
        <p class="abstract">{{ dayArticles[0].attributes.abstract }}</p>
      </nuxt-link>
      <nuxt-link class="side top-side" :to="`/article/${dayArticles[1].attributes.slug}`">
        <div class="side-category">{{ dayArticles[1].attributes.category.data.attributes.name }}</div>
        <div class="side-title">{{ dayArticles[1].attributes.title }}</div>
        <div class="picture-w">
          <img :src="formattedUrlImage(dayArticles[1])" alt="" />
        </div>
        <p class="abstract">{{ dayArticles[1].attributes.abstract }}</p>
      </nuxt-link>
      <nuxt-link class="side bottom-side" :to="`/article/${dayArticles[2].attributes.slug}`">
        <div class="side-category">{{ dayArticles[2].attributes.category.data.attributes.name }}</div>
        <div class="side-title">{{ dayArticles[2].attributes.title }}</div>
        <div class="picture-w">
          <img :src="formattedUrlImage(dayArticles[2])" alt="" />
        </div>
        <p class="abstract">{{ dayArticles[2].attributes.abstract }}</p>
      </nuxt-link>
      <nuxt-link class="bottom left-bottom" :to="`/article/${dayArticles[3].attributes.slug}`">
        <div class="side-category">{{ dayArticles[3].attributes.category.data.attributes.name }}</div>
        <div class="bottom-content">
          <div class="bottom-txt">
            <div class="bottom-title">{{ dayArticles[3].attributes.title }}</div>
            <p class="abstract">{{ dayArticles[3].attributes.abstract }}</p>
          </div>
          <div class="picture-w">
            <img :src="formattedUrlImage(dayArticles[3])" alt="" />
          </div>
        </div>
      </nuxt-link>
      <nuxt-link class="bottom right-bottom" :to="`/article/${dayArticles[4].attributes.slug}`">
        <div class="side-category">{{ dayArticles[4].attributes.category.data.attributes.name }}</div>
        <div class="bottom-content">
          <div class="bottom-txt">
            <div class="bottom-title">{{ dayArticles[4].attributes.title }}</div>
            <p class="abstract">{{ dayArticles[4].attributes.abstract }}</p>
          </div>
          <div class="picture-w">
            <img :src="formattedUrlImage(dayArticles[4])" alt="" />
          </div>
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
      const articles = [...this.articles.data];
      // (new Date()).getTime() gets the number of ms since 1 January 1970 00:00:00 UTC
      // we divide by ms_per_day and floor to get the number of 24-hour cycles (this will increment each UTC day)
      // we mod by the length of phones to get a number in the range [0, phones.length)
      const firstIndex = Math.floor(new Date().getTime() / (24 * 60 * 60 * 1000)) % articles.length;
      const mainArticle = articles[firstIndex];
      articles.splice(firstIndex, 1);
      const articlesSelected = articles.sort(() => 0.5 - Math.random()).slice(0, 4);
      articlesSelected.unshift(mainArticle);

      return articlesSelected;
    },
  },

  mounted() {
    console.log(this.dayArticles);
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
section {
  .title {
    @include thunder-semi-bold;
    color: $black;
    font-size: 160rem;
    padding: 50px 0;
    text-transform: uppercase;
    text-align: center;
    border-top: 4px solid $black;
  }

  .content {
    @include tablet {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 1fr 1fr 400px;
      grid-column-gap: 0px;
      grid-row-gap: 60px;
    }

    .main {
      padding-left: 40px;
      align-self: start;
      height: 100%;
      border-left: 2px solid $black;
      display: flex;
      flex-direction: column;
      justify-content: center;

      @include tablet {
        grid-area: 1 / 2 / 3 / 4;
      }

      .picture-w {
        position: relative;
        height: 70%;
        width: 100%;
        background: $black;

        &:before {
          content: '';
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;

          //background: rgba($black, 0.4);
          z-index: 1;
        }

        .article-title {
          position: absolute;
          top: 40px;
          left: 50%;
          transform: translateX(-50%);
          @include thunder-bold;
          color: $white;
          font-size: 120rem;
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

      .abstract {
        margin-top: 40px;
        @include thunder-light;
        color: $black;
        font-size: 28rem;
        text-align: justify;
      }
    }

    .top-side {
      grid-area: 1 / 1 / 2 / 2;
    }

    .bottom-side {
      grid-area: 2 / 1 / 3 / 2;
    }

    .side {
      padding-right: 40px;

      .side-category {
        @include thunder-semi-bold;
        color: $blue;
        font-size: 22rem;
        border-bottom: 2px solid $black;
        padding-bottom: 8px;
        text-transform: uppercase;
      }

      .side-title {
        @include thunder-semi-bold;
        color: $black;
        font-size: 70rem;
        margin-top: 16px;
      }

      .picture-w {
        margin-top: 16px;
        position: relative;
        height: 60%;
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

      .abstract {
        margin-top: 30px;
        @include thunder-light;
        color: $black;
        font-size: 24rem;
        text-align: justify;
      }
    }

    .left-bottom {
      grid-area: 3 / 2 / 4 / 3;
    }

    .right-bottom {
      grid-area: 3 / 3 / 4 / 4;
    }

    .bottom {
      border-top: 2px solid $black;
      padding: 20px;

      .side-category {
        @include thunder-semi-bold;
        color: $white;
        font-size: 22rem;
        padding: 8px 0;
        background-color: $blue;
        text-transform: uppercase;
        text-align: center;
      }

      .bottom-content {
        display: flex;
        column-gap: 15px;
        margin-top: 16px;

        .bottom-txt {
          width: 50%;

          .bottom-title {
            @include thunder-semi-bold;
            color: $black;
            font-size: 22rem;
          }

          .abstract {
            @include thunder-light;
            color: $black;
            font-size: 20rem;
            margin-top: 8px;
            text-align: justify;
          }
        }

        .picture-w {
          position: relative;
          height: 100%;
          width: 50%;

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
    }
  }
  .footer {
    border-top: 10px solid $black;
    height: 100px;
    width: 100%;
  }
}
</style>

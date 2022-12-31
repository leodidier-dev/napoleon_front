<template>
  <section class="page">
    <h1 class="title">A la une aujourd'hui,</h1>
    <div class="content">
      <nuxt-link v-if="dayArticles[0]" class="article main" :to="`/article/${dayArticles[0].attributes.slug}`">
        <div class="picture-w">
          <img :src="formattedUrlImage(dayArticles[0])" alt="" />
          <h2 class="article-title">{{ dayArticles[0].attributes.title }}</h2>
        </div>
        <p class="abstract">{{ extractContent(dayArticles[0].attributes.content) }}</p>
        <p class="read-more fs-p black">[Lire la suite]</p>
      </nuxt-link>
      <nuxt-link v-if="dayArticles[1]" class="article side top-side" :to="`/article/${dayArticles[1].attributes.slug}`">
        <div class="side-category">{{ dayArticles[1].attributes.category.data.attributes.name }}</div>
        <hr />
        <div class="side-title">{{ dayArticles[1].attributes.title }}</div>
        <div class="picture-w">
          <img :src="formattedUrlImage(dayArticles[1])" alt="" />
        </div>
        <p class="abstract">{{ extractContent(dayArticles[1].attributes.content) }}</p>
        <p class="read-more fs-p black">[Lire la suite]</p>
      </nuxt-link>
      <nuxt-link v-if="dayArticles[2]" class="article side bottom-side" :to="`/article/${dayArticles[2].attributes.slug}`">
        <div class="side-category">{{ dayArticles[2].attributes.category.data.attributes.name }}</div>
        <hr />
        <div class="side-title">{{ dayArticles[2].attributes.title }}</div>
        <div class="picture-w">
          <img :src="formattedUrlImage(dayArticles[2])" alt="" />
        </div>
        <p class="abstract">{{ extractContent(dayArticles[2].attributes.content) }}</p>
        <p class="read-more fs-p black">[Lire la suite]</p>
      </nuxt-link>
      <nuxt-link v-if="dayArticles[3]" class="article bottom left-bottom" :to="`/article/${dayArticles[3].attributes.slug}`">
        <div class="side-category">{{ dayArticles[3].attributes.category.data.attributes.name }}</div>
        <div class="bottom-content">
          <div class="bottom-txt">
            <div class="bottom-title">{{ dayArticles[3].attributes.title }}</div>
            <p class="abstract">{{ extractContent(dayArticles[3].attributes.content) }}</p>
            <p class="read-more fs-p black">[Lire la suite]</p>
          </div>
          <div class="picture-w">
            <img :src="formattedUrlImage(dayArticles[3])" alt="" />
          </div>
        </div>
      </nuxt-link>
      <nuxt-link v-if="dayArticles[4]" class="article bottom right-bottom" :to="`/article/${dayArticles[4].attributes.slug}`">
        <div class="side-category">{{ dayArticles[4].attributes.category.data.attributes.name }}</div>
        <div class="bottom-content">
          <div class="bottom-txt">
            <div class="bottom-title">{{ dayArticles[4].attributes.title }}</div>
            <p class="abstract">{{ extractContent(dayArticles[4].attributes.content) }}</p>
            <p class="read-more fs-p black">[Lire la suite]</p>
          </div>
          <div class="picture-w">
            <img :src="formattedUrlImage(dayArticles[4])" alt="" />
          </div>
        </div>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
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

  head() {
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

  mounted() {},

  methods: {
    extractContent(value) {
      if (process.client) {
        const div = document.createElement('div');
        div.innerHTML = value;
        const el = div.querySelector('p') ? div.querySelector('p').innerText : div.firstChild.innerText;
        return el;
      }
      return 'loading';
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  padding: 20px;

  .title {
    @include thunder-semi-bold;
    color: $black;
    font-size: 60rem;
    padding: 40px 0;
    text-transform: uppercase;
    text-align: center;

    @include mobile-large {
      font-size: 90rem;
    }

    @include tablet {
      font-size: 140rem;
      padding: 30px 0;
    }

    @include desktop {
      padding: 50px 0;
    }
  }

  .content {
    @include tablet {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 1fr 1fr 250px;
      grid-column-gap: 0px;
      grid-row-gap: 30px;
    }

    @include desktop {
      grid-template-rows: 1fr 1fr 300px;
    }

    .picture-w {
      border-radius: 4px;
      overflow: hidden;

      img {
        position: relative;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.8s ease-in-out, filter 0.6s ease-in-out;
      }
    }

    .article {
      @include hover {
        img {
          transform: scale(1.09);
        }
      }
    }

    .main {
      align-self: start;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      @include tablet {
        padding-left: 40px;
        border-left: 2px solid $black;
        grid-area: 1 / 2 / 3 / 4;
      }

      .picture-w {
        position: relative;
        height: 80%;
        width: 100%;

        &:before {
          content: '';
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .article-title {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          @include thunder-bold;
          color: $red;
          font-size: 40rem;
          z-index: 2;
          text-align: center;
          text-transform: uppercase;
          width: 90%;

          @include mobile-large {
            width: 80%;
            font-size: 60rem;
          }

          @include tablet {
            top: 40px;
            font-size: 100rem;
          }
        }
      }

      .abstract {
        margin-top: 40px;
        @include thunder-light;
        color: $black;
        font-size: 24rem;
        letter-spacing: 0.03em;
        text-align: justify;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        overflow: hidden;

        @include tablet {
          // font-size: 28rem;
        }

        &::first-letter {
          font-size: 150%;
          font-weight: 800;
        }
      }

      .read-more {
        @include thunder-semi-bold;
        color: $black;
        font-size: 20rem;
        letter-spacing: 0.03em;
        margin-top: 8px;
        text-align: right;
      }
    }

    .top-side {
      margin-top: 50px;

      @include tablet {
        margin: 0;
        grid-area: 1 / 1 / 2 / 2;
      }
    }

    .bottom-side {
      margin-top: 20px;

      @include tablet {
        margin: 0;
        grid-area: 2 / 1 / 3 / 2;
      }
    }

    .side {
      @include tablet {
        padding-right: 40px;
      }

      .side-category {
        @include thunder-semi-bold;
        color: $red;
        font-size: 20rem;
        padding-bottom: 8px;
        text-transform: uppercase;

        @include mobile-large {
          font-size: 22rem;
        }

        @include tablet {
          font-size: 24rem;
        }
      }

      .side-title {
        @include thunder-semi-bold;
        color: $black;
        font-size: 40rem;
        margin-top: 16px;
        text-transform: uppercase;

        @include mobile-large {
          font-size: 60rem;
        }

        @include tablet {
          font-size: 70rem;
        }
      }

      .picture-w {
        margin-top: 16px;
        position: relative;
        height: 40%;
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
      }

      .abstract {
        margin-top: 30px;
        @include thunder-light;
        color: $black;
        font-size: 22rem;
        letter-spacing: 0.03em;
        text-align: justify;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        overflow: hidden;

        @include tablet {
          // font-size: 24rem;
        }

        &::first-letter {
          font-size: 150%;
          font-weight: 800;
        }
      }

      .read-more {
        @include thunder-semi-bold;
        color: $black;
        font-size: 20rem;
        letter-spacing: 0.03em;
        margin-top: 8px;
        text-align: right;
      }
    }

    .left-bottom {
      margin-top: 50px;

      @include tablet {
        margin: 0;
        grid-area: 3 / 2 / 4 / 3;
      }
    }

    .right-bottom {
      margin-top: 30px;

      @include tablet {
        margin: 0;
        grid-area: 3 / 3 / 4 / 4;
      }
    }

    .bottom {
      border-top: 2px solid $black;

      @include tablet {
        padding: 20px;
      }

      .side-category {
        @include thunder-semi-bold;
        color: $white;
        font-size: 20rem;
        padding: 8px 0;
        background-color: $red;
        text-transform: uppercase;
        text-align: center;

        @include mobile-large {
          font-size: 22rem;
        }
      }

      .bottom-content {
        display: flex;
        flex-direction: column-reverse;
        row-gap: 16px;
        margin-top: 16px;

        @include tablet {
          flex-direction: row;
          column-gap: 15px;
        }

        .bottom-txt {
          width: 100%;

          @include tablet {
            width: 50%;
          }

          .bottom-title {
            @include thunder-semi-bold;
            color: $black;
            font-size: 28rem;
            text-transform: uppercase;

            @include mobile-large {
              font-size: 34rem;
            }
          }

          .abstract {
            @include thunder-light;
            letter-spacing: 0.03em;
            color: $black;
            font-size: 20rem;
            margin-top: 8px;
            text-align: justify;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 7;
            overflow: hidden;

            @include tablet {
              font-size: 22rem;
            }

            &::first-letter {
              font-size: 150%;
              font-weight: 800;
            }
          }

          .read-more {
            @include thunder-semi-bold;
            color: $black;
            font-size: 20rem;
            letter-spacing: 0.03em;
            margin-top: 8px;
            text-align: right;
          }
        }

        .picture-w {
          position: relative;
          height: 100%;

          @include tablet {
            height: unset;
            width: 50%;
            align-self: stretch;
          }

          &:before {
            content: '';
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            background: rgba($black, 0.1);
            z-index: 1;
          }
        }
      }
    }
  }
}
</style>

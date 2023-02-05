<template>
  <section class="page">
    <h1 class="page-title">A la une aujourd'hui,</h1>
    <div class="content">
      <div class="main">
        <nuxt-link class="article full-article" :to="`/article/${articles.data[0].attributes.slug}`">
          <div class="picture-w">
            <div class="img">
              <img
                :src="articles.data[0].attributes.image.data.attributes.url"
                :alt="articles.data[0].attributes.image.data.attributes.caption"
              />
            </div>
            <figcaption>{{ articles.data[0].attributes.image.data.attributes.caption }}</figcaption>
          </div>
          <div class="category">{{ articles.data[0].attributes.category.data.attributes.name }}</div>
          <div class="title">{{ articles.data[0].attributes.title }}</div>
          <div class="description">{{ extractContent(articles.data[0].attributes.content) }}</div>
        </nuxt-link>
        <nuxt-link
          v-for="(lastArticle, index) in halfArticles"
          :key="index"
          class="article half-article"
          :to="`/article/${lastArticle.attributes.slug}`"
        >
          <div class="picture-w">
            <div class="img">
              <img :src="lastArticle.attributes.image.data.attributes.url" :alt="lastArticle.attributes.image.data.attributes.caption" />
            </div>
            <figcaption>{{ lastArticle.attributes.image.data.attributes.caption }}</figcaption>
          </div>
          <div class="category">{{ lastArticle.attributes.category.data.attributes.name }}</div>
          <div class="title">{{ lastArticle.attributes.title }}</div>
          <div class="description">{{ extractContent(lastArticle.attributes.content) }}</div>
        </nuxt-link>
      </div>

      <div class="right">
        <nuxt-link
          v-for="(lastArticle, index) in noImgArticles"
          :key="index"
          class="article no-img-article"
          :to="`/article/${lastArticle.attributes.slug}`"
        >
          <div class="picture-w">
            <div class="img">
              <img :src="lastArticle.attributes.image.data.attributes.url" :alt="lastArticle.attributes.image.data.attributes.caption" />
            </div>
            <figcaption>{{ lastArticle.attributes.image.data.attributes.caption }}</figcaption>
          </div>
          <div class="category">{{ lastArticle.attributes.category.data.attributes.name }}</div>
          <div class="title">{{ lastArticle.attributes.title }}</div>
          <div class="description">{{ extractContent(lastArticle.attributes.content) }}</div>
        </nuxt-link>
      </div>
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

  data() {
    return {
      articlesSelected: [],
    };
  },

  head() {
    return {};
  },

  computed: {
    halfArticles() {
      return this.articlesSelected.slice(1, 5);
    },

    noImgArticles() {
      return this.articlesSelected.slice(5, 13);
    },
  },

  mounted() {
    const filledCategories = [];

    this.articles.data.forEach((article, i) => {
      const curCat = article.attributes.category.data.attributes.name;

      let catCount = 0;
      filledCategories.forEach((cat) => {
        if (curCat === cat) catCount++;
      });
      if (catCount !== 3) {
        filledCategories.push(curCat);
        this.articlesSelected.push(article);
      }
    });
  },

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
  @include mobile-large {
    padding: 20px;
  }

  .page-title {
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
      font-size: 90rem;
      padding: 30px 0;
    }

    @include desktop {
      padding: 50px 0;
    }
  }

  .content {
    @include tablet {
      display: flex;
    }

    .main {
      @include tablet {
        width: 60%;
        display: flex;
        flex-wrap: wrap;
        border-right: 1px solid rgba($black, 0.3);
        padding-right: 40px;
        align-content: flex-start;
      }
    }

    .right {
      @include tablet {
        width: 40%;
        padding-left: 40px;
      }
    }

    .article {
      padding: 18px;

      &:not(:first-of-type) {
        margin-top: 20px;

        @include tablet {
          margin-top: 0;
        }
      }

      @include hover {
        img {
          transform: scale(1.04);
        }

        .title {
          transform: translateX(5px);
        }
      }

      .picture-w {
        position: relative;

        .img {
          position: relative;
          overflow: hidden;

          &:before {
            content: '';
            display: block;
            aspect-ratio: 16 / 9;
          }

          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.8s ease-out;
          }
        }

        figcaption {
          position: absolute;
          @include thunder-light;
          font-size: 14rem;
          font-style: italic;
          color: rgba($black, 1);
          right: 0;
          bottom: -20rem;
        }
      }
      .category {
        text-transform: uppercase;
        margin-top: 20px;
        @include thunder-bold;
        font-size: 20rem;
        color: $red;
      }
      .title {
        margin-top: 20px;
        @include thunder-bold;
        font-size: 28rem;
        line-height: 105%;
        color: $black;
        transition: transform 0.8s ease-out;
      }
      .description {
        margin-top: 14px;
        @include thunder-light;
        font-size: 20rem;
        line-height: 103%;
        color: $black;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }

      &.full-article {
        width: 100%;
      }

      &.half-article {
        width: 100%;
        @include tablet {
          margin-top: 40px;
          width: 50%;
        }
      }

      &.no-img-article {
        width: 100%;
        @include tablet {
          border-bottom: 1px solid rgba($black, 0.3);
          padding-bottom: 50px;
        }
        &:not(:first-of-type) {
          @include tablet {
            margin-top: 20px;
          }
        }

        .picture-w {
          @include tablet {
            display: none;
          }
        }
      }
    }
  }

  // .content {
  //   @include tablet {
  //     display: grid;
  //     grid-template-columns: repeat(3, 1fr);
  //     grid-template-rows: 1fr 1fr 250px;
  //     grid-column-gap: 0px;
  //     grid-row-gap: 30px;
  //   }

  //   @include desktop {
  //     grid-template-rows: 1fr 1fr 300px;
  //   }

  //   .picture-w {
  //     border-radius: 4px;
  //     overflow: hidden;

  //     img {
  //       position: relative;
  //       width: 100%;
  //       height: 100%;
  //       object-fit: cover;
  //       transition: transform 0.8s ease-in-out, filter 0.6s ease-in-out;
  //     }

  //     figcaption {
  //       @include fs-caption;
  //       position: absolute;
  //       right: 0;
  //       bottom: 0;
  //       color: $black;
  //       background: rgba($white, 0.4);
  //       padding: 5px 10px;
  //     }
  //   }

  //   .article {
  //     @include hover {
  //       img {
  //         transform: scale(1.09);
  //       }
  //     }
  //   }

  //   .main {
  //     align-self: start;
  //     height: 100%;
  //     display: flex;
  //     flex-direction: column;
  //     justify-content: center;

  //     @include tablet {
  //       padding-left: 40px;
  //       border-left: 2px solid $black;
  //       grid-area: 1 / 2 / 3 / 4;
  //     }

  //     .article-title {
  //       // position: absolute;
  //       // top: 20px;
  //       // left: 50%;
  //       // transform: translateX(-50%);
  //       @include thunder-bold;
  //       color: $white;
  //       background: $red;
  //       font-size: 35rem;
  //       z-index: 2;
  //       text-align: center;
  //       text-transform: uppercase;
  //       padding: 20px;
  //       // width: 90%;

  //       @include mobile-large {
  //         // width: 80%;
  //         font-size: 50rem;
  //       }

  //       @include tablet {
  //         // top: 40px;
  //         padding: 30px;
  //         font-size: 75rem;
  //       }
  //     }

  //     .picture-w {
  //       position: relative;
  //       height: 80%;
  //       width: 100%;

  //       &:before {
  //         content: '';
  //         position: absolute;
  //         inset: 0;
  //         width: 100%;
  //         height: 100%;
  //         z-index: 1;
  //       }
  //     }

  //     .abstract {
  //       margin-top: 40px;
  //       @include thunder-light;
  //       color: $black;
  //       font-size: 24rem;
  //       letter-spacing: 0.03em;
  //       text-align: justify;
  //       display: -webkit-box;
  //       -webkit-box-orient: vertical;
  //       -webkit-line-clamp: 5;
  //       overflow: hidden;

  //       @include tablet {
  //         // font-size: 28rem;
  //       }

  //       &::first-letter {
  //         font-size: 150%;
  //         font-weight: 800;
  //       }
  //     }

  //     .read-more {
  //       @include thunder-semi-bold;
  //       color: $black;
  //       font-size: 20rem;
  //       letter-spacing: 0.03em;
  //       margin-top: 8px;
  //       text-align: right;
  //     }
  //   }

  //   .top-side {
  //     margin-top: 50px;

  //     @include tablet {
  //       margin: 0;
  //       grid-area: 1 / 1 / 2 / 2;
  //     }
  //   }

  //   .bottom-side {
  //     margin-top: 20px;

  //     @include tablet {
  //       margin: 0;
  //       grid-area: 2 / 1 / 3 / 2;
  //     }
  //   }

  //   .side {
  //     @include tablet {
  //       padding-right: 40px;
  //     }

  //     .side-category {
  //       @include thunder-semi-bold;
  //       color: $red;
  //       font-size: 20rem;
  //       padding-bottom: 8px;
  //       text-transform: uppercase;

  //       @include mobile-large {
  //         font-size: 22rem;
  //       }

  //       @include tablet {
  //         font-size: 24rem;
  //       }
  //     }

  //     .side-title {
  //       @include thunder-semi-bold;
  //       color: $black;
  //       font-size: 40rem;
  //       margin-top: 16px;
  //       text-transform: uppercase;

  //       @include mobile-large {
  //         font-size: 60rem;
  //       }

  //       @include tablet {
  //         font-size: 45rem;
  //       }
  //     }

  //     .picture-w {
  //       margin-top: 16px;
  //       position: relative;
  //       height: 40%;
  //       width: 100%;

  //       &:before {
  //         content: '';
  //         position: absolute;
  //         inset: 0;
  //         width: 100%;
  //         height: 100%;
  //         // background: rgba($black, 0.1);
  //         z-index: 1;
  //       }
  //     }

  //     .abstract {
  //       margin-top: 30px;
  //       @include thunder-light;
  //       color: $black;
  //       font-size: 22rem;
  //       letter-spacing: 0.03em;
  //       text-align: justify;
  //       display: -webkit-box;
  //       -webkit-box-orient: vertical;
  //       -webkit-line-clamp: 5;
  //       overflow: hidden;

  //       @include tablet {
  //         // font-size: 24rem;
  //       }

  //       &::first-letter {
  //         font-size: 150%;
  //         font-weight: 800;
  //       }
  //     }

  //     .read-more {
  //       @include thunder-semi-bold;
  //       color: $black;
  //       font-size: 20rem;
  //       letter-spacing: 0.03em;
  //       margin-top: 8px;
  //       text-align: right;
  //     }
  //   }

  //   .left-bottom {
  //     margin-top: 50px;

  //     @include tablet {
  //       margin: 0;
  //       grid-area: 3 / 2 / 4 / 3;
  //     }
  //   }

  //   .right-bottom {
  //     margin-top: 30px;

  //     @include tablet {
  //       margin: 0;
  //       grid-area: 3 / 3 / 4 / 4;
  //     }
  //   }

  //   .bottom {
  //     border-top: 2px solid $black;

  //     @include tablet {
  //       padding: 20px;
  //     }

  //     .side-category {
  //       @include thunder-semi-bold;
  //       color: $white;
  //       font-size: 20rem;
  //       padding: 8px 0;
  //       background-color: $red;
  //       text-transform: uppercase;
  //       text-align: center;

  //       @include mobile-large {
  //         font-size: 22rem;
  //       }
  //     }

  //     .bottom-content {
  //       display: flex;
  //       flex-direction: column-reverse;
  //       row-gap: 16px;
  //       margin-top: 16px;

  //       @include tablet {
  //         flex-direction: row;
  //         column-gap: 15px;
  //       }

  //       .bottom-txt {
  //         width: 100%;

  //         @include tablet {
  //           width: 50%;
  //         }

  //         .bottom-title {
  //           @include thunder-semi-bold;
  //           color: $black;
  //           font-size: 28rem;
  //           text-transform: uppercase;

  //           @include mobile-large {
  //             font-size: 34rem;
  //           }
  //         }

  //         .abstract {
  //           @include thunder-light;
  //           letter-spacing: 0.03em;
  //           color: $black;
  //           font-size: 20rem;
  //           margin-top: 8px;
  //           text-align: justify;
  //           display: -webkit-box;
  //           -webkit-box-orient: vertical;
  //           -webkit-line-clamp: 7;
  //           overflow: hidden;

  //           @include tablet {
  //             font-size: 22rem;
  //           }

  //           &::first-letter {
  //             font-size: 150%;
  //             font-weight: 800;
  //           }
  //         }

  //         .read-more {
  //           @include thunder-semi-bold;
  //           color: $black;
  //           font-size: 20rem;
  //           letter-spacing: 0.03em;
  //           margin-top: 8px;
  //           text-align: right;
  //         }
  //       }

  //       .picture-w {
  //         position: relative;
  //         height: 100%;

  //         @include tablet {
  //           height: unset;
  //           width: 50%;
  //           align-self: stretch;
  //         }

  //         &:before {
  //           content: '';
  //           position: absolute;
  //           inset: 0;
  //           width: 100%;
  //           height: 100%;
  //           // background: rgba($black, 0.1);
  //           z-index: 1;
  //         }
  //       }
  //     }
  //   }
  // }
}
</style>

<template>
  <section>
    <h1 class="fs-h1">Les articles du jour</h1>
    <div ref="embla" class="embla">
      <div class="embla__container">
        <div v-for="(article, index) in articles.data" :key="index" class="embla__slide" :data-slug="article.attributes.slug">
          <div class="slide-content">
            <h2 class="fs-h2">{{ article.attributes.title }}</h2>
            <div class="picture-w">
              <img :src="formattedUrlImage(article)" alt="" />
            </div>
            <p class="fs-p">
              {{ article.attributes.abstract }}
            </p>
          </div>
        </div>
      </div>
      <button ref="prev" class="cta prev-cta">
        <img src="~/assets/icons/arrow.svg" alt="" />
      </button>
      <button ref="next" class="cta next-cta">
        <img src="~/assets/icons/arrow.svg" alt="" />
      </button>
    </div>
  </section>
</template>

<script>
import EmblaCarousel from 'embla-carousel';
import { gsap } from 'gsap';
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
      embla: null,
    };
  },

  computed: {
    formattedUrlImage() {
      return (article) => article.attributes.image.data.attributes.url.replace('/uploads/', process.env.API_STORAGE);
    },
  },

  mounted() {
    const emblaNode = document.querySelector('.embla');
    const options = { loop: true, speed: 8 };

    this.embla = EmblaCarousel(emblaNode, options);

    this.embla.on('pointerDown', this.isGrabbing);
    this.embla.on('pointerUp', this.isNotGrabbing);
    this.embla.on('select', this.onSelect);

    this.$refs.prev.addEventListener('click', this.embla.scrollPrev);
    this.$refs.next.addEventListener('click', this.embla.scrollNext);

    this.embla.slideNodes().forEach((slide, index) => {
      slide.addEventListener('click', (e) => this.onSlideClick(e, index));
    });
  },

  methods: {
    isGrabbing() {
      this.$refs.embla.classList.add('is-grabbing');
    },
    isNotGrabbing() {
      this.$refs.embla.classList.remove('is-grabbing');
    },
    onSelect() {
      const prevSlide = this.embla.slideNodes()[this.embla.previousScrollSnap()];
      const prevTitle = prevSlide.querySelector('h2');
      const prevDescription = prevSlide.querySelector('p');
      const currSlide = this.embla.slideNodes()[this.embla.selectedScrollSnap()];
      const currTitle = currSlide.querySelector('h2');
      const currDescription = currSlide.querySelector('p');
      const tl = gsap.timeline();
      tl.to(
        [prevTitle, prevDescription],
        {
          height: 0,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.in',
        },
        0,
      );
      tl.to(
        [currTitle, currDescription],
        {
          height: 'auto',
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        0.2,
      );
    },
    onSlideClick(e, index) {
      if (this.embla.clickAllowed()) this.$router.push('/article/' + this.embla.slideNodes()[index].dataset.slug);
      else {
        e.preventDefault();
        e.stopPropagation();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  display: none;
  margin-top: 40px;

  .embla {
    position: relative;
    overflow: hidden;
    height: 100%;

    cursor: grab;

    &.is-grabbing {
      cursor: grabbing;
    }

    .cta {
      display: none;
      position: absolute;
      top: 200px;
      background-color: $white;
      height: 56px;
      width: 56px;
      border: 1px solid $black;

      &.prev-cta {
        left: 40px;

        img {
          transform: rotate(-90deg);
        }
      }

      &.next-cta {
        right: 40px;

        img {
          transform: rotate(90deg);
        }
      }
    }
  }
  .embla__container {
    display: flex;
    height: 100%;
  }
  .embla__slide {
    cursor: pointer;
    height: 100%;
    flex: 0 0 80%;
    padding-left: 20px;

    &:not(:first-of-type) {
      h2 {
        height: 0;
        opacity: 0;
      }
    }

    &:not(:first-of-type) {
      p {
        height: 0;
        opacity: 0;
      }
    }

    &:hover {
      img {
        transform: scale(1.04);
      }
    }

    .slide-content {
      padding: 20px;
      border: 1px solid $black;
      box-shadow: 2px 2px 20px rgba($black, 0.5);

      .picture-w {
        overflow: hidden;

        img {
          width: 100%;
          height: 20vh;
          object-fit: cover;
          transition: transform 0.4s ease-in-out;

          @include tablet {
            height: 40vh;
          }
        }
      }

      p {
        margin-top: 40px;
        overflow: hidden;
      }
    }
  }
}
</style>

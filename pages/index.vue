<template>
  <section>
    <div class="embla" ref="embla">
      <div class="embla__container">
        <div
          class="embla__slide"
          v-for="(article, index) in articles.data"
          :key="index"
          :data-slug="article.attributes.slug"
        >
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
      <button class="cta prev-cta" ref="prev">
        <img src="~/assets/icons/arrow.svg" alt="" />
      </button>
      <button class="cta next-cta" ref="next">
        <img src="~/assets/icons/arrow.svg" alt="" />
      </button>
    </div>
  </section>
</template>

<script>
const { GoogleSpreadsheet } = require("google-spreadsheet");
import Vue from "vue";
import TextModule from "@/components/TextModule";
import EmblaCarousel from "embla-carousel";
import gsap from "gsap";
import getArticles from "~/graphql/getArticles";

export default {
  name: "IndexPage",

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

  // async mounted() {
  //   const creds = require('../config/google_sheets.json')
  //   const doc = new GoogleSpreadsheet('1L5-To9eGKp5X8675NtB1EMVCG0xzIvCY4CYDVlk_B7I');
  //   await doc.useServiceAccountAuth(creds);
  //   await doc.loadInfo();
  //   let sheet = doc.sheetsByIndex[0];
  //   let rows = await sheet.getRows()
  //   console.log(rows)
  // },

  // async asyncData({ $axios }) {
  // let response = await $axios.$get(`/api/articles?populate=deep`);
  // console.log(response.data[0].attributes.Content[0].__component)
  //},

  mounted() {
    const emblaNode = document.querySelector(".embla");
    const options = { loop: true, speed: 8 };

    this.embla = EmblaCarousel(emblaNode, options);

    this.embla.on("pointerDown", this.isGrabbing);
    this.embla.on("pointerUp", this.isNotGrabbing);
    this.embla.on("select", this.onSelect);

    this.$refs.prev.addEventListener("click", this.embla.scrollPrev);
    this.$refs.next.addEventListener("click", this.embla.scrollNext);

    this.embla.slideNodes().forEach((slide, index) => {
      slide.addEventListener("click", (e) => this.onSlideClick(e, index));
    });

    //console.log(this.embla.slideNodes());

    // this.embla.slideNodes().foreach((slide) => {
    //   console.log(slide);
    // });
    // let componentsList = ['TextModule', 'TextModule', 'TextModule']
    // componentsList.forEach(component => {
    //   if(component == 'TextModule') module = TextModule
    //   let comp = Vue.extend(module)
    //   let instance = new comp()
    //   instance.$mount()
    //   this.$refs.textW.appendChild(instance.$el)
    // })
  },

  methods: {
    isGrabbing() {
      this.$refs.embla.classList.add("is-grabbing");
    },
    isNotGrabbing() {
      this.$refs.embla.classList.remove("is-grabbing");
    },
    onSelect() {
      const prevSlide =
        this.embla.slideNodes()[this.embla.previousScrollSnap()];
      const prevTitle = prevSlide.querySelector("h2");
      const prevDescription = prevSlide.querySelector("p");
      const currSlide =
        this.embla.slideNodes()[this.embla.selectedScrollSnap()];
      const currTitle = currSlide.querySelector("h2");
      const currDescription = currSlide.querySelector("p");
      const tl = gsap.timeline();
      tl.to(
        [prevTitle, prevDescription],
        {
          height: 0,
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        },
        0
      );
      tl.to(
        [currTitle, currDescription],
        {
          height: "auto",
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        0.2
      );
    },
    onSlideClick(e, index) {
      if (this.embla.clickAllowed())
        this.$router.push(
          "/article/" + this.embla.slideNodes()[index].dataset.slug
        );
      else {
        e.preventDefault();
        e.stopPropagation();
      }
    },
  },

  computed: {
    formattedUrlImage() {
      return (article) =>
        article.attributes.image.data.attributes.url.replace(
          "/uploads/",
          process.env.API_STORAGE
        );
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  min-height: calc(100vh - 60px);
  max-height: 850px;

  .embla {
    position: relative;
    overflow: hidden;
    height: 100%;
    margin-top: 40px;
    cursor: grab;

    &.is-grabbing {
      cursor: grabbing;
    }

    .cta {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
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
          height: 500px;
          object-fit: cover;
          transition: transform 0.4s ease-in-out;
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

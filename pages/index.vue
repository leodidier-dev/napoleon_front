<template>
  <section>
    <div class="embla" ref="embla">
      <div class="embla__container">
        <div class="embla__slide">
          <div class="slide-content">
            <h2 class="fs-h2">Les régiments</h2>
            <img
              src="https://images.pexels.com/photos/4204094/pexels-photo-4204094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <p class="fs-p">
              Ce travail gigantesque ne pouvant être publié en un seul volume,
              nous avons choisi de découper le résultat en volumes successifs.
              Chaque fascicule concernera un canton du département. Entre 1791
              et 1814, son organisation a plusieurs fois évolué. La loi du 28
              pluviôse an VIII réorganisa le département. En 1801 et 1802 la
              suppression d’un certain nombre de cantons (Diemeringen,
              Fort-Vauban, Harskirchen, Ingwiller, …) et la création de deux
              nouveaux cantons Seltz et Woerth, y apportèrent une touche finale.
              Il nous a paru intéressant de choisir la répartition
              administrative telle qu’elle existait à cette époque et qui était
              arrivé à une certaine stabilité dans son aménagement.
            </p>
          </div>
        </div>
        <div class="embla__slide">
          <div class="slide-content">
            <h2 class="fs-h2">Les régiments</h2>
            <img
              src="https://images.pexels.com/photos/4204094/pexels-photo-4204094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <p class="fs-p">
              Ce travail gigantesque ne pouvant être publié en un seul volume,
              nous avons choisi de découper le résultat en volumes successifs.
              Chaque fascicule concernera un canton du département. Entre 1791
              et 1814, son organisation a plusieurs fois évolué. La loi du 28
              pluviôse an VIII réorganisa le département. En 1801 et 1802 la
              suppression d’un certain nombre de cantons (Diemeringen,
              Fort-Vauban, Harskirchen, Ingwiller, …) et la création de deux
              nouveaux cantons Seltz et Woerth, y apportèrent une touche finale.
              Il nous a paru intéressant de choisir la répartition
              administrative telle qu’elle existait à cette époque et qui était
              arrivé à une certaine stabilité dans son aménagement.
            </p>
          </div>
        </div>
        <div class="embla__slide">
          <div class="slide-content">
            <h2 class="fs-h2">Les régiments</h2>
            <img
              src="https://images.pexels.com/photos/4204094/pexels-photo-4204094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <p class="fs-p">
              Ce travail gigantesque ne pouvant être publié en un seul volume,
              nous avons choisi de découper le résultat en volumes successifs.
              Chaque fascicule concernera un canton du département. Entre 1791
              et 1814, son organisation a plusieurs fois évolué. La loi du 28
              pluviôse an VIII réorganisa le département. En 1801 et 1802 la
              suppression d’un certain nombre de cantons (Diemeringen,
              Fort-Vauban, Harskirchen, Ingwiller, …) et la création de deux
              nouveaux cantons Seltz et Woerth, y apportèrent une touche finale.
              Il nous a paru intéressant de choisir la répartition
              administrative telle qu’elle existait à cette époque et qui était
              arrivé à une certaine stabilité dans son aménagement.
            </p>
          </div>
        </div>
        <div class="embla__slide">
          <div class="slide-content">
            <h2 class="fs-h2">Les régiments</h2>
            <img
              src="https://images.pexels.com/photos/4204094/pexels-photo-4204094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <p class="fs-p">
              Ce travail gigantesque ne pouvant être publié en un seul volume,
              nous avons choisi de découper le résultat en volumes successifs.
              Chaque fascicule concernera un canton du département. Entre 1791
              et 1814, son organisation a plusieurs fois évolué. La loi du 28
              pluviôse an VIII réorganisa le département. En 1801 et 1802 la
              suppression d’un certain nombre de cantons (Diemeringen,
              Fort-Vauban, Harskirchen, Ingwiller, …) et la création de deux
              nouveaux cantons Seltz et Woerth, y apportèrent une touche finale.
              Il nous a paru intéressant de choisir la répartition
              administrative telle qu’elle existait à cette époque et qui était
              arrivé à une certaine stabilité dans son aménagement.
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

export default {
  name: "IndexPage",

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

  async asyncData({ $axios }) {
    // let response = await $axios.$get(`/api/articles?populate=deep`);
    // console.log(response.data[0].attributes.Content[0].__component)
  },

  mounted() {
    const emblaNode = document.querySelector(".embla");
    const options = { loop: true, speed: 8 };

    this.embla = EmblaCarousel(emblaNode, options);

    this.embla.on("pointerDown", this.isGrabbing);
    this.embla.on("pointerUp", this.isNotGrabbing);
    this.embla.on("select", this.onSelect);

    this.$refs.prev.addEventListener("click", this.prevSlide);
    this.$refs.next.addEventListener("click", this.nextSlide);
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
    prevSlide() {
      this.embla.scrollPrev();
    },
    nextSlide() {
      this.embla.scrollNext();
    },
    onSelect() {
      const prevSlide =
        this.embla.slideNodes()[this.embla.previousScrollSnap()];
      const prevTitle = prevSlide.querySelector("h2");
      const currSlide =
        this.embla.slideNodes()[this.embla.selectedScrollSnap()];
      const currTitle = currSlide.querySelector("h2");
      const tl = gsap.timeline();
      tl.to(
        prevTitle,
        {
          height: 0,
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        },
        0
      );
      tl.to(
        currTitle,
        {
          height: "auto",
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        0.2
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
    height: 100%;
    flex: 0 0 80%;
    padding-left: 20px;

    &:not(:first-of-type) {
      h2 {
        height: 0;
        opacity: 0;
      }
    }

    .slide-content {
      padding: 20px;
      border: 1px solid $black;
      box-shadow: 2px 2px 20px rgba($black, 0.5);

      img {
        width: 100%;
        height: 500px;
        object-fit: cover;
      }

      p {
        margin-top: 40px;
      }
    }
  }
}
// .main-card {
//   position: relative;
//   height: calc(100vh - 60px);

//   .img-w {
//     height: 100%;
//     width: 100%;

//     &:before {
//       content: '';
//       position: absolute;
//       height: 100%;
//       width: 100%;
//       inset: 0;
//       background-color: rgba(black, 0.3);
//     }

//     img {
//       height: 100%;
//       width: 100%;
//       object-fit: cover;
//     }
//   }

//   h2 {
//     position: absolute;
//     top: 45%;
//     left: 48px;
//     color: $white;
//     font-weight: 700;
//     font-size: 48px;
//     text-transform: uppercase;
//   }
// }
</style>

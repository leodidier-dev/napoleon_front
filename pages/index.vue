<template>
  <section class="home">
    <Navbar />
    <div class="hero">
    </div>
  </section>
</template>

<script>
const { GoogleSpreadsheet } = require('google-spreadsheet');
import Vue from 'vue'
import TextModule from '@/components/TextModule'

export default {
  name: 'IndexPage',

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

  mounted () {
    // let componentsList = ['TextModule', 'TextModule', 'TextModule']

    // componentsList.forEach(component => {
    //   if(component == 'TextModule') module = TextModule
    //   let comp = Vue.extend(module)
    //   let instance = new comp()
    //   instance.$mount()
    //   this.$refs.textW.appendChild(instance.$el)
    // })
  }
}
</script>

<style lang="scss" scoped>
  .home {
    
    .hero {
      position: relative;
      
      img {
        position: absolute;
        height: 70vh;
        width: 100%;
        object-fit: cover;
      }

      .text-w {
        position: absolute;
        z-index: 1;
      }
    }
  }
</style>
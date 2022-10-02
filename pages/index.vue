<template>
  <section>
    <div class="main-card">
      <div class="img-w">
          <img src="https://images.pexels.com/photos/4204094/pexels-photo-4204094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="">
      </div>
      <h2>Base de données</h2>
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
  .main-card {
    position: relative;
    height: calc(100vh - 60px);

    .img-w {
      height: 100%;
      width: 100%;

      &:before {
        content: '';
        position: absolute;
        height: 100%;
        width: 100%;
        inset: 0;
        background-color: rgba(black, 0.3);
      }

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    h2 {
      position: absolute;
      top: 45%;
      left: 48px;
      color: white;
      font-weight: 700;
      font-size: 48px;
      text-transform: uppercase;
    }
  }
</style>
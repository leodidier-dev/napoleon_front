<template>
    <div class="fs-h1"></div>
</template>

<script>
import articleQuery from "~/graphql/article";
export default {
    data() {
        return {
            articles: {
                data: [],
            },
        };
    },
    apollo: {
        articles: {
            prefetch: true,
            query: articleQuery,
            variables() {
                return { slug: this.$route.params.slug };
            },
        },
    },
    mounted(){
        console.log(this.articles.data[0])
    }
};
</script>

<style lang="scss">
div {
    background: red;
}
</style>
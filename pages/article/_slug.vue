<template>
    <div v-if="!loading" id="article-content">
        <h2 class="fs-article-category">{{ category }}</h2>
        <h1 class="fs-article-title">{{ title }}</h1>
        <div class="content" v-html="content"></div>
    </div>
</template>

<script>
import getArticle from "~/graphql/getArticle";
export default {
    data() {
        return {
            articles: {}, 
            loading: 0
        };
    },
    apollo: {
        $loadingKey: 'loading',
        articles: {
            prefetch: true,
            query: getArticle,
            variables() {
                return { 
                    slug: this.$route.params.slug 
                };
            },
        },
    },
    mounted(){
    },
    computed: {
        category() {
            return this.articles.data[0].attributes.category.data.attributes.name;
        },
        title() {
            return this.articles.data[0].attributes.title;
        },
        content() {
            return this.articles.data[0].attributes.content;
        }
    },
};
</script>

<style lang="scss">
#article-content {
    color: $black;
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;

    .content {
        margin-top: 30px;

        h1 {
           @include fs-h1;
            margin-top: 40px;
        }

        p {
            @include fs-p;
            text-align: justify;
            text-indent: 40px;
            margin-top: 16px;

            &:first-of-type {
                &::first-letter {
                    font-size: 150%;
                    font-weight: 800;
                }
            }

        }
    }
}
</style>

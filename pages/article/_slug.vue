<template>
    <div id="article-content" >
        <h1 class="title">{{ title }}</h1>
        <div class="content" v-html="content"></div>
    </div>
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
        console.log(this.articles.data[0].attributes.Content)
    },
    computed: {
        title() {
            return this.articles.data[0].attributes.Title
        },
        content() {
            return this.articles.data[0].attributes.Content
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

    .title {
        @include fs-h1;
    }
    .content {
        h1 {
           @include fs-h1;
            margin-top: 20px;
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

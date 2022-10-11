<template>
    <div v-if="!loading" id="article-content" ref="articleW">
        <h2 class="fs-article-category">{{ category }}</h2>
        <h1 class="fs-article-title">{{ title }}</h1>
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
        console.log(process.env.API_STORAGE)
        const formattedContent = this.content.replaceAll('/uploads/', process.env.API_STORAGE)
        const htmlContent = this.convertStringToHTML(`<section class="content">${formattedContent}</section>`)
        this.$refs.articleW.append(htmlContent)
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
    methods: {
        convertStringToHTML(content) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, 'text/html');
            return doc.body.firstChild;
        }
    }
};
</script>

<style lang="scss">
#article-content {
    color: $black;
    width: 80%;
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    padding-bottom: 200px;

    .content {
        margin-top: 30px;
        columns: 2;
        column-gap: 80px;

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

        figure.image {  
            margin-top: 32px;
            // max-width: 800px;
            margin-left: auto;
            margin-right: auto;

            img {
                width: 100%;
            }

            figcaption {
                @include fs-caption;
                margin-top: 16px;
                text-align: right;
            }
        }

        figure.table {
            margin-top: 32px;
            width: 100%;
            margin-left: auto;
            margin-right: auto;

            table {
                width: 100%;

                thead {
                    @include fs-caption;
                    text-align: left;
                    background-color: $black;
                    color: $white;

                    th {
                        padding: 4px 10px;
                    }
                }
                tbody {
                    @include fs-p;

                    td {
                        padding: 4px 16px;
                        
                    }
                }

              
                
            }
        }
    }
}
</style>

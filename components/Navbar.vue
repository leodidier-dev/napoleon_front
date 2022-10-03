<template>
    <nav>
        <h1 class="fs-h1">Premier empire dans le Bas-Rhin</h1>
        <ul class="menu">
            <li v-for="parent in parents" :key="parent.id" class="item">
                <button>{{parent.attributes.name}}</button>
                <ul class="dropdown">
                    <li v-for="child in childs(parent.attributes)" :key="child.attributes.slug">
                        <nuxt-link :to="`article/${child.attributes.slug}`">
                            {{child.attributes.title}}
                        </nuxt-link>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</template>

<script>
import getCategories from "~/graphql/getCategories";
export default {
    name: "Navbar",
    data() {
        return {
            categories: {}
        };
    },
    apollo: {
        categories: {
            prefetch: true,
            query: getCategories,
        },
    },
    computed: {
        parents() {
            return this.categories.data;
        },
        childs() {
            return parent => parent.articles.data
        }
    },

    mounted(){
    }
};
</script>

<style lang="scss" scoped>
$height: 100px;
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 24px;

    .menu {
        display: flex;
        column-gap: 20px;

        li, button {
            display: inline;
            font-weight: 600;
            font-size: 14rem;
            text-transform: uppercase;
            position: relative;
        }

        .item {

            button {
                &:before {
                    content: '';
                    position: absolute;
                    z-index: 3;
                    bottom: -8px;
                    width: 100%;
                    height: 1px;
                    background-color: black;
                    transform: scale(0);
                    transition: transform 0.4s ease-out;
                }
            }

            .dropdown {
                overflow: hidden;
                position: absolute;
                right: -10px;
                top: 100%;
                // margin-top: 16px;
                z-index: 1;
                opacity: 0;
                transform: translate(-10px, 10px);
                min-width: 100px;
                background: white;
                transition: all 0.2s ease-in;
                padding-bottom: 6px;

                li {
                    display: block;
                    padding: 6px 10px;
                    

                    &:first-of-type {
                        padding-top: 30px;
                    }
                }
            }

            &:hover {

                button {
                    &:before {
                        transform: scale(1);
                    }
                }

                .dropdown {
                    opacity: 1;
                    transform: translate(0, 0);
                    z-index: 2;
                    transition: all 0.4s ease-out;
                }
            }
        }
    }
}

</style>
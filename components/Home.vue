<template>
    <div class="container_home">
        <!-- Content -->
        <div class="content_main">
            <div class="slider" v-if="SliderBook">
                <h2 class="text">Recommended book > </h2>
                <VueSlickCarousel class="my_carousel" v-bind="settings">
                    <div class="slider_items" v-for="slider in 9" :key="slider">
                        <div class="border_img_slider">
                            <img class="img_book_slider" :src="DataSlide.items[slider]?.cover_link" alt=""
                                @click="transformPages({ id: DataSlide.items[slider]?.id, id_book: DataSlide.items[slider]?.book_id })">
                        </div>
                        <div class="text_book_slider">
                            <p class="text_title_hover"
                                @click="transformPages({ id: DataSlide.items[slider]?.id, id_book: DataSlide.items[slider]?.book_id })">
                                {{ DataSlide.items[slider]?.title }}
                            </p>
                            <span>
                                <font-awesome-icon :icon="['fas', 'star']" />
                                {{ ' ' + DataSlide.items[slider]?.average_rating }}
                            </span>
                        </div>
                        <div class="text_title">
                            <p class="text_title_hover">{{ DataSlide.items[slider]?.title }}</p>
                        </div>
                    </div>
                </VueSlickCarousel>
            </div>

            <div id="content">
                <h2 style="margin-left: 13px;" class="text" v-if="SliderBook">Newly updated books > </h2>
                <div class="box_book">
                    <div class="box" v-for="(book, index) in DataBook?.items" :key="index">

                        <div class="box_view" style="display: inline">
                            <img class="img_book_css" :src="book?.cover_link" :alt="'Loading Img ...'"
                                @click="transformPages({ id: book.id, id_book: book.book_id })" />
                            <tippy interactive :animateFill='false' placement="right" theme="honeybee" arrowType="round"
                                trigger="mouseenter" arrow>
                                <div>
                                    <div class="home_box_review">
                                        <div class="detail_book">
                                            <div class="home_title_reviewbook"
                                                @click="transformPages({ id: book.id, id_book: book.book_id })">
                                                {{ book.title }}
                                            </div>
                                            by<span class="home_name_author"><a :href="book.author_link">{{ ' ' +
                                                book.author
                                            }}</a></span>
                                            <div class="home_review_star">
                                                <star-rating v-model="book.average_rating" :show-rating="false"
                                                    :read-only="true" :increment="0.01" :inline="true" :star-size="17"
                                                    active-color="#e87400"></star-rating>
                                                <p class="text_rate"> {{ book.average_rating }}</p>
                                                <span v-if="book.rating_count">&#160; {{ book.rating_count }} rating</span>
                                                <span v-if="book.review_count">&#160; {{ book.review_count }} review</span>
                                            </div>
                                        </div>
                                        <div class="home_info_author">
                                            <p v-if="checkMore(index) === '...more' && book.description.length > 200">
                                                {{ book.description.slice(0, 200) }}
                                                <button class="more" @click="seeMorePrgh(index)">
                                                    {{ checkMore(index) }}
                                                </button>
                                            </p>
                                            <p v-else>
                                                {{ book.description }}
                                                <button class="more" @click="seeMorePrgh(index)"
                                                    v-if="book.description.length > 200">
                                                    {{ checkMore(index) }}
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </tippy>
                            <div class="text_book">
                                <h3 @click="transformPages({ id: book.id, id_book: book.book_id })">
                                    {{ book?.title }}
                                </h3>
                                <span class="box_author">
                                    {{ book?.author }}
                                </span>
                            </div>
                            <div class="want_to_read">
                                <button class="review"
                                    @click="transformPages({ id: book?.id, id_book: book?.book_id })">Want to
                                    read</button>
                            </div>

                            <div class="votes_css">
                                <div class="star">
                                    <font-awesome-icon :icon="['fas', 'star']" style="color: #e87400;"
                                        v-if="book?.average_rating" />
                                    <font-awesome-icon :icon="['far', 'star']" v-else />
                                    <h2> {{ book?.average_rating }} </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <RankBooks :RankDay="RankDay"></RankBooks> -->
            </div>
            <RankBooks></RankBooks>
        </div>
        <!-- // Pagination -->
        <div class="pagination_main">
            <p>Current page: {{ currentPage.page }}</p>
            <button @click="getBook(), scrollToTop()">
                <pagination :totalPages="currentPage.totalPages" :perPage="currentPage.limitPage"
                    :currentPage="currentPage.page" @pagechanged="onPageChange" />
            </button>
        </div>
    </div>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
// *********************************
import StarRating from 'vue-star-rating';
import RankBooks from '@/components/RankBooks';
import Loading from "@/components/Loading";
import tippy from 'tippy.js';
import Pagination from '@/components/Pagination.vue';
export default {
    components: {
        StarRating,
        Loading,
        RankBooks,
        VueSlickCarousel,
        Pagination,
    },
    data() {
        return {
            urlBook: "https://backend-guideline-api.vais.vn/api/books",
            urlUser: "https://64b4bf820efb99d86269398b.mockapi.io/user",
            id_book: null,
            objPage: null,
            rate: null,
            moreOrLess: [],
            settings: {
                "dots": true,
                "focusOnSelect": true,
                "infinite": true,
                "speed": 500,
                "autoplay": true, // Tự động nhảy slider
                "autoplaySpeed": 2000, // Tốc độ tự động nhảy (3 giây)
                "arrows": true,
                "useTransform": true,
                "slidesToShow": 7,
                "slidesToScroll": 1,
                "touchThreshold": 3,
                "touchMove": true,
                "responsive": [
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1
                        }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                ]
            }
        };
    },
    computed: {
        DataBook() {
            return this.$store.state.user.DataBook
        },
        DataSlide() {
            return this.$store.state.user.dataTopMonth;
        },
        SliderBook() {
            return this.$store.state.user.nodeSlider
        },
        getSearch() {
            return this.$store.state.user.search;
        },
        currentPage() {
            return this.$store.state.user.objPage;
        },

    },
    watch:{
    
    },
    async created() {
        await this.$store.dispatch('user/user_getRankBooks');
        this.objPage = { ...this.currentPage };
    },
    updated(){
        
    },
    methods: {
        // Get
        async getBook() {
            try {
                const { data } = await this.$axios.$get(this.urlBook, {
                    params: {
                        page: this.currentPage.page,
                        limit: this.currentPage.limitPage,
                        search: this.getSearch,
                    },
                });
                this.$store.dispatch('user/user_DataBook', data);
                this.objPage.totalPages = data.totalPages;
                this.$store.dispatch('user/user_CurrentPage', this.objPage);
            } catch (error) {
                console.log("error get Data Books", error);
            }
        },
        // Router
        transformPages(Obj) {
            this.$router.push({
                name: 'book',
                path: '/:book/',
                params: { book: 'example', id: `${Obj.id}` },
                query: { id: `${Obj.id}`, book_id: `${Obj.id_book}` },

            })
        },
        checkMore(keyId) {
            const check = this.moreOrLess.includes(keyId)
            if (check) {
                return '(less)';
            } else {
                return '...more';
            }
        },
        seeMorePrgh(keyId) {
            const check = this.moreOrLess.includes(keyId);
            if (!check) {
                this.moreOrLess.push(keyId);
            } else {
                this.moreOrLess = this.moreOrLess.filter(e => e !== keyId)
            }
        },
        onPageChange(page) {
            console.log('chang pagination')
            this.objPage.page = page;
            this.$store.dispatch('user/user_CurrentPage', this.objPage);
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
            });
        },
    },
}

</script>

<style scoped>
.star {
    display: flex;
}

.star>svg {
    margin-top: 0.1rem;
}

.star h2 {
    margin-left: 0.4rem;
}

.home_box_review {
    display: block;
    background-color: #fff;
    text-align: left;
    color: black;
    padding: 12px 11px;
}

.detail_book {
    line-height: 21px;
    margin-bottom: 17px;
}

.home_title_reviewbook {
    font-weight: bolder;
    font-family: "Roboto Mono", Monaco;
}

.home_name_author:hover,
.home_title_reviewbook:hover {
    text-decoration: underline;
    cursor: pointer;
}

.home_name_author:hover,
.home_name_author {
    font-style: italic;
    font-family: initial;
}

.home_review_star {
    display: flex;
}

.text_rate {
    position: relative;
    top: 2px;
    left: 0.1rem;
    font-family: Courier, monospace;
    font-weight: 600;
    font-size: 16px;
}

.home_review_star>span {
    opacity: 0.7;
    opacity: 0.7;
    font-size: 10px;
    position: relative;
    top: 0.15rem;
}

.home_info_author {
    font-size: 12px;
}


.more {
    color: rgb(50, 118, 206);
}

.more:hover {
    color: green;
    text-decoration: underline;
}

.boder_award {}

/* .slider_items {
  width: 100%;
  transition: transform 1s ease;
} */
</style>

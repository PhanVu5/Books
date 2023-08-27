<template>
    <div class="slider" v-if="SliderBook">
        <h2 class="text">Recommended book > </h2>
        <VueSlickCarousel class="my_carousel" v-bind="settings">
            <div class="slider_items" v-for="slider in 10" :key="slider">
                <img class="img_book_slider" :src="DataBook.items[slider]?.cover_link" alt=""
                    @click="transformPages({ id: DataBook.items[slider]?.id, id_book: DataBook.items[slider]?.book_id })">
                <div class="text_book_slider">
                    <p class="text_title_hover"
                        @click="transformPages({ id: DataBook.items[slider]?.id, id_book: DataBook.items[slider]?.book_id })">
                        {{ DataBook.items[slider]?.title }}
                    </p>
                    <span>
                        <font-awesome-icon :icon="['fas', 'star']" />
                        {{ ' ' + DataBook.items[slider]?.average_rating }}
                    </span>
                </div>
                <div class="text_title">
                    <p class="text_title_hover">{{ DataBook.items[slider]?.title }}</p>
                </div>
            </div>
        </VueSlickCarousel>
    </div>
</template>

<script>
export default {
    props: {
        DataBook: {
            type: Array,
            default: false
        }
    },
    methods: {

    }
}
</script>

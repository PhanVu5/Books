<template>
    <div class="containReview">
        <div class="info_book">
            <img :src="{srcImg}" alt="" class="img_book">
            <div class="info"></div>
            <h3 class="title"></h3>
            <span class="author"></span>
            <span class="review"></span>
            <button class="read">Read</button>
        </div>

        <div class="rateStar">
            <select :on-change="1" class="star">
                <option value="one_star_ratings">5*</option>
                <option value="two_star_ratings">4*</option>
                <option value="three_star_ratings">3*</option>
                <option value="four_star_ratings">2*</option>
                <option value="five_star_ratings">1*</option>
            </select>
            <div class="comment">

            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        props: {
            DataBook: {
                type: Array,
                default: false
            },
            id_book: String
        },
        methods:{
            srcImg() {
                return this.DataBook.filter(id => id === id_book).cover_link
            }
        }
    }
</script>
    
    
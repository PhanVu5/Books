<template>
    <div class="">
    Day la trang sach
    <button @click="clickme()">Click me</button>
    </div>
</template>

<script>
    export default {
        // props: {
        //     DataBook: {
        //         type: Array,
        //         default: false
        //     },
        //     id_book: String
        // },
        methods:{
            srcImg() {
                return this.DataBook.filter(id => id === id_book).cover_link
            },
            clickme(){
                this.$router.push({path: `/book/123412312 `})
            }
        }
    }
</script>
    
    
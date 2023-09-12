<template>
    <!-- <slot></slot> -->
</template>

<script>
export default{
    data(){
        return {

        }
    },
    computed:{
        HistoryUserRead(){
            return this.$store.state.user.user !== null ? this.$store.state.user.user.HistoryRead : [];
        }
    },
    created(){

    },
    methods:{

    }
}
</script>
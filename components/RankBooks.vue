<template>
    <div class="rank_container">
        <div class="rank_menu" ref="type_top">
            <div class="section-bar clearfix">
                <div class="section-title">
                    <span>Highlights</span>
                    <ul class="halim-popular-tab">
                        <li class="day active" @click="OptionTypeTop('day')" :disabled="disiable">
                            <button>Day</button>
                        </li>
                        <li class="week" @click="OptionTypeTop('week')" :disabled="disiable">
                            <button>Week</button>
                        </li>
                        <li class="month" @click="OptionTypeTop('month')" :disabled="disiable">
                            <button>Month</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="box_rank">
                <div class="table_box_rank" v-for="(book, index) in RankBooks.items">
                    <h1 class="text_top" v-if="index < 9">{{ '0' + (index + 1) }}</h1>
                    <h1 class="text_top" v-else>{{ index + 1 }}</h1>
                    <div class="item_link">
                        <img :src="book?.cover_link" :alt="'Loading Img ...'">
                    </div>
                    <div class="title_rank">
                        <h3>{{ book?.title }}</h3>
                        <span> {{ book?.rating_count }} view </span>
                    </div>
                </div>
            </div>

            <Loading class="none"></Loading>
        </div>
        <slot></slot>
    </div>
</template>

<script>
import Loading from "@/components/Loading";
export default {
    components: {
        Loading
    },
    data() {
        return {
            disiable: false,
            RankBooks: [],
        }
    },
    mounted() {
        this.OptionTypeTop('day')

    },
    watch: {
        disiable() {
            this.RankBooks
        }
    },
    computed: {
        RankDay() {
            return this.$store.state.user.dataTopDay;
        },
        RankWeek() {
            return this.$store.state.user.dataTopWeek;
        },
        RankMonth() {
            return this.$store.state.user.dataTopMonth;
        }
    },
    methods: {
        async OptionTypeTop(classActive) {
            const refs = this.$refs;
            refs.type_top.querySelector('.day').setAttribute("class", "day");
            refs.type_top.querySelector('.week').setAttribute("class", "week");
            refs.type_top.querySelector('.month').setAttribute("class", "month");
            refs.type_top.querySelector(`.${classActive}`).classList.add('active');

            refs.type_top.querySelector('.slomotion').setAttribute("class", "slomotion");
            refs.type_top.querySelector('.box_rank').setAttribute("class", "box_rank none");

            await this.$store.dispatch('user/user_getRankBooks');
            if (classActive === 'day') {
                this.RankBooks = this.RankDay;
            } else if (classActive === 'week') {
                this.RankBooks = this.RankWeek;
            } else {
                this.RankBooks = this.RankMonth;
            }


            refs.type_top.querySelector('.box_rank').classList.remove('none');
            refs.type_top.querySelector('.slomotion').classList.add('none');
        }
    }
}
</script>
<style scoped>
.rank_menu {
    position: relative;
    bottom: 11rem;
    left: 3.5%;
}

.section-bar {
    position: relative;
    margin: 15px 0;
}

.clearfix {
    content: " ";
    display: table;
}

.section-title {
    font-size: 16px;
    line-height: 20px;
    margin: 0;
    position: relative;
}

.section-title:before {
    content: '';
    border-bottom: 1px solid #1e2732 !important;
    position: absolute;
    bottom: 0;
    width: 100%;
}

.section-title span {
    float: left;
    font-size: 15px;
    padding: 10px 0;
    color: #a5cbef;
    background: linear-gradient(to right, #ff8a00, #ff2070);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    font-weight: 700;
    border-bottom: 1px solid #da1b60 !important;
}

.section-title span:before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    background: linear-gradient(to right, #ff8a00, #ff2070);
    padding: 0.5px;
}

.section-title span::after {
    content: '';
}

.section-title .halim-popular-tab {
    display: flex;
    padding: 0;
    position: absolute;
    left: 191%;
    top: 3px;
}

.halim-popular-tab li:first-child {
    border-top-left-radius: 3px;
}

.halim-popular-tab li:last-child {
    border-top-right-radius: 3px;
}

.halim-popular-tab li {
    border: 1px solid #1b2b3a;
    padding: 5px 8px;
    list-style: none;
    float: left;
    margin: -1px !important;
}

.halim-popular-tab li.active {
    background: #1b2a39;
    border: 1px solid #1b2a3900;
    background-size: 200% 100%;
    background: #769117;
    position: relative;
}

.halim-popular-tab li.active:after {
    content: '';
    border-bottom: 6px solid #769117;
    border-left: 6px solid transparent;
    display: block;
    border-right: 6px solid transparent;
    bottom: -10px;
    left: 50%;
    position: absolute;
    -webkit-transform: translate(-50%, -50%) rotate(180deg);
    transform: translate(-50%, -50%) rotate(180deg);
    z-index: 1;
}

.halim-popular-tab li.active button {
    color: #fff;
}

.halim-popular-tab li button {
    font-size: 10px;
    font-weight: normal;
    text-transform: none;
    cursor: pointer;
}

.text_top {
    margin: auto;
    font-size: 41px;
    padding: 0 5px;
    font-weight: 600;
    color: #a5cbef;
    background: linear-gradient(to right, #ffd900, #ff2076);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: -webkit-box;
}

.table_box_rank {
    display: flex;
    width: 20%;
    padding: 4px 0;
    background: #f1f1f1;
    border: 0.009rem solid #c2bebe;
}

.rank_menu .table_box_rank:hover {
    background-position: right center;
}

.table_box_rank img {
    height: 100%;
}

.table_box_rank img,
.rank_menu .table_box_rank {
    transition: all .3s ease-in-out;
}

.rank_menu .table_box_rank {
    margin: 1px 0;
    padding-right: 10px;
    list-style-type: none;
    overflow: hidden;
    background: #f1f1f1;
    background-size: 206% 100%;
    background-image: linear-gradient(to right, #f1f1f1 0%, rgba(17, 21, 21, 0) 51%, #4a5b10 50%);
    transition: .8s;
    position: relative;
    cursor: pointer;
}

.item_link {
    display: block;
    overflow: hidden;
    width: 106px;
    margin: auto 5px;
    height: 79px;
}

.table_box_rank:hover img {
    transform: scale(1.1);
}

.title_rank {
    display: block;
    width: 16rem;
    padding: 2px 15px 2px 15px;
}

.rank_menu .table_box_rank:hover .title_rank h3 {
    color: #e7ac32;
}

.title_rank h3 {
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}

.title_rank span {
    font-size: 0.8rem;
    color: #e7ac32;
}

.none {
    display: none;
}

@keyframes configure-clockwise {
    0% {
        transform: rotate(0);
    }

    25% {
        transform: rotate(90deg);
    }

    50% {
        transform: rotate(180deg);
    }

    75% {
        transform: rotate(270deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes configure-xclockwise {
    0% {
        transform: rotate(45deg);
    }

    25% {
        transform: rotate(-45deg);
    }

    50% {
        transform: rotate(-135deg);
    }

    75% {
        transform: rotate(-225deg);
    }

    100% {
        transform: rotate(-315deg);
    }
}


.spinner-box {
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
}

.configure-border-1 {
    width: 115px;
    height: 115px;
    padding: 3px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fb5b53;
    animation: configure-clockwise 3s ease-in-out 0s infinite alternate;
}

.configure-core {
    width: 100%;
    height: 100%;
    background-color: #1d2630;
}

.configure-border-2 {
    width: 115px;
    height: 115px;
    padding: 3px;
    left: -115px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(63, 249, 220);
    transform: rotate(45deg);
    animation: configure-xclockwise 3s ease-in-out 0s infinite alternate;
}

.configure-core {
    width: 100%;
    height: 100%;
    background-color: #1d2630;
}
</style>
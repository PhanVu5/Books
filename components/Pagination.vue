<template>
    <ul class="pagination">
        <li class="pagination-item first">
            <button class="btn_option_pgnt_HE" type="button" @click="onClickFirstPage" :disabled="disabledFirst">
                First
            </button>
        </li>

        <li class="pagination-item previous " @click="isInFirstPage()">
            <button class="btn_option_pgnt btn" type="button" @click="onClickPreviousPage" :disabled="disabledFirst">
                <font-awesome-icon :icon="['fas', 'angles-left']" />
            </button>
        </li>

        <!-- Visible Buttons Start -->

        <li v-for="page in pages" class="pagination-item numb" :key="page.name">
            <button class="btn_option_pgnt" type="button" @click="onClickPage(page.name)" :disabled="page.isDisabled"
                :class="{ active: isPageActive(page.name) }">
                {{ page.name }}
            </button>
        </li>

        <!-- Visible Buttons End -->

        <li class="pagination-item next " @click="isInLastPage()">
            <button class="btn_option_pgnt btn" type="button" @click="onClickNextPage" :disabled="disabledLast">
                <font-awesome-icon :icon="['fas', 'angles-right']" />
            </button>
        </li>

        <li class="pagination-item last">
            <button class="btn_option_pgnt_HE" type="button" @click="onClickLastPage" :disabled="disabledLast">
                Last
            </button>
        </li>
    </ul>
</template>
  
<script>
export default {
    props: {
        maxVisibleButtons: {
            type: Number,
            required: false,
            default: 3
        },
        totalPages: {
            type: Number,
            required: true
        },
        perPage: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            disabledFirst: null,
            disabledLast: null,
        }
    },
    updated() {
        this.isInFirstPage();
        this.isInLastPage();
    },
    computed: {
        startPage() {
            // When on the first page
            if (this.currentPage === 1) {
                return 1;
            }

            // When on the last page
            if (this.currentPage === this.totalPages) {
                return this.totalPages - this.maxVisibleButtons;
            }

            // When inbetween
            return this.currentPage - 1;
        },
        pages() {
            const range = [];

            for (
                let i = this.startPage;
                i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
                i++
            ) {
                range.push({
                    name: i,
                    isDisabled: i === this.currentPage
                });
            }

            return range;
        },
    },
    methods: {
        isInFirstPage() {
            this.disabledFirst = this.currentPage <= 1;
        },
        isInLastPage() {
            this.disabledLast = this.currentPage >= this.totalPages;
        },
        onClickFirstPage() {
            console.log(2);
            this.$emit('pagechanged', 1);
        },
        onClickPreviousPage() {
            console.log(2);
            this.$emit('pagechanged', this.currentPage - 1);
        },
        onClickPage(page) {
            console.log(2);
            this.$emit('pagechanged', page);
        },
        onClickNextPage() {
            console.log(2);
            this.$emit('pagechanged', this.currentPage + 1);
        },
        onClickLastPage() {
            console.log(2);
            this.$emit('pagechanged', this.totalPages);
        },
        isPageActive(page) {
            console.log(2);
            return this.currentPage === page;
        }

    }
}
</script>
  
<style scoped></style>
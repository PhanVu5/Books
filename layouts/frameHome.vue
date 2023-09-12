<template>
    <div>
        <div id="header" ref="head_frame">
            <div ref="user_account" class="header_method">

                <button class="title_page" @click="BackHome()" title="Back Home">
                    <a @click="scrollToTop()">
                        <img class="logo" style="padding-bottom: 3px;" src="@/assets/logo/pages-book-green-300x240.png"
                            alt="Logo app">
                        <p>Word Village</p>
                    </a>
                </button>
                <div class="research search">
                    <input class="ip_search" type="text" placeholder="Search in the bookstore" v-model="search"
                        v-on:keyup.enter="onPageChangeHome(), getBook()">
                    <button class="btn_search" @click="onPageChangeHome(), getBook()">
                        <font-awesome-icon :icon="['fa', 'search']" />
                    </button>
                </div>
                <div class="function_user_acount" v-if="signInDone">
                    <div class="sign_up" @click="modelSignUp">
                        <font-awesome-icon :icon="['far', 'handshake']" style="opacity: 60%;" />
                        Sign up
                    </div>
                    <div class="sign_in" @click="modelSignIn">
                        <font-awesome-icon :icon="['fas', 'arrow-right-to-bracket']" style="opacity: 60%;" />
                        Sign In
                    </div>
                </div>
                <div class="function_user_acount_signdone" v-else>
                    <div class="notify">
                        <button class="bell">
                            <font-awesome-icon :icon="['fas', 'bell']" style="color: #050505;" />
                        </button>
                    </div>
                    <div class="user">
                        <img class="img_user_profile" src="@/assets/logo/lover.png" :alt="'Loading Img ...'" />
                        <tippy interactive :animate-fill="false" placement="bottom" arrowType="round" theme="light"
                            :trigger="scrollPosition>=98?'mouseenter focus':'click'" arrow>
                            <div class="function_user">
                                <button class="li_profile">
                                    <font-awesome-icon :icon="['far', 'user']" />
                                    Your profile
                                </button>
                                <hr class="solid">
                                <button class="sign_out" @click="signOut_action()">
                                    <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" style="opacity: 60%;" />
                                    Sign out
                                </button>
                            </div>
                        </tippy>
                    </div>
                </div>
            </div>
            <nav class="nav_header">
                <div class="direction">
                    <ul class="contain_direction">
                        <li class="home nav_color_position" @click="OptionTypeTop('home')"><button @click="BackHome()"
                                title="Back Home">
                                Home
                            </button>
                        </li>
                        <li class="li_method_acess">
                            My Book
                            <ul class="ul_acess_user">
                                <li>Book Borrow</li>
                                <li>Book Upload</li>
                            </ul>
                        </li>
                        <li class="history" @click="OptionTypeTop('history')"><button @click="BackHome()">
                                History
                            </button>
                        </li>
                        <li class="community" @click="OptionTypeTop('community')"><button @click="BackHome()">
                                Community
                            </button>
                        </li>
                        <li class="li_profile" @click="OptionTypeTop('li_profile')">
                            <font-awesome-icon :icon="['fas', 'book-bookmark']" />
                            Libary
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

        <!--Account-->
        <div class="acount" v-if="signIn" @click="closeSignIn()">
        </div>
        <SignIn :signin="signIn" @Close_Account="handleDataClose"></SignIn>
        <div class="acount" v-if="signUp" @click="closeSignUp()">
        </div>
        <SignUp :signup="signUp" @Close_Account="handleDataClose"></SignUp>
        <Nuxt/>

        <Footer></Footer>
    </div>
</template>

<script >
import SignUp from "@/components/SignUp.vue";
import SignIn from "@/components/SignIn.vue";
import Footer from "@/components/Footer.vue"
export default {
    components: {
        SignUp,
        SignIn,
        Footer,
    },
    data() {
        return {
            scrollPosition: 0,
            urlBook: "https://backend-guideline-api.vais.vn/api/books",
            search: '',
            objPage: null,
        }
    },
    computed: {
        getSearch() {
            return this.$store.state.user.search;
        },
        signInDone() {
            // (sign in -> true) && (sign out -> false) { html: turn on sign in || turn on sign out }
            return this.$store.state.user.user !== null ? false : true;
        },
        signIn() {
            return this.$store.state.user.signIn
        },
        signUp() {
            return this.$store.state.user.signUp
        },
        currentPage() {
            return this.$store.state.user.objPage;
        }
    },
    watch: {
        scrollPosition() {
            this.handleScroll();
        }
    },
    created() {
        this.getBook();
        this.objPage = { ...this.currentPage };
    },
    mounted() {
        console.log('ref here', this.$refs.head_frame);
        // Thêm sự kiện cuộn vào window để cập nhật vị trí cuộn
        window.addEventListener('scroll', this.handleScroll);

        // Lấy vị trí cuộn ban đầu
        this.scrollPosition = window.pageYOffset;
    },
    beforeDestroy() {
        // Loại bỏ sự kiện cuộn khi không còn cần thiết
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            const refs = this.$refs;
            // Cập nhật vị trí cuộn khi sự kiện cuộn xảy ra
            this.scrollPosition = window.pageYOffset;
            if (this.scrollPosition >= 99) {
                refs.head_frame.querySelector('.header_method').classList.add('none');
            } else {
                refs.head_frame.querySelector('.header_method').setAttribute('class', 'header_method')
            }
        },
        async OptionTypeTop(classActive) {
            const refs = this.$refs;
            refs.head_frame.querySelector('.home').setAttribute("class", "home");
            refs.head_frame.querySelector('.history').setAttribute("class", "history");
            refs.head_frame.querySelector('.community').setAttribute("class", "community");
            refs.head_frame.querySelector('.li_profile').setAttribute("class", "li_profile");
            refs.head_frame.querySelector(`.${classActive}`).classList.add('nav_color_position');
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth', // Sử dụng cuộn mượt
            });
        },
        // Get
        async getBook() {
            try {
                this.$store.dispatch('user/user_search', this.search)
                const { data } = await this.$axios.$get(this.urlBook, {
                    params: {
                        page: this.currentPage.page,
                        limit: this.currentPage.limitPage,
                        search: this.search,
                    },
                });
                this.$store.dispatch('user/user_DataBook', data);
                this.objPage.totalPages = data.totalPages;
                this.$store.dispatch('user/user_CurrentPage', this.objPage);
            } catch (error) {
                console.log("error network", error);
            }
        },
        closeSignIn() {
            this.$store.dispatch('user/user_NodeSignIn', false)
        },
        closeSignUp() {
            this.$store.dispatch('user/user_NodeSignUp', false)
        },
        // BackHome
        BackHome() {
            this.search = null
            // this.$store.dispatch('user/user_search', null)
            this.onPageChangeHome();
            this.getBook();
        },
        handleDataClose(var_sign) {
            this.$store.dispatch('user/user_NodeSignIn', var_sign);
            this.$store.dispatch('user/user_NodeSignUp', var_sign);
        },
        signOut_action() {
            this.$refs.user_account.querySelector('.search').setAttribute('class', 'search search_logout');
            return this.$store.dispatch('user/user_signOut')
        },
        modelSignIn() {
            this.$store.dispatch('user/user_NodeSignIn', true);
            this.$store.dispatch('user/user_NodeSignUp', false);
        },
        modelSignUp() {
            this.$store.dispatch('user/user_NodeSignUp', true);
            this.$store.dispatch('user/user_NodeSignIn', false);
        },
        onPageChangeHome() {
            console.log('changeHome');
            this.$router.push({
                name: 'index',
                path: '/',
                component: 'pages/index.vue',
            })
            this.objPage.page = 1;
            this.$store.dispatch('user/user_CurrentPage', this.objPage);
        },

    },
}
</script>
<style scoped>
.acount {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(250, 250, 250, 0.5);
    z-index: 3;
}

#header .header_method .ip_search {
    background-clip: padding-box;
    background-color: #fff;
    border: 2px solid #c9c9c9;
    border-radius: 4px;
    box-shadow: 2px 2px 1px rgba(0, 1, 1, 0.05) inset;
    width: 340px;
    height: 20px;
    padding: 13px 5px;
    margin: 17px 0;
    font-size: 16px;
}

#header .header_method .search {
    margin: 0px auto;
}

/* .search_logout {
    margin: 0px auto !important;
} */

#header .header_method .notify:hover,
#header .header_method .notify {
    position: relative;
    right: 13px;
    padding: 2px 7px;
    margin: 29px 0;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: #E4E6EB;
}

#header .header_method .notify:hover {
    background-color: #d3d6db;
}

.bell {
    position: absolute;
    bottom: 2px;
    right: 11px;
}

.user {
    position: relative;
    top: -0.1rem;
    padding: 2px 7px;
    margin: 29px 0;
}

.function_user_acount,
.function_user_acount_signdone {
    display: flex;
    color: #000;
}

.function_user_acount>button:hover,
.function_user_acount>button,
.function_user_acount_signdone>button:hover,
.function_user_acount_signdone>button {
    width: 100%;
    padding: 4px;
    text-align: left;
    padding-left: 11px;
    margin: 5px 0;
    border-radius: 5px;
}

.function_user_acount_signdone>button:hover {
    opacity: 0.8;
    background: #bbb8b882;
}

.function_user>button:hover,
.function_user>button {
    width: 100%;
    padding: 4px 32px 4px 11px;
    text-align: left;
    margin: 5px 0;
    border-radius: 5px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}

.function_user>button:hover {
    background-color: #bbb8b882;
}

.sign_out:hover {}

.img_user_profile {
    border-radius: 50%;
    width: 40px;
    height: 40px;
}

hr.solid {
    border-top: 1px solid #bbb;
}
</style>


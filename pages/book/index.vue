<template>
  <div class="content_main">
    <main id="content">
      <!-- <input type="text" :value="$route.params.id" v-model="id" v-show="false"> -->
      <div class="BookPage__gridContainer">
        <div class="label_book">
          <div class="image">
            <img class="img_book" :src="Data.cover_link" alt="Loading">
          </div>
          <div class="button_read_buy">
            
            <a :href="selectedBook">
            <button class="read" style="background-color: #3f8363; color: #fff;">
                Read
              </button>
            </a>
            <a :href="Data.amazon_redirect_link">
              <button class="buy" style="border: 2px solid #3f8363;">
                Buy on Amazon
              </button>
            </a>
          </div>
        </div>
        <div class="details_book">
          <div class="title_reviewbook">
            {{ Data.title }}
          </div>
          <div class="info_author">
            <h4 class="name_author">{{ Data.author }}</h4>
            <div class="review_star">
              <star-rating v-if="rate" v-model="rate" :show-rating="false" :read-only="true" :increment="0.01"
                :inline="true" :star-size="25" active-color="#e87400"></star-rating>
              <p>{{ Data.average_rating }}</p>
              <span v-if="Data.rating_count">{{ Data.rating_count + ' ' }} rating</span>
              <span v-if="Data.review_count">{{ Data.review_count + ' ' }} review</span>
            </div>
            <div class="award" v-if="Data.awards">
              <div class="boder_award"></div>
              <p>Goodreads Choice Award</p>
              <span>Nominee for Fantasy (2015)</span>
            </div>
            <div v-for="paragrahps in intro" :key="paragrahps">
              {{ paragrahps }} <br> <br>
            </div>
          </div>

          <div class="info_genre">
            <ul class="ul_genres">
              <div class="line_split"></div>
              <p class="p_genres" style="font-size: 22px;">
                Genres
                <span>{{ Data.number_of_pages }} pages</span>
              </p>

              <span class="span_genres" v-for="genres in Data.genre_and_votes">
                <p>
                  {{ genres.genre + ' ' }}
                <p style="font-family: 'Times New Roman', Times, serif;">{{ Math.round(calcCategory(genres.votes)) + '%'
                }}</p>
                </p>
                <span class="underlined_genre" :style="{ width: `${calcCategory(genres.votes)}%` }"></span>
              </span>
            </ul>
          </div>

          <div class="BookPage_reviewsSection">
            <div class="rating_review">
              <div class="line_split"></div>
              <h2>
                Rating
                <span style="font-style: italic;"> & </span>
                Review
              </h2>
            </div>

            <div class="person_rating">
              <star-rating v-model="rating" @rating-selected="putDataUser" :inline="true" :clearable="true"
                :star-size="25" active-color="#e87400" v-if="rating === 0">
              </star-rating>
              <star-rating v-model="rating" :read-only="true" @rating-selected="putDataUser" :inline="true"
                :clearable="true" :star-size="25" active-color="#e87400" v-else>
              </star-rating>
            </div>


            <div class="your_cmt">
              <CkEditorNuxt v-model="yourComment" />
              <button class="submit_cmt" @click="UpComment" :disabled="disableCmt">
                <font-awesome-icon :icon="['fas', 'check']" class="icon-check" />
                <div class="icon_submit">
                </div>
                <h2 class="icon-check"> Submit </h2>
              </button>
            </div>
          </div>
          <!-- Percent Star -->
          <div class="BookPage_reviewsStar">
            <div class="rating_review">
              <div class="line_split"></div>
              <h2>
                Community Reviews
              </h2>
            </div>
            <div class="review_star">
              <star-rating v-model="rate" :show-rating="false" :read-only="true" :increment="0.01" :inline="true"
                :star-size="25" active-color="#e87400"></star-rating>
              <p>{{ Data.average_rating }}</p>
              <span v-if="Data.rating_count">{{ Data.rating_count + ' ' }} rating</span>
              <span v-if="Data.review_count">{{ Data.review_count + ' ' }} review</span>
            </div>
            <div class="rate_vote_star">
              <div class="rate_votes_box">
                <p class="numStar">5 sao</p>
                <div class="rate_votes">
                  <div class="coverRate" style="width: 100%"></div>
                  <div class="percent" :style="{ width: `${calcRateStar(Data.five_star_ratings)}%` }"></div>
                </div>
                <span>({{ Math.round(calcRateStar(Data.five_star_ratings)) + '%' }})</span>
              </div>
              <div class="rate_votes_box">
                <p class="numStar">4 sao</p>
                <div class="rate_votes">
                  <div class="coverRate" style="width: 100%"></div>
                  <div class="percent" :style="{ width: `${calcRateStar(Data.four_star_ratings)}%` }"></div>
                </div>
                <span>({{ Math.round(calcRateStar(Data.four_star_ratings)) + '%' }})</span>
              </div>
              <div class="rate_votes_box">
                <p class="numStar">3 sao</p>
                <div class="rate_votes">
                  <div class="coverRate" style="width: 100%"></div>
                  <div class="percent" :style="{ width: `${calcRateStar(Data.three_star_ratings)}%` }"></div>
                </div>
                <span>({{ Math.round(calcRateStar(Data.three_star_ratings)) + '%' }})</span>
              </div>
              <div class="rate_votes_box">
                <p class="numStar">2 sao</p>
                <div class="rate_votes">
                  <div class="coverRate" style="width: 100%"></div>
                  <div class="percent" :style="{ width: `${calcRateStar(Data.two_star_ratings)}%` }"></div>
                </div>
                <span>({{ Math.round(calcRateStar(Data.two_star_ratings)) + '%' }})</span>
              </div>
              <div class="rate_votes_box">
                <p class="numStar">1 sao</p>
                <div class="rate_votes">
                  <div class="coverRate" style="width: 100%"></div>
                  <div class="percent" :style="{ width: `${calcRateStar(Data.one_star_ratings)}%` }"></div>
                </div>
                <span>({{ Math.round(calcRateStar(Data.one_star_ratings)) + '%' }})</span>
              </div>
            </div>
          </div>
          <!-- Comment  -->
          <div class="comment_review">
            <div class="displays_review">
              <h2 style="display: flex;" v-if="dataPeople.length >= 1">
                Displaying <p v-if="dataPeople.length >= 10">&nbsp; 1 - 10 of {{ ' ' + Data.review_count + ' ' }} reviews
                </p>
              </h2>
            </div>
            <!-- ---- -->
            <div class="user" v-for="(user, index) in dataPeople" :key="'user' + index">
              <div class="user_view" style="display: inline">
                <img class="img_user_css" src="@/assets/logo/Facebook-Avatar_3.png" :alt="'Loading Img ...'" />

                <div class="text_name">
                  <h3>
                    {{ user?.name }}
                  </h3>
                </div>
              </div>

              <div class="content_cmt">
                <div class="star_usercmt">
                  <star-rating v-model="user.rated" :show-rating="false" :read-only="true" :inline="true" :star-size="20"
                    active-color="#e87400"></star-rating>
                </div>
                <div class="text_user">
                  <h3>
                    <div v-html="user?.comment"></div>
                  </h3>
                </div>
                <div class="function">
                  <div class="vote_cmt_css">
                    <button class="votes" :id="user?.id" @click="Like(user?.id)">
                      <font-awesome-icon :icon="['far', 'thumbs-up']" v-if="checkLiked(user?.id) === 'Like'" />
                      <font-awesome-icon :icon="['fas', 'thumbs-up']" class="liked" style="color: #377458;" v-else />
                      {{ user?.like }} Like
                    </button>
                  </div>
                  <div class="want_to_dlt">
                    <button class="dlt_cmt" @click="checkDelete()" v-if="user.id_user == userAcount.id">
                      <font-awesome-icon :icon="['fas', 'trash-can']" /> &nbsp; Delete
                    </button>
                  </div>
                </div>
                <!-- Component delete  -->
                <div class="display_notifical" v-if="checkDeleteCmt" @click="closeDelete">
                </div>
                <acceptAction :checkDelete="checkDeleteCmt" @CallDeleteView="DeleteComment(user.id)"
                  @CloseFunctionDelete="checkCloseDelete"></acceptAction>
                <!-- End Component delete  -->

                <div class="line_split_cmt"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

  </div>
</template>
  
<script>
import acceptAction from "@/components/acceptAction.vue";
import StarRating from 'vue-star-rating';
import CkEditorNuxt from "@/components/CkEditorNuxt";
export default {
  layout: "frameHome",
  components: {
    StarRating,
    CkEditorNuxt,
    acceptAction,
  },
  data() {
    return {
      urldetail: 'https://backend-guideline-api.vais.vn/api/books',
      idBookMain: null,
      book_id: null,
      award: ['', ''],
      check_award: null,
      totalCategory: null,
      intro: [],
      Data: {},
      rate: null,
      Read: [
        'https://sachtot.vn/sach-dien-tu/ken-ca-chon-canh-tap-2-p1-doc-7713.html',
        'https://sachtot.vn/sach-dien-tu/ken-ca-chon-canh-tap-1-p2-doc-7602.html',
        'https://sachtot.vn/sach-dien-tu/sherlock-holmes-toan-tap-tap-3-phan-2-doc-6683.html',
        'https://sachtot.vn/sach-dien-tu/sherlock-holmes-toan-tap-tap-3-phan-2-doc-6683.html',
        'https://sachtot.vn/sach-dien-tu/ho-so-mot-tu-tu-doc-727.html',
      ],
      selectedBook: '',
      urlUser: "https://64b4bf820efb99d86269398b.mockapi.io/user",
      id_bookUser: null,
      idStore: null,
      yourComment: '',
      disableCmt: false,
      rating: 0,
      checkDeleteCmt: false,
      urlPeople: "https://64daf851593f57e435b04e45.mockapi.io/people/rating-reviews",
      dataPeople: [],
      like: 0,
    }
  },
  async created () {
    console.log('pageDetail');
    this.idBookMain = this.$route.query.id;
    this.book_id = this.$route.query.book_id;
    await this.getDetail();
    this.rate = this.Data.average_rating;
    this.getDescription();
    this.rateCategory();
    this.getDataPeople()
    this.getDataUser();
    const idx = Math.floor(Math.random() * this.Read.length);
    this.selectedBook = this.Read[idx];
  },
  computed: {
    DataBook() {
      return this.$store.state.user.DataBook
    },
    signInDone() {
      return this.$store.state.user.user !== null ? false : true;
    },
    numUser() {
      return this.$store.state.user.user !== null ? this.urlUser + "/" + this.$store.state.user.user.id + '/review' : null;
    },
    userAcount() {
      return this.$store.state.user.user !== null ? this.$store.state.user.user : {};
    },
    checkLike() {
      return this.$store.state.user.user !== null ? this.$store.state.user.user.Liked : [];
    },
  },
  watch: {
    signInDone() {
      this.getDataUser();
    },
    disableCmt() {
      this.getDataPeople();
    },
  },
  methods: {
    async getDetail() {
      const data_detail = await this.$axios.$get(this.urldetail + `/${this.idBookMain}`);
      console.log(data_detail.data.record.cover_link);
      this.Data = data_detail.data.record;
      console.log(this.Data);
    },
    //Rate star
    async getDataUser() {
      try {
        if (!this.signInDone) {
          console.log(1);
          const url = new URL(this.numUser + '/');
          url.searchParams.append('id_book', `${this.book_id}`);
          url.searchParams.append('userId', `${this.$store.state.user.user.id}`);
          const [response] = await this.$axios.$get(url);
          this.rating = response.rated_star;
          this.id_bookUser = response.id_book;
          this.idStore = response.id;
        } else {
          this.rating = 0;
        }
      } catch {

      }
    },
    async putDataUser() {
      if (!this.signInDone) {
        if (!this.idStore) {
          console.log(2);
          this.Data.rating_count++;
          if (this.rating === 5) {
            this.Data.five_star_ratings++;
          }
          else if (this.rating === 4) {
            this.Data.four_star_ratings++;
          }
          else if (this.rating === 3) {
            this.Data.three_star_ratings++;
          }
          else if (this.rating === 2) {
            this.Data.two_star_ratings++;
          }
          else if (this.rating === 1) {
            this.Data.one_star_ratings++;
          }

          await this.$axios.$post(this.numUser, {
            rated_star: this.rating,
            "id_book": this.book_id,
          });
        }
        // Data rating new book
        await this.$axios.$patch(this.urldetail + '/' + this.idBookMain, {
          record: {
            rating_count: this.Data.rating_count,
            "five_star_ratings": this.Data.five_star_ratings,
            "four_star_ratings": this.Data.four_star_ratings,
            "three_star_ratings": this.Data.three_star_ratings,
            "two_star_ratings": this.Data.two_star_ratings,
            "one_star_ratings": this.Data.one_star_ratings,
          },
        })
      } else {
        // this.rating = 0;
        // console.log('rating', this.rating);
        // console.log('trap');
        this.$store.dispatch("user/user_NodeSignIn", true);
      }
    },
    //Comment
    async getDataPeople() {
      try {
        console.log(3);
        const url = new URL(this.urlPeople + '/');
        url.searchParams.append('id_book', `${this.book_id}`);
        const response = await this.$axios.$get(url);
        this.dataPeople = response;
        console.log('people', this.dataPeople);
        return true;
      } catch {

      }
    },
    async UpComment() {
      if (!this.signInDone) {
        if (this.rating !== 0) {
          //Data people
          this.disableCmt = true;
          const DataCmtSever = await this.$axios.$post(this.urlPeople, {
            name: this.$store.state.user.user.name,
            rated: this.rating,
            comment: this.yourComment,
            like: 0,
            id_user: this.$store.state.user.user.id,
            id_book: this.book_id,
          })
          this.yourComment = '';
          this.disableCmt = false;
        } else {
          alert("If you haven't chosen a star, you can't comment");
        }
      } else {
        this.$store.dispatch("user/user_NodeSignIn", true);
      }
    },
    async DeleteComment(id) {
      const DataCmtSever = await this.$axios.$delete(this.urlPeople + '/' + id)
      this.dataPeople = this.dataPeople.filter(element => element.id !== id)
    },
    checkDelete() {
      this.checkDeleteCmt = true;
    },
    closeDelete() {
      console.log('check_close');
      this.checkDeleteCmt = false;
    },
    checkCloseDelete(check) {
      this.checkDeleteCmt = check;
    },
    // Like
    checkLiked(data_id) {
      console.log('cLike');
      const checked = this.checkLike.includes(data_id); // tìm xem có id người dùng like chưa
      if (checked) {
        return "Liked";
      }
      return "Like";
    },
    async Like(data_id) {
      console.log('Like');
      try {
        if (!this.signInDone) {
          const checked = this.checkLike.includes(data_id);
          const id = this.dataPeople.findIndex((e) => e.id === data_id)
          if (!checked) {
            this.$store.dispatch("user/user_Liked", { data_id });
            this.dataPeople[id].like++;
            await this.$axios.$put(this.urlPeople + `/${data_id}`, {
              like: this.dataPeople[id].like,
            });

            await this.$axios.$put(
              this.urlUser + `/${this.$store.state.user.user.id}`,
              {
                Liked: this.checkLike,
              }
            );
          } else {
            this.$store.dispatch("user/user_UnLike", { data_id });
            this.dataPeople[id].like--;
            await this.$axios.$put(this.urlPeople + `/${data_id}`, {
              like: this.dataPeople[id].like,
            });

            await this.$axios.$put(
              this.urlUser + `/${this.$store.state.user.user.id}`,
              {
                Liked: this.checkLike,
              }
            );
          }
        } else {
          this.$store.dispatch("user/user_NodeSignIn", true);
        }
      } catch (error) {
        console.log('warring nextwork');
      }
    },
    // get Page
    getDescription() {
      this.intro = this.Data.description.split("¦");
      console.log(1, this.intro);
    },
    rateCategory() {
      this.Data.genre_and_votes.forEach(element => {
        this.totalCategory += element.votes
      });
    },
    calcCategory(number) {
      return number * 100 / this.totalCategory;
    },
    calcRateStar(number) {
      return number * 100 / this.Data.rating_count;
    }
  }
}
</script>

<style scoped>
:root {
  --color-background-rating-star-base: #e87400;
}

div {
  display: block;
}

.display_notifical {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(250, 250, 250, 0.5);
  z-index: 3;
}

.line_split_cmt,
.line_split {
  background-color: #000;
  margin: 15px auto;
  height: 1px;
  opacity: 0.8;
}

.line_split {
  margin-top: 77px;
  width: 100%;
}

.line_split_cmt {
  width: 39rem;
  margin-top: 37px;
}

.icon_submit {
  border: 1px solid;
  height: 28px;
  margin: 0 7px;
}

.details_book {
  margin-left: 18rem;
  position: relative;
  top: -22rem;
  font-family: Copernicus, "Libre Baskerville", Georgia, serif;
}

.title_reviewbook {
  font-size: 3.6rem;
  line-height: 4.6rem;
}

.info_author {}

.name_author {
  font-weight: 600;
  font-size: 20px;
}


.review_star {
  display: flex;
  font-size: 25px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.icon_award {}

.boder_award {
  width: 12rem;
  border-radius: 0 35px 35px 0;
  height: 26px;
  background: #f0bf6e;
  margin-top: 10px;
}

.award p {
  position: relative;
  top: -1.5rem;
  left: 0.2rem;
  float: left;
}

.award span {
  top: -1.5rem;
  margin-left: 26px;
  opacity: 0.7;
  position: relative;
}

.review_star p {
  margin: 10px 0 0 10px;
}

.review_star span,
.ul_genres .p_genres span {
  font-size: 15px;
  opacity: 0.8;
  margin: 19px 0 0 6px;
}

.BookPage_reviewsSection {
  position: relative;
}

.rating_review {
  text-align: center;
  font-size: 27px;
  margin: 50px auto;
}

.option_rating {}

.person_rating {
  position: absolute;
  top: 70px;
  transform: translateX(200%);
}

.your_cmt {
  font-family: ui-monospace;
}

.submit_cmt {
  display: flex;
  position: absolute;
  right: 0;
  background: #7BB11D;
  padding: 4px 10px;
  color: #fff;
  margin: 5px 0;
  border-radius: 6px;
}

.icon-check {
  margin: auto 0;
}

.rate_votes_box {
  position: relative;
  display: flex;
}

.rate_votes_box span {
  position: absolute;
  right: 30px;
}

.rate_votes {
  position: relative;
  width: 70%;
}

.numStar {}

.percent,
.coverRate {
  height: 11px;
  position: absolute;
  top: 8px;
  margin-left: 40px;
  border-radius: 17px;
}

.percent {
  background: orange;
}

.coverRate {
  background: #c3c1c1;
}

.ul_genres .span_genres {
  display: block;
  width: 94%;
}

.underlined_genre {
  display: inline-block;
  background-color: #409970;
  position: relative;
  bottom: 1.4rem;
  margin-left: 43px;
  height: 0.2rem;
  content: "";
  transition: transform .3s ease-out;
  transform: scaleX(1);
  transform-origin: left;
}

.active-color {
  color: var(--color-background-rating-star-base);
}

.label_book {
  position: sticky;
  top: 141px;
  width: 12rem;
}

.img_book {
  width: 100%;
  height: 18.5rem;
  border-radius: 0 14px 14px 0;
  box-shadow: 6px 0px 10px rgba(0, 0, 0, 0.25);
}

.button_read_buy button:hover,
.button_read_buy button {
  border-radius: 3rem;
  display: flex;
  width: 11rem;
  height: 2rem;
  margin-top: 9px;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: .2s ease-in-out;
}

.button_read_buy button:hover {
  text-decoration: underline;
  cursor: pointer;
}

.comment_review {
  margin: 30px auto;
}

.comment_review .displays_review h2 {
  opacity: 0.8;
}

.user {
  display: flex;
  padding: 10px;
}

.user_view {
  min-width: 137px;
  width: 137px;

}

.user .user_view .img_user_css {
  border-radius: 50%;
  width: 36%;
}

.content_cmt {
  margin-top: 4px;
  padding: 11px 0;
}

.function {
  position: relative;
  display: flex;
}

.vote_cmt_css {
  position: absolute;
  left: 10px;
}

.liked:hover {
  color: #348a62 !important;
}

.want_to_dlt {
  position: absolute;
  right: 10px;
}

.want_to_dlt:hover {
  font-size: 17px;
  opacity: 0.7;
}

.dlt_cmt {
  border-radius: 4px;
  padding: 2px 10px;
}

.dlt_cmt:hover {
  background: rgba(153, 153, 153, 0.27843);
  opacity: 0.8;
}

.text_name {
  margin: 8px 0;
  font-family: Copernicus, "Libre Baskerville", Georgia, serif;
}

.text_user {
  font-family: ui-monospace;
  padding: 12px 0;
}
</style>
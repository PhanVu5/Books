export const state = () => ({
  DataBook: {},
  search: null,
  nodeSlider: true,
  objPage: {
    page: 1,
    limitPage: 20,
    totalPages: 0,
  },
  signIn: false,
  signUp: false,
  user: null,
  user_review: null,
});

export const mutations = {
  getDataBook: (state, data) => state.DataBook = data,
  searchBook: (state, text) => {
    state.search = text
    if (!text) {
      state.nodeSlider = true;
    } else {
      state.nodeSlider = false;
    }
  },
  turnSignIn: (state, model) => state.signIn = model,
  turnSignUp: (state, model) => state.signUp = model,
  UserSignIn: (state, userid) => {
    state.user = userid
  },
  signOut: state => {
    state.user = null;
    state.user_review = null;
  },
  LikeDone: (state, ObjLike) => {
    // state.DataBook.items[ObjLike.id].five_star_ratings++;
    state.user.Liked.push(ObjLike.data_id);
  },
  UnLike: (state, ObjLike) => {
    // state.DataBook.items[ObjLike.id].five_star_ratings--;
    state.user.Liked = state.user.Liked.filter(id => id !== ObjLike.data_id)
  },
  UserReview: (state, Array) => {
    state.user_review = Array
  },
  CurrentPage: (state, obj) => {
    state.objPage.page = obj.page;
    state.objPage.limitPage = obj.limitPage;
    state.objPage.totalPages = obj.totalPages;
  },
};

export const actions = {
  user_DataBook({ commit }, data) {
    commit('getDataBook', data)
  },
  user_search({ commit }, text) {
    console.log('label search', text);
    commit('searchBook', text)
  },
  user_NodeSignIn({ commit }, model) {
    commit('turnSignIn', model)
  },
  user_NodeSignUp({ commit }, model) {
    commit('turnSignUp', model)
  },
  user_checkUser({ commit }, userid) {
    commit('UserSignIn', userid)
  },
  user_UserReview({ commit }, Array) {
    commit('UserReview', Array)
  },
  user_signOut({ commit }) {
    commit('signOut');
  },
  user_Liked({ commit }, liked) {
    console.log('like done');
    commit('LikeDone', liked);
  },
  user_UnLike({ commit }, idUnlike) {
    console.log('unlike done');
    commit('UnLike', idUnlike);
  },
  user_CurrentPage({ commit }, obj) {
    commit('CurrentPage', obj)
  },
};




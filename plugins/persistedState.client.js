import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    key: 'book',
    paths: ['user']
    
  })(store)
}
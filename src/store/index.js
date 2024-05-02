import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      selectedUserTelephone: null,
      storedKey: null,
      storedUserPara: null,
      storedPubPara: null,
    }
  },
  getters: {
  },
  mutations: {
    setSelectedUserTelephone(state, telephone) {
      state.selectedUserTelephone = telephone;
    },
    setStoredKey(state, key) {
      state.storedKey = key;
    }
    ,
    setStoredUserPara(state, userPara) {
      state.storedUserPara = userPara;
    }
    ,
    setStoredPubPara(state, pubPara) {
      state.storedPubPara = pubPara;
    }
  },
  actions: {
    updateSelectedUserTelephone({ commit }, telephone) {
      commit('setSelectedUserTelephone', telephone);
    }
    ,
    updateStoredKey({ commit }, key) {
      commit('setStoredKey', key);
    }
    ,
    updateStoredUserPara({ commit }, userPara) {
      commit('setStoredUserPara', userPara);
    }
    ,
    updateStoredPubPara({ commit }, pubPara) {
      commit('setStoredPubPara', pubPara);
    }
  },
  modules: {
  }
})

const mutations = {
  setInfo(state) {
    state.count = 3;
  },
  signIn(state) {
    state.isLogin = true;
  },
  signOut(state) {
    state.isLogin = false;
  }
}

export default mutations;

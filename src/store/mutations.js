const mutations = {
  setInfo(state) {
    state.count = 3;
  },
  goToFirstpage(state) {
    state.isLogin = true;
  },
  signOut(state) {
    state.isLogin = false;
  }
}

export default mutations;

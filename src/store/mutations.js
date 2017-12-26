export const setInfo = state => {
  state.count = 3;
  state.route.path = '/userCenter';
}
export const goToFirstpage = state => {
  state.isLogin = true;
  state.route.path = '/';
}

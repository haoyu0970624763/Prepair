const userInfo = {
  state: {
    userName : '',
    userPassword : ''
  },

  mutations: {
    // 设置用户信息
    setUserInfo(state, name,pwd) {
      state.userName=name
      state.userPassword=pwd
    },
    // 清除用户信息
    clearUserInfo(state) {
      state.userName=''
      state.userPassword=''
    }
  }
}

export default userInfo

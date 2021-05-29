import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    userName: '',
    Password: '',
    personality: '',
    smoke: '',
    drink: '',
    pet: '',
    wake: '',
    sleep: '',
    clean: '',
    bath: '',
    back: '',
    m_smoke: '',
    m_drink: '',
    m_back: '',
    m_noice: '',
    s_custom: '',
    clock: '',
    sleep_reason: '',
    HouseOwner: '',
    HouseAddress: '',
    address: '',
    recommend1: '',
    recommend2: '',
    recommend3: '',
    recommend4: '',
    recommend5: '',
    houseID: '1',
    rentNumber: '',
    detailedCost:'',
    eletricMoney:0,
  },

  mutations: {
    // 设置用户信息
    name(state, name) {
      state.userName = name;
    },
    password(state, password) {
      state.Password = password;
    },
    personality(state, personality) {
      state.personality = personality;
    },
    smoke(state, smoke) {
      state.smoke = smoke;
    },
    drink(state, drink) {
      state.drink = drink;
    },
    pet(state, pet) {
      state.pet = pet;
    },
    wake(state, wake) {
      state.wake = wake;
    },
    sleep(state, sleep) {
      state.sleep = sleep;
    },
    clean(state, clean) {
      state.clean = clean;
    },
    bath(state, bath) {
      state.bath = bath;
    },
    back(state, back) {
      state.back = back;
    },
    m_smoke(state, m_smoke) {
      state.m_smoke = m_smoke;
    },
    m_drink(state, m_drink) {
      state.m_drink = m_drink;
    },
    m_back(state, m_back) {
      state.m_back = m_back;
    },
    m_noice(state, m_noice) {
      state.m_noice = m_noice;
    },
    s_custom(state, s_custom) {
      state.s_custom = s_custom;
    },
    clock(state, clock) {
      state.clock = clock;
    },
    sleep_reason(state, sleep_reason) {
      state.sleep_reason = sleep_reason;
    },
    addr(state, addr) {
      state.address = addr;
    },
    HouseOwner(state, HouseOwner) {
      state.HouseOwner = HouseOwner;
    },
    HouseAddress(state, HouseAddress) {
      state.HouseAddress = HouseAddress;
    },
    houseID(state, houseID) {
      state.houseID = houseID;
    },
    recommend1(state, variable) {
      state.recommend1 = variable;
    },
    recommend2(state, variable) {
      state.recommend2 = variable;
    },
    recommend3(state, variable) {
      state.recommend3 = variable;
    },
    recommend4(state, variable) {
      state.recommend4 = variable;
    },
    recommend5(state, variable) {
      state.recommend5 = variable;
    },
    rentNumber(state, rentNumber) {
      state.rentNumber = rentNumber;
    },
    detailedCost(state, detailedCost) {
      state.detailedCost = detailedCost;
    },
    eletricMoney(state, eletricMoney) {
      state.eletricMoney = eletricMoney;
    },
    // 清除用户信息
    clearUserInfo(state) {
      state.userName = ''
      state.userPassword = ''
    }
  },
  plugins: [createPersistedState()]
})

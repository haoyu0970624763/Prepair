<template>
  <div class="ProfilePage">
    <!-- bg-dark为更改navbar背景颜色 -->
    <!-- navbar-dark为控制文本颜色 dark设置为深色背景颜色变体-->

    <nav id="navigation" class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand">Prepair-最適合的共租平台</a>

      <!--使用navbar-toggler控制折叠组件,并将navbar-toggler的 data-target属性设置为collapse的id-->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#foldNavigation"
        aria-controls="foldNavigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="foldNavigation">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" @click.stop="GoToHouse">去看房</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:;">合約go</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click.stop="GoToReport">檢舉</a>
          </li>
          <li class="nav-item">
            <div class="dropleft">
              <button
                class="btn btn-info dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{ this.$store.state.userName }}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="" @click="writeHabit"
                  >填寫使用者資料與習慣</a
                >
                <a class="dropdown-item" href="" @click="profile"
                  >查看個人檔案</a
                >
                <a class="dropdown-item" href="" @click="logout">登出</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <div id="container">
      <div class="profile">
        <div class="moneyBalance">
          <p>錢包餘額</p>
          <p>:</p>
          <p>{{ this.balance }}</p>
          <p>GWEI</p>
        </div>
        <div class="ProfileText" v-if="this.rent == 'yes'">
          <p>租屋情況</p>
          <p>:</p>
          <p>已租房</p>
        </div>
        <div class="ProfileText" v-if="this.rent == 'no'">
          <p>租屋情況</p>
          <p>:</p>
          <p>尚未租房</p>
        </div>
        <div class="ProfileText" v-if="this.rent == 'yes'">
          <p>租屋房東</p>
          <p>:</p>
          <p>彭先生</p>
        </div>

        <div class="ProfileText" v-if="this.rent == 'yes'">
          <p>當月租金繳交狀況</p>
          <p>:</p>
          <p>{{ givemoney }}</p>
        </div>

        <div class="ProfileText" v-if="this.rent == 'yes'">
          <p>當月水電費繳交</p>
          <p>:</p>
          <p>{{ givemoney }}</p>
        </div>

        <div class="ProfileText" v-if="this.givemoney == '尚未繳交'">
          <button @click.stop="give">繳交</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.state.userName,
      address: this.$store.state.address,
      balance: "",
      rent: "",
      givemoney: "尚未繳交",
    };
  },
  async beforeMount() {
    this.$http
      .post("/api/GetBalance", {
        address: this.address,
      })
      .then((res) => {
        this.balance = res.body;
      });

    this.$http
      .post("/api/CheckRent", {
        id: this.user,
      })
      .then((res) => {
        this.rent = res.body;
      });
  },
  methods: {
    logout() {
      this.$router.push("/");
    },
    writeHabit() {
      this.$router.push("/LivingHabit");
    },
    GoToHouse() {
      this.$router.push("/Homepage");
    },
    profile() {
      this.$router.push("/Profile");
    },
    GoToReport(){
      this.$router.push("/Report");
    },
    give() {
      this.$http
        .post("/api/GiveMoney", {
          address: this.address,
        })
        .then((res) => {
          this.givemoney='繳交'
        });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.ProfilePage {
  border: 0;
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  font-size: 10px;
  overflow-x: hidden;
  display: flex;

  font-family: Noto Sans CJK TC;
  #navigation {
    width: 100vw;
    height: 7.5vh;

    font-size: 1rem;
    position: fixed;
    z-index: 100;
  }
  #container {
    position: relative;
    top: 7.5vh;
    width: 100vw;
    height: 92.5vh;
    background-color: #ebe5dd;
    // background-image: url("../assets/unnamed.jpg");
    background-position: center;
    background-size: cover;
  }
  .profile {
    position: relative;
    top: 7.5vh;
    left: 10vw;
    width: 80vw;
    height: 75vh;
    border: solid #acc0d8 3px;
    background-color: whitesmoke;
    .moneyBalance {
      position: relative;
      display: flex;
      flex-direction: row;
      left: 10vw;
      top: 5vh;
      width: 40vw;
      height: 150px;

      p {
        font-size: 24px;
        font-weight: bold;
        margin-right: 20px;
      }
    }
    .ProfileText {
      position: relative;
      display: flex;
      flex-direction: row;
      left: 10vw;
      width: 40vw;
      height: 120px;
      p {
        position: relative;
        font-size: 24px;
        font-weight: bold;
        margin-right: 20px;
      }
      button {
        height: 50px;
        width: 100px;
      }
    }
  }
}
</style>

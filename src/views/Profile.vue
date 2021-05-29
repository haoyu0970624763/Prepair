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
            <a class="nav-link" @click.stop="GoToContract">合約go</a>
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
                  >查看個人檔案</a
                >
                <a class="dropdown-item" href="" @click="profile">查看合約</a>
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
          <p>eth</p>
          <p>, 1 eth = 1000台幣</p>
        </div>

        <div class="ProfileText">
          <p>租屋情況</p>
          <p>:</p>
          <p>{{ this.rent }}</p>
        </div>

        <div class="ProfileText" v-if="(this.rent = '已租房')">
          <p>租屋房東</p>
          <p>:</p>
          <p>{{ this.houseOwner }}</p>
        </div>

        <div class="ProfileText" v-if="this.rent == '已租房'">
          <p>租期</p>
          <p>:</p>
          <p>{{ this.MoneyInfo[0].time1 }} - {{ this.MoneyInfo[0].time2 }}</p>
        </div>

        <div class="ProfileText" v-if="this.rent == '已租房'">
          <div class="left">租金:{{ this.MoneyInfo[0].money }} / 月</div>
          <button
            type="button"
            class="btn btn-outline-dark"
            @click.stop="giveType1"
            v-if="this.record1 == '無交易紀錄'"
          >
            繳費
          </button>
          <div class="right">繳交紀錄: {{ this.record1 }}</div>
        </div>
        <div class="ProfileText" v-if="this.rent == '已租房'">
          <div class="left">水電費 : {{ this.eletricMoney }} 元</div>
          <button
            type="button"
            class="btn btn-outline-dark"
            @click.stop="giveType2"
            v-if="this.record2 == '無交易紀錄'"
          >
            繳費
          </button>
          <div class="right">繳交紀錄: {{ this.record2 }}</div>
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
      houseOwner: "",
      houseID: "",
      balance: "",
      rent: "",
      houseInfo: "",
      MoneyInfo: "",
      eletricMoney: this.$store.state.eletricMoney,

      record1: "",
      record2: "",
      moneyType: "",
    };
  },
  async beforeMount() {
    if (this.record2 == "無交易紀錄") {
    }

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
        if (res.body == "no") {
          this.rent = "尚未租房";
        } else {
          this.rent = "已租房";
          this.houseOwner = res.body.owner;
          this.houseID = res.body.houseID;
        }
        this.$http
          .post("/api/GetMoneyInfo", {
            houseID: this.houseID,
            id: this.user,
          })
          .then((res) => {
            this.MoneyInfo = res.body;
            if (this.MoneyInfo[0].moneyHash == "") {
              this.record1 = "無交易紀錄";
            } else {
              this.record1 = this.MoneyInfo[0].moneyHash;
            }
            if (this.MoneyInfo[0].ele_moneyHash == "") {
              this.record2 = "無交易紀錄";
              this.eletricMoney += 1.25;
              this.$store.commit("eletricMoney", this.eletricMoney);
            } else {
              this.record2 = this.MoneyInfo[0].ele_moneyHash;
              
            }
          });
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
    GoToReport() {
      this.$router.push("/Report");
    },
    GoToContract() {
      this.$router.push("/Contract");
    },
    giveType1() {
      this.moneyType = 1;
      this.give();
    },
    giveType2() {
      this.moneyType = 2;
      this.give();
    },
    give() {
      this.$http.post("/api/GiveMoney", {
        id: this.user,
        moneyType: this.moneyType,
        money: this.MoneyInfo[0].money,
        eletricMoney: this.eletricMoney,
        address: this.address,
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
      width: 65vw;
      height: 80px;
      .left {
        display: flex;
        flex-direction: row;
        text-align: center;
        align-items: center;
        width: 180px;
        font-size: 24px;
        font-weight: bold;
      }
      button {
        position: relative;
        top: 15px;
        height: 50px;
        width: 100px;
      }
      .right {
        position: relative;
        left: 50px;
        top: 25px;
        width: 800px;
        font-size: 18px;
        font-weight: bold;
        color: red;
      }

      p {
        position: relative;
        font-size: 24px;
        font-weight: bold;
        margin-right: 20px;
      }
      #special {
        position: relative;
        width: 50vw;
        left: 10vw;
        font-size: 20px;
        font-weight: bold;
        margin-right: 20px;
        color: red;
      }
    }
  }
}
</style>

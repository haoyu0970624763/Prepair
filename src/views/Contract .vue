<template>
  <div class="ContractPage">
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

    <div class="container">
      <div class="textBox">
        <div class="tab">
          <a href="javascript:;" @click="handleTab(0)">與房東租約</a>
          <b style="color: gray">|</b>
          <a href="javascript:;" @click="handleTab(1)">與室友生活公約</a>
        </div>
        <!-- 房屋簽約模块 -->
        <div class="show" v-show="typeView == 0">
          <div class="rent-contract">
            <!-- autocomplete="off" 禁用表单自动填充 -->
            <div class="InputLine">
              立契約書人： {{ this.$store.state.HouseOwner }} (以下簡稱甲方)
            </div>
            <div class="InputLine">
              承租人：
              <p>{{ this.$store.state.userName }}</p>
              <p v-if="this.$store.state.rentNumber - 1 > 0">
                {{ this.$store.state.recommend1 }}
              </p>
              <p v-if="this.$store.state.rentNumber - 2 > 0">
                {{ this.$store.state.recommend2 }}
              </p>
              <p v-if="this.$store.state.rentNumber - 3 > 0">
                {{ this.$store.state.recommend3 }}
              </p>
              <p v-if="this.$store.state.rentNumber - 4 > 0">
                {{ this.$store.state.recommend4 }}
              </p>
              <p v-if="this.$store.state.rentNumber - 5 > 0">
                {{ this.$store.state.recommend5 }}
              </p>
              <p>(以下簡稱乙方)</p>
            </div>
            <div class="InputLine">
              茲為房租一部份租賃、雙方議定契約條款如下：
            </div>
            <div class="IndentInputLine">
              第一條：租賃房屋標示：坐落於 {{ this.$store.state.HouseAddress }}
            </div>
            <div class="IndentInputLine">
              第二條：租賃期間：自
              <input
                class="time"
                onkeyup="value=value.replace(/[^\d]/g,'') "
                v-model="time1"
                placeholder="請輸入入住日期"
              />
              至
              <input
                class="time"
                onkeyup="value=value.replace(/[^\d]/g,'') "
                v-model="time2"
                placeholder="請輸入結束日期"
              />
            </div>

            <div class="IndentInputLine">
              第三條：房租：{{ this.$store.state.detailedCost }} / 月
            </div>
            <div class="inputMoney">
              {{ this.$store.state.userName }} ，每個月新台幣
              <input
                onkeyup="value=value.replace(/[^\d]/g,'') "
                v-model="money1"
                placeholder="請輸入金額"
              />
              元，共 {{ money1 * 12 }}元
            </div>
            <div class="inputMoney" v-if="this.$store.state.rentNumber - 1 > 0">
              {{ this.$store.state.recommend1 }} ，每個月新台幣
              <input
                onkeyup="value=value.replace(/[^\d]/g,'') "
                v-model="money2"
                placeholder="請輸入金額"
              />
              元，共 {{ money2 * 12 }}元
            </div>
            <div class="inputMoney" v-if="this.$store.state.rentNumber - 2 > 0">
              {{ this.$store.state.recommend2 }} ，每個月新台幣
              <input
                onkeyup="value=value.replace(/[^\d]/g,'') "
                v-model="money3"
                placeholder="請輸入金額"
              />
              元，共 {{ money3 * 12 }}元
            </div>
            <div class="inputMoney" v-if="this.$store.state.rentNumber - 3 > 0">
              {{ this.$store.state.recommend3 }} ，每個月新台幣
              <input
                onkeyup="value=value.replace(/[^\d]/g,'') "
                v-model="money4"
                placeholder="請輸入金額"
              />
              元，共 {{ money4 * 12 }}元
            </div>
            <div class="IndentInputLine" style="margin-top: 110px">
              第四條：押金
              <input
                onkeyup="value=value.replace(/[^\d]/g,'') "
                v-model="deposit"
                placeholder="請輸入金額"
              />
              元
            </div>
            <div class="checkRent">
              第五條：水電費依台電計算,是否使用智慧插頭
              <input type="radio" id="yes" value="是" v-model="plug" />
              <label for="yes">是</label>
              <input type="radio" id="no" value="否" v-model="plug" />
              <label for="no">否</label>
            </div>
            <div class="warning">
              <span>第六條</span> <span> 合約於</span> <span>{{ time1 }}</span>
              <span>生效 於</span> <span> {{ time2 }}</span>
              <span> 即終止</span>
              <br />
            </div>
            <div class="IndentInputLine">
              如欲提前解約，乙方不得與甲方要求返還剩餘租金，並不予押金抵扣
            </div>

            <div
              id="input"
              style="margin-bottom: 30px align: center width=200px"
            >
              <input
                
                v-model="pic"
                placeholder="請輸入圖片網址"
              />
            </div>

            <div style="margin-top: 60px align: center ">
              <button
                id="sendButton"
                type="button"
                class="btn btn-secondary"
                @click.stop="writeContract"
              >
                簽約
              </button>
            </div>
            <div class="afterContract" v-if="this.showAfterContract == true">
              等待其他室友的同意，若同意則會將此合約生效
              {{ this.hash2 }}
            </div>
          </div>
        </div>
        <!-- 生活公約模块 -->
        <div class="show" v-show="typeView == 1">
          <div class="life-contract">
            <div class="rbtn">
              <input
                class="form-check-input"
                type="checkbox"
                name="exampleRadios"
                id="exampleRadios1"
                value="option1"
                v-model="selected1"
                checked
              />
              <div class="text">
                <label class="form-check-label" for="exampleRadios1">
                  不可喝酒，如違反罰金
                </label>
                <input
                  class="tbx"
                  onkeyup="value=value.replace(/[^\d]/g,'') "
                  v-model="d_money"
                  placeholder="請輸入數字"
                  :disabled="isDisabled1"
                />
                <label class="form-check-label" for="exampleRadios1">
                  元
                </label>
              </div>
            </div>
            <div class="rbtn">
              <input
                class="form-check-input"
                type="checkbox"
                name="exampleRadios"
                id="exampleRadios2"
                v-model="selected2"
                value="option2"
              />
              <div class="text">
                <label class="form-check-label" for="exampleRadios2">
                  不可帶男/女朋友進房，如違反罰金
                </label>
                <input
                  class="tbx"
                  onkeyup="value=value.replace(/[^\d]/g,'') "
                  v-model="b_money"
                  placeholder="請輸入數字"
                  :disabled="isDisabled2"
                />
                <label class="form-check-label" for="exampleRadios2">
                  元
                </label>
              </div>
            </div>
            <div class="rbtn">
              <input
                class="form-check-input"
                type="checkbox"
                name="exampleRadios"
                id="exampleRadios3"
                v-model="selected3"
                value="option3"
              />
              <div class="text">
                <label class="form-check-label" for="exampleRadios3">
                  不可帶寵物回家，如違反罰金
                </label>
                <input
                  class="tbx"
                  onkeyup="value=value.replace(/[^\d]/g,'') "
                  v-model="p_money"
                  placeholder="請輸入數字"
                  :disabled="isDisabled3"
                />
                <label class="form-check-label" for="exampleRadios3">
                  元
                </label>
              </div>
            </div>
            <div class="rbtn">
              <input
                class="form-check-input"
                type="checkbox"
                name="exampleRadios"
                id="exampleRadios4"
                v-model="selected4"
                value="option4"
              />
              <div class="text">
                <label class="form-check-label" for="exampleRadios4">
                  不可抽菸，如違反罰金
                </label>
                <input
                  class="tbx"
                  onkeyup="value=value.replace(/[^\d]/g,'') "
                  v-model="c_money"
                  placeholder="請輸入數字"
                  :disabled="isDisabled4"
                />
                <label class="form-check-label" for="exampleRadios4">
                  元
                </label>
              </div>
            </div>
            <button
              id="sendButton"
              type="button"
              class="btn btn-secondary"
              @click.stop="setrule"
            >
              送出合約
            </button>
            <div class="afterContract" v-if="this.showAfterContract2 == true">
              將合約部署於 0x3Df706498831091a40F6Df536b73a3fCD8dD471d 此地址
              <br />
              hash值＝{{ this.hash }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contract",
  data() {
    return {
      // rent
      selected1: "",
      selected2: "",
      selected3: "",
      selected4: "",
      time1: "",
      time2: "",
      money1: "",
      money2: "",
      money3: "",
      money4: "",
      deposit: "",
      pic: "",
      plug: "",
      hash: "k",
      hash2: "",
      // rule
      drink: "可以喝酒",
      d_money: 0,
      cigeratte: "可以抽菸",
      c_money: 0,
      pet: "可以養寵物",
      p_money: 0,
      bring: "可以帶人",
      b_money: 0,
      // 显示不同的view
      typeView: 0,
      showAfterContract: false,
      showAfterContract2: false,
    };
  },
  methods: {
    // 房屋契約/生活公約tab切换
    handleTab(type) {
      this.typeView = type;
    },
    logout() {
      this.$router.push("/");
    },
    writeHabit() {
      this.$router.push("/LivingHabit");
    },
    profile() {
      this.$router.push("/Profile");
    },
    GoToHouse() {
      this.$router.push("/Homepage");
    },
    GoToReport() {
      this.$router.push("/Report");
    },
    GoToContract() {
      this.$router.push("/Contract");
    },
    writeContract() {
      this.$http
        .post("/api/writeContract", {
          houseID: this.$store.state.houseID,
          userID: this.$store.state.userName,
          RoommateNum: this.$store.state.rentNumber,
          recommend1: this.$store.state.recommend1,
          recommend2: this.$store.state.recommend2,
          recommend3: this.$store.state.recommend3,
          recommend4: this.$store.state.recommend4,
          recommend5: this.$store.state.recommend5,
          time1: this.time1,
          time2: this.time2,
          money1: this.money1,
          money2: this.money2,
          money3: this.money3,
          money4: this.money4,
          deposit: this.deposit,
          plug: this.plug,
        })
        .then((res) => {
          if (res.body == "OK") {
            console.log("here");
            this.$http
              .post("/api/recordPict_success", {
                pictUrl: this.pic,
                YourAddr: this.$store.state.address,
              })
              .then((res) => {
                this.showAfterContract = true;
                this.hash2 = res.body;
              });
          }
          
        });
    },
    setrule() {
      this.$http
        .post("/api/setCoinRule_success", {
          houseNum: this.$store.state.houseID,
          tenantAddr: this.$store.state.address,
          drinkingcoin: this.d_money,
          smokecoin: this.c_money,
          petcoin: this.p_money,
          gbfriendcoin: this.b_money,
        })
        .then((res) => {
          this.hash = res.body;
          this.showAfterContract2 = true;
        });
    },
    recordPict_success() {
      this.$$http
        .post("/api/recordPict_success", {
          pictUrl: this.pic,
          YourAddr: this.$store.state.address,
        })
        .then((res) => {
          this.hash2 = res.body;
          this.showAfterContract = true;
        });
    },
  },
  computed: {
    isDisabled1: function () {
      if (this.selected1 != "") {
        return false;
      } else {
        return true;
      }
    },
    isDisabled2: function () {
      if (this.selected2 != "") {
        return false;
      } else {
        return true;
      }
    },
    isDisabled3: function () {
      if (this.selected3 != "") {
        return false;
      } else {
        return true;
      }
    },
    isDisabled4: function () {
      if (this.selected4 != "") {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.ContractPage {
  border: 0;
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  font-size: 10px;
  overflow-x: hidden;
  font-family: Noto Sans CJK TC;
  #navigation {
    width: 100vw;
    min-height: 7.5vh;
    max-height: 40vh;
    font-size: 1rem;
  }
  .container {
    background-image: url("../assets/background.jpg");
    background-position: center;
    background-size: cover;
    position: relative;
    max-width: 100%;
    max-height: 92.5vh;
    height: 92.5vh;
    .textBox {
      position: absolute;
      width: 60vw;
      height: 75vh;
      left: 20vw;
      top: 52.5%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      box-sizing: border-box;
      text-align: center;
      box-shadow: 0 1px 11px rgba(0, 0, 0, 0.3);
      border-radius: 2px;
      background: #fff;
      padding: 45px 35px;
      .tab {
        text-align: left;
        font-size: 30px;
        height: 5vh;
      }
      .show {
        height: 55vh;
        .rent-contract {
          position: relative;
          width: 100%;
          height: 100%;
          background: #ffffff;
          overflow-x: hidden;
          .InputLine {
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 45px;
            margin-left: 5vw;
            margin-top: 10px;
            text-align: left;
            align-items: center;
            font-size: 24px;
            p {
              position: relative;
              top: 9px;
              margin-left: 10px;
              margin-right: 10px;
              font-size: 20px;
              margin-left: 2px;
            }
          }
          .IndentInputLine {
            width: 100%;
            height: 45px;
            margin-left: 10vw;
            margin-top: 10px;
            text-align: left;
            align-items: center;
            font-size: 24px;
            input {
              width: 200px;
              text-align: right;
            }
            p {
              margin-left: 40px;
            }
          }
          #input {
            width: 100%;

            margin-left: 10vw;
            height: 3.5vh;
            display: flex;
            flex-direction: row;
            margin-bottom: 30px;
            input {
              width: 300px;
            }
          }
          .inputMoney {
            width: 75%;
            height: 45px;
            margin-left: 12.5vw;
            margin-top: 10px;
            text-align: left;
            align-items: center;
            font-size: 24px;
            display: flex;
            flex-direction: row;
            input {
              margin-left: 10px;
              margin-right: 10px;
              width: 150px;
              text-align: right;
            }
          }
          .checkRent {
            width: 100%;
            height: 45px;
            margin-left: 10vw;
            margin-top: 10px;
            text-align: left;
            align-items: center;
            font-size: 24px;
            input {
              margin-left: 20px;
              margin-right: 20px;
              width: 20px;
            }
          }
          .warning {
            width: 75%;
            height: 45px;
            margin-left: 10vw;
            margin-top: 10px;
            text-align: left;
            align-items: center;
            font-size: 24px;
            display: flex;
            flex-direction: row;
            span {
              width: 270px;
            }
          }
          .afterContract {
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 45px;
            margin-left: 0vw;
            margin-top: 10px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: red;
          }
        }
        .life-contract {
          position: relative;
          top: 2.5vh;
          width: 100%;
          height: 100%;
          background: #ffffff;
          .rbtn {
            position: relative;
            height: 20%;
            width: 100%;
            top: 5%;
            left: 5%;
            display: flex;
            flex-direction: row;
            .form-check-input {
              position: relative;
              left: 10vw;
              top: 3vh;
            }
            .text {
              display: flex;
              flex-direction: row;
              width: 50vw;
              height: 100%;
              .form-check-label {
                position: relative;
                left: 15vw;
                top: 2.5vh;
                font-size: 20px;
              }
              .tbx {
                position: relative;
                left: 15vw;
                top: 2.5vh;
                height: 40%;
                width: 10%;
                margin-left: 2.5%;
                margin-right: 2.5%;
                //  padding: 10px 0px;
                font-size: 1.8em;
                border-bottom: 2px solid #000000;
                border-top: #ffffff;
                border-left: #ffffff;
                border-right: #ffffff;
                text-align: center;
                background-color: (0, 0, 0, 0); // 透明背景
              }
            }
          }
          input:focus {
            border-bottom-color: #0f52e0;
            outline: none;
          }
          input:disabled {
            border-bottom-color: #666666;
            outline: none;
          }
          #sendButton {
            position: relative;

            width: 15%;
            margin-top: 2.5%;
            font-size: 1.2rem;
            text-align: center;
            background-color: #117a8b;
            overflow-x: hidden;
          }
          .afterContract {
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 45px;

            margin-top: 10px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: red;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="homepage">
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

    <nav id="Conditon" class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand">租屋條件簡單篩選</a>

      <!--使用navbar-toggler控制折叠组件,并将navbar-toggler的 data-target属性设置为collapse的id-->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#foldConditon"
        aria-controls="foldConditon"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="foldConditon">
        <ul class="navbar-nav ml-auto">
          <li>
            <select
              class="custom-select"
              v-model="region"
              @change="clickRegion"
            >
              <option value="北部">北部</option>
              <option value="中部">中部</option>
              <option value="南部">南部</option>
              <option value="中部">中部</option>
              <option value="東部">東部</option>
              <option value="離島">離島</option>
            </select>
          </li>
          <li>
            <select class="custom-select" v-model="city" @change="clickCity">
              <option
                v-for="cities in Country"
                v-bind:key="cities.city"
                v-if="cities.region === region"
                :value="cities.city"
              >
                {{ cities.city }}
              </option>
            </select>
          </li>
          <li>
            <select class="custom-select" v-model="township" @change="zeroCost">
              <option
                v-for="townships in District"
                v-bind:key="townships.township"
                v-if="townships.city === city"
                :value="townships.township"
              >
                {{ townships.township }}
              </option>
            </select>
          </li>
          <li>
            <select class="custom-select" v-model="roomtype" @change="zeroCost">
              <option value="整層住家">整層住家</option>
              <option value="分租套房">分租套房</option>
            </select>
          </li>
          <li>
            <select class="custom-select" v-model="cost">
              <option value="3千以下">3千以下</option>
              <option value="3千-5千">3千-5千</option>
              <option value="5千-1萬">5千-1萬</option>
              <option value="1萬以上">1萬以上</option>
            </select>
          </li>
          <li>
            <button
              type="button"
              class="btn btn-outline-dark"
              @click.stop="loadHouse"
            >
              搜尋
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <div class="background-container">
      <div class="selected-condition">
        <span class="badge badge-pill badge-secondary">{{ city }}</span>
        <span class="badge badge-pill badge-secondary">{{ township }}</span>
        <span class="badge badge-pill badge-secondary">{{ roomtype }}</span>
        <span class="badge badge-pill badge-secondary">{{ cost }}</span>
      </div>

      <div id="container">
        <ul>
          <li v-for="house in houses">
            <div class="houseInfo">
              <img :src="require('../assets/housePic/' + house.pic)" />
              <div class="houseText">
                <p class="title">
                  {{ house.City }}{{ house.Township }}{{ house.address }}
                </p>
                <div class="word">
                  <div class="left">
                    <p>{{ house.roomType }}</p>
                    <p>{{ house.pattern }}</p>
                  </div>
                  <div class="line"></div>
                  <div class="right">
                    <p>{{ house.space }}</p>
                  </div>
                </div>
              </div>
              <div class="cost">{{ house.detailedCost }} 元/月</div>
              <div class="function">
                <button type="button" class="btn btn-outline-info">
                  詳細資訊
                </button>
                <button
                  type="button"
                  class="btn btn-outline-info"
                  @click.stop="searchRoommate"
                >
                  揪室友
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Homepage",
  data() {
    return {
      user: this.$store.state.userName,
      houseID: '1',
      personality: "",
      region: "南部",
      city: "台南市",
      township: "東區",
      roomtype: "整層住家",
      cost: "1萬以上",
      message: "",
      houses: "",
      userInfo: "",
      houseInfo: "",
      recommend: "",
      Country: [
        { region: "北部", city: "台北市" },
        { region: "北部", city: "新北市" },
        { region: "北部", city: "基隆市" },
        { region: "北部", city: "桃園市" },
        { region: "北部", city: "新竹市" },
        { region: "北部", city: "新竹縣" },
        { region: "中部", city: "苗栗縣" },
        { region: "中部", city: "台中市" },
        { region: "中部", city: "彰化縣" },
        { region: "中部", city: "南投縣" },
        { region: "中部", city: "雲林縣" },
        { region: "南部", city: "嘉義市" },
        { region: "南部", city: "嘉義縣" },
        { region: "南部", city: "台南市" },
        { region: "南部", city: "高雄市" },
        { region: "南部", city: "屏東縣" },
        { region: "東部", city: "宜蘭縣" },
        { region: "東部", city: "花蓮縣" },
        { region: "東部", city: "臺東縣" },
        { region: "離島", city: "澎湖縣" },
        { region: "離島", city: "金門連江" },
      ],
      District: [
        { city: "台北市", township: "中山區" },
        { city: "台北市", township: "中正區" },
        { city: "台北市", township: "信義區" },
        { city: "台北市", township: "士林區" },
        { city: "台北市", township: "大同區" },
        { city: "台北市", township: "大安區" },
        { city: "台北市", township: "內湖區" },
        { city: "台北市", township: "文山區" },
        { city: "台北市", township: "北投區" },
        { city: "台北市", township: "松山區" },
        { city: "台北市", township: "南港區" },
        { city: "台北市", township: "萬華區" },

        { city: "桃園市", township: "桃園市" },
        { city: "桃園市", township: "八德區" },
        { city: "桃園市", township: "楊梅區" },
        { city: "桃園市", township: "龍潭區" },
        { city: "桃園市", township: "復興區" },
        { city: "桃園市", township: "大溪區" },
        { city: "桃園市", township: "平鎮區" },
        { city: "桃園市", township: "中壢區" },
        { city: "桃園市", township: "觀音區" },
        { city: "桃園市", township: "大園區" },
        { city: "桃園市", township: "蘆竹區" },
        { city: "桃園市", township: "龜山區" },
        { city: "桃園市", township: "新屋區" },

        { city: "台中市", township: "北屯區" },
        { city: "台中市", township: "東區" },
        { city: "台中市", township: "太平區" },
        { city: "台中市", township: "西屯區" },
        { city: "台中市", township: "大里區" },
        { city: "台中市", township: "潭子區" },
        { city: "台中市", township: "北區" },
        { city: "台中市", township: "中區" },
        { city: "台中市", township: "烏日區" },
        { city: "台中市", township: "南屯區" },
        { city: "台中市", township: "西區" },
        { city: "台中市", township: "沙鹿區" },
        { city: "台中市", township: "南區" },
        { city: "台中市", township: "龍井區" },
        { city: "台中市", township: "豐原區" },
        { city: "台中市", township: "大雅區" },
        { city: "台中市", township: "霧峰區" },
        { city: "台中市", township: "大肚區" },
        { city: "台中市", township: "梧棲區" },
        { city: "台中市", township: "清水區" },
        { city: "台中市", township: "大安區" },
        { city: "台中市", township: "后里區" },
        { city: "台中市", township: "石岡區" },
        { city: "台中市", township: "東勢區" },
        { city: "台中市", township: "和平區" },
        { city: "台中市", township: "新社區" },
        { city: "台中市", township: "神岡區" },
        { city: "台中市", township: "大甲區" },
        { city: "台中市", township: "外埔區" },

        { city: "台南市", township: "永康區" },
        { city: "台南市", township: "東區" },
        { city: "台南市", township: "中西區" },
        { city: "台南市", township: "北區" },
        { city: "台南市", township: "南區" },
        { city: "台南市", township: "安南區" },
        { city: "台南市", township: "善化區" },
        { city: "台南市", township: "新市區" },
        { city: "台南市", township: "安平區" },
        { city: "台南市", township: "新化區" },
        { city: "台南市", township: "麻豆區" },
        { city: "台南市", township: "西港區" },
        { city: "台南市", township: "山上區" },
        { city: "台南市", township: "安定區" },
        { city: "台南市", township: "歸仁區" },
        { city: "台南市", township: "左鎮區" },
        { city: "台南市", township: "玉井區" },
        { city: "台南市", township: "楠西區" },
        { city: "台南市", township: "南化區" },
        { city: "台南市", township: "仁德區" },
        { city: "台南市", township: "關廟區" },
        { city: "台南市", township: "龍崎區" },
        { city: "台南市", township: "官田區" },
        { city: "台南市", township: "佳里區" },
        { city: "台南市", township: "七股區" },
        { city: "台南市", township: "將軍區" },
        { city: "台南市", township: "學甲區" },
        { city: "台南市", township: "北門區" },
        { city: "台南市", township: "新營區" },
        { city: "台南市", township: "後壁區" },
        { city: "台南市", township: "白河區" },
        { city: "台南市", township: "東山區" },
        { city: "台南市", township: "六甲區" },
        { city: "台南市", township: "下營區" },
        { city: "台南市", township: "柳營區" },
        { city: "台南市", township: "鹽水區" },
        { city: "台南市", township: "大內區" },
      ],
    };
  },
  created() {
    var url = location.href;
    if (url.indexOf("?") != -1) {
      var arr = url.split("?");
      this.personality = arr[1];

      this.$http
        .post("/api/sendPersonality", {
          userID: this.user,
          personality: this.personality,
        })
        .then((res) => {
          this.$store.commit("personality", this.personality);
          
        });
    }
    this.$http
      .post("/api/loadHouse", {
        city: this.city,
        township: this.township,
        roomtype: this.roomtype,
        cost: this.cost,
      })
      .then((res) => {
        this.houses = res.body;
        this.$store.commit("houseID", this.houseID);
      });
  },
  methods: {
    clickRegion: function () {
      this.city = " ";
      this.township = "";
      this.roomtype = "";
      this.cost = "";
    },
    clickCity: function () {
      this.township = "";
      this.roomtype = "";
      this.cost = "";
    },
    zeroCost: function () {
      this.cost = "";
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
    loadHouse() {
      this.$http
        .post("/api/loadHouse", {
          city: this.city,
          township: this.township,
          roomtype: this.roomtype,
          cost: this.cost,
        })
        .then((res) => {
          this.houses = res.body;
        });
    },
    searchRoommate() {
      this.$http
        .post("/api/GetHouseInfo", {
          houseID: this.houseID,
        })
        .then((res) => {
          this.houseInfo = res.body;
          this.$store.commit("rentNumber", this.houseInfo[0].MaxNum);
          this.$store.commit("HouseAddress", this.houseInfo[0].address);
          this.$store.commit("HouseOwner", this.houseInfo[0].owner);
          this.$store.commit("detailedCost", this.houseInfo[0].detailedCost);
          this.$http
            .post("/api/getUser", {
              id: this.user,
            })
            .then((res) => {
              this.userInfo = res.body;
              this.$store.commit("smoke", this.userInfo[0].smoke);
              this.$store.commit("drink", this.userInfo[0].drink);
              this.$store.commit("pet", this.userInfo[0].pet);
              this.$store.commit("wake", this.userInfo[0].wake);
              this.$store.commit("sleep", this.userInfo[0].sleep);
              this.$store.commit("clean", this.userInfo[0].clean);
              this.$store.commit("bath", this.userInfo[0].bath);
              this.$store.commit("back", this.userInfo[0].back);
              this.$store.commit("m_smoke", this.userInfo[0].m_smoke);
              this.$store.commit("m_drink", this.userInfo[0].m_drink);
              this.$store.commit("m_back", this.userInfo[0].m_back);
              this.$store.commit("m_noice", this.userInfo[0].m_noice);
              this.$store.commit("s_custom", this.userInfo[0].s_custom);
              this.$store.commit("clock", this.userInfo[0].clock);
              this.$store.commit("sleep_reason", this.userInfo[0].sleep_reason);
              this.$store.commit("addr", this.userInfo[0].address);

              this.$http
                .post("pythonApi/recommend", {
                  id: this.user,
                  personality: this.userInfo[0].personality,
                  smoke: this.userInfo[0].smoke,
                  drink: this.userInfo[0].drink,
                  pet: this.userInfo[0].pet,
                  wake: this.userInfo[0].wake,
                  sleep: this.userInfo[0].sleep,
                  clean: this.userInfo[0].clean,
                  bath: this.userInfo[0].bath,
                  back: this.userInfo[0].back,
                  m_smoke: this.userInfo[0].m_smoke,
                  m_drink: this.userInfo[0].m_drink,
                  m_back: this.userInfo[0].m_back,
                  m_noice: this.userInfo[0].m_noice,
                  s_custom: this.userInfo[0].s_custom,
                  clock: this.userInfo[0].clock,
                  sleep_reason: this.userInfo[0].sleep_reason,
                })
                .then((res) => {
                  this.recommend = res.data;
                  this.$store.commit("recommend1", this.recommend[0]);
                  this.$store.commit("recommend2", this.recommend[1]);
                  this.$store.commit("recommend3", this.recommend[2]);
                  this.$store.commit("recommend4", this.recommend[3]);
                  this.$store.commit("recommend5", this.recommend[4]);
                  this.$router.push("/Roommate");
                });
            });
        });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.homepage {
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

  #condition {
    width: 100vw;
    min-height: 7.5vh;
    display: flex;
    flex-direction: row;
    font-size: 1rem;
  }

  .selected-condition {
    width: 75vw;
    position: relative;
    top: 3vh;
    left: 12.5vw;
    font-size: 1.5rem;
    display: flex;
    flex-direction: row;
    align-content: space-between;
    align-items: center;
  }
  .badge {
    margin-right: 2vw;
  }
  .background-container {
    width: 100%;
    height: 120%;
    background-image: url("../assets/background2.png");
    background-position: center;
    background-size: cover;
    #container {
      width: 75vw;
      position: relative;
      left: 12.5vw;
      top: 5vh;
      display: flex;
      flex-direction: row;
      z-index: 10;
      background-color: white;
      font-family: Noto Sans CJK TC;
      ul {
        margin: 0px;
        padding: 0px;
        li {
          list-style: none;
          margin: 15px;
          padding: 0px;

          .houseInfo {
            width: 75vw;
            height: 200px;
            display: flex;
            position: relative;

            img {
              width: 250px;
              height: 200px;
              border-bottom: 20px;
            }
            .houseText {
              position: relative;
              margin-left: 60px;
              width: 40vw;
              top: 15px;
              flex-direction: column;
              .title {
                font-size: 30px;
                font-weight: bold;
                color: #9d9d9d;
              }
              .word {
                font-size: 16px;
                display: flex;
                flex-direction: row;
                .left {
                  position: relative;
                  left: 10px;
                  flex-direction: column;
                  width: 150px;
                }
                .line {
                  height: 65px;
                  border-right: solid #acc0d8 1px;
                }
                .right {
                  position: relative;
                  left: 25px;
                }
              }
            }
            .cost {
              position: relative;
              right: 125px;
              top: 100px;
              color: red;
              font-size: 28px;
            }

            .function {
              position: relative;
              display: flex;
              flex-direction: column;
              top: 50px;
              button {
                margin: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>

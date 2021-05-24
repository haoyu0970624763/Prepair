
<template>
  <div class="LivingHabit">
    <!-- bg-dark为更改navbar背景颜色 -->
    <!-- navbar-dark为控制文本颜色 dark设置为深色背景颜色变体-->
    <div id="Container">
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
                  {{ name }}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" @click="writeHabit"
                    >查看個人檔案</a
                  >
                  <a class="dropdown-item" href="" @click="profile"
                    >查看合約</a
                  >
                  <a class="dropdown-item" @click="logout">登出</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div class="questionBox">
        <div class="title">使用者資料與習慣收集</div>
        <div class="classification-title">個人行為與嗜好</div>
        <div class="classification-word">
          <select id="choose" class="custom-select" v-model="isSmoking">
            <option value="y">是</option>
            <option value="n">否</option>
          </select>
          <p>1. 您有抽菸的習慣嗎?</p>
        </div>
        <div class="classification-word">
          <select id="choose" class="custom-select" v-model="isDrinking">
            <option value="n">完全不能接受</option>
            <option value="seldom">偶爾小酌(會喝，但不多)</option>
            <option value="y">喝酒就是命</option>
          </select>
          <p>2. 您有喝酒的習慣嗎?</p>
        </div>
        <div class="classification-word">
          <select id="choose" class="custom-select" v-model="isComing">
            <option value="y">會</option>
            <option value="absence">室友不在的話，會</option>
            <option value="agree">室友同意的話，會</option>
            <option value="n">完全不會</option>
          </select>
          <p>3. 您會帶人回住宿處嗎?</p>
        </div>

        <div class="classification-title">睡眠習慣</div>
        <div class="classification-word">
          <select id="choose" class="custom-select" v-model="SleepBadHabit">
            <option value="snore">打呼</option>
            <option value="teeth">磨牙</option>
            <option value="dream">說夢話</option>
            <option value="no">都不會</option>
          </select>
          <p>1. 在睡眠時會有打呼、磨牙、說夢話等任一習慣?</p>
        </div>
        <div class="classification-word">
          <select id="choose" class="custom-select" v-model="WakeUpTime">
            <option value="7.b">7點以前</option>
            <option value="7.~9.">7點-9點</option>
            <option value="9.~11.">9點-11點</option>
            <option value="11.a">11點之後</option>
          </select>
          <p>2. 你早上起床的時間為?</p>
        </div>
        <div class="classification-word">
          <select id="choose" class="custom-select" v-model="SleepTime">
            <option value="10.b">22點以前</option>
            <option value="10.~00.">22點-0點</option>
            <option value="00.~2.">0點-2點</option>
            <option value="2.a">2點之後</option>
            <option value="reverse">日夜顛倒</option>
          </select>
          <p>3. 你晚上睡覺的時間為?</p>
        </div>
        <div class="classification-word">
          <select id="choose" class="custom-select" v-model="SleepRanking">
            <option value="0">
              是， 1.打呼、 磨牙 2.他人說話聲、說夢話 3.光
            </option>
            <option value="1">
              是， 1.打呼、 磨牙 2.光 3.他人說話聲、說夢話
            </option>

            <option value="2">
              是， 1.他人說話聲、說夢話 2.打呼、 磨牙 3.光
            </option>
            <option value="3">
              是， 1.他人說話聲、說夢話 2.光 3.打呼、 磨牙
            </option>
            <option value="4">
              是， 1.光 2.他人說話聲、說夢話 3.打呼、 磨牙
            </option>
            <option value="5">
              是， 1.光 2.打呼、 磨牙 3.他人說話聲、說夢話
            </option>
            <option value="6">不是， 以上因素都不會影響我睡眠</option>
          </select>
          <p>
            4. 您的睡眠是否容易受到下列因素影響? 如果是，請選出影響您睡眠的排序
          </p>
        </div>
        <div class="classification-word">
          <select id="choose" class="custom-select" v-model="AlarmClock">
            <option value="1">從來沒有</option>
            <option value="2">曾經有過一兩次</option>
            <option value="3">大概每個月都有</option>
            <option value="4">常常</option>
          </select>
          <p>5. 您是否曾經有調鬧鐘卻沒有聽到鬧鐘的聲音?</p>
        </div>
        <div class="classification-title">衛生習慣</div>
        <div class="classification-word">
          <select id="choose" class="custom-select" v-model="CleanFZ">
            <option value="day">每天都會</option>
            <option value="week">一週至少一次</option>
            <option value="month">一個月至少一次(看心情做)</option>
            <option value="n">年關才打掃(從不掃的)</option>
          </select>
          <p>1. 您會定期打掃個人空間(房間)嗎?</p>
        </div>
        <div class="classification-word">
          <select id="choose" class="custom-select" v-model="CleanHabit">
            <option value="y">一定會</option>
            <option value="rule">如果有規定的話會</option>
            <option value="n">不會</option>
          </select>
          <p>2. 使用完公共空間是否會整理乾淨?</p>
        </div>

        <div class="classification-title">寵物議題</div>
        <div class="classification-word">
          <select id="choose" class="custom-select" v-model="Pet">
            <option value="y">有</option>
            <option value="want">沒有，但想養</option>
            <option value="n">沒有，也沒預計養</option>
          </select>
          <p>1. 您有養寵物嗎?</p>
        </div>

        <div class="classification-title">接受範圍</div>
        <div class="classification-word">
          <select id="choose" class="custom-select" v-model="AcceptSmoking">
            <option value="y">完全不能接受(不菸)</option>
            <option value="outside">可以在外面抽</option>
            <option value="n">可以在房間抽</option>
          </select>
          <p>1. 您能接受室友抽菸嗎?</p>
        </div>
        <div class="classification-word">
          <select id="choose" class="custom-select" v-model="AcceptDriking">
            <option value="y">完全不能接受</option>
            <option value="ok">可以，不要吐就好</option>
            <option value="n">我沒差</option>
          </select>
          <p>2. 您會介意室友喝酒嗎?</p>
        </div>
        <div class="classification-word">
          <select id="choose" class="custom-select" v-model="AcceptComing">
            <option value="n">會</option>
            <option value="seldom">一.兩次的話可以接受</option>
            <option value="y">不會</option>
          </select>
          <p>3. 您介意室友帶伴侶、朋友過夜嗎?</p>
        </div>
        <div class="classification-word">
          <select id="choose" class="custom-select" v-model="AcceptNoise">
            <option value="n">非常介意</option>
            <option value="exam">不是在考試周的話可以接受</option>
            <option value="n">不會在乎</option>
          </select>
          <p>3.會不會介意不預期的嘈雜聲(例如:鍵盤敲打聲、唱歌)?</p>
        </div>

        <button
          id="sendButton"
          type="button"
          class="btn btn-outline-secondary"
          @click.stop="sendHabit"
        >
          確認送出
        </button>
      </div>
    </div>
  </div>
</template>
        
<script>
export default {
  name: "LivingHabit",
  data() {
    return {
      name: this.$store.state.userName,
      password: this.$store.state.Password,
      isSmoking: "",
      isDrinking: "",
      isComing: "",
      SleepBadHabit: "",
      WakeUpTime: "",
      SleepTime: "",
      SleepRanking: "",
      AlarmClock: "",
      CleanFZ: "",
      CleanHabit: "",
      Pet: "",
      AcceptPet: "",
      AcceptDriking: "",
      AcceptComing: "",
      AcceptNoise: "",
      AcceptSmoking: "",
    };
  },
  methods: {
    logout() {
      this.$router.push("/");
    },
    writeHabit() {
      this.$router.push("/LivingHabit");
    },
    profile (){
      this.$router.push("/Profile")
    },
    GoToHouse() {
      this.$router.push("/Homepage");
    },
    GoToReport(){
      this.$router.push("/Report");
    },
    GoToContract() {
      this.$router.push("/Contract");
    },
    sendHabit() {
      this.$http
        .post("/api/sendHabit", {
          id: this.name,
          smoke: this.isSmoking,
          drink: this.isDrinking,
          pet: this.Pet,
          wake: this.WakeUpTime,
          sleep: this.SleepTime,
          clean: this.CleanFZ,
          bath: this.CleanHabit,
          back: this.isComing,
          s_custom: this.SleepBadHabit,
          m_smoke: this.AcceptSmoking,
          m_drink: this.AcceptDriking,
          m_back: this.AcceptComing,
          m_noise: this.AcceptNoise,
          clock: this.AlarmClock,
          sleep_reason: this.SleepRanking,
        })
        .then((res) => {
          if(res.body=='OK'){
            this.$router.push("/Homepage");
          }
        });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.LivingHabit {
  border: 0;
  padding: 0;
  margin: 0;
  width: 100vw;
  font-family: Noto Sans CJK TC;
  #navigation {
    width: 100vw;
    min-height: 7.5vh;
    max-height: 40vh;
    font-size: 1rem;

    z-index: 10;          
    position: fixed;      
    top: 0;
    left: 0;
    margin-top: 0;
    min-width: 100%;
  }
  #Container {
    background-image: url("../assets/background.jpg");
    background-position: center;
    background-size: cover;
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    overflow: auto;
    .questionBox {
      
      position: relative;
      left: 20vw;
      top: 20vh;
      width: 60vw;
      background-color: #E4DCD2;
    }
    .title {
      background-color: #7F6000;
      height: 6vh;
      color: white;
      font-weight: bold;
      font-size: 26px;
      text-align: center;
      align-items: center;
    }
    .classification-title {
      font-weight: bold;
      margin-left: 60px;
      margin-top: 50px;
      font-size: 22px;
    }
    .classification-word {
      display: flex;
      position: relative;
      margin-top: 15px;
      margin-left: 60px;
      #choose {
        width: 250px;
        margin-right: 20px;
      }
      p {
        position: relative;
        top: 0.5vh;
        align-items: center;
        padding-right: 1vw;
      }
    }
    #sendButton {
      margin-top: 20px;
      margin-left: 25vw;
      margin-bottom: 20px;
      z-index: 1;
    }
  }
}
</style>

<template>
  <div class="Report">
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
                <a class="dropdown-item" href="" @click="profile"
                  >查看合約</a
                >
                <a class="dropdown-item" href="" @click="logout">登出</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <div class="background-container">
      <div class="title">發生什麼事了呢?</div>
      <div class="subtitle">寫下您的心聲，讓我們為您服務</div>
      <div class="question-container">
        <select
          class="custom-select ch1 choose"
          v-model="rperson"
          @change="clickRperson"
        >
          <option value="房東">房東</option>
          <option value="房客">房客</option>
        </select>

        <select class="custom-select ch2 choose" v-model="rule">
          <option
            v-for="rules in Contracts"
            v-bind:key="rules.rule"
            v-if="rules.rperson === rperson"
            :value="rules.rule"
          >
            {{ rules.rule }}
          </option>
        </select>

        <button
          id="sendButton"
          type="button"
          class="btn btn-secondary"
          @click.stop="Report"
        >
          我要檢舉
        </button>
      </div>
      <div class="Audit" v-if="this.show==true">已提交申請，等待系統審核</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Report",
  data() {
    return {
      rperson: "房東",
      rule: "押金不還",
      show: false,

      Contracts: [
        { rperson: "房東", rule: "押金不還" },
        { rperson: "房客", rule: "違反抽菸規定" },
        { rperson: "房客", rule: "違反喝酒規定" },
        { rperson: "房客", rule: "違反帶人進房規定" },
        { rperson: "房客", rule: "違反養寵物規定" },
      ],
    };
  },

  methods: {
    clickRperson: function () {
      this.rule = " ";
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
    Report() {
      this.show = true;
    },
  },
};
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.Report {
  border: 0;
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  font-family: Noto Sans CJK TC;
  #navigation {
    width: 100vw;
    min-height: 7.5vh;
    max-height: 40vh;
    font-size: 1rem;
  }
  .background-container {
    width: 100vw;
    height: 92.5vh;
    background-image: url("../assets/background3.jpg");
    background-position: center;
    background-size: cover;
    background-color: rgba(0, 0, 0, 0.4);
    // 設置背景混和模式為相乘模式
    background-blend-mode: multiply;
    .title {
      position: relative;
      top: 50px;
      text-align: center;

      font-size: 5rem;
      font-weight: bold;
      color: #ffffff;
    }
    .subtitle {
      position: relative;
      top: 50px;
      text-align: center;

      font-size: 2rem;
      font-weight: bold;
      color: #ffffff;
    }
    .question-container {
      position: relative;
      top: 80px;
      left: 20%;
      padding-left: 5%;
      padding-right: 5%;
      width: 60vw;
      height: 30vh;
      display: flex;
      align-content: space-between;
      background-color: rgba(0, 0, 0, 0.5);
      .choose {
        position: relative;
        top: 60px;
        height: 30%;

        font-size: 24px;
        margin-right: 5%;
      }
      .ch1 {
        width: 20%;
      }
      .ch2 {
        width: 40%;
      }
      #sendButton {
        position: relative;
        top: 60px;

        font-size: 1.5rem;
        width: 30%;
        height: 30%;
        background-color: #117a8b;
        overflow-x: hidden;
      }
    }
  }
  .Audit {
    position: relative;
    left: 40%;
    width: 300px;
    height: 50px;
    font-weight: bold;
    font-size: 24px;
    color: red;
  }
}
</style>
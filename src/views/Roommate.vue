
<template>
  <div class="RoommatePage">
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
            <a class="nav-link" href="javascript:;">檢舉</a>
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
                <a class="dropdown-item" href="" @click="logout">登出</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <div class="pictureBox">
      <div class="leftPic"></div>
      <div class="rightPic"></div>
    </div>

    <div class="buttom-text">
      <div class="left"></div>
      <div class="right">
        <p>一起打造屬於我們的回憶</p>
      </div>
    </div>

    <div class="pair">
      <div class="title">適合人選</div>
      <div class="line"></div>

      <div class="recommend_people">
        <div class="person-region" id="first">
          <div class="person">
            <div class="face"></div>
            <p>{{ this.$store.state.recommend1 }}</p>
          </div>
          <button type="button" class="btn btn-light">揪團租</button>
        </div>
        <div class="person-region" id="second">
          <div class="person">
            <div class="face"></div>
            <p>{{ this.$store.state.recommend2 }}</p>
          </div>
          <button type="button" class="btn btn-light">揪團租</button>
        </div>
        <div class="person-region" id="third">
          <div class="person">
            <div class="face"></div>
            <p>{{ this.$store.state.recommend3 }}</p>
          </div>
          <button type="button" class="btn btn-light">揪團租</button>
        </div>
        <div class="person-region" id="fourth">
          <div class="person">
            <div class="face"></div>
            <p>{{ this.$store.state.recommend4 }}</p>
          </div>
          <button type="button" class="btn btn-light">揪團租</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
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
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.RoommatePage {
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
    height: 7.5vh;

    font-size: 1rem;
    position: fixed;
    z-index: 100;
  }
  .pictureBox {
    width: 100vw;
    height: 80vh;
    display: flex;
    flex-direction: row;
    .leftPic {
      position: relative;
      background-image: url("../assets/左圖.png");
      background-size: contain;
      top: 7.5vh;
      width: 45.5vw;
      height: 80vh;
      right: 25px;
    }
    .rightPic {
      position: relative;
      background-image: url("../assets/右圖.jpg");
      background-position: center;
      top: 7.5vh;
      width: 55.5vw;
      height: 80vh;
      background-size: cover;
    }
  }
  .buttom-text {
    position: relative;
    width: 100vw;
    height: 12.5vh;
    display: flex;
    top: 7.5vh;
    flex-direction: row;
    .left {
      width: 45vw;
      height: 12.5vh;
      opacity: 0.76;
      background-color: black;
    }
    .right {
      width: 55vw;
      height: 12.5vh;
      background-color: black;
      p {
        position: relative;
        top: 7.5vh;
        right: 7.5vw;
        font-size: 32px;
        color: #7f7f7f;
      }
    }
  }
  .pair {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 75vh;
    position: relative;
    top: 7.5vh;
    background-color: #ebe5dd;
    .title {
      position: relative;
      top: 50px;
      left: 100px;
      font-size: 36px;
      font-weight: bold;
      color: #ed7d31;
    }
    .line {
      position: relative;
      width: 81.25vw;
      left: 100px;
      top: 60px;
      position: relative;
      border-top: solid #acc0d8 5px;
    }
    .recommend_people {
      display: flex;
      flex-direction: row;
      position: relative;
      top: 80px;
      left: 100px;
      width: 100%;
      height: 45vh;

      #first {
        position: relative;
        left: 0px;
        .person {
          .face {
            background-image: url("../assets/first.png");
          }
        }
      }
      #second {
        position: relative;
        left: 100px;
        .person {
          .face {
            background-image: url("../assets/first.png");
          }
        }
      }
      #third {
        position: relative;
        left: 200px;
        .person {
          .face {
            background-image: url("../assets/first.png");
          }
        }
      }
      #fourth {
        position: relative;
        left: 300px;
        .person {
          .face {
            background-image: url("../assets/first.png");
          }
        }
      }
      .person-region {
        position: relative;
        width: 300px;
        height: 400px;

        .person {
          position: relative;
          width: 300px;
          height: 350px;

          background-image: url("../assets/frame.jpg");
          background-position: center;
          background-size: cover;
          .face {
            position: relative;
            left: 80px;
            top: 70px;
            width: 125px;
            height: 200px;
            background-position: center;
            background-size: cover;
          }
          p {
            width: 100px;
            position: relative;
            background-position: center;
            background-size: cover;
            top: 80px;
            left: 100px;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
          }
        }

        button {
          position: relative;
          top: 10px;
          left: 100px;
        }
      }
    }
  }
}
</style>

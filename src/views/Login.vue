<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-text">
        <!--href="javascript:;" 执行一段空白的javascript语句，返回空或者false值，从而防止链接跳转-->
        <a href="javascript:;" @click="handleTab(0)">登錄</a>
        <b>·</b>
        <a href="javascript:;" @click="handleTab(1)">註冊</a>
        <!-- 登录模块 -->
        <div class="right-content" v-show="typeView == 0">
          <div class="input-box">
            <!-- autocomplete="off" 禁用表单自动填充 -->
            <input
              autocomplete="off"
              type="text"
              class="input"
              v-model="formLogin.userName"
              placeholder="請輸入登錄帳號"
            />
            <!-- type="password" 让用户更加安全的输入密码 -->
            <input
              autocomplete="off"
              type="password"
              class="input"
              v-model="formLogin.userPassword"
              maxlength="20"
              @keyup.enter="login"
              placeholder="請輸入登錄密碼"
            />
          </div>
          <Button
            class="loginBtn"
            type="primary"
            :disabled="isDisabled"
            @click.stop="login"
          >
            立刻登錄
          </Button>
          <div class="error">
            <p>{{ errorMeg }}</p>
          </div>
          <div class="option">
            <span class="forget-pwd" href="javascript:;">忘記密碼?</span>
          </div>
        </div>
        <!-- 注册模块 -->
        <div class="right_content" v-show="typeView == 1">
          <div class="input-box">
            <input
              autocomplete="off"
              type="text"
              class="input"
              v-model="formRegister.userName"
              placeholder="請輸入註冊帳號"
            />
            <input
              autocomplete="off"
              type="password"
              class="input"
              v-model="formRegister.userPassword"
              maxlength="20"
              @keyup.enter="register"
              placeholder="請輸入註冊密碼"
            />
            <input
              autocomplete="off"
              type="password"
              class="input"
              v-model="formRegister.userPassword2"
              maxlength="20"
              @keyup.enter="register"
              placeholder="請再次確認密碼"
            />
          </div>
          <Button
            class="loginBtn"
            type="primary"
            :disabled="isRegAble"
            @click.stop="register"
          >
            立刻註冊
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      formLogin: {
        userName: "",
        userPassword: "",
      },
      formRegister: {
        userName: "",
        userPassword: "",
        userPassword2: "",
      },
      address: "",
      // 显示不同的view
      typeView: 0,
      errorMeg: "",
    };
  },
  computed: {
    // 登陆按钮状态
    isDisabled() {
      return !(this.formLogin.userName && this.formLogin.userPassword);
    },
    // 注册按钮状态
    isRegAble() {
      if (
        this.formRegister.userName &&
        this.formRegister.userPassword &&
        this.formRegister.userPassword == this.formRegister.userPassword2
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    // 登录/注册tab切换
    handleTab(type) {
      this.typeView = type;
      this.clearInput();
    },
    // 立即登录
    login() {
      if (this.isDisabled) {
        return false;
      }
      this.$http
        .post("/api/login", {
          id: this.formLogin.userName,
          password: this.formLogin.userPassword,
        })
        .then((res) => {
          this.errorMeg = res.body;
          if (this.errorMeg == "success") {
            this.$store.commit("name", this.formLogin.userName);
            this.$store.commit("password", this.formLogin.userPassword);
            this.$router.push("/Homepage");
          }
        });
    },
    // 立即注册
    register() {
      this.$http
        .post("/api/register", {
          id: this.formRegister.userName,
          password: this.formRegister.userPassword,
        })
        .then((res) => {
          this.address = res.body.addr;
          
          this.$store.commit("addr", this.address);
          this.$store.commit("name", this.formRegister.userName);
          this.$store.commit("password", this.formRegister.userPassword);

          if(this.$store.state.address!='' && this.$store.state.userName!='' && this.$store.state.Password!=''){
            window.location.href = "http://127.0.0.1:5500/index.html";
          }
        });
    },
    // 清空输入框
    clearInput() {
      this.formLogin = {
        userName: "",
        userPwd: "",
      };
      this.formRegister = {
        userName: "",
        userPwd2: "",
        userPwd: "",
      };
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.login-container {
  background-image: url("../assets/background.jpg");
  background-position: center;
  background-size: cover;
  position: relative;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  .login-box {
    position: absolute;
    @media screen and (min-width: 300px) and (max-width: 600px) {
      width: 260px;
      left: 15vw;
    }
    @media screen and (min-width: 600px) and (max-width: 1000px) {
      width: 420px;
      left: 25vw;
    }
    @media screen and (min-width: 1000px) {
      width: 500px;
      left: 35vw;
    }
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    box-sizing: border-box;
    text-align: center;
    box-shadow: 0 1px 11px rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    background: #fff;
    padding: 45px 35px;

    .input-box {
      margin-top: 30px;
    }
    .error {
      p {
        color: red;
      }
    }
    .option {
      text-align: center;
      margin-top: 18px;

      .forget-pwd {
        margin-top: 30px;
        float: right;
        font-size: 14px;
        font-weight: 400;
        color: #4981f2;
        line-height: 20px;
        cursor: pointer;
      }
    }
    .login-text {
      width: 100%;
      text-align: center;
      font-size: 24px;
      a {
        padding: 10px;
        color: #969696;
        &.active {
          font-weight: 600;
          color: rgba(73, 129, 242, 1);
          border-bottom: 2px solid rgba(73, 129, 242, 1);
        }
        &:hover {
          border-bottom: 2px solid rgba(73, 129, 242, 1);
        }
      }
      b {
        padding: 10px;
      }
    }

    .input-box {
      .input {
        margin-top: 20px;
      }
    }

    .loginBtn {
      width: 100%;
      height: 45px;
      margin-top: 50px;
      font-size: 20px;
    }

    .input {
      padding: 10px 0px;
      font-size: 15px;
      width: 350px;
      border: 1px solid #fff;
      background-color: rgba(0, 0, 0, 0); // 透明背景
    }

    input:focus {
      border-bottom-color: #0f52e0;
      outline: none;
    }
    .button {
      line-height: 45px;
      cursor: pointer;
      margin-top: 50px;
      border: none;
      outline: none;
      height: 45px;
      width: 350px;
      background: rgba(216, 216, 216, 1);
      border-radius: 2px;
      color: white;
      font-size: 15px;
    }
  }
}
</style>

<template>
  <div id="login-wrap">
    <h1 class="press">一对一迎新系统</h1>
    <div class="bg-div">
      <el-carousel :interval="5000" trigger="click">
        <el-carousel-item v-for="item in 4" :key="item"></el-carousel-item>
      </el-carousel>
    </div>
    <div class="content">
      <el-form
        :model="ruleForm"
        label-width="100px"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm login-container"
      >
        <!-- 这有个样式需要写 -->
        <h3 style="text-align: center">找回密码</h3>
        <el-form-item label="学号" prop="Username">
          <el-input v-model="ruleForm.Username" placeholder="请输入自己的学号"></el-input>
        </el-form-item>
        <!-- required 必填 ，max限制长度等等，规则写在rules里面 ，写在input部分无效,和表单的对应prop-->

        <el-form-item label="新密码" prop="Passwd">
          <el-input
            type="password"
            v-model="ruleForm.Passwd"
            autocomplete="off"
            show-password
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPasswd">
          <el-input
            type="password"
            v-model="ruleForm.checkPasswd"
            autocomplete="off"
            show-password
            placeholder="请再次输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="sfz">
          <el-input v-model="ruleForm.sfz" placeholder="默认凭据"></el-input>
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="verifyCode"
          class="VerifyCode"
          :inline="true"
          style="height: 41px"
        >
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-input v-model="ruleForm.verifyCode" placeholder></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-image
                  style="width: 70px; height: 40px; margin-left: 55px"
                  :src="verifyCodeImg"
                  id="verifyCodeImg"
                  @click="getVerifyCode()"
                ></el-image>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- autocomplete 关闭 ，关闭自动完成功能 -->
        <div id="loginerror">
          <el-alert title="登录名或登录密码不正确" type="error" center show-icon></el-alert>
        </div>
        <div id="usernoexit">
          <el-alert title="用户不存在" type="error" center show-icon></el-alert>
        </div>
        <div id="logout">
          <el-alert title="用户已注销" type="error" center show-icon></el-alert>
        </div>
        <div id="VerificationCode">
          <el-alert title="验证码错误" type="error" center show-icon></el-alert>
        </div>
        <div id="upsuccess">
          <el-alert title="登录成功" type="success" center show-icon></el-alert>
        </div>
        <el-form-item>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-button type="primary" style="width: 60%" @click="doUpPass('ruleForm')">修改</el-button>
                <!--  这有个内联的样式 -->
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-button
                  type="primary"
                  style="width: 60%"
                  @click="resetForm('ruleForm'), open2()"
                >重置</el-button>
                <!--  这有个内联的样式 -->
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-link type="success" @click="toLogin">登录</el-link>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  //  单页面中不支持前面的data:{}方式
  data () {
    // 校验两个密码的是否一致，callback叫回调函数
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPasswdwd !== '') {
          this.$refs.ruleForm.validateField('checkPasswd');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'));
      }
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.Passwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        Username: "",       // 学号
        Passwd: "",         // 账号密码
        checkPasswd: "",    // 密码验证
        sfz: "",             // 身份证
        verifyCode: '',      // 验证码
        flag: 0              // 后端返回状态码
      },
      //  RegisterShow:false

      rules: {
        //表单输入验证规则   
        Username: [
          { required: true, message: "不能为空" },  // , trigger: 'blur' 是变焦才，, trigger: 'blur'
        ],
        Passwd: [
          { validator: validatePass, trigger: 'blur', required: true, },
        ],
        checkPasswd: [
          { validator: validatePass2, trigger: 'blur', },
          { required: true, message: "不能为空" },
        ],
        sfz: [
          { required: true, message: "不能为空" },  // , trigger: 'blur' 是变焦才，, trigger: 'blur'
        ],
        verifyCode: [
          { required: true, message: "不能为空" },  // , trigger: 'blur' 是变焦才，, trigger: 'blur'
        ],
      },
      fits: ['contain']
    };
  },
  methods: {
    getVerifyCode () {
      //  获取验证码的方法
      //  调用后端接口获取验证码图片装入verifyCodeImg中
      this.verifyCodeImg = 'http:// localhost/????';

      //  输出验证是否收到验证码图片
      // console.log(this.verifyCodeImg);

      //  调用时间戳，防止验证码因浏览器缓存无法刷新，设置verifyCodeImg元素src属性为验证码图片url
      document.getElementById('verifyCodeImg').src = this.timestamp(
        'http:// localhost/????'
      );
    },
    timestamp (url) {
      //  生成时间戳，用于验证码图片刷新
      var getTimestamp = new Date().getTime();
      // console.log(url);
      if (url.indexOf('?') > -1) {
        url = url + '&timestamp=' + getTimestamp;
        // console.log("1" + url);
      } else {
        url = url + '?timestamp=' + getTimestamp;
        // console.log("2" + url);
      }
      return url;
    },
    doUpPass (formName) {
      // 一点击登录按钮，这个方法就会执行  ，方法都要放在这个methods里面
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //  在这里写登录成功之后的操作
          const formName = this.ruleForm; // 创建formNmae对象载入ruleForm对象--ruleForm对象用于装载用户的键入值
          axios
            .post('http:// localhost/???', {
              // 利用axios，post请求向后台提交数据
              username: formName.Username, // username：用户名
              passwd: formName.Passwd, // passwd：账号密码
              code: this.ruleForm.verifyCode // code：验证码
            })
            .then((ret) => {
              // 将后台返回数据载入ruleForm对象中
              this.ruleForm.flag = ret.data;
              // console.log(this.ruleForm.flag)
              // 声明缓存
              // 判断后台返回状态码
              if (this.ruleForm.flag === '601') {
                this.open1();
                const that = this;
                setTimeout(function () {
                  that.$router.push('/homepage');
                }, 100);
                // 刷新验证码
                // this.getVerifyCode();
                // 普通用户登陆成功
              }
            });
        } else {
          // 若表单验证不通过
          console.log('error submit!!');
          this.open3;
          // document.getElementById('loginerror').style.display = 'block';
          return false;
        }
      });
    },
    toLogin () {
      // 跳转
      this.$router.push('/login'); //  路由的方法跳转到注册页面
    },
    resetForm (formName) {
      this.$refs[formName].resetFields(); //  重置的函数，清空警告信息,elementui表单的方法
    },
    nonedisplay () {
      document.getElementById('loginerror').style.display = 'none';
      document.getElementById('VerificationCode').style.display = 'none';
      document.getElementById('logout').style.display = 'none';
      document.getElementById('loginerror').style.display = 'none';
      document.getElementById('usernoexit').style.display = 'none';
      document.getElementById('upsuccess').style.display = 'none';
    },
    open1 () {
      this.$message({
        message: '修改成功',
        type: 'success',
        duration: 1500
      });
    },
    open2 () {
      this.$message({
        message: '清空成功',
        duration: 1500
      });
    }
  },
  open3 () {
    this.$message({
      message: '修改失败',
      type: 'error',
      duration: 1500
    });
  },

  created () {
    // 页面加载是进行的操作
    // 清空缓存
    window.sessionStorage.clear();
    // 刷新验证码
    this.getVerifyCode();
  },
  components: {
    //  同一路径调用另一个vue才使用
    //  Register,
  }
};
</script>

<style scoped>
.press {
  color: transparent;
  background-color: black;
  text-shadow: rgba(255, 255, 255, 0.5) 0 5px 6px,
    rgba(255, 255, 255, 0.2) 1px 3px 3px;
  -webkit-background-clip: text;
}
.login-container {
  border-radius: 10px;
  margin: 0px auto;
  width: 350px;
  padding: 30px 40px 20px 35px;
  background-color: #ffffff;
  opacity: 0.9;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}

.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
#logout,
#loginerror,
#usernoexit,
#VerificationCode,
#upsuccess {
  display: none;
  margin-bottom: 15px;
}
.el-carousel__item:nth-child(5) {
  background: url('/image/bg1.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100%;
}

.el-carousel__item:nth-child(6) {
  background: url('/image/bg2.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.el-carousel__item:nth-child(3) {
  background: url('/image/bg3.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.el-carousel__item:nth-child(4) {
  background: url('/image/bg4.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.content {
  float: right;
  position: relative;
  z-index: 100;
  box-sizing: border-box;
  padding-top: 5%;
  padding-right: 1%;
}
.bg-div {
  float: left;
  position: absolute;
  z-index: -100;
  width: 68%;
  height: 68%;
  /* padding-top: 2%; */
  padding-left: 1%;
}
.bg-div /deep/ .el-carousel {
  height: 657px;
}

.bg-div /deep/ .el-carousel__container {
  height: 657px;
}
.bg-div /deep/ .el-carousel__arrow {
  display: none;
}
.VerifyCode /deep/ .el-input {
  width: 170px;
}
.el-image /deep/ .VerifyCode {
  margin-left: 10px;
}
.el-image__inner /deep/ .VerifyCode {
  margin-bottom: 0;
  margin-top: 10px;
}
</style>

<template>
  <div class="login-wrap">
    <el-tabs type="border-card" class="home-tabs">
      <el-tab-pane label="我的信息">
        <el-radio-group v-model="labelPosition" size="small">
          <el-radio-button label="left">左对齐</el-radio-button>
          <el-radio-button label="right">右对齐</el-radio-button>
          <el-radio-button label="top">顶部对齐</el-radio-button>
        </el-radio-group>
        <div style="margin: 20px"></div>
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formInfo"
          status-icon
          ref="formInfo"
          class="demo-ruleForm login-container"
        >
          <el-form-item label="姓名:">
            <el-input v-model="formInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="学号:">
            <el-input v-model="formInfo.schoolId" disabled></el-input>
          </el-form-item>
          <el-form-item label="学院(部):">
            <el-input v-model="formInfo.department" disabled></el-input>
          </el-form-item>
          <el-form-item label="宿舍:">
            <el-input v-model="formInfo.dorm" disabled></el-input>
          </el-form-item>
          <el-form-item label="电话:">
            <el-input v-model="formInfo.phone" disabled></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="对接人信息">
        <el-radio-group v-model="labelPosition2" size="small">
          <el-radio-button label="left">左对齐</el-radio-button>
          <el-radio-button label="right">右对齐</el-radio-button>
          <el-radio-button label="top">顶部对齐</el-radio-button>
        </el-radio-group>
        <div style="margin: 20px"></div>
        <el-form
          :label-position="labelPosition2"
          label-width="100px"
          :model="formInfoMeet"
          status-icon
          ref="formInfoMeet"
          class="demo-ruleForm login-container"
        >
          <el-form-item label="对接人姓名:">
            <el-input v-model="formInfoMeet.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="对接人学号:">
            <el-input v-model="formInfoMeet.schoolId" disabled></el-input>
          </el-form-item>
          <el-form-item label="学院(部):">
            <el-input v-model="formInfoMeet.department" disabled></el-input>
          </el-form-item>
          <el-form-item label="对接人宿舍:">
            <el-input v-model="formInfoMeet.dorm" disabled></el-input>
          </el-form-item>
          <el-form-item label="对接人电话:">
            <el-input v-model="formInfoMeet.phone" disabled></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="评论">
        <el-card class="box-card">
          <h2>这是个标题{{ DisTitle }}</h2>
          <p class="p-tag">11-14</p>
          <p class="p-tag">85评论</p>
          <p class="p-messge">
            我是一只小猫，Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0
            的组件库，提供了配套设计资源，帮助你的网站快速成型。由饿了么公司前端团队开源。
          </p>
          <p class>85评论</p>
          <el-card>
            <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply">
              <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
              <div class="reply-info">
                <div
                  tabindex="0"
                  contenteditable="true"
                  id="replyInput"
                  spellcheck="false"
                  placeholder="输入评论..."
                  class="reply-input"
                  @focus="showReplyBtn"
                  @input="onDivInput($event)"
                ></div>
              </div>
              <div class="reply-btn-box" v-show="btnShow">
                <el-button class="reply-btn" size="medium" @click="sendComment" type="primary">发表评论</el-button>
              </div>
            </div>
            <!-- 以上的是对问题的发表评论 -->
            <div v-for="(item, i) in comments" :key="i" class="author-title reply-father">
              <el-avatar class="header-img" :size="40" :src="item.face"></el-avatar>
              <div class="author-info">
                <span class="author-stuNum">{{ item.stuNum }}</span>
                <span class="author-timeStr">{{ item.timeStr }}</span>
              </div>
              <!-- 按评论图标回复评论 -->
              <div class="icon-btn">
                <span @click="showReplyInput(i, item.stuNum, item.uid)">
                  <i class="iconfont el-icon-s-comment"></i>
                  {{ item.comCount }}
                </span>
                <span>
                  <p
                    class="icon-likeCount"
                    uid="icon-likeCount"
                    @click="toggle_like( i, item.likeCount, item.uid)"
                  >&#10084;</p>
                  {{ item.likeCount }}
                </span>
                <!-- 仅登录的ID是等于评论人的ID，才会显示关闭评论 -->
                <span v-if="myid==item.uid" @click="delecont()">
                  <i class="iconfont el-icon-close"></i>
                </span>
              </div>
              <div class="talk-box">
                <p>
                  <span class="reply">{{ item.content }}</span>
                </p>
              </div>
              <div class="reply-box">
                <div v-for="(reply, j) in item.reply" :key="j" class="author-title">
                  <div class="author-info">
                    <span class="author-stuNum">{{ reply.from }}</span>
                    <span class="author-timeStr">&nbsp;{{ reply.timeStr }}</span>
                    <span class="reply">：{{ reply.content }}</span>
                  </div>
                </div>
              </div>
              <div v-show="_inputShow(i)" class="my-reply my-content-reply">
                <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
                <div class="reply-info">
                  <div
                    tabindex="0"
                    contenteditable="true"
                    spellcheck="false"
                    placeholder="输入评论..."
                    @input="onDivInput($event)"
                    class="reply-input reply-content-input"
                  ></div>
                </div>
                <div class="reply-btn-box">
                  <el-button
                    class="reply-btn"
                    size="medium"
                    @click="sendCommentReply(i)"
                    type="primary"
                  >回复评论</el-button>
                </div>
              </div>
            </div>
          </el-card>
        </el-card>
      </el-tab-pane>
    </el-tabs>

    <br />
  </div>
</template>

<script>
import axios from 'axios';
const clickoutside = {
  // 初始化指令
  bind (el, binding, vnode) {
    function documentHandler (e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  update () { },
  unbind (el, binding) {
    // 解除事件监听
    document.removeEventListener("click", el.vueClickOutside);
    delete el.vueClickOutside;
  },
};

export default {
  data () {
    return {
      labelPosition: "right",
      labelPosition2: "right",

      formInfo: {
        // 我的信息的表单
        username: "",
        schoolId: "",
        department: "",
        dorm: "",
        phone: ""
      },
      formInfoMeet: {
        // 对接信息的表单
        username: "",
        schoolId: "",
        department: "",
        dorm: "",
        phone: ""
      },
      DisTitle: "",   // 标题
      btnShow: false, // 按钮是否显示
      index: "0",     // 评论标序
      replyComment: "", // 评论
      myName: "Lana Del Rey",  // 登录用户名
      myHeader:         // 自己的头像
        "https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg",
      myid: 19870621,   // 登录的id
      to: "",
      toId: -1,
      commentList: [],  // 评论列表，接收后端的数据
      comments: [
        {
          stuNum: "Lana Del Rey",   // 评论人的姓名
          uid: 19870621,           // 评论人的ID
          face:                // 头像
            "https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg",
          pid: 0,
          content: "我发布一张新专辑Norman Fucking Rockwell,大家快来听啊",    // 评论
          timeStr: "2019年9月16日 18:43",      // 评论时间
          comCount: 2,    // 评论人数
          liked: false,      // 点赞否
          likeCount: 15,         // 点赞人数
          inputShow: false,
          reply: [
          ],  // 接收评论的回复
        },
        {
          stuNum: "Taylor Swift",
          uid: 19891221,
          face:
            "https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg",
          pid: 1,
          content: "我发行了我的新专辑Lover",
          timeStr: "2019年9月16日 18:43",
          comCount: 1,
          liked: false,
          likeCount: 5,
          inputShow: false,
          reply: [
          ],
        },
        {
          stuNum: "Norman Fucking Rockwell",
          uid: 20190830,
          face:
            "https://ae01.alicdn.com/kf/Hdd856ae4c81545d2b51fa0c209f7aa28Z.jpg",
          p2d: 0,
          content: "Plz buy Norman Fucking Rockwell on everywhere",
          timeStr: "2019年9月16日 18:43",
          comCount: 0,
          liked: false,
          likeCount: 5,
          inputShow: false,
          reply: [],
        },
      ],
    };
  },
  /* 页面加载或者刷新 */
  created () {
    axios.get('http://localhost/user/printAllPub', {  // 页面加载 和刷新的时候
      //axios post请求后台数据
      //提交数据：
    }).then(ret => {                                      //接受后台返回数据
      this.stuNum = ret.data.stuNum;                      // 后端给前端
      this.face = ret.data.face;
      this.content = ret.data.content;
      this.timeStr = ret.data.timeStr;
      this.likeCount = ret.data.likeCount;
      this.comCount = ret.data.comCount;

      // console.log(this.reIssueList);                //验证是否收到
      // if () {

      // }

    });
  },
  directives: { clickoutside },
  methods: {
    inputFocus () {
      var replyInput = document.getElementById("replyInput");
      replyInput.style.padding = "8px 8px";
      replyInput.style.border = "2px solid blue";
      replyInput.focus();
    },
    showReplyBtn () {
      this.btnShow = true;
    },
    hideReplyBtn () {
      this.btnShow = false;
      replyInput.style.padding = "10px";
      replyInput.style.border = "none";
    },
    showReplyInput (i, stuNum, uid) {
      this.comments[this.index].inputShow = false;
      this.index = i;
      this.comments[i].inputShow = true;
      this.to = stuNum;
      this.toId = uid;
    },
    _inputShow (i) {
      return this.comments[i].inputShow;
    },
    /* 发表评论 */
    sendComment () {
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "评论不能为空",
        });
      } else {
        let a = {};
        let input = document.getElementById("replyInput");
        let timeNow = new Date().getTime();
        let timeStr = this.dateStr(timeNow);
        a.stuNum = this.myName;
        a.content = this.replyComment;
        a.face = this.myHeader;
        a.timeStr = timeStr;
        a.comCount = 0;
        a.likeCount = 0;
        this.comments.push(a);
        this.replyComment = "";
        input.innerText = "";

        // 交互
        axios
          .post('http://localhost/user/post', { // 发表
            // 利用axios，post请求向后台提交数据
            // content: this.content,
            content: this.replyComment, // replyComment 评论 
            uid: this.uid,
          })
          .then((ret) => {
            // 将后台返回数据data载入到
            this.flag = ret.data.flag;
            if (flag == true) {
              this.open1();   // 发表成功的提示    
            } else {
              this.open2();   // 发表失败的提示 
            }
          });
      }
    },
    /* 删除评论 */
    delecont () {
      axios
        .post('http://localhost/user/unpost', { // 删除
          // 利用axios，post请求向后台提交数据
          pid: this.pid,
        })
        .then((ret) => {
          // 将后台返回数据data载入到
          this.flag = ret.data.flag;
          if (flag == true) {
            this.$message({
              showClose: true,
              type: "success",
              message: "删除成功",
              duration: 1500,
            });
          } else {
            this.$message({
              showClose: true,
              type: "warning",
              message: "删除失败",
              duration: 1500,
            });
          }
        });

    },
    /* 点赞评论 */
    toggle_like (i, likeCount, uid) {
      if (!this.comments[i].liked) {
        this.comments[i].likeCount++;
        document.getElementsByClassName("icon-likeCount")[i].style.color = "red";
        this.comments[i].liked = true;
        // 交互
        axios
          .post('http://localhost/user/like', { // 点赞
            // 利用axios，post请求向后台提交数据
            pid: this.pid,
            uid: this.uid,
          })
          .then((ret) => {
            // 将后台返回数据data载入到
            this.flag = ret.data.flag;
            if (flag == true) {
              this.$message({
                showClose: true,
                type: "success",
                message: "点赞成功",
                duration: 1500,
              });
            } else {
              this.$message({
                showClose: true,
                type: "warning",
                message: "点赞失败",
                duration: 1500,
              });
            }
          });
      }
      else {
        this.comments[i].likeCount--;
        document.getElementsByClassName("icon-likeCount")[i].style.color = " #ccc";
        this.comments[i].liked = false;
        // 交互
        axios
          .post('http://localhost/user/unlike', { // 点赞失败
            // 利用axios，post请求向后台提交数据
            pid: this.pid,
            uid: this.uid,
          })
          .then((ret) => {
            // 将后台返回数据data载入到
            this.flag = ret.data.flag;
            if (flag == true) {
              this.$message({
                showClose: true,
                type: "success",
                message: "取消点赞成功",
                duration: 1500,
              });
            } else {
              this.$message({
                showClose: true,
                type: "warning",
                message: "取消点赞失败",
                duration: 1500,
              });
            }
          });
      }
      this.liked = !this.liked;
    },
    /* 回复评论 */
    sendCommentReply (i, j) {
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "回复不能为空",
        });
      } else {
        let a = {};
        let timeNow = new Date().getTime();
        let timeStr = this.dateStr(timeNow);
        a.from = this.myName;
        a.to = this.to;
        a.fromHeadImg = this.myHeader;
        a.content = this.replyComment;
        a.timeStr = timeStr;
        a.comCount = 0;
        a.likeCount = 0;
        this.comments[i].reply.push(a);
        this.replyComment = "";
        document.getElementsByClassName("reply-content-input")[i].innerText =
          "";

        // 交互
        axios
          .post('http://localhost/user/comment', { // 回复评论
            // 利用axios，post请求向后台提交数据
            // content: this.content,
            content: this.replyComment, // replyComment 评论 
            pid: this.pid,
            uid: this.uid,
          })
          .then((ret) => {
            // 将后台返回数据data载入到
            this.flag = ret.data.flag;
            if (flag == true) {
              this.open1();   // 发表成功的提示    
            } else {
              this.open2();   // 发表失败的提示 
            }
          });
      }
    },

    onDivInput: function (e) {
      this.replyComment = e.target.innerText;
    },
    dateStr (date) {
      //获取js 时间戳
      var timeStr = new Date().getTime();
      //去掉 js 时间戳后三位，与php 时间戳保持一致
      timeStr = parseInt((timeStr - date) / 1000);
      //存储转换值
      var s;
      if (timeStr < 60 * 10) {
        //十分钟内
        return "刚刚";
      } else if (timeStr < 60 * 60 && timeStr >= 60 * 10) {
        //超过十分钟少于1小时
        s = Math.floor(timeStr / 60);
        return s + "分钟前";
      } else if (timeStr < 60 * 60 * 24 && timeStr >= 60 * 60) {
        //超过1小时少于24小时
        s = Math.floor(timeStr / 60 / 60);
        return s + "小时前";
      } else if (timeStr < 60 * 60 * 24 * 30 && timeStr >= 60 * 60 * 24) {
        //超过1天少于30天内
        s = Math.floor(timeStr / 60 / 60 / 24);
        return s + "天前";
      } else {
        //超过30天ddd
        var date = new Date(parseInt(date));
        return (
          date.getFullYear() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getDate()
        );
      }
    },
    open1 () {
      this.$message({
        message: '发表成功',
        type: 'success',
        duration: 1500
      });
    },
    open2 () {
      this.$message({
        message: '发表失败',
        type: 'error',
        duration: 1500
      });
    }
  },
};
</script>

<style scoped lang="less">
// .login-wrap {
//   background: url('/image/bg1.jpg');
// }
.home-tabs {
  background: url('/image/bg7.jpg');
  opacity: 0.85;
}
.login-container {
  border-radius: 10px;
  margin: 0px auto;
  width: 400px;
  padding: 30px 40px 20px 35px;
  background: #fff;
  opacity: 0.8;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}
.box-card {
  border-radius: 35px;
  padding: 5px 40px 10px 25px;
  width: 800px;
  margin: 0px auto;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}
.p-tag {
  display: inline;
  color: darkgray;
  margin-right: 20px;
}
.p-messge {
  margin-left: 30px;
}
.face {
  display: block;
  height: 80px;
  width: 80px;
}
.dismessge {
  display: inline;
}

.my-reply {
  padding: 10px;
  background-color: #fafbfc;
}

.header-img {
  display: inline-block;
  vertical-align: top;
}

.reply-info {
  display: inline-block;
  margin-left: 5px;
  width: 90%;
  @media screen and (max-width: 1200px) {
    width: 80%;
  }
}

.reply-input {
  min-height: 20px;
  line-height: 22px;
  padding: 10px 10px;
  color: #ccc;
  background-color: #fff;
  border-radius: 5px;
  // &:empty:before
  //     content attr(placeholder)
  // &:focus:before
  //     content none
  // &:focus
  //     padding:8px 8px;
  // border: 2px solid blue;
  // box-shadow:none;
  // outline:none;
}

.reply-btn-box {
  height: 25px;
  margin: 10px 0;
}

.reply-btn {
  position: relative;
  float: right;
  margin-right: 15px;
}

.my-content-reply {
  margin-left: 50px;
}

// .reply-input {
//   width: flex;
// }

.author-title:not(:last-child) {
  border-bottom: 1px solid rgba(178, 186, 194, 0.3);
}

.author-title {
  padding: 10px;
}

.header-img {
  display: inline-block;
  vertical-align: top;
}

.author-info {
  display: inline-block;
  margin-left: 5px;
  width: 60%;
  // height: 30px;
  line-height: 20px;
}

> span {
  display: block;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.author-stuNum {
  color: #000;
  font-size: 18px;
  font-weight: bold;
}

.author-timeStr {
  font-size: 14px;
}

.icon-btn {
  width: 30%;
  padding: 0 !important ;
  float: right;
  @media screen and (max-width: 1200px) {
    width: 20%;
    padding: 7px;
  }
}

> span {
  cursor: pointer;
}

.iconfont {
  margin: 0 5px;
}

.icon-likeCount {
  display: inline-block;
  font-size: 4px;
  color: #ccc;
  cursor: pointer;
}

.talk-box {
  margin: 0 50px;
  display: inline-block;
}
> p {
  margin: 0;
}
.reply {
  font-size: 16px;
  color: #000;
}

.reply-box {
  margin: 10px 0 0 50px;
  background-color: #efefef;
}
</style>

<template>
  <div class="login-bg">
    <div class="login-container">
      <div class="login-box">
          <div>
          <div style="margin-top:10%;margin-left: 10%">
            <img style="width:50%;margin-left:10%"   src="../../assets/logo.png"></img>
            <el-row>
              <el-col :span="24">
              <img style="width: 20px;margin-bottom: -4px;"  src="../../assets/icont_auth.png"></img>
              <el-input  style="width: 80%"  type="text" @keyup.enter.native="handleSubmit" v-model="loginUser.account" auto-complete="off" placeholder="用户名"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 30px">
              <el-col :span="24">
            <img style="width: 20px;margin-bottom: -4px;"  src="../../assets/icont_psword.png"></img>
              <el-input style="width: 80%" type="password" @keyup.enter.native="handleSubmit" v-model="loginUser.checkPass" auto-complete="off" placeholder="密码"></el-input>
              </el-col>
            </el-row>
          <el-row>
              <el-col :span="24">
                 <el-button  type="primary" style="width:25%;margin-top: 30px;text-align: center;margin-left: 150px;"  @click.native.prevent="handleSubmit" :loading="logining">登录
                </el-button>
              </el-col>
          </el-row>
        </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {login,logout} from '@/api/UserApi.js'
  import NProgress from 'nprogress'
  import {SESSION_STORAGE_USER} from "@/utils/ConstUtils.js"
  import {SESSION_STOART_MENUS} from "@/utils/ConstUtils.js"
    export default {
      name: "login",
      data() {
        return {
          iconAuth: '../../assets/icont_auth.png',
          logining: false,
          loginUser: {
            account: '',
            checkPass: ''
          },
          rules: {
            account: [
              {required: true, message: '请输入账号', trigger: 'blur'},
              //{ validator: validaePass }
            ],
            checkPass: [
              {required: true, message: '请输入密码', trigger: 'blur'},
              //{ validator: validaePass2 }
            ]
          },
          checked: true
        };
      },
      //页面加载调用获取cookie值
      mounted() {
        this.getCookie();
       // this.logout();
      },
      methods: {
        //设置cookie
        setCookie(c_name, c_pwd, exdays) {
          let exdate = new Date(); //获取时间
          exdate.setDate(exdate.getDate() + parseInt(exdays));
          console.log(exdate)
          let cookie_str = ";path=/;expires=" + exdate.toGMTString();
          //字符串拼接cookie
          let cookie = window.document.cookie;
          cookie = "account=" + c_name + cookie_str;
          cookie = "checkPass=" + c_pwd + cookie_str;
        },
        handleSubmit(ev) {
          let _this = this;
              this.logining = true;
              //判断复选框是否被勾选 勾选则调用配置cookie方法
              NProgress.start();
              this.setCookie(this.loginUser.account, this.loginUser.checkPass, 7);
              let loginParams = {account: this.loginUser.account, password: this.loginUser.checkPass};
              let url = _this.api.API_GATEWATE+'sessions';
              console.log(url)
          _this.$http.post(url, loginParams,_this.GLOBAL.topheaders())
                .then(function (res) {

                  if(res.data){
                    console.log(res.data)
                    _this.logining = false;
                    NProgress.done();
                     ;
                    //将登录的用户信息存放到sessionStorage
                    sessionStorage.setItem(SESSION_STORAGE_USER, JSON.stringify(res.data));
                    // 将用户菜单权限保存到sessionStorage
                    sessionStorage.setItem(SESSION_STOART_MENUS, JSON.stringify(res.data.resources));
                    _this.$router.push({path: '/home'});
                  }
              }.bind(this))
                .catch(function(err){

                  NProgress.done();
                  _this.logining = false;
                  if(err.data) {
                    if(err.data.msg){
                      _this.$message({
                        message: err.data.msg,
                        type: 'error'
                      });
                    }
                    if(err.data.message){
                      _this.$message({
                        message: err.data.message,
                        type: 'error'
                      });
                    }
                    //控制台打印错误返回的内容
                  }
                  //bind(this)可以不用
                }.bind(this));
        },
        //读取cookie
        getCookie: function() {

          if (document.cookie.length > 0) {
            let keyValueStrArr = document.cookie.split('; ') || []; //这里显示的格式需要切割一下自己可输出看下
            keyValueStrArr.forEach( kv => {
              let kvArr = kv.split('=') || [];
              let key = kvArr[0] || '';
              switch(key){
                case 'account':{
                  this.loginUser.account = kvArr[1]; //保存到保存数据的地方
                  break;
                }
                case 'checkPass':{
                  this.loginUser.checkPass = kvArr[1];
                  break;
                }
                default:{ }
              }
            });
          }
        },
        //清除cookie
        clearCookie: function() {
          this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
        },
        logout: function() {
          logout().then(res => {
            console.log("logout: "+res.message);
          });
        },
      }
    }
</script>

<style lang="scss">
  .loginUser{

    .el-form-item.is-success .el-input__inner,  .el-input__inner:focus {
      border-color: #eeb726;
    }
  }
  .login-box {
    //重写elment UI样式
    .el-form {
      .el-form-item.is-required,
      .el-form-item {
        &:last-child {
          margin-bottom: 0;
        }
        .el-form-item__content {
          .el-input {
            font-size: 16px;
            .el-input__inner {
            }
          }
        }
      }
      .el-button--primary {
        //padding: 6px;
        color: #fff;
        background-color: #eeb726;
        border-color: #eeb726;
        //font-size: 16px;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .login-bg {
    height: 100%;

    //min-height: 768px;
    // background-image: url("../../assets/images/login/bg01.jpg"),
    //     url("../../assets/images/login/bg02.jpg"),
    //     url("../../assets/images/login/bg03.jpg");
    // background-position: left top, left 400px, left 733px;
    // background-repeat: no-repeat, no-repeat, no-repeat;
    // background-clip: padding-box;
    // background-attachment:fixed;
    background: url("../../assets/background.jpg") no-repeat;
    background-size: 100% 100%;

    .login-container {
      display: -moz-box; /* Firefox */
      display: -ms-flexbox; /* IE10 */
      display: -webkit-box; /* Safari */
      display: -webkit-flex; /* Chrome, WebKit */
      display: flex;
      width: 100%;
      height: 100%;

      .login-box {
        width: 30%;
        //padding: 50px 0;
        margin-left: 63%;
        margin-top: 15%;
        background: #fff;
        height:55%;

        .title-login {
          text-align: center;
          font-size: 24px;
          color: #000000;
          line-height: 1;
          margin-bottom:35px;
        }
        .remember {
          margin-bottom: 20px;
        }
        .el-form {
          //width: 350px;
          margin: 0 80px;
        }
      }
    }
  }


</style>

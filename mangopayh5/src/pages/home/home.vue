<template>
  <div>
    <el-row class="container">
      <div id="top" :style="{background:'url('+bg+'),no-repeat',backgroundSize:'100%,100%'}" v-if="bg">
        <div class="logo">
          <ul class="nav-r">
            <li>
              <span style="color: #fff">您好，{{sysUserName}}</span>
            </li>
            <li>
              <el-dropdown @command="handleCommand">
                <span class="dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="change">修改密码</el-dropdown-item>
                <el-dropdown-item command="out">退出登录</el-dropdown-item>
                
                </el-dropdown-menu>
              </el-dropdown>
            </li>
           
           <!--  <li  style="color: #FFF; margin-left: 20px">欢迎回来</li> -->
            <li><a ><img :src="tuichu"/>退出出</a></li>
          </ul>
        </div>
      </div>
      <el-col :span="24" class="main" style="overflow: hidden;">
        <el-container>
          <el-aside style="width: 13%;background-color:rgb(55, 74, 104)">
            <el-scrollbar style="height:100%; background-color:#374a68;">
              <!--导航菜单-->
              <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                router
                @open="handleOpen"
                @close="handleClose"
                :unique-opened=true
                background-color="#374a68"
                text-color="#c0c4cc"
                active-text-color="#ffd04b">
                <div class="elMenu_shouye">
                  <el-menu-item index="/mgp/index" @click="gotoIndex('/mgp/index')" style="padding-left: 0px !important;" class="elMenuitem" v-if="menuLists.some(e=>{return e.resourceId == 15})">
                    <div class="el-submenu__title">
                      <i class="el-icon-share" ></i><span>首页</span>
                    </div>
                  </el-menu-item>
                </div>
                <el-submenu v-for="(item,index) in menus.filter(e=>{return e.resourceId !== 15})" :index="index+''"  class="elSubmenu" :key="item.resourceId">
                  <template slot="title">
                    <i :class="item.smallicon"></i><span>{{item.resourceName}}</span>
                  </template>
                  <el-menu-item-group v-for="childs in menuLists" :key="childs.resourceId" v-if="childs.resourceParentId == item.resourceId">
                    <el-menu-item :index="childs.resourceCode"  @click="gotoIndex(childs)">{{childs.resourceName}}</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <div style="text-align: center;"><i class="anticon anticon-left-circle trigger___3ftaW">
                  <svg viewBox="64 64 896 896" class="" data-icon="left-circle" width="1em" height="1em" fill="currentColor" aria-hidden=true></svg></i>
                </div>
              </el-menu>
            </el-scrollbar>
          </el-aside>
          <el-main style="padding: 0 0;width: 100%;height:100%;overflow: hidden;">
            <section class="content-container">
              <div class="grid-content bg-purple-light">
                <el-col :span="24" class="breadcrumb-container" v-show ="isShow">
                  <el-breadcrumb separator="/">
                    <el-breadcrumb-item>{{menuName?menuName:'首页'}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{resourceName!=='undefined:' ?resourceName:'首页'}}</el-breadcrumb-item>
                  </el-breadcrumb>
                </el-col>
                <el-col :span="24" class="content-wrapper">
                  <transition name="fade" mode="out-in">
                    <router-view></router-view>
                  </transition>
                </el-col>
              </div>
            </section>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
    <el-dialog
      title="密码修改"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="pwdhandleClose">
      <el-form ref="pwdList"   label-width="120px">
        <el-form-item label="旧的密码" >
          <el-input v-model="pwdList.oldPassword" type="password" clearable size="mini" maxlength="16" style="width:80%" ></el-input>
        </el-form-item>
        <el-form-item label="新的密码">
          <el-input v-model="pwdList.newPassword" type="password" clearable maxlength="16" size="mini"  style="width: 80%" ></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="pwdList.newPassword1" type="password" clearable maxlength="16" size="mini"  style="width: 80%" ></el-input>
        </el-form-item>
      </el-form> 
       <span slot="footer" class="dialog-footer">
      <el-button @click="resetChecked">取 消</el-button>
      <el-button type="primary" @click="changePassWord">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {SESSION_STORAGE_USER} from "@/utils/ConstUtils.js"
  import {SESSION_STOART_MENUS} from "@/utils/ConstUtils.js"
  import {logout} from '@/api/UserApi'
    export default {
        name: "home",
        data() {
          return {
            dialogVisible:false,
            bg:'',
            pwdList: {
              oldPassword: '',
              newPassword: '',
              newPassword1: ''
              
            },
            user: {},
            addId:'',
            isCollapse: true,
            sysUserName:'',
            menuName:'',
            resourceName:'首页',
            isShow:false,
            tuichu:require('@/assets/icon02.png'),
            menus: [],
            menuLists:[],
          }
        },
      methods: {
          //比较方法
        compare: function(pro) {
          return function (obj1, obj2) {
            let val1 = obj1[pro];
            let val2 = obj2[pro];
            if (val1 < val2 ) { //正序
              return 1;
            } else if (val1 > val2 ) {
              return -1;
            } else {
              return 0;
            }
          }
        },
        initMenuList: function() {
          //初始化菜单
          //从sessionStorage中获取用户数据
          this.$router.push({path:this.$route.fullPath});
          let _this = this;

         _this.user = sessionStorage.getItem(SESSION_STORAGE_USER);
         this.addId = JSON.parse(_this.user).appId
         /* console.log(_this.user); */
         let user = _this.user
          if (user) {
            user = JSON.parse(user);
            this.sysUserName = user.userName || '';
          }
          //从sessionStorage中获取菜单数据
          let menuList = sessionStorage.getItem(SESSION_STOART_MENUS);
          if (menuList) {
            menuList = JSON.parse(menuList);
            _this.menuLists = menuList;
            if(menuList.length>0){
              menuList.forEach(e => {
                if(e.resourceParentId == "-1"){
                  if(e.resourceName == "首页"){
                    e.smallicon = "el-icon-share"
                  }else if(e.resourceName == "客户账户管理"){
                    e.smallicon = "el-icon-service"
                  }else if(e.resourceName == "交易管理"){
                    e.smallicon = "el-icon-time"
                  }else if(e.resourceName == "业务管理"){
                    e.smallicon = "el-icon-news"
                  }else if(e.resourceName == "商户管理"){
                    e.smallicon = "el-icon-goods"
                  }else if(e.resourceName == "增值服务"){
                    e.smallicon = "el-icon-sold-out"
                  }else if(e.resourceName == "对账管理"){
                    e.smallicon = "el-icon-mobile-phone"
                  }else if(e.resourceName == "结算管理"){
                    e.smallicon = "el-icon-tickets"
                  }else if(e.resourceName == "系统管理"){
                    e.smallicon = "el-icon-setting"
                  }else if(e.resourceName == "广告管理"){
                    e.smallicon = "el-icon-picture"
                  }else if(e.resourceName == "卡券管理"){
                    e.smallicon = "el-icon-picture"
                  }else if(e.resourceName == "客户档案管理"){
                    e.smallicon = "el-icon-service"
                  }else if(e.resourceName == "平台账号管理"){
                    e.smallicon = "el-icon-service"
                  }else if(e.resourceName == "退货退款管理"){
                    e.smallicon = "el-icon-time"
                  }else if(e.resourceName == "借贷管理"){
                    e.smallicon = "el-icon-tickets"
                  }else if(e.resourceName == "财务管理"){
                    e.smallicon = "el-icon-tickets"
                  }else if(e.resourceName == "商城订单"){
                    e.smallicon = "el-icon-tickets"
                  }
                  _this.menus.push(e)
                  }
              });
            }
            console.log(_this.menus)
            if(_this.$route.fullPath != "/mgp/index"){
              _this.isShow = true;
              let val={};
              _this.menuLists.forEach(e => {
                if(e.resourceCode == _this.$route.fullPath){
                      val=e;
                }
              })

              _this.resourceName = val.resourceName+":";
              _this.menus.forEach(a => {
                if(a.resourceId == val.resourceParentId){
                  _this.menuName = a.resourceName;
                }
              });
            }else{
              _this.isShow = false;
            }
          }
        },
       
        pwdhandleClose () {
         let _this = this;
          _this.dialogVisible = false;
          _this.pwdList = {};
        },
        resetChecked () {
          let _this = this;
          _this.dialogVisible = false;
          _this.pwdList = {};
        },
        handleCommand(command) {
          if(command === 'change'){
            this.dialogVisible=true
          }else{
            this.getOut();
          }
        },
        //修改密码
        changePassWord () {
          
          let _this = this;
         
          /*判断是否为空*/
          if(_this.pwdList.oldPassword&&_this.pwdList.newPassword&&_this.pwdList.newPassword1){
            /* 判断新旧密码是否相同 */
            if(0){
              _this.$message({
                message: '新密码不能与旧密码相同',
                type: 'error'
              })
            }else{
              if(_this.pwdList.newPassword !== _this.pwdList.newPassword1){
                 _this.$message({
                  message: '两次密码不一致',
                  type: 'error'
                })
                return
              }
              let params = {};
              params.oldPassword = _this.pwdList.oldPassword;
              params.newPassword = _this.pwdList.newPassword;
              console.log(params);
             /*  params = JSON.stringify(params); */
              _this.$http.put(_this.api.API_GATEWATE + 'operator/changepwd',params, _this.GLOBAL.topheaders())
              .then(function (res) {
                console.log(res.ok);
                if(res.ok){
                  this.$message({
                    message: "修改成功，即将退出",
                    type: 'success'
                  });
                  sessionStorage.removeItem(SESSION_STORAGE_USER);
                  sessionStorage.removeItem(SESSION_STOART_MENUS);
                  _this.$http.delete(_this.api.API_GATEWATE+'session',_this.GLOBAL.topheaders()).then(function(res){
                    if(res.data.key == "000000"){
                      _this.$router.push('/');
                      _this.$message({
                        message: res.data.msg,
                        type: 'success'
                      });
                    }
                  }.bind(this))
                  .catch(function(err){
                    if(err && err.data && err.data.key == "400300"){
                      _this.$router.push({ path: "/login" });
                    }
                    _this.$message({
                      message: err.body.msg,
                      type: 'error'
                    });
                  
                  }) 
                }
               
                
              _this.dialogVisible = false;
              _this.pwdList = {};
              }.bind(this))
              .catch(function (err) {
                
                if (err.data && err.data.msg) {
                  _this.$message({
                    message: err.data.msg,
                    type: 'error'
                  });
                }
                //bind(this)可以不用
              }.bind(this)) 
             
            }
            
          }
          else{
            _this.$message({
              message: '密码不能为空',
              type: 'error'
            });
          }
          
        },
        getCheckedNodes(list){},
        getOut () {
          let _this = this;
          this.$confirm('确认退出吗?', '提示', {
            //type: 'warning'
          }).then(() => {
            sessionStorage.removeItem(SESSION_STORAGE_USER);
            sessionStorage.removeItem(SESSION_STOART_MENUS);
            _this.$http.delete(_this.api.API_GATEWATE+'session',_this.GLOBAL.topheaders()).then(function(res){
              if(res.data.key == "000000"){
                _this.$router.push('/');
                _this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
              }
            }.bind(this))
            .catch(function(err){
              if(err && err.data && err.data.key == "400300"){
                _this.$router.push({ path: "/login" });
              }
              _this.$message({
                message: err.body.msg,
                type: 'error'
              });
              //bind(this)可以不用
            }.bind(this))
        })
        },
        gotoIndex (val){
            if (val == "/mgp/index") {
              this.isShow = false;
              this.$router.push({path: val});
            }
            if (val.resourceCode) {
              this.isShow = true;
              this.resourceName = val.resourceName + ":";
              this.menus.forEach(e => {
                if (e.resourceId == val.resourceParentId) {
                  this.menuName = e.resourceName;
                }
              });
              
              console.log(val.resourceCode)
              this.$router.push({path: val.resourceCode});
            }
          },
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        bgimg(){
          switch(this.addId){
          case '002':
            this.bg = require('../../assets/login_01.jpg');
            break;
          case '003':
            this.bg = require('../../assets/3.png');
            
            break;
          case '004':
            this.bg = require('../../assets/4.png');
            
            break
          case '005':
            this.bg = require('../../assets/5.png');
            
            break;
        }
        },
      },
      created: function () {
        this.initMenuList();
        this.bgimg();
        
      }
    }

</script>

<style lang="scss">
  appid:this.appID,
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-mai{
    padding: 0px 0px !important;
  }
 
  .logo {height: 64px;width: 100%;}
  .logo img {display: block;}
  .dropdown-link{
    color: #FFF;
    margin-left: 20px;
    display: inline-block;
    height: 64px;
  }
  .top-r { display: inline;}
  .nav-r{float:right; line-height: 60px;}
  .nav-r li a:hover {display: block;font-size: 16px;padding: 0 10px; color: #fff; }
  .nav-r li { float: left;}
  .nav-r li a {display: block;color:#ffc6c6; font-size: 16px;padding: 0 10px; visibility: hidden;}
  .nav-r li img { display: inline-block;vertical-align: middle; margin-right: 7px;border-radius: 50px;}
  .nav-r li i.icon03 { display: inline-block;vertical-align: middle; width: 20px;height: 19px; margin-right: 6px;}


  li{ list-style:none;}
  .container {
    width: 100%;
    height: 100%;
    .shouye {
      padding-left: 20px !important;
      color: rgb(192, 196, 204)!important;
      background-color: rgb(55, 74, 104)!important;
    }
    .shouye:hover {
      color: #FFF !important;
      background: #374a68 !important;
    }
  }
  .header {height: 60px;line-height: 60px;background: #F55050;color: #fff;}
  .userinfo {text-align: right;padding-right: 20px;float: right;}
  .userinfo-inner {color: #ffc6c6;}
  .userinfo-inner:hover {color: #fff;}
  .userinfo-inner img {width: 40px;height: 40px;border-radius: 20px;margin: 10px 5px 0px 145px;}
  .logout {cursor: pointer;margin-left: 25px;}

  .userlogo {width: 360px;height: 60px;font-size: 22px;padding-left: 40px;padding-right: 10px;border-color: rgba(238, 241, 146, 0.3);border-right-width: 1px;border-right-style: solid;}
  .userlogo img {width: 40px;float: left;margin: 10px 10px 10px 145px;}
  .txt {color: #fff;}
  .logo img { width: 25%;
    float: left;
    margin: 20px 10px 10px 15px;}
  .logo-width { width: 30px; }
  .logo-collapse-width {width: 60px}
  .tools {padding: 0px 23px;width: 14px;height: 60px;line-height: 60px;cursor: pointer;}
  .main {
    .el-scrollbar__bar.is-horizontal>div {
      height: 0%;
    }
    .el-form-item__label {
      font-size: 14px;
    }
    .el-scrollbar__wrap{
      overflow-x: hidden;
    }
    margin-top: -88px;
    display: flex;
    top: 88px;
    bottom: 0px;
    overflow: hidden;
    height: 800px;
    .elMenu_shouye{
      .el-menu-item:hover{
        background:rgb(55, 74, 104)!important; ;
      }
      .is-active{
        background-color: #eeb726 !important;
        color: #FFF !important;
        padding-left: 0px;
        width: 100%;
        height: 56px;
      }
      .el-menu-item .elMenuitem{
        color:rgb(192, 196, 204)!important;
        font-size: 14px;
        padding-left: 0px !important;
        //padding: 0px 0px 0px 0px !important;
      }
      .el-submenu, .el-menu-item {
        border-bottom: 1px solid;
        border-bottom-color: #374a68 !important;
      }
      .el-submenu__title{
        color: #fff !important;
        font-size: 14px;
        padding: 0px 0px 0px 0px !important;
      }
      .el-submenu__title:hover{
        padding-left: 0px !important;
        width:100%;
        height: 56px;
        color: #FFF !important;
        background: #374a68 !important;
        font-size: 14px;
      }
    }
    .elSubmenu{
      border-bottom: 0px solid !important;
      border-bottom-color: #374a68 !important;
      .el-submenu {
        border-bottom: 0px solid !important;
        border-bottom-color: #374a68 !important;
      }
      .el-menu-item-group__title {
        padding: 0px 0px 0px 0px !important;
      }
      .el-submenu__title {
        padding: 0px 0px 0px 0px !important;
        font-size: 14px;
      }
      .el-menu-item {
        font-size: 14px;
      }
      .el-submenu, .el-menu-item {
        border-bottom: 0px solid !important;
        border-bottom-color: #000000 !important;
        background-color:#000000 !important;
      }
      .el-submenu__title:hover {
        font-size: 14px;
        color: #FFF !important;
        background: #374a68 !important;
      }
      .el-submenu__title i:hover{
        color: #FFF !important;

      }
      .el-menu-item:hover {
        color: #FFF !important;
        background: #000000 !important;
      }
      .is-opened{
        .el-submenu__title{

        }
      }
      .el-menu-item.is-active {
        background-color: #eeb726 !important;
        color: #FFF !important;
      }
      .el-menu-item.is-active:hover {
        background-color: #eeb726 !important;
        color: #FFF !important;
      }
    }
  }
  .content-container {background: #e4e7ed;flex: 1;}
  .breadcrumb-container {
    background-color: #FFF;
    .el-breadcrumb {
      margin-left: 20px;
      margin-top: 10px;
      font-size: 14px;
      line-height: 55px;
    }
  }
  .title {width: 100%;float: left;color: #ee6401;}
  .breadcrumb-inner {float: right;}
  .content-wrapper {
    background-color: #FFFFFF;
    box-sizing: border-box;
    .main_top {
      border: 2px solid #ebebeb;
    }
  }
 /* .el-menu-item.is-active {
    color: rgb(231, 235, 240) !important;
  }*/
  .el-header {
    padding: 0 0px !important;
  }

  .input-with-select {
    top: 31px;
    width: 15%;
    color: #f99d5b;
    .el-input__inner {
      background-color: #f99d5b;
      border: 1px solid #f99d5b;
      color: #FFF;
    }
  }

</style>

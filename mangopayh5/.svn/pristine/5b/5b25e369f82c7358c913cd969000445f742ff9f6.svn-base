<template>
  <div id="contain">
    <div class="right_r">
      <div class="waiting">
        <div class="list-icon1">
          <el-row>
            <el-col :span="24">
                  <el-col :span="5">
                    <div class="coment1 s-01">
                      <div class="tupian">
                        <div class="tupianradius1"></div>
                      </div>
                      <div class="comentHove">
                        <div><span style="padding-top: 10px;padding-left: 10px;">{{activateNumbers}}</span></div>
                        <div style="font-size: 15px; height: 40px">
                          <p style="padding-left: 20px;">激活人数</p>
                        </div>
                        <div>
                          <span class="gtSpan" @click="aaa"></span>
                        </div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="1">&nbsp</el-col>
                  <el-col :span="5">
                    <div class="coment s-02">
                      <div class="tupian">
                        <div class="tupianradius2"></div>
                      </div>
                      <div class="comentHove">
                        <div><span style="padding-top: 10px;padding-left: 10px;">{{rechargePeople}}</span></div>
                        <div style="font-size: 15px; height: 40px">
                          <p style="padding-left: 20px;">充值人数</p>
                        </div>
                        <div>
                          <span class="gtSpan" @click="aaa"></span>
                        </div>
                      </div>
                    </div>
                  </el-col>
                <el-col :span="1">&nbsp</el-col>
                 <el-col :span="5">
                    <div class="coment s-03">
                      <div class="tupian">
                        <div class="tupianradius3"></div>
                      </div>
                      <div class="comentHove">
                        <div><span style="padding-top: 10px;padding-left: 10px;">{{cashWithdrawals}}</span></div>
                        <div style="font-size: 15px; height: 40px">
                          <p style="padding-left: 20px;">提现人数</p>
                        </div>
                        <div>
                          <span class="gtSpan" @click="aaa"></span>
                        </div>
                      </div>
                    </div>
                 </el-col>
                <el-col :span="1">&nbsp</el-col>
                <el-col :span="5">
                    <div class="coment s-04">
                      <div class="tupian">
                        <div class="tupianradius4"></div>
                      </div>
                      <div class="comentHove">
                        <div><span style="padding-top: 10px;padding-left: 10px;">{{redpacketNumbers}}</span></div>
                        <div style="font-size: 15px; height: 40px">
                          <p style="padding-left: 20px;">红包领取人数</p>
                          <p style="padding-left: 20px">金额:{{redpacketAmount}}万</p>
                        </div>
                        <div>
                          <span class="gtSpan" @click="aaa"></span>
                        </div>
                      </div>
                    </div>
                </el-col>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="waiting">
        <el-row><el-col :span="24">&nbsp</el-col></el-row>
      </div>
      <div class="waiting1">

          <div class="list-icon">
            <div style="padding-left: 30px;width: 450px;padding-top: 10px;">
              <span style="color: rgb(55, 74, 104)">今日业务数据统计</span>
            </div>
            <div id="myChart" :style="{width: '100%', height: '450px'}"></div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/bar')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  import {toDataTime} from "../../../config/util.js"
  export default {
    name: 'hello',
    data() {
      return {
        redpacketAmount:0,
         data :{
         successNumList:[],
          name:[],
          couponList:[]
        },//流水统计集合
        cashWithdrawals:0,
        rechargePeople:0,
        activateNumbers:0,
        redpacketNumbers:0,
        tabPosition:'left',
        msg: 'Welcome to Your Vue.js App',
        authNum:true,
      }
    },
    mounted() {
      this.drawLine(this.data);
    },
    methods: {
      aaa () {

      },
      //查询激活人数
      queryActivateNumber (){
        let _this = this;
        this.$http.get(_this.api.API_GATEWATE+'mango/activateNumber',_this.GLOBAL.topheaders())
          .then(function(res){
              _this.activateNumbers = res.data;
          }.bind(this))
          .catch(function(err){
            if(err.response) {
              console.log(err.response)
              //控制台打印错误返回的内容
            }
            //bind(this)可以不用
          }.bind(this))
      },
      //查询红包领取人数
      queryRedEnvelopeCollection (){
        let _this = this;
        this.$http.get(_this.api.API_GATEWATE+'mango/redpacketNumber',_this.GLOBAL.topheaders())
          .then(function(res){
            _this.redpacketNumbers = res.data;
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
      },
      //查询领取红包金额
      queryRedpacketAmount (){
        let _this = this;
        this.$http.get(_this.api.API_GATEWATE+'mango/redpacketAmount',_this.GLOBAL.topheaders())
          .then(function(res){
           if(res && res.data){
             let redpacketAmount = res.data/1000000;
             _this.redpacketAmount = redpacketAmount.toFixed(2);
           }
          }.bind(this))
          .catch(function(err){
            if(err && err.data && err.data.key == "400300"){
              _this.$router.push({ path: "/login" });
            }
            if(err && err.data &&err.data.msg){
              _this.$message({
                message: err.data.msg,
                type: 'error'
              });
            }
          }.bind(this))
      },
      //查询充值提现人数
      queryRechargeNumber (){
        let _this = this;
        this.$http.get(_this.api.API_GATEWATE+'mango/rechargeWithdrawalNumber',_this.GLOBAL.topheaders())
          .then(function(res){
            if(res && res.data){
              res.data.forEach(e =>{
                if(e.orderType == "WITHDRAW"){
                  _this.cashWithdrawals = e.total;
                }else{
                  _this.rechargePeople = e.total;
                }
              })
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
          }.bind(this))
      },

      drawLine(data) {
        let myChart = echarts.init(document.getElementById("myChart"));
        let option = {
          /* 柱状图颜色 */
          color:['rgb(55, 74, 104)', '#ee6401'],
          /* 四周边距(单位默认px，可以使用百分比) */
          grid:{
            left:40,
            top:30,
            right:50,
            bottom:30
          },
          /* 鼠标悬浮显示数据 */
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          /* 图例说明 */
          legend: {
            // 图例排项 vertical-"竖向"; horizontal-"横向"
            orient: 'horizontal',
            // 图例组件离容器左侧的距离
            right : 40,
            top: 0,
            // 图例文字的样式
            textStyle:{
              color:'#ee6401',
            },
            // 与series中每个name对应
            data:['总金额','成功笔数']
          },
          toolbox: {
            show : true
          },
          calculable : true,
          xAxis : [
            {
              type : 'category',
              //设置轴线的属性
              axisLine:{
                lineStyle:{
                  color:'rgb(55, 74, 104)',
                }
              },
              data : data.name,
            }
          ],
          yAxis : [
            {
              type : 'value',
              // 控制网格线是否显示
              splitLine: {
                show: true,
                //  改变轴线颜色
                lineStyle: {
                  // 使用深浅的间隔色
                  color: ['rgb(55, 74, 104)']
                }
              },
              //设置轴线的属性
              axisLine:{
                lineStyle:{
                  color:'rgb(55, 74, 104)',
                }
              }
            }
          ],
          series : [
            {
              name:'总金额',
              type:'bar',
              /* 柱子的显示宽度 */
              barWidth: '20%',
              data: data.couponList,
              /* 显示柱子数据 */
              label: {
                normal: {
                  show: true,
                  // 数据在柱子头部显示
                  position: 'top',
                  textStyle: {
                    color: '#ee6401',
                    fontSize:16,
                  }
                }
              },
            },
            {
              name:'成功笔数',
              type:'bar',
              barWidth: '20%',
              data: data.successNumList,
              /* 显示柱子数据 */
              label: {
                normal: {
                  show: true,
                  // 数据在柱子头部显示
                  position: 'top',
                  textStyle: {
                    color: '#ee6401',
                    fontSize:16,
                  }
                }
              },
            }
          ]
        }
        myChart.setOption(option);//设置option
      },
      //合计
      getSum (total, num){
        return total + num;
      },
      //查询流水统计
      queryFlowStatistics () {
        let _this = this;
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year  + month  + strDate;
        let searchParams ={
          businessStartDate:currentdate,
          businessEndDate:currentdate,
        }
        this.$http.post(_this.api.API_GATEWATE+'mango/getBusinessDataList',searchParams,_this.GLOBAL.topheaders())
          .then(function(res){
            if(res && res.data && res.data.content.length>0){
              let tableData =  res.data.content;
              tableData.forEach(e=>{
                if(e.businessType == "COUPON"){
                  this.data.successNumList.push(e.successNum)
                  this.data.name.push('红包')
                  this.data.couponList.push(e.totalAmount/100)
                }
                if(e.businessType == "WITHDRAW"){
                  this.data.successNumList.push(e.successNum)
                  this.data.couponList.push(e.totalAmount/100)
                  this.data.name.push('提现')
                }
                if(e.businessType == "RECHARGE"){
                  this.data.successNumList.push(e.successNum)
                  this.data.couponList.push(e.totalAmount/100)
                  this.data.name.push('充值')
                }
                if(e.businessType == "CONSUME"){
                  this.data.successNumList.push(e.successNum)
                  this.data.couponList.push(e.totalAmount/100)
                  this.data.name.push('消费')
                }
                if(e.businessType == "ADVANCE"){
                  this.data.successNumList.push(e.successNum)
                  this.data.couponList.push(e.totalAmount/100)
                  this.data.name.push('代发')
                }
                if(e.businessType == "REFUND"){
                  this.data.successNumList.push(e.successNum)
                  this.data.couponList.push(e.totalAmount/100)
                  this.data.name.push('退款')
                }
              })
              _this.drawLine(this.data);
            }
            //控制台打印请求成功时返回的数据
            //bind(this)可以不用
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
        console.log(this)
      },
    },
    created () {
      this.queryRedEnvelopeCollection();
      this.queryActivateNumber();
      this.queryRedpacketAmount();
      this.queryRechargeNumber();
      this.queryFlowStatistics();
    },
  }
</script>

<style scoped>
  /* CSS Document */
  html,body,p,form,ul,hr,h1,h2,h3,h4,h5,h6{margin:0;padding:0}
  table{border-collapse: collapse;
    border-spacing: 0;
    font-size: 17px;}
  th,td{padding:0}
  td, th {display: table-cell;vertical-align: inherit;}
  a{text-decoration:none}
  li{list-style:none}
  img{border:0 none;width: 100%;height: 64px;}
  textarea{line-height:40px}
  body{line-height:20px;font-size:14px;font-family:"Microsoft YaHei" !important;}
  select::-ms-expand { display: none; }

  .gtSpan{
    margin-top: -54px;
    margin-right: 15px;
    float: right;
    font-size: 20px;
    height: 20px;
    color: #909399;
  }
  #contain {backgound:#f8f8f8;}
  .right_r{
    background-color: #fafafa;

    height: 1080px;
    min-height: 1080px;
    zoom: 1;

  }
  .waiting{ background:#ebeef5;    padding: 0px 40px;border: 1px solid rgb(235, 235, 235);border-radius: 4px;}
  .waiting1{ background:#ebeef5;    padding: 0px 40px;border: 1px solid rgb(235, 235, 235);border-radius: 4px;}


  .title-1 { height:55px; border-bottom: 1px solid #ebebeb; line-height: 55px;position: relative}
  .title-1 h3{ color: #f55050; font-size: 18px; border-bottom: 2px solid #f55050; position: absolute; top: -2px;}
  .list-l{ height: 210px; margin-bottom: 15px;}
  .list-l li {cursor: pointer; position: relative;height: 210px;float: left;text-align: center;width: 20%;font-size: 22px;color: #555; padding-top: 12px;}
  .list-l li span{font-size: 34px;display: block;padding-top: 8px;line-height:80px;padding-top: 30px;}
  .list-l li.list_s{ color:#f55050;}
  .list-l li.list_s:before {content: "";position: absolute;left: 50%;top: 100%;width: 0;height: 0;margin: 15px 0 0 -8px;border: 12px solid transparent;border-top-color: #FFF;}
  .list-l li.list-bg {background:none;}
  .t-bg {height: 72px;line-height: 70px;border-bottom: 0px;background: #fff6f6; border-radius: 4px;}
  .nav-list-1{width: 90%; margin-left: 35px;}
  .nav-list-1 li{float: left;cursor: pointer;text-align: center;line-height: 72px;color: #555;font-size: 18px;padding: 0 20px;margin-right: 5%;position: relative;}
  .t-bg { text-align: right; }
  .t-bg a { font-size: 18px; color: #555; padding-right: 12px;}
  .nav-list-1 li.list_c {color: #f55050;border-bottom: 2px solid #f55050;top: -2px;}
  .table-t {margin-bottom: 24px; height: 350px;}
  .tableBasic th {height: 70px;line-height: 70px;color: #555;padding-top: 10px;border-bottom: 3px solid #e6e6e6;font-size: 17px; }
  .tableBasic td{ color: #555;line-height: 55px;font-size: 16px;}
  .tr-bg { background:#fafafa;}
  .list-icon { padding-top:10px;background: #FFF;}
  .list-icon1 {
    padding-top:20px;
  }
  .list-i {height:115px;}
  .list-i li{ float: left; width:23.7%;}
  .list-i li.list-right{ float:right; padding-right: 0px;}
  .list-i-1 li{ float: left; width: 24%;text-align: left;padding-left: 1%;}
  .list-i-1 li.list-right{ float:right; padding-right: 0px;}
  .coment{color: black;width: 100%;}
  .coment1{color: black;}
  .comentHove{
    color:  #FFF;
    background: #ee6401;
    font-size: 40px;
    float: right;
    font-weight: bold;
    height: 100px;
    width: 70%;
  }
  /*.comentHove:hover {*/
    /*color:  #FFF;background: #ee6401;*/
  /*}*/
  .tupian{
    float: left;
    background: #FFF;
    width: 30%;
    height: 100px;
    vertical-align: middle;
  }
  .tupianradius1{
    color: #333;
    border-radius: 100px;
    width: 50px;
    margin: 0 auto;
    height: 50px;
    background:url("../../../src/assets/img/shoujijihuo.svg");
    transform: translate(0, 50%);
  }
  .tupianradius2{
    color: #333;
    border-radius: 100px;
    width: 50px;
    margin: 0 auto;
    height: 50px;
    background:url("../../../src/assets/img/chongzhi.svg");
    transform: translate(0, 50%);
  }
  .tupianradius3{
    color: #333;
    border-radius: 100px;
    width: 50px;
    margin: 0 auto;
    height: 50px;
    background:url("../../../src/assets/img/tixian.svg");
    transform: translate(0, 50%);
  }
  .tupianradius4{
    color: #333;
    border-radius: 100px;
    width: 50px;
    margin: 0 auto;
    height: 50px;
    background:url("../../../src/assets/img/hongbao.svg");
    transform: translate(0, 50%);
  }
  .s-01{background: #FFF;;}
  .s-02{background: #FFF;}
  .s-03{background: #FFF;}
  .s-04{background: #FFF;}
  .coment_1 p {padding-top: 10px;padding-left: 100px;font-weight:bold}
  .list_li{
    margin-left: 20px;
  }
  /*.el-button--primary {*/
    /*color: black;*/
    /*background-color: #FFF;*/
    /*border-color: #ee6401;*/
  /*}*/
  /*.el-button--primary:visited {*/
    /*color: #fff;*/
    /*background-color: #ee6401;*/
    /*border-color: #ee6401;*/
  /*}*/

</style>
<style lang="scss">
  .list-icon1 {
    .el-col-1 {
      width: 2%;
    }
    .el-col-5 {
      width: 23.5%;
    }
  }
  .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    color: #fff !important;
    background-color: #ee6401 !important;
    border-color: #ee6401 !important;
    -webkit-box-shadow: -1px 0 0 0 #ee6401 !important;
    box-shadow: -1px 0 0 0 #ee6401 !important;
  }

</style>

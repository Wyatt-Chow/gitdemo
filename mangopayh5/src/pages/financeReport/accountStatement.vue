<template>
  <div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
      <div class="main_top_01">
        <el-row style="margin-bottom:20px">
          <el-col :span="24">
            <label style="padding-left: 28px">客户姓名:</label>
            <el-input style="width:20%;" size="mini" v-model="params.name"></el-input>
            <label style="padding-left: 30px">还款类型:</label>
            <el-select style="width:20%" size="mini" v-model="params.repaymentType">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in repaymentTypeList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="margin-bottom:20px">
            <label style="padding-left: 30px">扣款状态:</label>
            <el-select style="width:20%" size="mini" v-model="params.tradeState">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in deductionsStateList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            <label style="padding-left: 30px">扣款时间:</label>
            <el-date-picker
              style="width:25%"
              size="mini"
              v-model="startDate"
              type="daterange"

              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary"  size="mini" @click="queryBannerList" style="margin-left: 3%;" :disabled="isDisable">搜索</el-button>
            <!-- <el-button style="float: right; padding-right: 20px;"  type="primary" v-if="authButton.some(e=>{return e.resourceCode == 'banner_create'})"
            @click="getOperatorButton">新建广告</el-button> -->
          </el-col>
        </el-row>
      </div>
        <el-table ref="multipleTable" :default-sort = "{prop: 'id', order: 'ascending'}" :data="tableData" border stripe tooltip-effect="dark" style="width: 100%">

          <el-table-column label="订单号"  show-overflow-tooltip prop="orderId" width="100">
          </el-table-column>
          <el-table-column label="银行流水号"  show-overflow-tooltip prop="repayWithholdId" width="100">
          </el-table-column>
          <el-table-column prop="userName" label="客户姓名" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="repayPlanId" label="还款流水计划号" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="repaymentTypes"  label="还款类型" show-overflow-tooltip width="100">
          </el-table-column>
          <el-table-column prop="totalAmounts" label="金额(元)" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="bankCardNo" label="银行卡号" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="bankName" label="银行名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="tradeStates" label="状态" show-overflow-tooltip width="110">
          </el-table-column>
          <el-table-column prop="accountDate" label="扣款时间" show-overflow-tooltip width="110">
          </el-table-column>

        </el-table>
        <div class="table-page" >
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="params.page"
                         :page-sizes="[5, 10, 15, 20]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-header>
    </el-container>
  </div>
</template>

<script>

  import {formatUnixtimestamp,buildRequestURL,toDataTime} from '../../../config/util'
  import {num} from '../../../config/validate'
  import {SESSION_STOART_MENUS} from "../../utils/ConstUtils.js"
  import {SESSION_STORAGE_USER} from "../../utils/ConstUtils.js"
  let nums=(rule, value,callback)=>{

    if (value!=0 && !value){
      callback(new Error('优先级不能为空'))
    }else  if  (!num(value)){
      callback(new Error('请输入整数!'))
    }else {
      callback()
    }
  }
  export default {
    name: "bannerManagement",
    data() {
      return {
        startDate:[],
        startTime: {
          disabledDate: time => {
            return time.getTime() > Date.now();
          }
        },

        repaymentTypeList:[{
          value:"NORMAL",
          name:"正常还款"
        },{
          value:"IMMEDIATELY",
          name:"立即还款"
        },{
          value:"ADVANCE",
          name:"提前还款"
        }],
        deductionsStateList:[{
          value:"SUCCESS",
          name:"交易成功"
        },{
          value:"FAIL",
          name:"交易失败"
        }],
        fileisShow:false,
        uploadData:{
          uploadFile:'',
        },
        action:this.api.API_GATEWATE+'mango/privateupload',
        title:"",
        banner:false,
        isDisable:false,
        fileList:[],
        banners:{
          imageUrl:'',
          sourceUrl:'',
          userName:'',
          upTime:'',
          downTime:'',
          orderIdx:'',
          description:'',
          loadStyle: 'POPUP',
          osPlatform:''
        },
        tableDatas:'',
        authButton:[],
        userList:'',
        tableData: [],
        searchParams: {
          osPlatform:"",
          userName:"",
          creDate:[],
          bannerStatus:"",
          checkStatus:"",
          attach:"",
        },
        params:{
          page:1,
          pageSize:10,
          osPlatform:"",
          userName:"",
          beginDate:"",
          endDate:"",
          bannerStatus:"",
          checkStatus:"",
          attach:"",
        },
        total:0,
      }
    },
    methods : {
      //搜索
      queryBannerList(){
        // this.params.osPlatform = this.searchParams.osPlatform;
        // this.params.page =1;
        // this.params.attach = this.searchParams.attach;
        // this.params.checkStatus = this.searchParams.checkStatus;
        // this.params.bannerStatus = this.searchParams.bannerStatus;
        this.params.userName = this.params.name;
        
        if(this.startDate && this.startDate.length>0){
          this.params.startDate = toDataTime(this.startDate[0]);
          this.params.endDate = toDataTime(this.startDate[1]);
        }else{
          this.params.startDate ="";
          this.params.endDate ="";
        }
        this.init();
      },
      uploadPhoto (){
        this.$refs.uploadPhoto.submit();
      },
      handleSizeChange (val) {
        this.params.pageSize = val;
        this.init();
      },
      handleCurrentChange (val) {
        this.params.page = val;
        this.init();
      },
      init () {
        let _this = this;
        console.log(this.params)
        _this.$http.post(_this.api.API_GATEWATE+'mango/bankStatementPage',_this.params,_this.GLOBAL.topheaders())
          .then(function(res){
            let tableData = [];
            if(res && res.data && res.data.list &&  res.data.list.length>0){
              tableData =  res.data.list;
              tableData.forEach(e =>{
                  if(e.repaymentType == "ADVANCE"){
                      e.repaymentTypes = "提前还款"
                  }else if(e.repaymentType == "IMMEDIATELY"){
                      e.repaymentTypes = "立即还款"
                  }else if(e.repaymentType == "NORMAL"){
                      e.repaymentTypes = "正常还款"
                  }
                  if(e.tradeState == "FAIL"){
                      e.tradeStates = "交易失败"
                  }else if(e.tradeState == "SUCCESS"){
                      e.tradeStates = "交易成功"
                  }
                  e.totalAmounts = (e.totalAmount/100).toFixed(2)
              })
              _this.tableData = tableData;
              _this.total = res.data.total || 0;
            }else{
              _this.tableData = tableData;
              _this.total = res.data.total || 0;
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
    created() {

      let _this = this;
      let path = this.$route.path;
      let menuList = sessionStorage.getItem(SESSION_STOART_MENUS);
      let userList = sessionStorage.getItem(SESSION_STORAGE_USER);
      menuList = JSON.parse(menuList);
      this.userList = JSON.parse(userList);
      menuList.forEach( e=> {
        if(path == e.resourceCode){
          _this.merchatVal = e;
        }
      })
      if(_this.merchatVal){
        menuList.forEach( k=> {
          if(_this.merchatVal.resourceId ==  k.resourceParentId){
            this.authButton.push(k);
          }
        })
      }
      this.init();
    }
  }
</script>


<style  lang="scss">
  .uploadFile-remark {
    margin-top: 10px;
    color: red;
  }
</style>

<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 30px">交易日期:</label>
          <el-date-picker
            style="width:22%"
            size="mini"
            v-model="starttime"
            type="daterange"
            :picker-options="startTime"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <label style="padding-left: 30px">业务类型:</label>
          <el-select v-model="businessType" size="mini" placeholder="请选择" style="width:20%">
            <el-option
              v-for="item in businessTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" size="mini" @click="queryList" style="margin-left:3%" :disabled="isDisable">搜索</el-button>
          <el-button  style="margin-left:10px" size="mini" type="primary" v-if="authButton.some(e=>{return e.resourceCode == 'biz_analysis_report'})"  @click.stop="getExport" :disabled="isdisable">导出</el-button>
          <a  id="isa" href="" target="_blank"></a>
        </el-col>
      </el-row>
    </div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable" :data="tableData" show-summary :summary-method="getSummaries" border stripe tooltip-effect="dark" style="width: 100%" v-loading="isLoad">
          <el-table-column label="交易日期"  show-overflow-tooltip prop="title">
            <template slot-scope="scope">
              <span> {{ scope.row.businessDate | date('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="businessType" label="业务类型" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="successNum" label="成功笔数" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="successAmounts" label="成功金额(元)" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="failNum" label="失败笔数" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="failAmounts" label="失败金额(元)" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="totalNum" label="总笔数" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="totalAmounts" label="总金额(元)" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="rate" label="成功率" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div class="table-page" >
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="params.page"
                         :page-sizes="[5, 10, 15, 20,50]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElements">
          </el-pagination>
        </div>
      </el-header>
    </el-container>
  </div>
</template>
<script>
  import {SESSION_STOART_MENUS} from "@/utils/ConstUtils.js"
  import {toDataTime,toNum,buildRequestURL} from "../../../config/util.js"
  export default {
    name: "businessAnalysisReport",
    data() {
      return {
        isLoad:false,
        isdisable:true,
        failAmount:0,
        failNum:0,
        successAmount:0,
        successNum:0,
        totalAmount: 0,
        totalNum: 0,
        urlList:'',
        isDisable:false,
        businessTypeList:[{
          value:'',
          label:'全部'
        },{
          value:'WITHDRAW',
          label:'提现'
        },{
          value:'RECHARGE',
          label:'充值'
        },{
          value:'CONSUME',
          label:'消费'
        },{
          value:'ADVANCE',
          label:'代发'
        },{
          value:'REFUND',
          label:'退款'
        }],
        authButton:[],
        tableData: [],
        searchParams: {
          page:0,
          pageSize: 10,
          businessStartDate:"",
          businessEndDate:"",
          businessType:"",
        },
        searchParam: {
          page:0,
          pageSize: "",
          businessStartDate:"",
          businessEndDate:"",
          businessType:"",
        },
        params: {
          page:1,
          pageSize: 10,
        },
        totalElements:0,
        endtime:'',
        starttime:[],
        businessStartDate:'',
        businessEndDate:'',
        businessType:'',
        /* start 开始时间小于今天,结束时间不能大于开始时间 */
        startTime: {
          disabledDate: time => {
            return time.getTime() > Date.now();
          }
        },
      }
    },
    methods:{
      //合计
      getSummaries(param) {
        debugger
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          sums[2] = this.successNum+'笔';
          sums[3] =this.successAmount+'元';
          sums[5] = this.failNum+'笔';
          sums[4] = this.failAmount+'元';
          sums[6] = this.totalNum+'笔';
          sums[7] = this.totalAmount+'元';
        });
        return sums;
      },
      //导出
      getExport(){
        if(this.starttime && this.starttime.length>0){
          this.searchParam.businessStartDate = toDataTime(this.starttime[0]);
          this.searchParam.businessEndDate = toDataTime(this.starttime[1]);
        }else{
          this.searchParam.businessStartDate ="";
          this.searchParam.businessEndDate ="";
        }
        this.searchParam.businessType =this.businessType;
        if(!this.searchParam.businessStartDate && !this.searchParam.businessEndDate && !this.searchParam.businessType){
          this.$message({
            message: "请输入搜索条件进行导出",
            type: 'info'
          });
          return
        }
        let _this = this;
        _this.searchParam.pageSize = _this.totalElements;
        let el = document.getElementById('isa');
        el.href=buildRequestURL(_this.api.API_GATEWATE+'mango/biz/analysis/report',_this.searchParam)
        el.click();//触发打开事件
       // window.location.href=buildRequestURL(_this.api.API_GATEWATE+'mango/biz/analysis/report',_this.searchParam);
       // return false
        //window.open(buildRequestURL(_this.api.API_GATEWATE+'mango/biz/analysis/report',_this.searchParam))
      },
      //搜索条件
      queryList(){
        this.searchParams.page=0;
        this.params.page = 1;
        if(this.starttime && this.starttime.length>0){
          this.searchParams.businessStartDate = toDataTime(this.starttime[0]);
          this.searchParams.businessEndDate = toDataTime(this.starttime[1]);
        }else{
          this.searchParams.businessStartDate ="";
          this.searchParams.businessEndDate ="";
        }
        this.searchParams.businessType =this.businessType;
        this.isdisable=false;
        this.init();
        this.queryAllStatistics();
      },
      handleSizeChange (size) {
        this.searchParams.pageSize = size;
        this.init();
      },
      handleCurrentChange (val) {
        this.params.page = val -1;
        this.searchParams.page = this.params.page;
        if(this.params.page >= 1){
          this.params.page = this.params.page +1;
        }
        this.init()
      },
      init () {
        let _this = this;
        this.isDisable=true;
        this.isLoad = true; setTimeout(() => {this.isLoad = false;}, 1000);
        this.$http.post(_this.api.API_GATEWATE+'mango/getBusinessDataList',_this.searchParams,_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable=false;
            if(res && res.data && res.data.content.length>0){
              let tableData =  res.data.content;
              tableData.forEach(e=>{
                if(e.businessType == "COUPON"){
                  e.businessType = "红包"
                }else if(e.businessType == "WITHDRAW"){
                  e.businessType = "提现"
                }else if(e.businessType == "RECHARGE"){
                  e.businessType = "充值"
                }else if(e.businessType == "CONSUME"){
                  e.businessType = "消费"
                }else if(e.businessType == "ADVANCE"){
                  e.businessType = "代发"
                }else if(e.businessType == "REFUND"){
                  e.businessType = "退款"
                }
                if(e.successAmount){
                  e.successAmounts=e.successAmount/100;
                }else {
                  e.successAmounts =0;
                }
                if(e.totalAmount){
                  e.totalAmounts=e.totalAmount/100;
                }else {
                  e.successAmounts =0;
                }
                if(e.failAmount){
                  e.failAmounts =e.failAmount/100 ;
                }else {
                  e.failAmounts = 0;
                }
                if(e.failNum){
                  e.failNum =e.failNum ;
                }else {
                  e.failNum = 0;
                }
                if(e.failNum){
                  e.failNum =e.failNum ;
                }else {
                  e.failNum = 0;
                }
                if(e.totalNum){
                  e.totalNum =e.totalNum ;
                }else {
                  e.totalNum = 0;
                }
                if(e.successNum){
                  e.successNum =e.successNum ;
                }else {
                  e.successNum = 0;
                }

                e.rate= toNum(e.successNum / e.totalNum,100).toFixed(2) + '%';

              })
              _this.tableData=tableData;
              _this.totalElements = res.data.totalElements || 0;
            }else{
              _this.tableData=[];
              _this.totalElements = 0;
            }

            //控制台打印请求成功时返回的数据
            //bind(this)可以不用
          }.bind(this))
          .catch(function(err){
            this.isDisable=false;
            if(err && err.data && err.data.key == "400300"){
              _this.$router.push({ path: "/login" });
            }
            _this.$message({
              message: err.data.msg,
              type: 'error'
            });
            //bind(this)可以不用
          }.bind(this))
        console.log(this)
      },
      queryAllStatistics () {
        let _this = this;
        this.isDisable=true;
        this.$http.post(_this.api.API_GATEWATE+'mango/getBusinessDataList/statistics',_this.searchParams,_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable=false;
            if(res && res.data){
              debugger
              _this.failAmount =  res.data.failAmount/100 || 0;
              _this.failNum = res.data.failNum || 0;
              _this.successAmount = res.data.successAmount/100 || 0;
              _this.successNum = res.data.successNum || 0;
              _this.totalAmount = res.data.totalAmount/100 || 0;
              _this.totalNum = res.data.totalNum || 0;
            }
            //控制台打印请求成功时返回的数据
            //bind(this)可以不用
          }.bind(this))
          .catch(function(err){
            this.isDisable=false;
            if(err && err.data && err.data.key == "400300"){
              _this.$router.push({ path: "/login" });
            }
            _this.$message({
              message: err.data.msg,
              type: 'error'
            });
            //bind(this)可以不用
          }.bind(this))
        console.log(this)
      },
    },
    created() {
      this.init();
      this.queryAllStatistics();
      let _this = this;
      let path = this.$route.path;
      let menuList = sessionStorage.getItem(SESSION_STOART_MENUS);
      menuList = JSON.parse(menuList);
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
    }
  }
</script>


<style  lang="scss">

  /**
  * 头部按钮搜索样式
  */
  .myDoneHeader-content {
    padding-right: 0px;
    .title-1 { height:100%; border-bottom: 1px solid #ebebeb; position: relative}
    .title-1 h3{ color: #f55050; font-size: 18px; position: absolute; top: -2px;}

    .el-input__inner{
      border: 1px solid #d1d1d1;
      height: 35px;
      line-height: 35px;
      padding: 0 10px;
    }
    .el-input__inner:focus {
      border-color: #ffa7a7
    }
    .el-date-editor--datetimerange:focus {
      border-color: #ffa7a7
    }

    .el-button{ padding: 0px 16px; font-size: 16px;height: 35px; }

  }

  .right_btn {
    float: right;
    margin-left:200px;

  }
  .btn_x {
    width: 6.33333%;
  }
  .b {
    display: inline-block;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

  }
  .b span{ font-size: 16px;}
  .btn_left {
    float: left;
  }

  .btn_search{ margin-right:12px; margin-left: 12px;}
  .btn_s{display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #d1d1d1;
    background: #fff;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    -webkit-transition: .1s;
    transition: .1s;
    line-height: 35px;
    padding-left: 10px;
    font-size: 14px;
    border-radius: 4px;
    margin-top: 10px;
    color: #7c7c7c;}


  /**
  * 搜索条件表单样式
  */
  .myDoneSearch-content {
    .search-row {
      margin-bottom: 10px;
    }
    margin-top: 20px;
    margin-left: 60px;
    .search-span {
      text-align: right;
      padding-top: 8px;
    }
    .el-input__inner {
      border: 1px solid #d1d1d1;
      height: 35px;
      line-height: 35px;
      padding: 0 10px;
    }
    .el-input__inner:focus {
      border-color: #ffa7a7
    }

    .el-button {
      padding: 0px 16px;
      font-size: 16px;
      height: 35px;
    }

    .el-range-editor.is-active, .el-range-editor.is-active:hover {
      border: 1px solid #ffa7a7;
    }
    .el-select .el-input.is-focus .el-input__inner {
      border-color: #dd6161;
    }
  }
  .el-select-dropdown__item.selected {
    color: #dd6161;
    font-weight: 700;
  }



  /**
  * 列表表格样式
  */
  .myDoneTable-main {
    margin-top: 10px;

    .el-checkbox__input.is-checked  .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
      background-color: #ff6464;
      border-color: #ff6464;
    }
    .el-checkbox__inner:hover,.el-checkbox__input.is-focus .el-checkbox__inner  {
      border-color: #ff6464;
    }
    .el-table--enable-row-hover .el-table__body tr:hover>td{background-color: #fef1f1;}
    .el-table--enable-row-focus .el-table__body tr:focus>td{background-color: #fef1f1;}
    .el-table th.is-leaf {border-bottom: 1px solid #dddddd;}
    .el-table--striped .el-table__body tr.el-table__row--striped td{background: #F8f8f8;}
    .el-table td {border-bottom: none; }
    .el-table th>.cell { text-align:center; font-size: 16px;color:#383838; }
    // .el-table td>.cell { text-align:center; font-size: 12px; }
    .el-table .cell{ text-align:center; line-height: 34px;}
    .el-table thead{ color: #333; }

    .table-page {
      .el-pagination {
        margin-top: 10px;
        white-space: nowrap;
        color: #303133;
        font-weight: 700;
        float: right;
        padding-top: 10px;
      }
    }
  }

</style>

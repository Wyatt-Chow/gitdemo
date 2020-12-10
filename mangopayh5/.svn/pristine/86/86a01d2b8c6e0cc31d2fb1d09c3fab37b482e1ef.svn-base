<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 30px">对账时间:</label>
           <el-date-picker
              style="width:25%"
              size="mini"
              v-model="creDate"
              type="daterange"
            
              value-format="yyyyMMdd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          <label style="padding-left: 50px">业务类型:</label>
          <template>
            <el-select v-model="value" placeholder="请选择" size="mini" style="width: 20%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
          <label style="padding-left: 50px">状态:</label>
          <el-select v-model="value"  placeholder="请选择" size="mini" style="width:20%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button size="mini" type="primary" @click="queryReconciliationResult" style="margin-left:55px" :disabled="isDisable">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable" :data="tableData" stripe border tooltip-effect="dark" style="width: 100%">
          <el-table-column  label="交易时间" show-overflow-tooltip prop="tradeTimes"> </el-table-column>
          <el-table-column  label="交易渠道" show-overflow-tooltip prop="channels"> </el-table-column>
         
          <el-table-column label="我方业务流水号"  show-overflow-tooltip prop="orderId">
          </el-table-column>
          <el-table-column prop="accountDates" label="会计日期" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="tradeType" label="业务类型" show-overflow-tooltip >
          </el-table-column>
           <el-table-column prop="orderTypes" label="订单类型" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="amount" label="交易金额" show-overflow-tooltip width="90">
          </el-table-column>
          <el-table-column prop="result" label="对账结果" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="finalDates" label="对账日期" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            v-if="authButton.length>0"
            fixed="right"
            label="操作"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-dropdown :hide-on-click="false">
                <span class="el-dropdown-link">
                  <i class="el-icon-menu"></i><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" v-for="item in authButton" :key="item.resourceId">
                  <el-dropdown-item>{{item.resourceName}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
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
  import {SESSION_STOART_MENUS} from "../../utils/ConstUtils.js"
import { toTime } from '../../../config/util.js';
  export default {
    name: "membershipManagement",
    data() {
      return {
        isDisable:false,
        params:{
          beginAccountDate:'',
          endAccountDate:'',
          page:1,
          pageSize:10
        },
        creDate:[],
        outgoingIsOpen: true,
        authButton:[],
        tableData: [],
        multipleSelection: [],
        myDoneappTypeList:'',
        secretOptionObject:{},
        currentPage: 1,
        total:0,
        styleObj: {
          'color':'red'
        },
        options: [{
          value: '',
          label: '全部'
        }],
        value: ''
      }
    },
    methods : {
      queryReconciliationResult(){
        this.params.accountDate = this.params.accountDate;
        if(this.creDate && this.creDate.length >0 ){
          this.params.beginAccountDate=this.creDate[0];
          this.params.endAccountDate=this.creDate[1];
        }else{
          this.params.beginAccountDate = ''
          this.params.endAccountDate = ''
        }
      
        this.init()
      },
      handleSizeChange (size) {

        this.params.pageSize = size;
        this.init();
      },
      handleCurrentChange (val) {

        this.params.page = val;
        this.init()
      },
      init () {

        let _this = this;
        this.isDisable=true;
        this.$http.post(_this.api.API_GATEWATE+'mango/resultList',_this.params,_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable=false;
            if(res && res.data && res.data.list){
              this.tableData =  res.data.list;
              for(let i=0; i<_this.tableData.length;i++){
                if(_this.tableData[i].tradeType == "COUPON"){
                  _this.tableData[i].tradeType = "优惠券"
                }else if(_this.tableData[i].tradeType == "WITHDRAW"){
                  _this.tableData[i].tradeType = "提现"
                }else if(_this.tableData[i].tradeType == "RECHARGE"){
                  _this.tableData[i].tradeType = "充值"
                }else if(_this.tableData[i].tradeType == "CONSUME"){
                  _this.tableData[i].tradeType = "消费"
                }else if(_this.tableData[i].tradeType == "ADVANCE"){
                  _this.tableData[i].tradeType = "代发"
                }else if(_this.tableData[i].tradeType == "REFUND"){
                  _this.tableData[i].tradeType = "退款"
                }
                if(_this.tableData[i].finalDate){
                  
                   _this.tableData[i].finalDates = _this.tableData[i].finalDate.substring(0,4) +'-'+ _this.tableData[i].finalDate.substring(4,6)+'-'+_this.tableData[i].finalDate.substring(6,8)
                }
                if(_this.tableData[i].tradeTime){
                  _this.tableData[i].tradeTimes = toTime(_this.tableData[i].tradeTime) 
                }
                if(_this.tableData[i].accountDate){
                  _this.tableData[i].accountDates = _this.tableData[i].accountDate.substring(0,4) +'-'+ _this.tableData[i].accountDate.substring(4,6)+'-'+_this.tableData[i].accountDate.substring(6,8)
                }
                if(_this.tableData[i].orderType == "COUPON"){
                  _this.tableData[i].orderTypes = "红包"
                }else if(_this.tableData[i].orderType == "WITHDRAW"){
                  _this.tableData[i].orderTypes = "提现"
                }else if(_this.tableData[i].orderType == "RECHARGE"){
                  _this.tableData[i].orderTypes = "充值"
                }else if(_this.tableData[i].orderType == "CONSUME"){
                  _this.tableData[i].orderTypes = "消费"
                }else if(_this.tableData[i].orderType == "ADVANCE"){
                  _this.tableData[i].orderTypes = "代发"
                }else if(_this.tableData[i].orderType == "REFUND"){
                  _this.tableData[i].orderTypes = "退款"
                }
                if(_this.tableData[i].channel){
                  if(_this.tableData[i].channel == "CMB"){
                    _this.tableData[i].channels ="招商银行";
                }else if(_this.tableData[i].channel == "CCB"){
                    _this.tableData[i].channels ="建设银行"
                }else if(_this.tableData[i].channel == "CIB"){
                    _this.tableData[i].channels ="兴业银行"
                }
                }
              }
              this.total = res.data.total || 0;
            }else{
              this.tableData = [];
              this.total=0;
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
      this.init()
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

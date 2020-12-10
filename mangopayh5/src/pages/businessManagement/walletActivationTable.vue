<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 50px">开立银行:</label>
            <el-select v-model="channel" placeholder="请选择" size="mini" style="width: 20%">
              <el-option
                v-for="item in bankList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          <label style="padding-left: 50px">机构名称:</label>
          <el-select v-model="orgName" placeholder="请选择" size="mini" style="width: 20%">
            <el-option
              v-for="item in orgNameList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <label style="padding-left: 50px">激活日期:</label>
          <el-date-picker
            style="width:20%"
            size="mini"
            v-model="starttime"
            type="daterange"
            :picker-options="startTime"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <el-button type="primary" @click="queryList" size="mini" style="margin-left: 3%" :disabled="isDisable">搜索</el-button>
          <el-button  style="margin-left:10px" size="mini" type="primary" v-if="item.resourceCode == 'wallet_activation_report'"  v-for="item in authButton" :key="item.resourceId" @click.stop="getExport" :disabled="isdisable">导出</el-button>
          <a  id="isa" href="" target="_blank"></a>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" style="text-align: right;">
        </el-col>
      </el-row>
    </div>
        <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
          <el-header style="height: 600px;overflow:auto;">
          <el-table ref="multipleTable" :data="tableData" border stripe tooltip-effect="dark" show-summary :summary-method="getSummaries" style="width: 100%">
            <el-table-column prop="orgName" label="激活渠道" show-overflow-tooltip width="260">
            </el-table-column>
            <el-table-column prop="channelName" label="开立银行" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="activationSuccessNum" label="成功笔数" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="activationFailNum" label="失败笔数" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="activationNum" label="总笔数" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="rate" label="成功率" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="激活时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span> {{ scope.row.activationDate | date('YYYY-MM-DD')}}</span>
              </template>
            </el-table-column>
          </el-table>
            <div class="table-page" >
              <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="params.page"
                             :page-sizes="[5, 10, 15, 20 ,50]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
    name: "walletActivationTable",
    data() {
      return {
        activationFailedNum: 0,
        activationNum: 0,
        activationSuccessNum: 0,
        urlList:'',
        isDisable:false,
        isdisable:true,
        orgNameList:[{
          value:'',
          label:'全部'
        },
          {
            value:'芒果TVapp',
            label:'芒果TVapp'
          },
          {
            value:'芒果TV',
            label:'芒果TV'
          },
          {
            value:'快乐购',
            label:'快乐购'
          },
          {
            value:'线下引流',
            label:'线下引流'
          }
        ],
        channel:'',
        orgName:'',
        bankList: [{
          value:'',
          label:'全部'
        },{
          value:'CMB',
          label:'招商银行'
        },{
          value:'CCB',
          label:'建设银行'
        },{
          value:'CIB',
          label:'兴业银行'
        }],
        value: '',
        tableData: [],
        authButton:[],
        searchParams: {
          page:0,
          pageSize: 10,
          channel:"",
          orgName:"",
          activationStartDate:"",
          activationEndDate:"",
        },
        searchParam: {
          page:0,
          pageSize:'',
          channel:"",
          orgName:"",
          activationStartDate:"",
          activationEndDate:"",
        },
        params: {
          page:1,
          pageSize: 10,
        },
        mchNameList:[],
        coreId:'',
        total:0,
        endtime:'',
        starttime:[],
        /* start 开始时间小于今天,结束时间不能大于开始时间 */
        startTime: {
          disabledDate: time => {
            return time.getTime() > Date.now();
          }
        },
        /* end*/
      }
    },
    methods:{
      //合计
      getSummaries(param) {
        
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          sums[2] = this.activationSuccessNum+'笔';
          sums[3] = this.activationFailedNum+'笔';
          sums[4] = this.activationNum+'笔';
        });
        return sums;
      },
      //导出
      getExport(){
        let _this = this;
        
        this.searchParam.channel =this.channel;
        this.searchParam.orgName =this.orgName;
        if(this.starttime && this.starttime.length>0){
          this.searchParam.activationStartDate = toDataTime(this.starttime[0]);
          this.searchParam.activationEndDate = toDataTime(this.starttime[1]);
        }else{
          this.searchParam.activationStartDate ="";
          this.searchParam.activationEndDate ="";
        }
        if(!this.searchParam.activationStartDate && !this.searchParam.activationEndDate && !this.searchParam.orgName && !this.searchParam.channel){
          this.$message({
            message: "请输入搜索条件进行导出",
            type: 'info'
          });
          return
        }
        _this.searchParam.pageSize = _this.total;
        let el = document.getElementById('isa');
        el.href=buildRequestURL(_this.api.API_GATEWATE+'mango/wallet/activation/report',_this.searchParam)
        el.click();//触发打开事件
       // window.location.href=buildRequestURL(_this.api.API_GATEWATE+'mango/wallet/activation/report',_this.searchParam);
       // return false
       // window.open(buildRequestURL(_this.api.API_GATEWATE+'mango/wallet/activation/report',_this.searchParam))

      },
      //搜索条件
      queryList(){
        this.searchParams.page=0;
        this.searchParams.channel =this.channel;
        this.searchParams.orgName =this.orgName;
        if(this.starttime && this.starttime.length>0){
          this.searchParams.activationStartDate = toDataTime(this.starttime[0]);
          this.searchParams.activationEndDate = toDataTime(this.starttime[1]);
        }else{
          this.searchParams.activationStartDate ="";
          this.searchParams.activationEndDate ="";
        }
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
      queryMchName (){
        let _this = this;
        let params = {
          page:1,
          pageSize:999
        }
        this.$http.post(_this.api.API_GATEWATE+'mango/getMchList',params,_this.GLOBAL.topheaders())
          .then(function(res){
            console.log(res.data)
            let list={"coreId":'',"mchName":'全部'};
            _this.mchNameList.push(list)
            res.data.list.forEach(e=>{
              _this.mchNameList.push(e);
            })
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
      init () {
        let _this = this;
        this.isDisable=true;
        this.$http.post(_this.api.API_GATEWATE+'mango/eopenList',_this.searchParams,_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable=false;
            if(res && res.data && res.data.content.length>0){
              let tableData =res.data.content;
              tableData.forEach(e=>{
                if(e.activationNum && e.activationSuccessNum){
                  e.activationFailNum = e.activationNum - e.activationSuccessNum
                }
                if(e.channel == "CMB"){
                  e.channelName ="招商银行";
                }else if(e.channel == "CCB"){
                  e.channelName ="建设银行"
                }else if(e.channel == "CIB"){
                  e.channelName ="兴业银行"
                }
                if(e.activationSuccessNum && e.activationNum){
                  e.rate = toNum(e.activationSuccessNum / e.activationNum,100).toFixed(2) + '%'
                }else{
                  e.rate = 0 + '%';
                }
              })
              _this.tableData =  res.data.content;
              _this.total = res.data.totalElements || 0;
            }else{
              _this.tableData = [];
              _this.total = 0;
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
        this.$http.post(_this.api.API_GATEWATE+'mango/eopenList/statistics',_this.searchParams,_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable=false;
            if(res && res.data){
              
              _this.activationFailedNum =  res.data.activationFailedNum || 0;
              _this.activationSuccessNum = res.data.activationSuccessNum || 0;
              _this.activationNum = res.data.activationNum || 0;
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
      //this.queryMchName();
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

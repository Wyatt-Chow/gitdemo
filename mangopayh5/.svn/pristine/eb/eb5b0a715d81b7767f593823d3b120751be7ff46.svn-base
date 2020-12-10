
<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
          <el-col :span="24">
            <label style="padding-left: 44px">会员姓名:</label>
            <el-input style="width:20%;" size="mini" v-model="name" maxlength="20"></el-input>
            <label style="padding-left: 30px">手机号码:</label>
            <el-input style="width:20%" size="mini" v-model="mobile"  maxlength="11"></el-input>
            <label style="padding-left: 43px">UUID:</label>
            <el-input style="width:20%" size="mini" maxlength="99" v-model="uuid" placeholder="支持尾号模糊匹配"></el-input>
           
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="margin-bottom:20px">
            <label style="padding-left: 44px">开户银行:</label>
            <el-input style="width:20%;" size="mini" v-model="bankName" maxlength="20"></el-input>
            
            <label style="padding-left: 30px">开户渠道:</label>
            <el-select v-model="openAccountChannel" placeholder="请选择" size="mini" style="width: 20%">
              <el-option
                v-for="item in bankList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <label style="padding-left: 20px">激活日期:</label>
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
            <el-button type="primary"  size="mini" @click="queryList" style="margin-left: 3%;" :disabled="isDisable">搜索</el-button>
            <el-button  style="margin-left:10px" size="mini" type="primary" v-if="item.resourceCode == 'elec_failed_report'"  v-for="item in authButton" :key="item.resourceId" @click.stop="getExport" :disabled="isdisable">导出</el-button>
            <a  id="isa" href=""></a>
          </el-col>
        </el-row>
    </div>
        <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
          <el-header style="height: 600px;overflow:auto;">
          <el-table ref="multipleTable" :data="tableData" border stripe tooltip-effect="dark"  style="width: 100%">
             <el-table-column prop="memberCoreId" label="会员ID"  show-overflow-tooltip width="100">
          </el-table-column>
          <el-table-column prop="name" label="会员姓名" show-overflow-tooltip width="100">
          </el-table-column>
          <el-table-column prop="bankName" label="开户银行" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="channelName" label="开户渠道" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="bankCardMobile" label="手机号码" show-overflow-tooltip width="150">
          </el-table-column>
         
          <el-table-column prop="outMemberId" label="UUID" show-overflow-tooltip width="200">
          </el-table-column>
          <el-table-column prop="respMessage" label="失败原因" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="激活时间" show-overflow-tooltip prop="times">
             
          </el-table-column>
          </el-table>
            <div class="table-page" >
              <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="params.page"
                             :page-sizes="[10]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </div>
          </el-header>
    </el-container>
  </div>
</template>

<script>
  import {SESSION_STOART_MENUS} from "@/utils/ConstUtils.js"
  import {toDataTime,toNum,buildRequestURL,toTime} from "../../../config/util.js"
  export default {
    name: "ActivationFailed",
    data() {
      return {
       
       
        isDisable:false,
        isdisable:true,
        name:'',
        mobile:'',
        uuid:'',
        bankName:'',
        openAccountChannel:'',
        tableData: [],
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
        searchParams: {
          page:1,
          pageSize: 10,
          name:"",
          mobile:"",
          bankName:'',
          openAccountChannel:'',
          outMemberId:'',
          beginDate:"",
          endDate:"",
        },
        searchParam: {
          page:1,
          pageSize: '',
          name:"",
          mobile:"",
          bankName:'',
          openAccountChannel:'',
          outMemberId:'',
          beginDate:"",
          endDate:"",
        },
        params: {
          page:1,
          pageSize: 10,
        },
       
        coreId:'',
        total:0,
        endtime:'',
        starttime:[],
        merchatVal:{},
        authButton:[],
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
     
      //导出
      getExport(){

        let _this = this;
        this.searchParam.bankName = this.bankName;
        this.searchParam.openAccountChannel = this.openAccountChannel;
        this.searchParam.name = this.name
        this.searchParam.mobile = this.mobile
        this.searchParam.outMemberId = this.uuid
        if(this.starttime && this.starttime.length>0){
          this.searchParam.beginDate = toDataTime(this.starttime[0]);
          this.searchParam.endDate = toDataTime(this.starttime[1]);
        }else{
          this.searchParam.beginDate ="";
          this.searchParam.endDate ="";
        }
        if(!this.searchParam.beginDate && !this.searchParam.endDate && !this.searchParam.name && !this.searchParam.mobile && !this.searchParam.outMemberId && !this.searchParam.bankName && !this.searchParam.openAccountChannel){
          this.$message({
            message: "请输入搜索条件进行导出",
            type: 'info'
          });
          return
        }
        _this.searchParam.pageSize = _this.total;
        let el = document.getElementById('isa');
        console.log(_this.searchParam)
        el.href=buildRequestURL(_this.api.API_GATEWATE+'mango/elec/failed/report',_this.searchParam)
        el.click();//触发打开事件
       // window.location.href=buildRequestURL(_this.api.API_GATEWATE+'mango/wallet/activation/report',_this.searchParam);
       // return false
       // window.open(buildRequestURL(_this.api.API_GATEWATE+'mango/wallet/activation/report',_this.searchParam))

      },
      //搜索条件
      queryList(){
        this.searchParams.bankName = this.bankName;
        this.searchParams.openAccountChannel = this.openAccountChannel;
        this.searchParams.page=1;
        this.searchParams.name = this.name
        this.searchParams.mobile = this.mobile
        this.searchParams.outMemberId = this.uuid
       
        if(this.starttime && this.starttime.length>0){
          this.searchParams.beginDate = toDataTime(this.starttime[0]);
          this.searchParams.endDate = toDataTime(this.starttime[1]);
        }else{
          this.searchParams.beginDate ="";
          this.searchParams.endDate ="";
        }
        this.isdisable=false;
        this.init();
        //this.queryAllStatistics();
      },
      handleSizeChange (size) {
        this.searchParams.pageSize = size;
        this.init();
      },
      handleCurrentChange (val) {
        console.log(val);
        this.params.page = val -1;
        this.searchParams.page = this.params.page+1;
        if(this.params.page >= 1){
          this.params.page = this.params.page +1;
        }
        this.init()
      },
     
      init () {
        let _this = this;
        this.isDisable=true;console.log(_this.searchParams)
       
        this.searchParams.name = this.name
        this.searchParams.mobile = this.mobile
        this.searchParams.outMemberId = this.uuid
        this.searchParam.bankName = this.bankName;
        this.searchParam.openAccountChannel = this.openAccountChannel;
        this.$http.post(_this.api.API_GATEWATE+'mango/elecAccountOpenFailedList',_this.searchParams,_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable=false;
            console.log(res.body.list.length);
            let tableData = res.body.list
              tableData.forEach(e=>{
               
                if(e.openAccountChannel == "CMB"){
                    e.channelName ="招商银行";
                }else if(e.openAccountChannel == "CCB"){
                    e.channelName ="建设银行"
                }else if(e.openAccountChannel == "CIB"){
                    e.channelName ="兴业银行"
                }
                if(e.createDate && e.createTime){
                  e.times = toTime(e.createDate.concat(e.createTime) ) 
                }
                
            })
              _this.tableData=tableData
            _this.total = res.body.total
           /*  if(res.body.list.length>0){
              let tableData =res.data.body.list;
              console.log(tableData);
              _this.tableData =  res.data.body.list;
              _this.total = res.body.total || 0;
            }else{
              _this.tableData = [];
              _this.total = 0;
            } */
           
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
        this.$http.post(_this.api.API_GATEWATE+'mango/elecAccountOpenFailedList',_this.searchParams,_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable=false;
            
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
      this.init();
      
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

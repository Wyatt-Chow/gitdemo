<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 30px">账户类型:</label>
          <el-select v-model="searchParams.actType" placeholder="请选择" size="mini" style="width: 20%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <label style="padding-left: 30px">状态:</label>
          <el-select v-model="searchParams.state" placeholder="请选择" size="mini" style="width: 20%">
            <el-option
              v-for="item in stateOptions"
              :key="item.values"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <label style="padding-left: 50px">注册日期:</label>
          <el-date-picker
            style="width:22%"
            size="mini"
            v-model="startDate"
            type="daterange"
            :picker-options="startTime"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 44px">会员名:</label>
          <el-input size="mini" style="width:20%" v-model="searchParams.name"></el-input>
          <label style="padding-left: 30px">手机:</label>
          <el-input size="mini" style="width:20%" v-model="searchParams.mobile"></el-input>
          <label style="padding-left: 35px">身份证号码:</label>
          <el-input style="width:22%" size="mini" maxlength="20" v-model="searchParams.certNo"></el-input>
          <el-button size="mini" type="primary" @click="queryList" style="margin-left: 50px;" :disabled="isDisable">搜索</el-button>
          <el-button  style="margin-left:10px" size="mini" type="primary" v-if="item.resourceCode == 'account_report'"  v-for="item in authButton" :key="item.resourceId" @click.stop="getExport" :disabled="isdisable">导出</el-button>
          <a  id="isa" href=""></a>
        </el-col>
      </el-row>
    </div>
      <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
        <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable" :data="tableData" stripe border style="width: 100%" v-loading="isLoad">
          <el-table-column prop="name" label="会员名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="mobile" label="手机号" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="actType" label="账户类型" show-overflow-tooltip width="100">
          </el-table-column>
          <el-table-column prop="actNo" label="内部电子账户ID" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="certNo" label="身份证号码" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="balance" label="账户余额(元)">
          </el-table-column>
          <el-table-column prop="availableBalance" label="账户可用余额(元)" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="statu" label="状态" show-overflow-tooltip width="50">
          </el-table-column>
          <el-table-column prop="date" label="注册时间" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div class="table-page" >
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="searchParams.page"
                         :page-sizes="[5, 10, 15, 20]" :page-size="searchParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
        </el-header>
    </el-container>
  </div>
</template>

<script>
  import {SESSION_STOART_MENUS} from "@/utils/ConstUtils.js"
  import {toTime,buildRequestURL,toDataTime} from "../../../config/util.js"
  export default {
    name: "AccountInformationQuery",
    data() {
      return {
        isLoad:false,
        urlList:'',
        isDisable:false,
        isdisable:true,
        options: [{
          value:'',
          label:'全部'
        },{
          value:'CASH',
          label:'现金账户'
        },{
          value:'LUCK_MONEY',
          label:'红包账户'
        }],
        value: '',
        stateOptions: [{
          value:'',
          label:'全部'
        },{
          value:'NORMAL',
          label:'正常'
        },
        {
          value:'DISABLE',
          label:'冻结'
        }],
        values: '',
        authButton:[],
        merchatVal:{},
        tableData: [],
        startDate:[],
        searchParams: {
          name:'',
          certNo:'',
          mobile:'',
          actType:'',
          state:'',
          page: 1,
          pageSize: 10,
          startDate:"",
          endDate:"",
        },
        searchParam: {
          name:'',
          certNo:'',
          mobile:'',
          actType:'',
          state:'',
          page: 1,
          pageSize: '',
          startDate:"",
          endDate:"",
        },
        total:0,
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
        this.searchParam.page = 1;
        this.searchParam.name = this.searchParams.name;
        this.searchParam.mobile = this.searchParams.mobile;
        this.searchParam.actType = this.searchParams.actType;
        this.searchParam.certNo = this.searchParams.certNo;
        this.searchParam.state = this.searchParams.state;
        if(this.startDate && this.startDate.length>0){
          this.searchParam.startDate = toDataTime(this.startDate[0]);
          this.searchParam.endDate = toDataTime(this.startDate[1]);
        }else{
          this.searchParam.startDate ="";
          this.searchParam.endDate ="";
        }
        if(!this.searchParam.name && !this.searchParam.mobile&&!this.searchParam.actType&&!this.searchParam.certNo&&!this.searchParam.state&&!this.searchParam.startDate&&!this.searchParam.endDate){
          this.$message({
            message: "请输入搜索条件进行导出",
            type: 'info'
          });
          return
      }
         let _this = this;
         _this.searchParam.pageSize = _this.total;
        
         this.$nextTick(() => {
           window.location.href=buildRequestURL(_this.api.API_GATEWATE+'mango/member/account/report',_this.searchParam)
         })

        // let el = document.getElementById('isa');
        // el.href = window.open(buildRequestURL(_this.api.API_GATEWATE+'mango/member/account/report',_this.searchParam)
        // //el.href=buildRequestURL(_this.api.API_GATEWATE+'mango/member/account/report',_this.searchParam)
        // //el.click();//触发打开事件
        // return false;
       // window.location.href=buildRequestURL(_this.api.API_GATEWATE+'mango/member/account/report',_this.searchParam);
       // return false
        //window.open(buildRequestURL(_this.api.API_GATEWATE+'mango/member/account/report',_this.searchParam))
      },
      //搜索
      queryList () {
        this.searchParams.page = 1;
        this.searchParams.name = this.searchParams.name;
        this.searchParams.mobile = this.searchParams.mobile;
        this.searchParams.actType = this.searchParams.actType;
        this.searchParams.certNo = this.searchParams.certNo;
        this.searchParams.state = this.searchParams.state;
        if(this.startDate && this.startDate.length>0){
          this.searchParams.startDate = toDataTime(this.startDate[0]);
          this.searchParams.endDate = toDataTime(this.startDate[1]);
        }else{
          this.searchParams.startDate ="";
          this.searchParams.endDate ="";
        }
        this.isdisable=false;
        this.init();
      },
      // changeStatu(val){
      //
      //   let _this = this;
      //   if(val && val.coreId){
      //     if(!val.name){
      //       val.name = "";
      //     }
      //     let act = "";
      //     let infoName=""
      //     if(val.statu == "正常"){
      //       act = "mango/actDisable/";
      //       infoName = "冻结";
      //     }else{
      //       act = "mango/actEnable/";
      //       infoName = "激活";
      //     }
      //     this.$confirm('确定要'+infoName+'【'+val.name+'】的账户吗?', '提示', {
      //       confirmButtonText: '确定',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }).then(() => {
      //       _this.$http.get(_this.api.API_GATEWATE+act+val.coreId+'/'+val.id,_this.GLOBAL.topheaders())
      //         .then(function(res){
      //
      //           if(res && res.data){
      //             _this.init();
      //             console.log(res.data)
      //             _this.$message({
      //               message: '成功',
      //               type: 'success'
      //             });
      //           }
      //             //控制台打印请求成功时返回的数据
      //             //bind(this)可以不用
      //           }.bind(this))
      //             .catch(function(err){
      //               if(err && err.data && err.data.key == "400300"){
      //                 _this.$router.push({ path: "/login" });
      //               }
      //               _this.$message({
      //                 message: err.body.msg,
      //                 type: 'error'
      //               });
      //               //bind(this)可以不用
      //             }.bind(this))
      //           }).catch(() => {
      //             this.$message({
      //               type: 'info',
      //               message: '已取消'+infoName
      //             });
      //           });
      //       }
      // },
      handleSizeChange (size){
        this.searchParams.pageSize = size;
        this.init();
      },
      handleCurrentChange(val){
        this.searchParams.page = val;
        this.init();
      },
      init () {
        let _this = this;
        this.isDisable=true;
        this.isLoad = true; setTimeout(() => {this.isLoad = false;}, 1000);
        this.$http.post(_this.api.API_GATEWATE+'mango/getAccountList',this.searchParams,_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable=false;
            _this.tableData =  res.data.list;
            for(let i=0; i<_this.tableData.length;i++){
              _this.tableData[i].date=toTime(_this.tableData[i].openDate+_this.tableData[i].openTime)
              if(_this.tableData[i].state == "NORMAL"){
                _this.tableData[i].statu = "正常"
              }else if(this.tableData[i].state == "DISABLE"){
                _this.tableData[i].statu = "冻结"
              }
            }

            for(let i=0; i<_this.tableData.length;i++){
              if(_this.tableData[i].actType == "CASH"){
                _this.tableData[i].actType = "现金账户"
              }else if(this.tableData[i].actType == "LUCK_MONEY"){
                _this.tableData[i].actType = "红包账户"
              }
            }
            for (let i=0; i<_this.tableData.length;i++){
              _this.tableData[i].balance = _this.tableData[i].balance/100;
              _this.tableData[i].freezeAmt = _this.tableData[i].freezeAmt/100;
              _this.tableData[i].availableBalance =  _this.tableData[i].balance - _this.tableData[i].freezeAmt;
            }
            this.total = res.data.total || 0;
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
  .accountinfor-main {
    .el-table td, .el-table th {
      padding: 5px 0;
    }
  }
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
  .el-table__body tr.hover-row>td {background-color:#e6a23c47 !important;}
</style>

<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <!--<label style="padding-left: 45px">会员名:</label>
          <el-input style="width:20.5%;padding-left: 16px" maxlength="64"    size="mini" v-model="searchParams.memberName"></el-input>-->
          <label style="padding-left: 30px">商户名称:</label>
          <template>
            <el-select v-model="searchParams.mchName"  placeholder="请选择" size="mini" style="width:20%">
              <el-option value="" key="" label="全部"></el-option>
              <el-option
                v-for="item in mchNameList"
                :key="item.coreId"
                :label="item.mchName"
                :value="item.mchName">
              </el-option>
            </el-select>
          </template>
          <label style="padding-left: 49px">会员名:</label>
          <el-input style="width:15%;" size="mini" maxlength="20" v-model="searchParams.memberName"></el-input>
         <label style="padding-left: 50px">消费状态:</label>
          <template>
            <el-select v-model="searchParams.tradeState" placeholder="请选择" size="mini" style="width: 9%">
              <el-option
                v-for="item in stateOptions"
                :key="item.values"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
          <label style="padding-left: 30px">身份证号码:</label>
          <el-input style="width:20%" size="mini" maxlength="20" v-model="searchParams.certNo"></el-input>
        </el-col>
      </el-row>
        <el-row>
          <el-col :span="24">
            <label style="padding-left: 45px">手机号:</label>
            <el-input style="width:20%" size="mini" maxlength="20" v-model="searchParams.memberMobile"></el-input>
            <label style="padding-left: 30px">消费金额区段:</label>
            <el-input style="width:10%" maxlength="13" size="mini" v-model="minAmount"></el-input>-
            <el-input style="width:10%" maxlength="13" size="mini" v-model="maxAmount"></el-input>
            <label style="padding-left: 30px;">交易时间:</label>
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
           <el-button type="primary"  size="mini" @click="queryList" style="margin-left:2%" :disabled="isDisable">搜索</el-button>
            <el-button  style="margin-left:10px" size="mini" type="primary" v-if="item.resourceCode == 'consume_report'"  v-for="item in authButton" :key="item.resourceId" @click.stop="getExport" :disabled="isdisable">导出</el-button>
            <a  id="isa" href="" target="_blank"></a>
          </el-col>
      </el-row>
      <!--<el-row>
        <el-col :span="24">

        </el-col>
      </el-row>-->
    </div>
      <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
        <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable" :data="tableData" :summary-method="getSummaries" show-summary stripe border tooltip-effect="dark" style="width: 100%">
          <!--<el-table-column prop="memberName" label="会员名" show-overflow-tooltip width="150">
          </el-table-column>-->
          <el-table-column prop="memberName" label="会员名" show-overflow-tooltip width="100">
          </el-table-column>
          <el-table-column prop="memberMobile" label="手机号" show-overflow-tooltip width="110">
          </el-table-column>
          <el-table-column prop="certNo" label="身份证号码" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="id" label="平台流水号" show-overflow-tooltip width="180">
          </el-table-column>
          <el-table-column prop="orderId" label="商户流水号" show-overflow-tooltip width="110" >
          </el-table-column>
          <el-table-column prop="createDates" label="交易时间"  show-overflow-tooltip width="180">
          </el-table-column>
          <el-table-column prop="amounts" label="消费金额 (元)" show-overflow-tooltip width="110">
          </el-table-column>
          <el-table-column prop="title" label="摘要" show-overflow-tooltip width="260">
          </el-table-column>
          <el-table-column prop="mchName" label="商户名称" show-overflow-tooltip width="260">
          </el-table-column>
          <el-table-column prop="tradeStates" label="状态" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="errorCodeDes" label="失败原因" show-overflow-tooltip width="200">
          </el-table-column>
        </el-table>
        <div class="table-page" >
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="searchParams.page"
                         :page-sizes="[5, 10, 15, 20, 50]" :page-size="searchParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
        </el-header>
    </el-container>
  </div>
</template>

<script>
  import {SESSION_STOART_MENUS} from "@/utils/ConstUtils.js"
  import {isvalidFee} from '../../../config/validate'
  import {toTime,toNum,toDataTime,buildRequestURL} from "../../../config/util.js"
  export default {
    name: "consumptionManagement",
    data() {
      return {
        urlList:'',
        size:0,
        isDisable:false,
        isdisable:true,
        mchNameList: [],
        stateOptions: [{
          value: '',
          label: '全部'
        },{
          value: 'SUCCESS',
          label: '成功'
        }, {
          value: 'FAIL',
          label: '失败'
        },
          {
            value: 'REFUND',
            label: '退款'
          }],
        authButton:[],
        tableData: [],
        amount:'',
        minAmount:'',
        maxAmount:'',
        searchParams: {
          certNo:'',
          memberName:'',
          tradeState:'',
          memberMobile:'',
          amount:'',
          mchName:'',
          startDate:'',
          endDate:'',
          page: 1,
          pageSize: 10,
        },
        totals:0,
        amount:'',
        searchParam: {
          certNo:'',
          memberName:'',
          tradeState:'',
          memberMobile:'',
          amount:'',
          mchName:'',
          startDate:'',
          endDate:'',
          page: 1,
          pageSize: '',
        },
        total:0,
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
      //导出
      getExport(){
        this.searchParam.page=1;
        this.searchParam.memberName = this.searchParams.memberName;
        this.searchParam.certNo = this.searchParams.certNo;
        this.searchParam.memberMobile = this.searchParams.memberMobile;
        this.searchParam.tradeState = this.searchParams.tradeState;
        if(this.minAmount){
          if(this.maxAmount){
            this.searchParam.minAmount = this.minAmount;
            this.searchParam.minAmount = toNum(this.minAmount,100);
            if(this.minAmount*100>this.maxAmount*100){
              this.$message({
                message: '最少金额不能大于最大金额',
                type: 'info'
              });
              return false;
            }
          }else {
            this.$message({
              message: '请输入最大金额',
              type: 'info'
            });
            return false;
          }
        }else{
          this.searchParam.minAmount = "";
        }
        if(this.maxAmount){
          if(this.minAmount){
            this.searchParam.maxAmount = this.maxAmount;
            this.searchParam.maxAmount = toNum(this.maxAmount,100);
          }else {
            this.$message({
              message: '请输入最小金额',
              type: 'info'
            });
            return false;
          }

        }else{
          this.searchParam.maxAmount = "";
        }
        this.searchParam.mchName = this.searchParams.mchName;
        if(this.starttime && this.starttime.length>0){
          this.searchParam.startDate = toDataTime(this.starttime[0]);
          this.searchParam.endDate = toDataTime(this.starttime[1]);
        }else{
          this.searchParam.startDate ="";
          this.searchParam.endDate ="";
        }
        if(!this.searchParam.memberName&&!this.searchParam.mchName && !this.searchParam.memberMobile&&!this.searchParam.certNo&&!this.searchParam.minAmount&&!this.searchParam.maxAmount&&!this.searchParam.tradeState&&!this.searchParam.startDate&&!this.searchParam.endDate){
          this.$message({
            message: "请输入搜索条件进行导出",
            type: 'info'
          });
          return

      }

        let _this = this;
        _this.searchParam.pageSize = _this.total;
        top.location.href=buildRequestURL(this.api.API_GATEWATE+'mango/trade/consume/report',_this.searchParam)
        //window.location.href=buildRequestURL(_this.api.API_GATEWATE+'mango/trade/consume/report',_this.searchParam);
       // return false
       // window.open(buildRequestURL(_this.api.API_GATEWATE+'mango/trade/consume/report',_this.searchParam))
      },
      //查询商户信息
      queryMchName (){
        let _this = this;
        let params = {
        }
        this.$http.post(_this.api.API_GATEWATE+'mango/getMchList',params,_this.GLOBAL.topheaders())
          .then(function(res){
            _this.mchNameList =  res.data.list;
            //控制台打印请求成功时返回的数据
            //bind(this)可以不用
          }.bind(this))
          .catch(function(err){
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
          sums[1] = '消费金额：';
          sums[2] = this.amount+'元';
          sums[3] = '消费笔数：';
          sums[4] = this.totals+'笔';
        });
        return sums;
      },
      //搜索
      queryList () {
        this.searchParams.page=1;
        this.searchParams.memberName = this.searchParams.memberName;
        this.searchParams.certNo = this.searchParams.certNo;
        this.searchParams.memberMobile = this.searchParams.memberMobile;
        this.searchParams.tradeState = this.searchParams.tradeState;
        if(!(isvalidFee(this.minAmount) && isvalidFee(this.maxAmount))){
          this.$message({
            message: '消费金额最多两位小数',
            type: 'info'
          });
          return false;
         
        }
        if(this.minAmount){
          if(this.maxAmount){
            this.searchParams.minAmount = this.minAmount;
            this.searchParams.minAmount = toNum(this.minAmount,100);
            if(this.minAmount*100>this.maxAmount*100){
              this.$message({
                message: '最少金额不能大于最大金额',
                type: 'info'
              });
              return false;
            }
          }else {
            this.$message({
              message: '请输入最大金额',
              type: 'info'
            });
            return false;

          }
        }else{
          this.searchParams.minAmount = "";
        }
        if(this.maxAmount){
          if(this.minAmount){
            this.searchParams.maxAmount = this.maxAmount;
            this.searchParams.maxAmount = toNum(this.maxAmount,100);
          }else {
            this.$message({
              message: '请输入最小金额',
              type: 'info'
            });
            return false;
          }

        }else{
          this.searchParams.maxAmount = "";
        }
        this.searchParams.mchName = this.searchParams.mchName;
        if(this.starttime && this.starttime.length>0){
          this.searchParams.startDate = toDataTime(this.starttime[0]);
          this.searchParams.endDate = toDataTime(this.starttime[1]);
        }else{
          this.searchParams.startDate ="";
          this.searchParams.endDate ="";
        }
        this.isdisable=false;
        this.init();
        this.queryAllNum();
      },
      handleSizeChange (size) {
        this.searchParams.pageSize = size;
        this.init();
      },
      handleCurrentChange (val) {
        this.searchParams.page = val;
        this.init()
      },
      queryAllNum(){
        let _this = this;
        let parms = this.searchParams;
        this.isDisable=true;
        _this.$http.post(_this.api.API_GATEWATE+'mango/getConsumptionList/statistics',
          parms,
          _this.GLOBAL.topheaders()
        )
          .then(function(res){
            this.isDisable=false;
            if(res && res.data){
              _this.amount = res.data.amount/100 || 0;
              _this.totals = res.data.total || 0;
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
      init () {
        let _this = this;
        let params = this.searchParams;
        this.isDisable=true;
        _this.$http.post(_this.api.API_GATEWATE+'mango/getConsumptionList',params,_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable=false;
            if(res && res.data && res.data.list.length>0){
              let tableData =res.data.list;
              tableData.forEach(e=>{
                if(e.createDate && e.createTime){
                  e.createDates=toTime(e.createDate+ e.createTime)
                }
                if(e.actualPayAmount!='' && e.actualPayAmount != null ){
                  e.amounts=e.actualPayAmount/100;
                }else {
                  e.amounts=0;
                }
                if(e.tradeState == "FAIL"){
                  e.tradeStates = "失败"
                }else if(e.tradeState == "SUCCESS"){
                  e.tradeStates = "成功"
                }else if(e.tradeState == "REFUND"){
                  e.tradeStates = "退款"
                }else if(!e.tradeState && e.amounts>0){
                  e.tradeStates = "处理中"
                }
              })
              _this.tableData =  tableData;
              this.total = res.data.total || 0;
              _this.size = res.data.size || 0;
            }else{
              _this.tableData =  [];
              _this.total = 0;
              _this.size = res.data.size || 0;
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
      this.queryMchName();
      this.init();
      this.queryAllNum();
    }
  }
</script>


<style  lang="scss">

</style>

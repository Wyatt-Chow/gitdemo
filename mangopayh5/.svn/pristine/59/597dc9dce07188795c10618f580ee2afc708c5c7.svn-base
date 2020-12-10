<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 25px">会员名:</label>
          <el-input style="width:20%;" size="mini" maxlength="20" v-model="searchParams.memberName"></el-input>
          <label style="padding-left: 25px">充值金额区段:</label>
          <el-input style="width:10%" maxlength="13" size="mini" v-model="minAmount" ></el-input>-
          <el-input style="width:10%" maxlength="13" size="mini" v-model="maxAmount" ></el-input>
          <label style="padding-left: 72px">状态:</label>
          <el-select v-model="searchParams.tradeState" size="mini" placeholder="请选择" style="width:22%" @change="changeTradeState">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <label style="padding-left: 39px">手机:</label>
          <el-input size="mini" style="width:20%;" v-model="searchParams.memberMobile"></el-input>
          <label style="padding-left: 40px">身份证号码:</label>
          <el-input style="width:284px" size="mini" maxlength="20" v-model="searchParams.certNo"></el-input>
          <label style="padding-left: 45px">交易时间:</label>
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
          <el-button size="mini" type="primary" @click="queryList" style="margin-left:2%" :disabled="isDisable">搜索</el-button>
          <el-button  style="margin-left:10px" size="mini" type="primary" v-if="item.resourceCode == 'recharge_report'"  v-for="item in authButton" :key="item.resourceId" @click.stop="getExport" :disabled="isdisable">导出</el-button>
          <a  id="isa" href=""></a>
        </el-col>
      </el-row>
    </div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable" :data="tableData" show-summary :summary-method="getSummaries" border stripe tooltip-effect="dark" style="width: 100%">
          <el-table-column label="会员名"  show-overflow-tooltip prop="memberName" width="70">
          </el-table-column>
          <el-table-column prop="memberMobile" label="手机号" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="certNo" label="身份证号码" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="orderId" label="订单流水号" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="toAccountNo" label="银行电子账号" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="amounts" label="充值金额(元)" show-overflow-tooltip width="140">
          </el-table-column>
          <el-table-column prop="fromAccountNo" label="银行卡号" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="fromAccountBankName" label="充值银行" show-overflow-tooltip width="90">
          </el-table-column>
          <el-table-column  prop="tradeStates" label="状态" show-overflow-tooltip width="50">
          </el-table-column>
          <el-table-column  prop="errorCodeDes" label="充值失败原因" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="createDates" label="交易时间" show-overflow-tooltip width="150">
          </el-table-column>
        </el-table>
        <div class="table-page" >
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="searchParams.page"
                         :page-sizes="[5, 10, 15, 20 ,50]" :page-size="searchParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-header>
    </el-container>
  </div>
</template>

<script>
  import {isvalidFee} from '../../../config/validate'
  import {SESSION_STOART_MENUS} from "@/utils/ConstUtils.js"
  import {toTime,toNum,toDataTime,buildRequestURL} from "../../../config/util.js"
  export default {
    name: "RechargeManagement",
    data() {
      return {
        urlList:'',
        size:0,
        isDisable:false,
        isdisable:true,
        options: [{
          value: '',
          label: '全部'
        },{
          value: 'SUCCESS',
          label: '成功'
        }, {
          value: 'FAIL',
          label: '失败'
        }],
        starttime:[],
        /* start 开始时间小于今天,结束时间不能大于开始时间 */
        startTime: {
          disabledDate: time => {
            return time.getTime() > Date.now();
          }
        },
        /* end*/
        tableData: [],
        authButton:[],
        memberName:'',
        amount:'',
        minAmount:'',
        maxAmount:'',
        tradeState:'',
        memberMobile:'',
        certNo:'',
        totals:'',
        searchParams: {
          minAmount:"",
          maxAmount:"",
          certNo:"",
          memberName:"",
          memberMobile:"",
          tradeState:"",
          startDate:"",
          endDate:"",
          tradeType:"RECHARGE",
          page: 1,
          pageSize: 10,
        },
        searchParam: {
          minAmount:"",
          maxAmount:"",
          certNo:"",
          memberName:"",
          memberMobile:"",
          tradeState:"",
          startDate:"",
          endDate:"",
          tradeType:"RECHARGE",
          page: 1,
          pageSize: '',
        },
        total:0,

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
          sums[1] = '充值金额：';
          sums[2] = this.amount+'元';
          sums[3] = '充值笔数：';
          sums[4] = this.totals+'笔';
        });
        return sums;
      },
      //导出
      getExport() {
        this.searchParam.page = 1;
        this.searchParam.memberName = this.searchParams.memberName;
        this.searchParam.memberMobile = this.searchParams.memberMobile;
        this.searchParam.certNo = this.searchParams.certNo;
        if (this.minAmount) {
          if (this.maxAmount) {
            this.searchParam.minAmount = this.minAmount;
            this.searchParam.minAmount = toNum(this.minAmount, 100);
            if (this.minAmount * 100 > this.maxAmount * 100) {
              this.$message({
                message: '最少金额不能大于最大金额',
                type: 'info'
              });
              return false;
            }
          } else {
            this.$message({
              message: '请输入最大金额',
              type: 'info'
            });
            return false;

          }
        } else {
          this.searchParam.minAmount = "";
        }
        if (this.maxAmount) {
          if (this.minAmount) {
            this.searchParam.maxAmount = this.maxAmount;
            this.searchParam.maxAmount = toNum(this.maxAmount, 100);
          } else {
            this.$message({
              message: '请输入最小金额',
              type: 'info'
            });
            return false;
          }

        } else {
          this.searchParam.maxAmount = "";
        }
        this.searchParam.tradeState = this.searchParams.tradeState;
        if (this.starttime && this.starttime.length > 0) {
          this.searchParam.startDate = toDataTime(this.starttime[0]);
          this.searchParam.endDate = toDataTime(this.starttime[1]);
        } else {
          this.searchParam.startDate = "";
          this.searchParam.endDate = "";
        }
        if(!this.searchParam.memberName && !this.searchParam.memberMobile&&!this.searchParam.certNo&&!this.searchParam.minAmount&&!this.searchParam.maxAmount&&!this.searchParam.tradeState&&!this.searchParam.startDate&&!this.searchParam.endDate){
          this.$message({
            message: "请输入搜索条件进行导出",
            type: 'info'
          });
          return
      }

        let _this = this;
        _this.searchParam.pageSize = _this.total;
       // let el = document.getElementById('isa');
        //el.href=buildRequestURL(_this.api.API_GATEWATE+'mango/trade/recharge/report',_this.searchParam)
        //el.click();//触发打开事件
        window.location.href=buildRequestURL(_this.api.API_GATEWATE+'mango/trade/recharge/report',_this.searchParam);
       // return false
       // window.open(buildRequestURL(_this.api.API_GATEWATE+'mango/trade/recharge/report',_this.searchParam))
      },
      //下拉框事件
      changeTradeState(){
        this.$forceUpdate();
      },
      //搜索
      queryList () {
        this.searchParams.page=1;
        this.searchParams.memberName = this.searchParams.memberName;
        this.searchParams.memberMobile = this.searchParams.memberMobile;
        this.searchParams.certNo = this.searchParams.certNo;
        if(!(isvalidFee(this.minAmount) && isvalidFee(this.maxAmount))){
          this.$message({
            message: '充值金额最多两位小数',
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
        this.searchParams.tradeState = this.searchParams.tradeState;
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
        _this.$http.post(_this.api.API_GATEWATE+'mango/recharge/statistics',
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
        let parms = this.searchParams
        this.isDisable=true;
        _this.$http.post(_this.api.API_GATEWATE+'mango/getCashOperList',
          parms,
          _this.GLOBAL.topheaders()
        )
          .then(function(res){
            this.isDisable=false;
            if(res && res.data && res.data.list){
              let tableData =res.data.list;
              tableData.forEach(e=>{
               
                e.createDates=toTime(e.createDate+ e.createTime);
                e.amounts=e.amount/100;
                if(e.tradeState == "SUCCESS"){
                  e.tradeStates = "成功"
                }else if(e.tradeState == "FAIL"){
                  e.tradeStates = "失败"
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
      _this.queryAllNum();
    }
  }
</script>


<style  lang="scss">

</style>

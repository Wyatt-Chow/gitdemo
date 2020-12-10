<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 30px">订单ID:</label>
          <el-input style="width:20%" size="mini" maxlength="20" v-model="searchParams.mchOrderId"></el-input>
          <label style="padding-left: 30px">提现金额区段:</label>
          <el-input style="width:10%" maxlength="13" size="mini" v-model="minAmount"></el-input>-
          <el-input style="width:10%" maxlength="13" size="mini" v-model="maxAmount"></el-input>
          <label style="padding-left: 56px"> 状态:</label>
          <el-select v-model="searchParams.tradeState" placeholder="请选择" style="width:22%" size="mini">
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
          <label style="padding-left: 30px">手机号:</label>
          <el-input style="width:20%;" size="mini" maxlength="20" v-model="searchParams.memberMobile"></el-input>
          <label style="padding-left: 44px">身份证号码:</label>
          <el-input style="width:284px" size="mini" maxlength="20" v-model="searchParams.certNo"></el-input>
          <label style="padding-left: 30px">交易时间:</label>
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
          <el-button  style="margin-left:10px" size="mini" type="primary" v-if="authButton.some(e=>{return e.resourceId === 184})" @click.stop="getExport" :disabled="isdisable">导出</el-button>
          <a  id="isa" href="" target="_blank"></a>
        </el-col>
      </el-row>
    </div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 700px;overflow:auto;">
        <el-table ref="multipleTable" show-summary :summary-method="getSummaries" :data="tableData" border stripe tooltip-effect="dark" style="width: 100%">
          <el-table-column label="退款流水号"  show-overflow-tooltip prop="id" width="100">
          </el-table-column>
          <el-table-column label="原交易流水号"  show-overflow-tooltip prop="trade_id" width="110">
          </el-table-column>
          <el-table-column prop="orgNo" label="机构号" show-overflow-tooltip width="150">
          </el-table-column>
           <el-table-column prop="mchId" label="商户号" show-overflow-tooltip width="150">
          </el-table-column>
         <!--  <el-table-column prop="certNo" label="身份证号码" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="orderId" label="订单流水号" show-overflow-tooltip width="230">
          </el-table-column>
          <el-table-column prop="fromAccountNo" label="银行电子账号" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="createDates" label="交易时间" show-overflow-tooltip>
          </el-table-column>-->
          <el-table-column prop="amounts" label="订单金额(元)" show-overflow-tooltip>
          </el-table-column> 
          <el-table-column prop="refundableAmounts" label="剩余可退金额（元）" show-overflow-tooltip > </el-table-column>
          <el-table-column prop="refundAmounts" label="申请退款金额（元）" show-overflow-tooltip > </el-table-column>
         
          <el-table-column prop="payChannel" label="支付渠道" show-overflow-tooltip width="100">
          </el-table-column>
          <el-table-column prop="tradeStates" label="状态" show-overflow-tooltip width="50">
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
  import {SESSION_STOART_MENUS} from "@/utils/ConstUtils.js"
  import {isvalidFee} from '../../../config/validate'
  import {toTime,toNum,toDataTime,buildRequestURL} from "../../../config/util.js"
  export default {
    name: "cashManagement",
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
        value: '',
        tableData: [],
        authButton:[],
        amount:'',
        minAmount:'',
        maxAmount:'',
        searchParams: {
          memberName:"",
          memberMobile:"",
          amount:"",
          certNo:"",
          tradeState:"",
          page: 1,
          pageSize: 10,
          tradeType:"WITHDRAW",
        },
        searchParam: {
          memberName:"",
          memberMobile:"",
          amount:"",
          certNo:"",
          tradeState:"",
          page: 1,
          pageSize: '',
          tradeType:"WITHDRAW",
        },
        totals:0,
        total:0,
        starttime:[],
        /* start 开始时间小于今天,结束时间不能大于开始时间 */
        startTime: {
          disabledDate: time => {
            if (this.endtime) {
              return (
                time.getTime() > new Date(this.endtime).getTime()
              );
            } else {
              return time.getTime() > Date.now();
            }
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
          sums[1] = '提现金额：';
          sums[2] = this.amount+'元';
          sums[3] = '提现笔数：';
          sums[4] = this.totals+'笔';

          // if(column.property == 'amounts'){
          //   const values = data.map(item => Number(item[column.property]));
          //   if (!values.every(value => isNaN(value))) {
          //     sums[2] = values.reduce((prev, curr) => {
          //       const value = Number(curr);
          //       if (!isNaN(value)) {
          //         return this.calc(prev,curr,'add')
          //         //return prev + curr;
          //       } else {
          //         return prev;
          //       }
          //     }, 0);
          //     sums[1] = '提现金额：';
          //     sums[2] = sums[2]+='元';
          //     sums[3] = '提现笔数：';
          //     sums[4] = this.size+'笔';
          //   }
          // }
        });
        return sums;
      },
      // decNum(a){/*获取小数位数*/
      //   let r=0;
      //   a=a.toString();
      //   if(a.indexOf(".")!== -1) r=a.split(".")[1].length;
      //   return r;
      // },
      // int(a){/*去除小数点并转成数值*/
      //   return parseInt(a.toString().replace(".",""));
      // },
      // calc(a,b,type){//加减乘除
      //   let r,
      //     da=this.decNum(a),
      //     db=this.decNum(b),
      //     dsum=da+db,
      //     dmin=Math.min(da,db),
      //     dmax=Math.max(da,db);
      //   dsum+=dmax-dmin;
      //   dsum=Math.pow(10,dsum);
      //   dmax=Math.pow(10,dmax);
      //   a=this.int(a);
      //   b=this.int(b);
      //   if(da>db){
      //     b*=Math.pow(10,da-db);
      //   }else{
      //     a*=Math.pow(10,db-da);
      //   }
      //   switch(type){
      //     case "add":
      //       r=(a+b)/dmax;
      //       break;
      //     case "subtract":
      //       r=(a-b)/dmax;
      //       break;
      //     case "multiply":
      //       r=(a*b)/dsum;
      //       break;
      //     case "divide":
      //       r=a/b;
      //       break;
      //   }
      //   return r;
      // },
      //导出
      getExport(){
        this.searchParam.page=1;
        this.searchParam.certNo = this.searchParams.certNo;
        this.searchParam.memberName = this.searchParams.memberName;
        this.searchParam.memberMobile = this.searchParams.memberMobile;
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
        this.searchParam.tradeState = this.searchParams.tradeState;
        if(this.starttime && this.starttime.length>0){
          this.searchParam.startDate = toDataTime(this.starttime[0]);
          this.searchParam.endDate = toDataTime(this.starttime[1]);
        }else{
          this.searchParam.startDate ="";
          this.searchParam.endDate ="";
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
        parent.location.href=buildRequestURL(_this.api.API_GATEWATE+'mango/trade/withdraw/report',_this.searchParam)
      },
      //搜索
      queryList () {
        this.searchParams.page=1;
        this.searchParams.memberName = this.searchParams.memberName;
        this.searchParams.memberMobile = this.searchParams.memberMobile;
        if(!(isvalidFee(this.minAmount) && isvalidFee(this.maxAmount))){
          this.$message({
            message: '提现金额最多两位小数',
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
        _this.$http.post(_this.api.API_GATEWATE+'mango/withdraw/statistics',
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
      init (){
        let _this = this;
        let parms = this.searchParams;
        this.isDisable=true;
        _this.$http.post(_this.api.API_GATEWATE+'mango/getRefundList',parms,_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable=false;
            if(res && res.data && res.data.list && res.data.list.length>0){
              let tableData =res.data.list;
              tableData.forEach(e=>{
                e.createDates=toTime(e.createDate+ e.createTime)
                e.amounts=e.amount/100;
                if(e.tradeState == "SUCCESS"){
                  e.tradeStates = "成功"
                }else if(e.tradeState == "FAIL"){
                  e.tradeStates = "失败"
                }
              })
              _this.tableData =  tableData;
              _this.total = res.data.total || 0;
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
          }.bind(this))
        console.log(this)
      },
    },
    created() {
      this.init();
      this.queryAllNum();
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
  .myDoneHeader-content{
    height: 600px;
    overflow-y:auto;
  }
  .myDoneHeader-content::-webkit-scrollbar {
    display: none;
  }

</style>

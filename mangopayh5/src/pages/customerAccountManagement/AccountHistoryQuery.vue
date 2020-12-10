<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 30px">手机号码:</label>
          <el-input style="width:18%" size="mini" maxlength="20" v-model="params.mobile"></el-input>
          <label style="padding-left: 50px">账户类型:</label>
          <el-select v-model="params.actType" placeholder="请选择" size="mini" style="width:20%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <label style="padding-left: 30px">会计日期:</label>
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
          <el-button type="primary" size="mini" @click="queryList" style="margin-left:3%" :disabled="isDisable">搜索</el-button>
          <el-button  style="margin-left:10px" size="mini" type="primary" v-if="item.resourceCode == 'account_trade_report'"  v-for="item in authButton" :key="item.resourceId" @click.stop="getExport" :disabled="isdisable">导出</el-button>
          <a  id="isa" href=""></a>
        </el-col>
      </el-row>
    </div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable" :data="tableData" stripe border style="width: 100%" v-loading="isLoad">
          <el-table-column prop="name" label="会员名" show-overflow-tooltip width="90">
          </el-table-column>
          <el-table-column prop="mobile" label="手机号码 " show-overflow-tooltip width="120">
          </el-table-column>
          <el-table-column prop="actType" label="账户类型" show-overflow-tooltip width="100">
          </el-table-column>
          <el-table-column prop="actNo" label="账户编号" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="blDrt" label="收支" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="tradeType" label="交易类型" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="amount" label="金额(元)" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="会计日期" show-overflow-tooltip>
            <template slot-scope="scope">
              <span> {{ scope.row.actDate | date('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="记账时间" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.crtTime | date('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-page" >
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="params.page"
                         :page-sizes="[5, 10, 15, 20, 50]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-header>
    </el-container>
  </div>
</template>

<script>
  import {SESSION_STOART_MENUS} from "@/utils/ConstUtils.js"
  import {toDataTime,buildRequestURL} from "../../../config/util.js"
  export default {
    name: "AccountHistoryQuery",
    data() {
      return {
        isLoad:false,
        isurl:'',
        urlList:'',
        isDisable:false,
        isdisable:true,
        startDate:[],
        params: {
          certNo:'',
          mobile:'',
          actType:'',
          state:'',
          page: 1,
          pageSize:10,
          startDate:"",
          endDate:"",
        },
        param: {
          certNo:'',
          mobile:'',
          actType:'',
          state:'',
          page: 1,
          pageSize:'',
          startDate:"",
          endDate:"",
        },
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
        stateOptions: [{
          value:'',
          label:'全部'
        },{
          value:'NORMAL',
          label:'正常'
        },{
          value:'CCB',
          label:'销户'
        }],
        authButton:[],
        merchatVal:{},
        tableData: [],
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
        this.param.page = 1;
        this.param.mobile = this.params.mobile;
        this.param.certNo = this.params.certNo;
        this.param.actType = this.params.actType;
        this.param.state = this.params.state;
        if(this.startDate && this.startDate.length>0){
          this.param.startDate = toDataTime(this.startDate[0]);
          this.param.endDate = toDataTime(this.startDate[1]);
        }else{
          this.param.startDate ="";
          this.param.endDate ="";
        }
        if(!this.param.mobile && !this.param.actType&&!this.param.name&&!this.param.startDate&&!this.param.endDate) {
          this.$message({
            message: "请输入搜索条件进行导出",
            type: 'info'
          });
          return
        }
        let _this = this;
        _this.param.pageSize = _this.total;
        if (!window.location.href.includes('10.11.51')){
          _this.isurl = "/list/"
        }
        //let e = document.getElementById("isa")
        window.location.href=buildRequestURL(_this.isurl+'mango/member/account/trade/report',_this.param);
        // window.location.href=buildRequestURL(_this.api.API_GATEWATE+'mango/member/account/trade/report',_this.param)
        // window.event.returnValue=false;
        // let el = document.getElementById('isa');
        // el.href=buildRequestURL(_this.api.API_GATEWATE+'mango/member/account/trade/report',_this.param)
         //e.click();//触发打开事件
       // window.location.href=buildRequestURL(_this.api.API_GATEWATE+'mango/member/account/trade/report',_this.param);
       // return false
       // window.open(buildRequestURL(_this.api.API_GATEWATE+'mango/member/account/trade/report',_this.param))
      },
      //搜索
      queryList () {
        this.isdisable=false;
        this.params.page = 1;
        this.params.mobile = this.params.mobile;
        this.params.certNo = this.params.certNo;
        this.params.actType = this.params.actType;
        this.params.state = this.params.state;
        if(this.startDate && this.startDate.length>0){
          this.params.startDate = toDataTime(this.startDate[0]);
          this.params.endDate = toDataTime(this.startDate[1]);
        }else{
          this.params.startDate ="";
          this.params.endDate ="";
        }
        this.init();
      },
      handleSizeChange (size) {
        this.params.pageSize = size;
        this.init();
      },
      handleCurrentChange (val) {
        this.params.page = val;
        this.init();
      },
      getSum (total, num){
        return total +num;
      },
      init () {
        let _this = this;
        this.isDisable=true;
        this.isLoad = true; setTimeout(() => {this.isLoad = false;}, 1000);
        this.$http.post(_this.api.API_GATEWATE+'mango/getHisAccList',_this.params,_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable=false;
            _this.tableData =  res.data.list;
            let incomeList = [];//收入金额数组
            let expenditure = [];//支出金额数组
            for(let i=0; i<_this.tableData.length;i++){
              if(_this.tableData[i].amount){
                _this.tableData[i].amount = _this.tableData[i].amount/100;
              }
              if(_this.tableData[i].actType == "LUCK_MONEY"){
                _this.tableData[i].actType = "红包"
              }else if(this.tableData[i].actType == "CASH"){
                _this.tableData[i].actType = "现金"
              }
              if(_this.tableData[i].blDrt == "INCOME"){
                if(_this.tableData[i].amount){
                  incomeList.push(_this.tableData[i].amount)
                }
                _this.tableData[i].blDrt = "收入"
              }else if(this.tableData[i].blDrt == "EXPENDITURE"){
                if(_this.tableData[i].amount){
                  expenditure.push(_this.tableData[i].amount)
                }
                _this.tableData[i].blDrt = "支出"
              }
              if(_this.tableData[i].status == "NORMAL"){
                _this.tableData[i].statu = "正常"
              }else if(this.tableData[i].status == "CLOSED"){
                _this.tableData[i].statu = "销户"
              }else if(this.tableData[i].status == "FREEZE"){
                _this.tableData[i].statu = "冻结"
              }
              if(_this.tableData[i].tradeType == "COUPON"){
                _this.tableData[i].tradeType = "红包"
              }else if(this.tableData[i].tradeType == "WITHDRAW"){
                _this.tableData[i].tradeType = "提现"
              }else if(this.tableData[i].tradeType == "RECHARGE"){
                _this.tableData[i].tradeType = "充值"
              }else if(this.tableData[i].tradeType == "CONSUME"){
                _this.tableData[i].tradeType = "消费"
              }else if(this.tableData[i].tradeType == "REFUND"){
                _this.tableData[i].tradeType = "退款"
              }else if(this.tableData[i].tradeType == "COUPON_REFUND"){
                _this.tableData[i].tradeType ="红包过期退还"
              }
            }
            let incomeamount = 0;
            let expenditureAmount = 0;

            if(incomeList && incomeList.length>0){
              incomeamount = incomeList.reduce(this.getSum);
            }
            if(expenditure && expenditure.length>0){
              expenditureAmount = expenditure.reduce(this.getSum);//支出金额
            }
            _this.tableData.push({name:'支出合计',mobile:expenditureAmount.toFixed(2),actType:'收入合计',actNo:incomeamount.toFixed(2)})
            _this.total = res.data.total || 0;
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

</style>

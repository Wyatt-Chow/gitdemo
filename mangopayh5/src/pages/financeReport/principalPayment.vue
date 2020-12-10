<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 30px">客户姓名：</label>
          <el-input style="width:10%" size="mini" maxlength="20" v-model="params.name" ></el-input>

          <!-- <label style="padding-left: 50px">状态：</label>
          <el-select v-model="params.type"  size="mini" style="width:20%">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <label style="padding-left: 30px">还款日期</label>
          <el-date-picker
            style="width:22%"
            size="mini"
            v-model="params.startDate"
            type="date"
            :picker-options="startTime"
            value-format="yyyyMMdd"
          >
          </el-date-picker> -->
          <el-button type="primary" size="mini" @click="queryList" style="margin-left:3%" :disabled="isDisable">查询</el-button>
          <el-button  style="margin-left:10px" size="mini" type="primary" v-if="item.resourceId == 235"  v-for="item in authButton" :key="item.resourceId" @click.stop="getExport" >导出</el-button>
          <a  id="isa" href=""></a>
        </el-col>
      </el-row>
    </div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">

        <el-table ref="multipleTable" :data="tableData" stripe border style="width: 100%" v-loading="isLoad">
          <el-table-column prop="grantCode" label="借款编号" show-overflow-tooltip width="160" fixed='left'>
          </el-table-column>

          <el-table-column prop="name" label="客户名称" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="loanPeriod" label="贷款期数" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="period" label="还款期次" show-overflow-tooltip>
          </el-table-column>
           <el-table-column prop="auditDates" label="虚拟放款时间" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="loanDates" label="实际放款时间" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="refundDates" label="退款时间" show-overflow-tooltip width="150">
          </el-table-column>

          <el-table-column prop="refundPrincipal" label="退还本金(元)" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="refundAccrual" label="退还利息(元)" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="refundPenalty" label="退还罚息(元)" show-overflow-tooltip width="150">
          </el-table-column>


          <el-table-column
            fixed="right"
            label="操作"
            v-if="false"
            show-overflow-tooltip>
           <template slot-scope="scope">
              <el-dropdown :hide-on-click="false">
                <span class="el-dropdown-link">
                  <i class="el-icon-menu"></i><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="check(scope.row)">查看</el-dropdown-item>
                  <el-dropdown-item @click.native="check(scope.row)">还款录入</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
  import {toDataTime,buildRequestURL, toTime} from "../../../config/util.js"
  export default {
    name: "AccountHistoryQuery",
    data() {
      return {
        isLoad:false,
        isurl:'',
        urlList:'',
        isDisable:false,
        isdisable:true,

        typeList:[
          {label:'还款成功',value:'SUCCESS'},
          {value:'WAIT_PAY',label:'未还款'},
          {value:'FAILED',label:'还款失败'},
          {value:'PARTIAL_PAY',label:'部分还款'}
        ],
        params: {

          name:'',
          page: 1,
          pageSize:10,


        },
        param: {

          name:'',
          page: 1,
          pageSize:'',

        },
        /* options: [{
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
        }], */
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
      //查看统计
      getstatistics(){

        let _this =this;
        this.$http.post(_this.api.API_GATEWATE+'mango/loan/statisticsRefund', this.params,_this.GLOBAL.topheaders())
          .then(function(res){

           console.log(res);

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
      },
      //导出
      getExport(){
        this.param.page = 1;
        this.param.name = this.params.name;
        /* this.param.certNo = this.params.certNo;
        this.param.actType = this.params.actType;
        this.param.state = this.params.state;
        if(this.startDate && this.startDate.length>0){
          this.param.startDate = toDataTime(this.startDate[0]);
          this.param.endDate = toDataTime(this.startDate[1]);
        }else{
          this.param.startDate ="";
          this.param.endDate ="";
        } */
        if(!this.param.name) {
          this.$message({
            message: "请输入搜索条件进行导出",
            type: 'info'
          });
          return
        }
        let _this = this;
        _this.param.pageSize = _this.total;

        if (!window.location.href.includes('10.11.51')){

        }
        //let e = document.getElementById("isa")
        window.location.href=buildRequestURL(this.api.API_GATEWATE+'mango/credit/refundContPlanDateReport',_this.param);

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
        /* this.params.mobile = this.params.mobile;
        this.params.certNo = this.params.certNo;
        this.params.actType = this.params.actType;
        this.params.state = this.params.state;
        if(this.startDate && this.startDate.length>0){
          this.params.startDate = toDataTime(this.startDate[0]);
          this.params.endDate = toDataTime(this.startDate[1]);
        }else{
          this.params.startDate ="";
          this.params.endDate ="";
        } */
        this.init();
      },
      check(val){
        console.log(val)
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
        this.$http.post(_this.api.API_GATEWATE+'mango/loan/getRefundContPlanPage', _this.params,_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable=false;
            _this.tableData =  res.data.list;
            let incomeList = [];//收入金额数组
            let expenditure = [];//支出金额数组
            for(let i=0; i<_this.tableData.length;i++){
              if(_this.tableData[i].loanDate){
                _this.tableData[i].loanDates = toTime(_this.tableData[i].loanDate) ;
              }
              if(_this.tableData[i].auditDate){
                _this.tableData[i].auditDates = toTime(_this.tableData[i].auditDate) ;
              }
              if(_this.tableData[i].refundDate){
                _this.tableData[i].refundDates = toTime(_this.tableData[i].refundDate) ;
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
           /*  _this.tableData.push({name:'支出合计',mobile:expenditureAmount.toFixed(2),actType:'收入合计',actNo:incomeamount.toFixed(2)}) */
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

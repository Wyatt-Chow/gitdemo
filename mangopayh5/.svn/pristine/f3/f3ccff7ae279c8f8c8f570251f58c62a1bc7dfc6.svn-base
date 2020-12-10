<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 30px">用户姓名：</label>
          <el-input style="width:10%" size="mini" maxlength="20" v-model="params.custName" ></el-input>
         <!--  <label style="padding-left: 30px">到期日期：</label>
          <el-date-picker
            style="width:22%"
            size="mini"
            v-model="startDate2"
            type="daterange"

            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker> -->
          <el-button type="primary" size="mini" @click="queryList" style="margin-left:3%" :disabled="isDisable">查询</el-button>

          <a  id="isa" href=""></a>
        </el-col>
      </el-row>
    </div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">

        <el-table ref="multipleTable" :data="tableData" stripe border style="width: 100%" v-loading="isLoad">
          <el-table-column prop="grantCode" label="借据编号" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="custName" label="客户姓名" show-overflow-tooltip >
          </el-table-column>

          <el-table-column prop="contractId" label="合同编号" show-overflow-tooltip >
          </el-table-column>

          <el-table-column prop="grantAmount" label="放款额度（元）" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="rates" label="利率（%）" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="repayTypes" label="还款方式" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="periods" label="借款期限" show-overflow-tooltip>
          </el-table-column>


          <el-table-column prop="statu" label="状态" show-overflow-tooltip>
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
                  <el-dropdown-item @click.native="preupdate(scope.row)">查看</el-dropdown-item>
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
        startDate1:[],
        startDate2:[],
        params: {
          custName: '',

          page: 1,
          pageSize:10,
          startDate:"",
          finallyDate:"",

        },
        param: {
          name: '',
          mobile:'',
          loanType: '',
          page: 1,
          pageSize:10,
          startDate:"",
          endDate:"",
        },
        loanType: '',
        loanTypeList: [{
          value:'',
          label:'全部'
        },{
          value:'CASH',
          label:'现金账户'
        },{
          value:'LUCK_MONEY',
          label:'红包账户'
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
        this.param.name = this.params.name;
        this.params.loanType = this.loanType;
        if(this.startDate && this.startDate.length>0){
          this.param.startDate = toDataTime(this.startDate[0]);
          this.param.finallyDate = toDataTime(this.startDate[1]);
        }else{
          this.param.startDate ="";
          this.param.finallyDate ="";
        }
        if(!this.param.mobile && !this.param.name && !this.params.loanType && !this.param.startDate && !this.param.finallyDate) {
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

        if(this.startDate1 && this.startDate1.length>0){
          this.params.startDate = toDataTime(this.startDate1[0]);
          this.params.finallyDate = toDataTime(this.startDate1[1]);
        }else{
          this.params.startDate ="";
          this.params.finallyDate ="";
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

        // 待获取后台数据之后展示数据 tableData
        this.$http.post(_this.api.API_GATEWATE+'mango/credit/grantList',_this.params,_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable=false;
            _this.tableData =  res.data.list;
            let incomeList = [];//收入金额数组
            let expenditure = [];//支出金额数组
            for(let i=0; i<_this.tableData.length;i++){

              if(_this.tableData[i].status == "00"){
                _this.tableData[i].statu = "结清"
              }else if(this.tableData[i].status == "01"){
                _this.tableData[i].statu = "正常还款"
              }else if(this.tableData[i].status == "02"){
                _this.tableData[i].statu = "逾期"
              }else if(this.tableData[i].status == "03"){
                _this.tableData[i].statu = "坏账"
              }
             if(_this.tableData[i].rate){
               _this.tableData[i].rates = _this.tableData[i].rate*100;
             }
             if(_this.tableData[i].repayType){
               switch(_this.tableData[i].repayType){
                 case  "ONCE":
                   _this.tableData[i].repayTypes = ' 一次本息'
                   break;
                 case  "PRE_INTEREST":
                   _this.tableData[i].repayTypes = ' 先息后本'
                   break;
                 case  "FIXED_AMOUNT":
                   _this.tableData[i].repayTypes = ' 等额本息'
                   break;
               }
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

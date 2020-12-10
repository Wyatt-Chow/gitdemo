<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 30px"></label>
          <el-input style="width:10%" size="mini" maxlength="20" v-model="params.name" placeholder="借款人"></el-input>
          <label style="padding-left: 10px"></label>
          <el-input style="width:10%" size="mini" maxlength="20" v-model="params.loanId" placeholder="借款编号"></el-input>
          <label style="padding-left: 10px"></label>
          <el-select v-model="params.checkType" placeholder="对账状态" size="mini" style="width:20%">
            <el-option
              v-for="item in checkTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <label style="padding-left: 10px"></label>
          <el-select v-model="params.type" placeholder="收款方式" size="mini" style="width:20%">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <label style="padding-left: 30px"></label>
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
          <el-button type="primary" size="mini" @click="queryList" style="margin-left:3%" :disabled="isDisable">查询</el-button>
          <!-- <el-button  style="margin-left:10px" size="mini" type="primary" v-if="item.resourceCode == 'account_trade_report'"  v-for="item in authButton" :key="item.resourceId" @click.stop="getExport" :disabled="isdisable">导出</el-button>
          <a  id="isa" href=""></a> -->
        </el-col>
      </el-row>
    </div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 700px;overflow:auto;"><span type="info" style="margin-left: 3%">数据列表</span>
     <!--  <el-button type="export" size="mini" @click="queryList" style="margin-left:70%" :disabled="isDisable">批量对账确认</el-button>
      <el-button type="export" size="mini" @click="queryList" style="margin-left:2%" :disabled="isDisable">打印</el-button>
        <el-button type="export" size="mini" @click="queryList" style="margin-left:2%" :disabled="isDisable">导出</el-button> -->
        <el-table ref="multipleTable" :data="tableData" stripe border style="width: 100%" v-loading="isLoad">
          
          <el-table-column prop="grantCode" label="借款编号 " show-overflow-tooltip width="120">
          </el-table-column>
          <el-table-column prop="name" label="借款人" show-overflow-tooltip width="100">
          </el-table-column>
          <el-table-column prop="loanProject" label="借款项目" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="periods" label="期限" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="loanAmount" label="收款利息（元）" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="loanTime" label="收款时间" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="lendingWay" label="收款方式" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="checkPersonnel" label="对账人员" show-overflow-tooltip>
          </el-table-column>
         <el-table-column prop=" checkDate" label="对账日期" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="checkState" label="对账状态" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            show-overflow-tooltip>
           <template slot-scope="scope">
              <el-dropdown :hide-on-click="false">
                <span class="el-dropdown-link">
                  <i class="el-icon-menu"></i><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="check(scope.row)">查看详情</el-dropdown-item>
                
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
    name: "principalReport",
    data() {
      return {
        isLoad:false,
        isurl:'',
        urlList:'',
        isDisable:false,
        isdisable:true,
        startDate:[],
        typeList:[{label:'银行代扣',value:'1'},{label:'线下转账',value:'2'}],
        checkTypeList:[{label:'已对账',value:'1'},{label:'未对账',value:'0'},{label:'异常',value:'2'},{label:'已冲正',value:'3'}],
        params: {
          loanId:'',
          name:'',
          checkType:'',
          type:'',
          contract:'',
          page: 1,
          pageSize:10,
          startDate:"",
          
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
        /* this.params.mobile = this.params.mobile;
        this.params.certNo = this.params.certNo;
        this.params.actType = this.params.actType;
        this.params.state = this.params.state;*/
        if(this.startDate && this.startDate.length>0){
          this.params.startDate = toDataTime(this.startDate[0]);
          this.params.endDate = toDataTime(this.startDate[1]);
        }else{
          this.params.startDate ="";
          this.params.endDate ="";
        } 
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

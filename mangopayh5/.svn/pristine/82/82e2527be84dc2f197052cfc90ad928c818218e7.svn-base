<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24" class="settlementManag">
          <label style="padding-left: 30px">对账时间</label>
          <el-date-picker
            style="width:22%"
            size="mini"
            v-model="accountDate"
            type="daterange"
            :picker-options="startTime"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <!--<el-date-picker  size="mini" style="width:20%" v-model="searchParams.accountDate"  type="date" value-format="yyyyMMdd"></el-date-picker>-->
          <label style="padding-left: 50px">商户代码:</label>
          <el-input  size="mini" style="width:20%" v-model="searchParams.mchId">
          </el-input>
          <el-button size="mini" type="primary" style="margin-left:55px" @click="queryList"  :disabled="isDisable">搜索</el-button>
          <el-button  style="margin-left:10px" size="mini" type="primary" v-if="item.resourceCode == 'settlement_report'"  v-for="item in authButton" :key="item.resourceId" @click.stop="getExport" :disabled="isdisable">导出</el-button>
          <a  id="isa" href="" target="_blank"></a>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="text-align: right;padding-right: 20px;">
          <el-button  type="primary" v-if="item.resourceCode == 'add'"  v-for="item in authButton" :key="item.resourceId" @click="getRedEnvelopeRuleButton">{{item.resourceDesc}}</el-button>
        </el-col>
      </el-row>
    </div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable" :data="tableData" show-summary :summary-method="getSummaries" border stripe tooltip-effect="dark" style="width: 100%">
          <el-table-column label="对账时间" show-overflow-tooltip>
            <template slot-scope="scope">
              <span> {{ scope.row.accountDate | date('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="mchId" label="商户代码" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="amount" label="应结算金额(元)" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="orderType" label="订单类型" show-overflow-tooltip>
          </el-table-column>
          <!--<el-table-column-->
            <!--v-if="authButton.length>0"-->
            <!--fixed="right"-->
            <!--label="操作"-->
            <!--show-overflow-tooltip>-->
            <!--<template slot-scope="scope">-->
              <!--<el-dropdown :hide-on-click="false">-->
                <!--<span class="el-dropdown-link">-->
                  <!--<i class="el-icon-menu"></i><i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                <!--</span>-->
                <!--<el-dropdown-menu slot="dropdown" v-if="item.resourceCode != 'add'  &&  item.resourceCode != 'query' && item.resourceType != '3'" v-for="item in authButton" :key="item.resourceId">-->
                  <!--<el-dropdown-item>{{item.resourceName}}</el-dropdown-item>-->
                <!--</el-dropdown-menu>-->
              <!--</el-dropdown>-->
            <!--</template>-->
          <!--</el-table-column>-->
        </el-table>
        <div class="table-page" >
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="searchParams.page"
                         :page-sizes="[5, 10, 15, 20 , 50]" :page-size="searchParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-header>
    </el-container>
  </div>
</template>

<script>
  import {SESSION_STOART_MENUS} from "../../utils/ConstUtils.js"
  import {SESSION_STORAGE_USER} from "../../utils/ConstUtils.js"
  import {toDataTime,buildRequestURL} from "../../../config/util.js"
  export default {
    name: "membershipManagement",
    data() {
      return {
        urlList:"",
        startTime: {
          disabledDate: time => {
            return time.getTime() > Date.now();
          }
        },
        size:0,
        isDisable:false,
        isdisable:true,
        endTime:'',
        authButton:[],
        outgoingIsOpen: true,
        tableData: [],
        myDoneappTypeList:'',
        secretOptionObject:{},
        simpleSearchValue:'',
        searchParams: {
          mchId:"",
          beginAccountDate:"",
          endAccountDate:"",
          page: 1,
          pageSize: 50,
        },
        searchParam: {
          mchId:"",
          beginAccountDate:"",
          endAccountDate:"",
          page: 1,
          pageSize: '',
        },
        accountDate:[],
        currentPage: 1,
        total:0,
      }
    },
    methods:{
      //导出
      getExport(){
        let _this = this;
        _this.searchParam.mchId = _this.searchParams.mchId;
        if(_this.accountDate && _this.accountDate.length>0){
          _this.searchParam.beginAccountDate = toDataTime(_this.accountDate[0]);
          _this.searchParam.endAccountDate = toDataTime(_this.accountDate[1]);
        }else{
          _this.searchParam.beginAccountDate ="";
          _this.searchParam.endAccountDate ="";
        }
        if(!_this.searchParam.mchId &&  !_this.searchParam.beginAccountDate && !_this.searchParam.endAccountDate){
          this.$message({
            message: "请输入搜索条件进行导出",
            type: 'info'
          });
          return
        }
        _this.searchParam.pageSize = _this.total;
        let el = document.getElementById('isa');
        el.href=buildRequestURL(_this.api.API_GATEWATE+'mango/trade/settlement/report',_this.searchParam)
        el.click();//触发打开事件
        //window.location.href=buildRequestURL(_this.api.API_GATEWATE+'mango/trade/settlement/report',_this.searchParam);
        //return false
      },
      getSummaries(param) {
        debugger
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if(column.property == 'amount'){
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
              sums[1] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return this.calc(prev,curr,'add')
                  //return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[1] = '应结算金额汇总：'+ sums[1]+'元';
              sums[2] = '总条数：'+this.size+'条';
            }
          }
        });
        return sums;
      },
      decNum(a){/*获取小数位数*/
        let r=0;
        a=a.toString();
        if(a.indexOf(".")!== -1) r=a.split(".")[1].length;
        return r;
      },
      int(a){/*去除小数点并转成数值*/
        return parseInt(a.toString().replace(".",""));
      },
      calc(a,b,type){//加减乘除
        let r,
          da=this.decNum(a),
          db=this.decNum(b),
          dsum=da+db,
          dmin=Math.min(da,db),
          dmax=Math.max(da,db);
        dsum+=dmax-dmin;
        dsum=Math.pow(10,dsum);
        dmax=Math.pow(10,dmax);
        a=this.int(a);
        b=this.int(b);
        if(da>db){
          b*=Math.pow(10,da-db);
        }else{
          a*=Math.pow(10,db-da);
        }
        switch(type){
          case "add":
            r=(a+b)/dmax;
            break;
          case "subtract":
            r=(a-b)/dmax;
            break;
          case "multiply":
            r=(a*b)/dsum;
            break;
          case "divide":
            r=a/b;
            break;
        }
        return r;
      },
      //搜索
      queryList () {
        this.searchParams.page=1;
        this.searchParams.mchId = this.searchParams.mchId;
        if(this.accountDate && this.accountDate.length>0){
          this.searchParams.beginAccountDate = toDataTime(this.accountDate[0]);
          this.searchParams.endAccountDate = toDataTime(this.accountDate[1]);
        }else{
          this.searchParams.beginAccountDate ="";
          this.searchParams.endAccountDate ="";
        }
        this.isdisable=false;
        this.init();
      },
      handleSizeChange (size) {

        this.searchParams.pageSize = size;
        this.init();
      },
      handleCurrentChange (val) {
        this.searchParams.page = val;
        this.init()
      },
      init () {
        let _this = this;
        this.isDisable = true;
        _this.$http.post(_this.api.API_GATEWATE+'mango/mchBillList',_this.searchParams,_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable = false;
            if(res && res.data && res.data.list){
              this.tableData = res.data.list;
              this.total = res.data.total || 0;
              this.size = res.data.size || 0;
              for (let i=0; i<_this.tableData.length;i++){
                _this.tableData[i].amount = _this.tableData[i].amount/100;
                if(_this.tableData[i].orderType == "RECHARGE"){
                  _this.tableData[i].orderType = "充值"
                }else if(_this.tableData[i].orderType == "ADVANCE"){
                  _this.tableData[i].orderType = "代发"
                }else if(_this.tableData[i].orderType == "WITHDRAW"){
                  _this.tableData[i].orderType = "提现"
                }else if(_this.tableData[i].orderType == "CONSUME"){
                  _this.tableData[i].orderType = "消费"
                }else if(_this.tableData[i].orderType == "REFUND"){
                  _this.tableData[i].orderType = "退款"
                }else if(_this.tableData[i].orderType == 'RED_PACKET'){
                  _this.tableData[i].orderType = "红包"
                }
              }
            }else{
              this.tableData = [];
              this.total = 0;
              this.size = res.data.size || 0;
            }
            //控制台打印请求成功时返回的数据
            //bind(this)可以不用
          }.bind(this))
          .catch(function(err){
            this.isDisable = false;
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
      let userList = sessionStorage.getItem(SESSION_STORAGE_USER);
      menuList = JSON.parse(menuList);
      this.userList = JSON.parse(userList);
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
  .settlementManag{
    .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover {
      color: #fff;
      background-color: #eeb726;
      border-color: #eeb726;
    }
  }

</style>

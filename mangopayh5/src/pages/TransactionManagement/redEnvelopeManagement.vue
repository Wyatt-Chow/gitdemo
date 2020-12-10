<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 30px">会员名:</label>
          <el-input style="width:20%" maxlength="20" size="mini"  v-model="searchParams.memberName"></el-input>
          <label style="padding-left: 50px">红包状态:</label>
          <el-select v-model="searchParams.tradeState" placeholder="请选择" size="mini" style="width:20%" >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <label style="padding-left: 50px">交易时间:</label>
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
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <label style="padding-left: 30px">手机号:</label>
          <el-input style="width:20%" maxlength="20" size="mini"  v-model="memberMobile"></el-input>
          <label style="padding-left: 36px">身份证号码:</label>
          <el-input v-model="certNo" style="width:20%" maxlength="20" size="mini"></el-input>
          <el-button size="mini" type="primary" @click="queryList" style="margin-left:3%" :disabled="isDisable">搜索</el-button>
          <el-button  style="margin-left:10px" size="mini" type="primary" v-if="item.resourceCode == 'redpacket_report'"  v-for="item in authButton" :key="item.resourceId" @click.stop="getExport" :disabled="isdisable">导出</el-button>
          <a  id="isa" href=""></a>
        </el-col>
      </el-row>
    </div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable" show-summary :summary-method="getSummaries" :data="tableData" border stripe tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="typeName" label="红包名称" show-overflow-tooltip width="200">
          </el-table-column>
          <el-table-column prop="memberName" label="会员名" show-overflow-tooltip width="100">
          </el-table-column>
          <el-table-column prop="orderId" label="订单流水号" show-overflow-tooltip width="180">
          </el-table-column>
          <el-table-column prop="certNo" label="身份证号码" show-overflow-tooltip width="160">
          </el-table-column>
          <el-table-column prop="memberMobile" label="手机号" show-overflow-tooltip width="110">
          </el-table-column>
          <!--<el-table-column prop="mchId" label="账户ID" show-overflow-tooltip width="100">
          </el-table-column>
          <el-table-column prop="mchName" label="账户名" show-overflow-tooltip>
          </el-table-column>-->
          <el-table-column prop="createDates" label="发放时间" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="expiryDatetimes" label="红包失效时间" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="amounts" label="红包金额(元)" show-overflow-tooltip width="110">
          </el-table-column>
          <el-table-column prop="mchName" label="发放渠道" show-overflow-tooltip width="260">
          </el-table-column>
          <!--<el-table-column prop="" label="摘要" show-overflow-tooltip>
          </el-table-column>-->
          <el-table-column prop="tradeState" label="状态" show-overflow-tooltip>
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
  import {toTime,toDataTime,buildRequestURL} from "../../../config/util.js"
  export default {
    name: "redEnvelopeManagement",
    data() {
      return {
        size:0,
        urlList:'',
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
        },{
          value: 'WAIT_RECEIVE',
          label: '未入账'
        }],
        totals:0,
        amount:0,
        memberMobile:'',
        certNo:'',
        starttime:[],
        tableData: [],
        authButton:[],
        searchParams: {
          certNo:'',
          memberMobile:'',
          memberName:'',
          tradeState:'',
          page: 1,
          pageSize:10,
          startDate:'',
          endDate:''
        },
        searchParam: {
          certNo:'',
          memberMobile:'',
          memberName:'',
          tradeState:'',
          page: 1,
          pageSize: '',
          startDate:'',
          endDate:''
        },
        total:0,
        startTime: {
          disabledDate: time => {
              return time.getTime() > Date.now();
          }
        },
        /* end*/
      }
    },
    methods:{
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
          sums[1] = '红包金额：';
          sums[2] = this.amount+'元';
          sums[3] = '红包笔数：';
          sums[4] = this.totals+'笔';
        });
        return sums;
      },
      //导出
      getExport(){
        this.searchParam.page=1;
        this.searchParam.memberMobile = this.memberMobile;
        this.searchParam.certNo = this.certNo;
        this.searchParam.memberName = this.searchParams.memberName;
        this.searchParam.tradeState = this.searchParams.tradeState;
        if(this.starttime && this.starttime.length>0){
          this.searchParam.startDate = toDataTime(this.starttime[0]);
          this.searchParam.endDate = toDataTime(this.starttime[1]);
        }else{
          this.searchParam.startDate ="";
          this.searchParam.endDate ="";
        }
        if(!this.searchParam.memberName && !this.searchParam.memberMobile&&!this.searchParam.certNo&&!this.searchParam.tradeState&&!this.searchParam.startDate&&!this.searchParam.endDate){
          this.$message({
            message: "请输入搜索条件进行导出",
            type: 'info'
          });
          return
      }
        let _this = this;
        _this.searchParam.pageSize = _this.total;
        //let el = document.getElementById('isa');
       // el.href=buildRequestURL(_this.api.API_GATEWATE+'mango/trade/redpacket/report',_this.searchParam)
        //el.click();//触发打开事件
        window.location.href=buildRequestURL(_this.api.API_GATEWATE+'mango/trade/redpacket/report',_this.searchParam);
        //return false
        //window.open(buildRequestURL(_this.api.API_GATEWATE+'mango/trade/redpacket/report',_this.searchParam))
      },
        //搜索
        queryList () {
          this.searchParams.page=1;
          this.searchParams.memberMobile = this.memberMobile;
          this.searchParams.certNo = this.certNo;
          this.searchParams.memberName = this.searchParams.memberName;
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
        _this.$http.post(_this.api.API_GATEWATE+'mango/getBonusList/statistics',
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
        this.$http.post(_this.api.API_GATEWATE+'mango/getBonusList',params,_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable=false;
            if(res && res.data && res.data.list){
              let tableData =res.data.list;
              tableData.forEach(e=>{
                e.createDates=toTime(e.createDate+ e.createTime);
                e.expiryDatetimes=toTime(e.expiryDatetime);
                e.amounts=e.amount/100;
                if(e.tradeState == "SUCCESS"){
                  e.tradeState = "成功"
                }else if(e.tradeState == "FAIL"){
                  e.tradeState = "失败"
                }else if(e.tradeState == "WAIT_RECEIVE"){
                  e.tradeState = "未入账"
                }
              })
              _this.tableData =  res.data.list;
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
      this.init();
      this.queryAllNum();
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

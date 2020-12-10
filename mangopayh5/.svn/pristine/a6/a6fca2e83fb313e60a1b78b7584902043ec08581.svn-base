<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 30px">客户姓名：</label>
          <el-input style="width:10%" size="mini" maxlength="20" v-model="params.custName" ></el-input>

          <label style="padding-left: 50px">授信状态：</label>
          <el-select v-model="params.status"  size="mini" style="width:20%">
            <el-option
              v-for="item in loanTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <label style="padding-left: 30px">授信日期</label>
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
      <el-header style="height: 700px;overflow:auto;">

        <el-table ref="multipleTable" :data="tableData" stripe border style="width: 100%" v-loading="isLoad">
          <el-table-column prop="customerCode" label="客户编号" show-overflow-tooltip width="90">
          </el-table-column>
          <el-table-column prop="custName" label="客户姓名" show-overflow-tooltip width="120">
          </el-table-column>
          <el-table-column prop="creatDate" label="申请日期" show-overflow-tooltip width="100">
          </el-table-column>
          <el-table-column prop="phone" label="手机号" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="amount" label="申请额度" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="statu" label="授信状态" show-overflow-tooltip>
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            v-if="false"
            show-overflow-tooltip>
            <el-button type="primary" size="mini">查看</el-button>
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
          custName : '',

          status: '',
          page: 1,
          pageSize:10,
          startTime:"",
          endTime:"",
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
          value:'1',
          label:'通过'
        },{
          value:'0',
          label:'不通过'
        },
        {
          value:'2',
          label:'处理中'
        },
          {
            value:'3',
            label:'已过期'
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

        this.param.custName = this.params.custName;
        this.params.status = this.params.status;
        if(this.startDate && this.startDate.length>0){
          this.param.startTime = toDataTime(this.startDate[0]);
          this.param.endTime = toDataTime(this.startDate[1]);
        }else{
          this.param.startTime ="";
          this.param.endTime ="";
        }
        if(!this.param.custName &&  !this.params.status && !this.param.startTime && !this.param.endTime) {
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

        if(this.startDate && this.startDate.length>0){
          this.params.startTime = toDataTime(this.startDate[0]);
          this.params.endTime = toDataTime(this.startDate[1]);
        }else{
          this.params.startTime ="";
          this.params.endTime ="";
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
        this.$http.post(_this.api.API_GATEWATE+'mango/credit/applyPage',_this.params,_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable=false;
            _this.tableData =  res.data.list;

            for(let i=0; i<_this.tableData.length;i++){

              if(_this.tableData[i].status == "1"){
                _this.tableData[i].statu = "通过"
              }else if(this.tableData[i].status == "2"){
                _this.tableData[i].statu = "处理中"
              }else if(this.tableData[i].status == "3"){
                _this.tableData[i].statu = "已过期"
              }else if(this.tableData[i].status == "0"){
                _this.tableData[i].statu = "不通过"
              }
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

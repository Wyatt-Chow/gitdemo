<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 44px">会员姓名:</label>
          <el-input style="width:20%" size="mini" v-model="name" maxlength="20"></el-input>
          <label style="padding-left: 50px" >手机号码:</label>
          <el-input style="width:20%" size="mini" v-model="bankCardMobile" maxlength="20"></el-input>
          <label style="padding-left: 50px">注册时间:</label>
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
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 30px">身份证号码:</label>
          <el-input style="width:20%" size="mini" maxlength="20" v-model="certNo"></el-input>
          <el-button type="primary"  size="mini" @click="queryList" style="margin-left:3%" :disabled="isDisable">搜索</el-button>
        </el-col>
      </el-row>
    </div>
      <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
        <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable" :data="tableData" border stripe tooltip-effect="dark" style="width:100%">
          <el-table-column label="会员id"  show-overflow-tooltip prop="memberCoreId" width="70">
          </el-table-column>
          <el-table-column prop="name" label="会员姓名" show-overflow-tooltip width="80">
          </el-table-column>
          <el-table-column prop="bankCardMobile" label="手机号码" show-overflow-tooltip width="110">
          </el-table-column>
          <el-table-column prop="certNo" label="身份证号码" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="statu" label="状态" show-overflow-tooltip width="50">
          </el-table-column>
          <el-table-column prop="date" label="注册时间" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="channelName" label="注册渠道" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="bankCardNo" label="银行卡号" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="bankName" label="银行" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="accountNo" label="电子银行账号" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            v-if="authButton.length>0"
            fixed="right"
            label="操作"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-dropdown :hide-on-click="false">
                <span class="el-dropdown-link">
                  <i class="el-icon-menu"></i><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item  @click.native="getOperating(scope.row,item)" v-if="item.resourceType != '3' && item.resourceCode != 'query'" v-for="item in authButton" :key="item.resourceId">{{item.resourceName}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>

        <div class="table-page" >
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="searchParams.page"
                         :page-sizes="[5, 10, 15, 20]" :page-size="searchParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
        </el-header>
    </el-container>
  </div>
</template>

<script>
  import {SESSION_STOART_MENUS} from "@/utils/ConstUtils.js"
  import {toTime,toDataTime} from "../../../config/util.js"
  export default {
    name: "RealNameAuthenticationInformation",
    data() {
      return {
        isDisable:false,
        authButton:[],
        tableData: [],
        name:'',
        bankCardMobile:'',
        certNo:'',
        searchParams: {
          startDate:'',
          endDate:'',
          page: 1,
          pageSize: 10,
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
    methods : {
      getOperating(val,item){
        if(item.resourceCode == 'unBund'){
          this.untyingBankCard(val);
        }
      },
      //根据会员id解绑银行卡
      untyingBankCard(val){
        let _this = this;
        if(val && val.memberCoreId){
          this.$confirm('确定要解绑'+val.name+'的电子账户?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.$http.get(_this.api.API_GATEWATE+'mango/unbindElecAccount/'+val.memberCoreId,
              _this.GLOBAL.topheaders())
              .then(function(res){
                this.init();
                if(res.data == true){
                  _this.$message({
                    type: 'success',
                    message: '解绑成功'
                  });
                  this.params.page = 1;
                }
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
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消解绑'
            });
          });
        }
      },
      //搜索
      queryList () {
        this.searchParams.page =1;
        this.searchParams.name = this.name;
        this.searchParams.certNo = this.certNo;
        this.searchParams.bankCardMobile = this.bankCardMobile;
        if(this.starttime && this.starttime.length>0){
          this.searchParams.startDate = toDataTime(this.starttime[0]);
          this.searchParams.endDate = toDataTime(this.starttime[1]);
        }else{
          this.searchParams.startDate ="";
          this.searchParams.endDate ="";
        }
        this.init();
      },
      handleSizeChange (val) {
        this.searchParams.pageSize = val;
        this.init();
      },
      handleCurrentChange (val) {
        this.searchParams.page = val;
        this.init();
      },
      init () {
        let _this = this;
        this.isDisable=true;
        this.$http.post(_this.api.API_GATEWATE+'mango/getElecAccount',this.searchParams,_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable=false;
            this.tableData =  res.data.list;
            for(let i=0; i<_this.tableData.length;i++){
              _this.tableData[i].date=toTime(_this.tableData[i].createDate+_this.tableData[i].createTime)
              if(_this.tableData[i].openAccountChannel == "CMB"){
                _this.tableData[i].channelName ="招商银行";
              }else if(_this.tableData[i].openAccountChannel == "CCB"){
                _this.tableData[i].channelName ="建设银行"
              }else if(_this.tableData[i].openAccountChannel == "CIB"){
                _this.tableData[i].channelName ="兴业银行"
              }
              if(_this.tableData[i].status == "NORMAL"){
                _this.tableData[i].statu = "正常"
              }else if(this.tableData[i].status == "CLOSED"){
                _this.tableData[i].statu = "销户"
              }else if(this.tableData[i].status == "FREEZE"){
                _this.tableData[i].statu = "冻结"
              }
            }
            this.total = res.data.total || 0;

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
      debugger
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
      this.init()
    }
  }
</script>


<style  lang="scss">
  .realNameAuthen-main {
    .el-table td, .el-table th {
      padding: 5px 0;
    }
  }

</style>

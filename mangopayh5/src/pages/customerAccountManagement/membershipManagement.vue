<!--会员管理页面-->
<template>
  <div class="main_top" >
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 44px">会员姓名:</label>
          <el-input style="width:20%;" size="mini" v-model="name" maxlength="20"></el-input>
          <label style="padding-left: 30px">手机号码:</label>
          <el-input style="width:20%" size="mini" v-model="mobile"  maxlength="20"></el-input>
          <label style="padding-left: 30px">注册时间:</label>
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
        <el-col :span="24" style="margin-bottom:20px">
          <label style="padding-left: 30px">身份证号码:</label>
          <el-input style="width:20%" size="mini" maxlength="20" v-model="idNumber"></el-input>
          <label style="padding-left: 27px">UUID:</label>
          <el-input style="width:22%" size="mini" maxlength="64" v-model="uuid" placeholder="UUID导出时无效"></el-input>
          <label style="padding-left: 55px">认证状态:</label>
            <el-select style="width:20%" size="mini" v-model="authenticationStatus">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in authenticationStatusList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          <el-button type="primary"  size="mini" @click="queryMemberList" style="margin-left: 3%;" :disabled="loading">搜索</el-button>
          <el-button  style="margin-left:10px" size="mini" type="primary" v-if="item.resourceCode == 'member_report'"  v-for="item in authButton" :key="item.resourceId" @click.stop="getExport" :disabled="isDisable">导出</el-button>
          <a  id="isa" href=""></a>
        </el-col>
      </el-row>
    </div>
    <el-container style="padding: 10px 10px;border: 2px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable" :data="tableData" stripe  :border="true" style="width: 100%" v-loading="isLoad">
          <el-table-column prop="coreId" label="会员"  show-overflow-tooltip width="70">
          </el-table-column>
          <el-table-column prop="name" label="会员姓名" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="mobile" label="手机号码" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="idNumber" label="身份证号码" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="statu" label="状态" show-overflow-tooltip width="60">
          </el-table-column>
          <el-table-column prop="authenticationStatus" label="认证状态" show-overflow-tooltip width="100">
          </el-table-column>
          <el-table-column  prop="date" label="注册时间" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="registrationMchName" label="注册渠道" show-overflow-tooltip>
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
                  <el-dropdown-item  @click.native="changeStatu(scope.row)" v-if="scope.row.statu == '冻结' && item.resourceId == 83" v-for="item in authButton" :key="item.resourceId">{{item.resourceName}}</el-dropdown-item>
                  <el-dropdown-item  @click.native="changeStatu(scope.row)" v-if="scope.row.statu == '正常' && item.resourceId == 82" v-for="item in authButton" :key="item.resourceId">{{item.resourceName}}</el-dropdown-item>
                  <el-dropdown-item  @click.native="getLog(scope.row)" v-if="item.resourceId == 141" v-for="item in authButton" :key="item.resourceId">{{item.resourceName}}</el-dropdown-item>
                  <el-dropdown-item  @click.native="getHistory(scope.row)" v-if="item.resourceId == 142" v-for="item in authButton" :key="item.resourceId">{{item.resourceName}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-page">
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="params.page"
                         :page-sizes="[5, 10, 15, 20]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-header>
    </el-container>
    <el-dialog title="用户操作记录" :visible.sync="logVisible" center width="70%">
      <el-table :data="logData" height="350" >
        <el-table-column property="createDate" label="时间" width="200"></el-table-column>
        <el-table-column property="actionDesc" label="操作" width="180"></el-table-column>
        <el-table-column property="extraData" label="备注" ></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="用户认证历史" :visible.sync="historyVisible" center width="90%">
      <el-table :data="historyData" height="350" >
        <el-table-column property="name" label="姓名" width="100"></el-table-column>
        <el-table-column property="bankCardMobile" label="手机号码" ></el-table-column>
         <el-table-column property="certNo" label="身份证号码" ></el-table-column>
        <el-table-column property="time" label="实名认证时间" width="150"></el-table-column>
        <el-table-column property="channelName" label="开户渠道"></el-table-column>
        <el-table-column property="bankCardNo" label="银行卡号"></el-table-column>
        <el-table-column property="bankName" label="银行"></el-table-column>
        <el-table-column property="accountNo" label="电子银行帐户"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<!--会员管理页面-->
<script>
  import {SESSION_STOART_MENUS} from "@/utils/ConstUtils.js"
  import {toTime,buildRequestURL,toDataTime,formatUnixtimestamp,showload} from "../../../config/util.js"
    export default {
        name: "membershipManagement",
      data() {
        return {
          isLoad:false,
          isurl:'/',
          loading:false,
          isDisable:true,
          hrefUrl:'1111',
          idNumber:'',
          mobile:'',
          name:'',
          uuid:'',
          authButton:[],
          authenticationStatus:'',
          authenticationStatusList:[
            {
              value:'CERTIFIED',
              name:'已认证'
            },
            {
              value:'UNCERTIFIED',
              name:'未认证'

            },
            {
              value:'UNBIND',
              name:'已解绑'
            }
          ],
          params: {
            authenticationStatus:'',
            page:1,
            pageSize:10,
            idNumber:"",
            mobile:"",
            name:"",
            startDate:"",
            endDate:"",
          },
          param: {
            authenticationStatus:'',
            page:1,
            pageSize:'',
            idNumber:"",
            mobile:"",
            name:"",
            startDate:"",
            endDate:"",
          },
          merchatVal:{},
          outgoingIsOpen: true,
          tableData: [],
          total:0,
          starttime:[],
          logVisible: false,
          historyVisible:false,
          logData:[],
          historyData:[],
          /* start 开始时间小于今天,结束时间不能大于开始时间 */
          startTime: {
            disabledDate: time => {
                return time.getTime() > Date.now();
            }
          },
          
        }
      },
      methods : {

        //导出
        getExport(){
          if(this.uuid){
            this.$message({
              message: "导出时UUID无效",
              type: 'info'
            });
            return
          }
          this.param.authenticationStatus = this.authenticationStatus;
          this.param.idNumber = this.idNumber;
          this.param.page =1;
          this.param.mobile = this.mobile;
          this.param.name = this.name;
         
          if(this.starttime && this.starttime.length>0){
            this.param.startDate = toDataTime(this.starttime[0]);
            this.param.endDate = toDataTime(this.starttime[1]);
          }else{
            this.param.startDate ="";
            this.param.endDate ="";
          }
          if(!this.param.idNumber && !this.param.mobile&&!this.param.name&&!this.param.startDate&&!this.param.endDate && !this.param.authenticationStatus ){
            this.$message({
              message: "请输入搜索条件进行导出",
              type: 'info'
            });
            return
          }
          this.param.pageSize = this.total;
          this.loading=true;
          if (!window.location.href.includes('10.11.51')){
            this.isurl = "/list/"
          }
          window.location.href=buildRequestURL(this.isurl+'mango/member/report',this.param);
          this.loading=false;
        },
        /*clickExport(){
          this.loading=true;
          this.$confirm('确定导出吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (!window.location.href.includes('10.11.51')){
                this.isurl = "/list/"
            }
            window.location.href=buildRequestURL(this.isurl+'mango/member/report',this.param);
            this.loading=false
          }).catch(() => {
            this.loading=false
            this.$message({
              type: 'info',
              message: '已取消导出'
            });
          });*/
        //获取操作日志
        getLog (val) {
          let _this = this;
          _this.logVisible = true;
          let params = {
            page:1,
            pageSize:999,
            userCoreId: val.coreId
          }
          this.$http.post(_this.api.API_GATEWATE+'mango/userTracksList',params,_this.GLOBAL.topheaders())
          .then(function(res) {
            _this.logData = res.body.list;
            _this.logData.forEach(e =>{
              e.createDate = formatUnixtimestamp(e.createDate)
            })
          }).catch(function(err){
            this.loading = false;
            if(err && err.data && err.data.key == "400300"){
                this.$router.push({ path: "/login" });
            }
            _this.$message({
            message: err.data.msg,
            type: 'error'
            });
                //bind(this)可以不用
          }.bind(this))
        },
        //获取实名历史
        getHistory (val) {
          let _this = this;
          _this.historyVisible = true;
          let params = {
            page:1,
            pageSize:999,
            memberCoreId: val.coreId
          }
          this.$http.post(_this.api.API_GATEWATE+'mango/getElecAccountHistory',params,_this.GLOBAL.topheaders())
          .then(function(res) {
            console.log(res.body.list)
            res.body.list.forEach(e =>{
              e.time = toTime(e.createDate+e.createTime)
              if(e.openAccountChannel == "CMB"){
                e.channelName ="招商银行";
              }else if(e.openAccountChannel == "CCB"){
                e.channelName ="建设银行"
              }else if(e.openAccountChannel == "CIB"){
                e.channelName ="兴业银行"
              }
            })
           
            _this.historyData = res.body.list;
          })
          .catch(function(err){
            this.loading = false;
            if(err && err.data && err.data.key == "400300"){
                this.$router.push({ path: "/login" });
            }
            _this.$message({
            message: err.data.msg,
            type: 'error'
            });
                //bind(this)可以不用
          }.bind(this))
        },
        //搜索
        queryMemberList () {
            this.params.idNumber = this.idNumber;
            this.params.page =1;
            this.params.mobile = this.mobile;
            this.params.name = this.name;
            this.params.authenticationStatus = this.authenticationStatus;
            this.params.uuid = this.uuid;
          if(this.starttime && this.starttime.length>0){
            this.params.startDate = toDataTime(this.starttime[0]);
            this.params.endDate = toDataTime(this.starttime[1]);
          }else{
            this.params.startDate ="";
            this.params.endDate ="";
          }
          this.isDisable=false;
          this.init();
        },
        handleSizeChange (size) {
         this.params.pageSize = size;
         this.init();
        },
        handleCurrentChange (val) {
          this.params.page = val;
          this.init()
        },
        changeStatu(val){
          
          let _this = this;
          if(val && val.coreId){
            if(!val.name){
              val.name = "";
            }
            let act = "";
            let infoName="";
            if(val.statu == "正常"){
              act = "mango/disabledAccount/";
              infoName = "冻结";
            }else{
              act = "mango/enableAccount/";
              infoName = "激活";
            }
            this.$confirm('确定要'+infoName+'【'+val.name+'】吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.loading=true;
              _this.$http.get(_this.api.API_GATEWATE+act+val.coreId,_this.GLOBAL.topheaders())
                .then(function(res){
                  this.loading=false
                  if(res && res.data){
                    _this.init();
                    console.log(res.data)
                    _this.$message({
                      message: '成功',
                      type: 'success'
                    });
                  }
                  //控制台打印请求成功时返回的数据
                  //bind(this)可以不用
                }.bind(this))
                .catch(function(err){
                  if(err && err.data && err.data.key == "400300"){
                    _this.$router.push({ path: "/login" });
                  }
                  _this.$message({
                    message: err.body.msg,
                    type: 'error'
                  });
                  //bind(this)可以不用
                }.bind(this))
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'+infoName
              });
            });
          }
        },
        init () {
            let _this = this;
            this.loading = true;
            this.$http.post(_this.api.API_GATEWATE+'mango/getMemberList',_this.params,_this.GLOBAL.topheaders())
              .then(function(res){
                this.loading = false;
                this.isLoad = true;
                setTimeout(() => {this.isLoad = false;}, 1000);
                if(res && res.data && res.data.list && res.data.list.length>0){
                  console.log(res.data.list)
                  this.tableData =  res.data.list;
                  for(let i=0; i<_this.tableData.length;i++){
                    _this.tableData[i].date=toTime(_this.tableData[i].createDate+_this.tableData[i].createTime);
                    if(_this.tableData[i].status == "NORMAL"){
                      _this.tableData[i].statu = "正常"
                    }else if(this.tableData[i].status == "DISABLE"){
                      _this.tableData[i].statu = "冻结"
                    }
                    switch(_this.tableData[i].authenticationStatus){
                      case 'CERTIFIED':
                        _this.tableData[i].authenticationStatus = '已认证'
                        break
                      case 'UNCERTIFIED':
                         _this.tableData[i].authenticationStatus = '未认证'
                         break
                      case 'UNBIND' :
                        _this.tableData[i].authenticationStatus = '已解绑'
                        break
                    }
                  }
                  this.total = res.data.total || 0;
                }else{
                  this.tableData =  [];
                  this.total =  0;
                }
                //控制台打印请求成功时返回的数据
                //bind(this)可以不用
              }.bind(this))
              .catch(function(err){
                this.loading = false;
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
          console.log(this.authButton)
        }
        this.init()
      }
    }
</script>


<style  lang="scss">

  /** 列表表格样式*/
  /**!*/
  .membershipMana-main {

  }


</style>

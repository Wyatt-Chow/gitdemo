
<template>
  <div class="main_top" >
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">

          <label style="padding-left: 44px">用户姓名:</label>
          <el-input style="width:20%;" size="mini" v-model="name" maxlength="20"></el-input>
          <!-- <label style="padding-left: 30px">用户:</label>
          <el-input style="width:20%" size="mini" v-model="phone"  maxlength="20" placeholder="用户手机号码"></el-input>
          <label style="padding-left: 30px">注册时间:</label>
          <el-date-picker
            style="width:22%"
            size="mini"
            v-model="addtime"
            type="date"
            :picker-options="startTime"
            value-format="yyyyMMdd"
          >
          </el-date-picker> -->



          <el-button type="primary"  size="mini" @click="queryMemberList" style="margin-left: 3%;" :disabled="loading">搜索</el-button>
          <!-- <el-button  style="margin-left:10px" size="mini" type="primary" @click.stop="getExport" :disabled="isDisable">导出</el-button>
          <a  id="isa" href=""></a> -->
        </el-col>
      </el-row>
    </div>
    <el-container style="padding: 10px 10px;border: 2px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable" :data="tableData" stripe  :border="true" style="width: 100%" v-loading="isLoad">
          <el-table-column prop="id" label="用户ID"  show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="name" label="会员姓名" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="phone" label="手机号码" show-overflow-tooltip >
          </el-table-column>
          <!-- <el-table-column prop="userLevel" label="会员等级" show-overflow-tooltip width="150">
          </el-table-column> -->
          <el-table-column prop="creditAmount" label="贷款金额" show-overflow-tooltip >
          </el-table-column>
          <!-- <el-table-column prop="creditNumber" label="贷款笔数" show-overflow-tooltip >
          </el-table-column> -->
          <el-table-column prop="cardId" label="身份证号" show-overflow-tooltip >
          </el-table-column>
         <!--  <el-table-column  prop="creditRemain" label="剩余贷还" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="statu" label="启用状态" show-overflow-tooltip>
          </el-table-column> -->
          <el-table-column
            v-if="false"
            fixed="right"
            label="操作"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-dropdown :hide-on-click="false">
                <span class="el-dropdown-link">
                  <i class="el-icon-menu"></i><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item  @click.native="view(scope.row)" >查看</el-dropdown-item>
                  <el-dropdown-item  @click.native="del(scope.row)" >删除</el-dropdown-item>

                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-page">
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="params.page"
                         :page-sizes="[10]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-header>
    </el-container>

  </div>
</template>

<script>
  import {SESSION_STOART_MENUS} from "@/utils/ConstUtils.js"
  import {toTime,buildRequestURL,toDataTime,formatUnixtimestamp,showload} from "../../../config/util.js"
    export default {
      name: "ProCustomer",
      data() {
        return {
          isLoad:false,
          isurl:'/',
          loading:false,
          isDisable:true,
          hrefUrl:'1111',

          phone:'',
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

            page:1,
            pageSize:10,


            name:"",

          },
          param: {

            page:1,
            pageSize:'',


            name:"",

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
          addtime:'',
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


          if(/^1[3456789]\d{9}$/.test(this.phone.toString())){
            this.param.phone = this.phone ;
          }else{
            this.param.memberCoreId = this.phone;
          }
          this.param.page =1;

          this.param.name = this.name;

          this.param.addtime = this.addtime;
          if( !this.param.phone&&!this.param.name&&!this.param.addtime&&!this.param.memberCoreId){
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

        //查看详情
        view(val){
          this.$router.push({ name: 'customerDetails', params: { coupons: val }})
        },
        //删除
        del(val){
          console.log(val)
        },

        //搜索
        queryMemberList () {

            this.params.page =1;


            this.params.name = this.name;



          this.isDisable=false;
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

        init () {
            let _this = this;
            this.loading = true;
            this.$http.post(_this.api.API_GATEWATE+'mango/credit/customerList',_this.params,_this.GLOBAL.topheaders())
              .then(function(res){
                console.log(1)
                this.loading = false;
                this.isLoad = true;
                setTimeout(() => {this.isLoad = false;}, 1000);
                if(res && res.data && res.data.list && res.data.list.length>0){
                  console.log(res.data.list)
                  this.tableData =  res.data.list;
                  // for(let i=0; i<_this.tableData.length;i++){
                  //   _this.tableData[i].date=toTime(_this.tableData[i].createDate+_this.tableData[i].createTime);
                  //   if(_this.tableData[i].status == "ENABLE"){
                  //     _this.tableData[i].statu = "已启用"
                  //   }else if(this.tableData[i].status == "DISABLE"){
                  //     _this.tableData[i].statu = "未启用"
                  //   }
                  //   switch(_this.tableData[i].authenticationStatus){
                  //     case 'CERTIFIED':
                  //       _this.tableData[i].authenticationStatus = '已认证'
                  //       break
                  //     case 'UNCERTIFIED':
                  //        _this.tableData[i].authenticationStatus = '未认证'
                  //        break
                  //     case 'UNBIND' :
                  //       _this.tableData[i].authenticationStatus = '已解绑'
                  //       break
                  //   }
                  // }
                  console.log(5)
                  console.log(res.data.total)
                  this.total = res.data.total || 0;
                  // console.log(res.data.total)
                }else{
                  console.log(3)
                  this.tableData =  [];
                  this.total =  0;
                }
                //控制台打印请求成功时返回的数据
                //bind(this)可以不用
              }.bind(this))
              .catch(function(err){
                console.log(2)
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


</style>

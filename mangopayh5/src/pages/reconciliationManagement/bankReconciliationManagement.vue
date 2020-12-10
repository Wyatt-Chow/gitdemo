<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 30px">对账时间:</label>
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
         <!-- <label style="padding-left: 50px">业务类型:</label>
          <template>
            <el-select v-model="value" placeholder="请选择" size="mini" style="width: 20%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>-->
         <!-- <label style="padding-left: 50px">状态:</label>
          <el-select v-model="value"  placeholder="请选择" size="mini" style="width:20%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>-->
          <el-button size="mini" type="primary" @click="queryBankList" style="margin-left:5%" :disabled="isDisable">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable" :data="tableData" border stripe tooltip-effect="dark" style="width: 100%">
          <el-table-column label="对账时间"  show-overflow-tooltip>
            <template slot-scope="scope">
              <span> {{ scope.row.accountDate | date('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="mchId" label="商户id" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="fileName" label="文件名" show-overflow-tooltip>
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
                  <el-dropdown-item  @click.native="getButton(scope.row,item)" v-if="item.resourceCode != 'add'&& scope.row.state == 'NORMAL'" v-for="item in authButton" :key="item.resourceId">{{item.resourceName}}</el-dropdown-item>
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
  import {toDataTime} from "../../../config/util.js"
  export default {
    name: "membershipManagement",
    data() {
      return {
        isDisable:false,
        accountDate:'',
        authButton:[],
        outgoingIsOpen: true,
        tableData: [],
        startDate:[],
        searchParams: {
          page: 1,
          pageSize: 10,
        },
        total:0,
        value: '',
        /* start 开始时间小于今天,结束时间不能大于开始时间 */
        startTime: {
          disabledDate: time => {
            return time.getTime() > Date.now();
          }
        },
        /* end*/
      }
    },
    methods :{
      queryBankList(){
        this.searchParams.page=1;
        if(this.startDate && this.startDate.length>0){
          this.searchParams.startDate = toDataTime(this.startDate[0]);
          this.searchParams.endDate = toDataTime(this.startDate[1]);
        }else{
          this.searchParams.startDate ="";
          this.searchParams.endDate ="";
        }
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
        this.isDisable=true;
        this.$http.post(_this.api.API_GATEWATE+'mango/billList',_this.searchParams,_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable=false;
            if(res && res.data && res.data.list){
              this.tableData =  res.data.list;
              for(let i=0; i<_this.tableData.length;i++){
                if(_this.tableData[i].status == "NORMAL"){
                  _this.tableData[i].statu = "正常"
                }else if(this.tableData[i].status == "CLOSED"){
                  _this.tableData[i].statu = "销户"
                }else if(this.tableData[i].status == "FREEZE"){
                  _this.tableData[i].statu = "冻结"
                }
              }
              this.total = res.data.total || 0;
            }else{
              this.tableData =  [];
              this.total = 0;
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
              message: err.body.msg,
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
      }
      this.init()
    }
  }
</script>


<style  lang="scss">
</style>

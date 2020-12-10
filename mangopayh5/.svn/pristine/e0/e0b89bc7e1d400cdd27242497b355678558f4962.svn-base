<template>
  <el-container style="padding: 10px 24px;border: 1px solid #ebebeb; border-radius: 4px;">
    <el-header class="operator-content" style="height:100%;">
    </el-header>
    <el-row>
      <el-col :span="24">
        <el-steps :active="intCurrent" finish-status="success">
          <el-step title="准备对账环境"></el-step>
          <el-step title="下载对账文件"></el-step>
          <el-step title="对账"></el-step>
          <el-step title="对账复核"></el-step>
          <el-step title="生成对账文件"></el-step>
          <el-step title="清理临时数据"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-alert
          v-show="remark"
          title="提示"
          type="warning"
          :description="remark">
        </el-alert>
      </el-col>
    </el-row>
    <el-row class="myDoneTable-main">
      <el-col :span="24" style="text-align: right;margin-bottom: 20px">
        <el-button  type="primary" v-if="item.resourceCode == 'auth_add'"  v-for="item in authButton" :key="item.resourceId" @click="getaddRole">{{item.resourceDesc}}</el-button>
      </el-col>
      <el-table ref="multipleTable" :data="tableData" stripe border tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="nodeId" label="服务节点"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="onlines" label="是否在线" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="currentSteps" label="当前任务" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="hasErrors" label="是否完成" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="currentResult" label="当前结果" show-overflow-tooltip>
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
                <el-dropdown-item  @click.native="getRoleButton(scope.row,item)" v-if="item.resourceCode != 'auth_add'"  v-for="item in authButton" :key="item.resourceId">{{item.resourceName}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-container>
</template>

<script>
  import {SESSION_STOART_MENUS} from "../../utils/ConstUtils.js"
  export default {
    name: "serviceNodeManagement",
    data() {
      return {
        remark:'',
        intCurrent:0,
        authButton:[],
        tableData: [],
        multipleSelection: [],
        simpleSearchValue:'',
        searchParams: {
          page: 1,
          pageSize: 10,
        },
        currentPage: 1,
        total:0,
      }
    },
    methods : {
      //获取按钮方法
      getRoleButton (val,item) {

      },
      getCheckedNodes(roleList) {
      },
      handleSizeChange (val) {
        this.searchParams = val;
      },
      handleCurrentChange (val) {
        this.searchParams = val;
      },
      //查询任务状态
      queryTaskStatus () {

        //let _this = this;

        console.log(this)
      },
      init () {

        let _this = this;
        _this.$http.post(_this.api.API_GATEWATE+'mango/taskNodeList',_this.searchParams,_this.GLOBAL.topheaders())
          .then(function(res){
            console.log(res.data)
            let tableData =  res.data;
            tableData.forEach(e =>{
              if(e.hasError == true){
                e.hasErrors = "是"
              }
              if(e.hasError == false){
                e.hasErrors = "否"
              }
              if(e.online == true){
                e.onlines = "是"
              }
              if(e.online == false){
                e.onlines = "否"
              }
              if(e.currentStep == "S_STEP1"){
                e.currentSteps = "准备对账环境";
              }
              if(e.currentStep == "S_STEP2"){
                e.currentSteps = "下载对账文件";
              }
              if(e.currentStep == "S_STEP3"){
                e.currentSteps = "对账";
              }
              if(e.currentStep == "S_STEP4"){
                e.currentSteps = "对账复核";
              }
              if(e.currentStep == "S_STEP5"){
                e.currentSteps = "生成对账文件";
              }
              if(e.currentStep == "S_STEP6"){
                e.currentSteps = "清理临时数据";
              }
              _this.tableData.push(e)
            })
            let currentStep = _this.tableData[_this.tableData.length-1].currentStep
            this.intCurrent = parseInt(currentStep.charAt(currentStep.length - 1));
            _this.$http.get(_this.api.API_GATEWATE+'mango/taskStatusList',_this.GLOBAL.topheaders())
              .then(function(res){

                console.log(res.data)
                let tableDatas =  res.data;
                if(tableDatas.remark){
                  this.remark = tableDatas.remark;
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
          }.bind(this))
          .catch(function(err){
            if(err.data && err.data.msg) {
              console.log(err.data.msg)
              _this.$message({
                message: err.data.msg,
                type: 'error'
              });
              //控制台打印错误返回的内容
            }else{
              _this.$message({
                message: err.data.message,
                type: 'error'
              });
            }
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
      this.init();
      //this.queryTaskStatus();
    }
  }
</script>

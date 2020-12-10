<template>
  <div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable" :default-sort = "{prop: 'id', order: 'ascending'}" :data="tableData" border stripe tooltip-effect="dark" style="width: 100%">
          <el-table-column label="序号" sortable  show-overflow-tooltip prop="id" width="80">
          </el-table-column>
          <el-table-column label="广告名称"  show-overflow-tooltip prop="name" width="100">
          </el-table-column>
          <el-table-column label="广告类型"  show-overflow-tooltip prop="adTypess" width="100">
          </el-table-column>
          <el-table-column prop="imageUrl" label="图片地址" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="sourceUrl" label="资源地址" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="orderIdx" sortable label="优先级" show-overflow-tooltip width="100">
          </el-table-column>
          <el-table-column prop="bannerStatu" label="状态" width="100" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="description" label="简介" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="loadStyleName" label="加载方式" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="osPlatforms" label="发布客户端" show-overflow-tooltip width="110">
          </el-table-column>
          <el-table-column label="上架时间" show-overflow-tooltip>
            <template slot-scope="scope">
              <span> {{ scope.row.upTime | date('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="下架时间" show-overflow-tooltip>
            <template slot-scope="scope">
              <span> {{ scope.row.downTime | date('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="checkStatu" label="审核状态" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="crtOperName" label="创建用户名称" show-overflow-tooltip width="120">
          </el-table-column>
          <el-table-column  label="创建时间" show-overflow-tooltip>
            <template slot-scope="scope">
              <span> {{ scope.row.crtTime | date('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="checkOperName" label="审核用户名称" show-overflow-tooltip width="120">
          </el-table-column>
          <el-table-column prop="checkTime" label="审核时间" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.checkTime | date('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="checkOpinion" label="审核意见" show-overflow-tooltip>
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
                  <el-dropdown-item  @click.native="getOperating(scope.row,item)" v-if="item.resourceCode != 'banner_create' && item.resourceCode != 'banner_allValid_query' && item.resourceCode != 'auth_query' && item.resourceType != '3'" v-for="item in authButton" :key="item.resourceId">{{item.resourceName}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-page" >
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="params.page"
           :page-sizes="[5, 10, 15, 20]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-header>
    </el-container>
    <el-dialog
      title="审核广告"
      :visible.sync="bannerReviews"
      width="40%"
      :before-close="handleClose">
      <el-form ref="bannerReview" :rules="rules" :model="bannerReview" label-width="120px">
        <el-form-item label="审核状态" prop="checkStatus">
          <template>
            <el-radio v-model="bannerReview.checkStatus" label="PASS">通过</el-radio>
            <el-radio v-model="bannerReview.checkStatus" label="REJECT">拒绝</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="审核意见" prop="checkOpinion">
          <el-input v-model="bannerReview.checkOpinion" maxlength="100" size="mini"  style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="addOperator('bannerReview')" :disabled="isDisable">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import {SESSION_STOART_MENUS} from "../../utils/ConstUtils.js"
  import {SESSION_STORAGE_USER} from "../../utils/ConstUtils.js"
  export default {
    name: "bannerReviewManagement",
    data() {
      return {
        isDisable:false,
        roleList: [],
        bannerReviews:false,
        bannerReview:{
          id:'',
          checkOperId:'',
          checkStatus:'',
          checkOperName:'',
          checkOpinion:'',
        },
        tableDatas:'',
        authButton:[],
        userList:'',
        tableData: [],
        params:{
          page:1,
          pageSize:10
        },
        total:0,
        rules: {
          checkStatus: [
            {required: true, message: '请选择审核状态', trigger: 'blur'},
          ],
          checkOpinion: [
            {required: true, message: '审核意见不能为空', trigger: 'blur'},
          ],
        },
      }
    },
    methods : {
      //清除验证
      clearVail(){
        this.bannerReview={
        };
        this.bannerReview.roles=[];
        this.$refs['bannerReview'].clearValidate();
      },
      handleClose() {
        this.clearVail();
        this.bannerReviews = false;
      },
      addOperator (bannerReview) {
        debugger
        console.log(bannerReview)
        this.$refs[bannerReview].validate((valid) => {
          if (valid) {
            let _this = this;
            this.isDisable=true;
            _this.$http.get(_this.api.API_GATEWATE + 'mango/banner/auditBanner?id='+_this.bannerReview.id+'&checkOperId='+_this.userList.userId
              +'&checkOperName='+_this.userList.userName+'&checkStatus='+_this.bannerReview.checkStatus+'&checkOpinion='+_this.bannerReview.checkOpinion,
              _this.GLOBAL.topheaders())
              .then(function (res) {
                this.isDisable=false;
                console.log(res.data)
                if(res.data){
                  _this.$message({
                    message: "审核成功",
                    type: 'success'
                  });
                  this.init();
                  _this.bannerReviews= false;
                }
                //控制台打印请求成功时返回的数据
                //bind(this)可以不用
              }.bind(this))
              .catch(function (err) {
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
          }
        })
        console.log(this)
      },
      //获取按钮方法
      getOperating (val,item) {
        debugger
        if(val.id){
          this.bannerReview.id = val.id;
        }
        let _this = this;
        this.tableDatas = val;
        if(item.resourceCode == "banner_audit"){
          _this.bannerReviews = true;
        }
      },
      handleSizeChange (val) {
        this.params.pageSize = val;
        this.init();
      },
      handleCurrentChange (val) {
        this.params.page = val;
        this.init();
      },
      init () {
        let _this = this;
        _this.$http.get(_this.api.API_GATEWATE+'mango/banner/bannerList/waitAudit?page='+_this.params.page+'&pageSize='+_this.params.pageSize,_this.GLOBAL.topheaders())
          .then(function(res){
            let tableData = [];
            if(res && res.data && res.data.list &&  res.data.list.length>0){
              tableData =  res.data.list;
              tableData.forEach(e =>{
                if(e.loadStyle == "JUMP_PAGE"){
                  e.loadStyleName = "页面跳转";
                }else if(e.loadStyle == "POPUP"){
                  e.loadStyleName = "弹窗";
                }else{
                  e.loadStyleName = e.loadStyle
                }
                if(e.adTypes =='BANNER_ADS'){
                  e.adTypess= '广告条'
                }else if(e.adTypes =='POPUP_ADS'){
                   e.adTypess = '弹窗广告'
                }
                if(e.bannerStatus == "WAIT_AUDIT"){
                  e.bannerStatu = "待审核"
                }else if(e.bannerStatus == "ON_SHELVES"){
                  e.bannerStatu = "已上架"
                }else if(e.bannerStatus == "OFF_SHELF"){
                  e.bannerStatu = "已下架"
                }else if(e.bannerStatus == "REJECT"){
                  e.bannerStatu = "已拒绝"
                }else{
                  e.bannerStatu = e.bannerStatus
                }
                if(e.osPlatform == "ALL"){
                  e.osPlatforms = "所有"
                }else if(e.osPlatform == "ANDROID"){
                  e.osPlatforms = "安卓"
                }else if(e.osPlatform == "IOS"){
                  e.osPlatforms = "苹果"
                }else{
                  e.osPlatforms = e.osPlatform
                }
                if(e.checkStatus == "PASS"){
                  e.checkStatu = "通过"
                }else if(e.checkStatus == "REJECT"){
                  e.checkStatu = "拒绝"
                }else{
                  e.checkStatu=e.checkStatus;
                }
              })
              _this.tableData = tableData;
              _this.total = res.data.total || 0;
            }else{
              _this.tableData = tableData;
              _this.total = res.data.total || 0;
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
        console.log(this)
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

</style>

<template>
  <div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
      <div class="main_top_01">
        <el-row style="margin-bottom:20px">
          <el-col :span="24">
            <label style="padding-left: 28px">广告名称:</label>
            <el-input style="width:20%;" size="mini" v-model="searchParams.name" maxlength="20"></el-input>
            <label style="padding-left: 30px">状态:</label>
            <el-select style="width:20%" size="mini" v-model="searchParams.bannerStatus">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in bannerStatusList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            <label style="padding-left: 50px">有效时间:</label>
            <el-date-picker
              style="width:25%"
              size="mini"
              v-model="searchParams.creDate"
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
            <label style="padding-left: 24px">审核状态:</label>
            <el-select style="width:20%" size="mini" v-model="searchParams.checkStatus">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in checkStatusList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button type="primary"  size="mini" @click="queryBannerList" style="margin-left: 3%;" :disabled="isDisable">搜索</el-button>
            <el-button style="float: right; padding-right: 20px;"  type="primary" v-if="authButton.some(e=>{return e.resourceCode == 'banner_create'})" 
            @click="getOperatorButton">新建广告</el-button>
          </el-col>
        </el-row>
      </div>
        <el-table ref="multipleTable" :default-sort = "{prop: 'id', order: 'ascending'}" :data="tableData" border stripe tooltip-effect="dark" style="width: 100%">
          <el-table-column label="序号"   show-overflow-tooltip prop="id" width="80">
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
              <span> {{ scope.row.checkTime | date('YYYY-MM-DD HH:mm:ss')}}</span>
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
                  <el-dropdown-item  @click.native="getOperating(scope.row,item)" v-if="scope.row.bannerStatu != 'ON_SHELVES' &&  item.resourceCode != 'banner_create' && item.resourceCode != 'banner_query' && item.resourceCode != 'auth_query' && item.resourceType != '3'" v-for="item in authButton" :key="item.resourceId">{{item.resourceName}}</el-dropdown-item>
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
      :title="title"
      :visible.sync="banner"
      width="40%"
      :before-close="handleClose">
      <el-form ref="banners" :rules="rules" :model="banners" label-width="120px">
        <el-form-item label="广告名称:" prop="name">
          <el-input v-model="banners.name" maxlength="500" size="mini" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="广告类型:" prop="adTypes">
          <el-select v-model="banners.adTypes" placeholder="请选择" size="mini" style="width: 80%">
            <el-option
              v-for="item in [{value:'BANNER_ADS',name:'广告条'},{value:'POPUP_ADS',name:'弹窗广告'}]"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片地址:" prop="imageUrl">
          <el-upload
            class="upload-demo"
            ref="uploadPhoto"
            :action="action"
            :limit="1"
            :show-file-list="true"
            :file-list="fileList"
            :on-success="uploadSuccess"
            :on-preview="download"
            :on-error="uploadError"
            :before-upload="openUploadBefore">
            <el-button slot="trigger" size="mini" type="danger" class="uploadBtn" @click="uploadPhoto">上传图片</el-button>
            <div class="uploadFile-remark">*支持jpg、jpeg、png、gif文件，文件小于1M</div>
          </el-upload>
          <el-input v-model="banners.imageUrl" v-show="fileisShow" type="hidden"  size="mini"  style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="资源地址:" prop="sourceUrl">
          <el-input v-model="banners.sourceUrl" size="mini" maxlength="9999" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="上架时间:" prop="upTime">
          <el-date-picker
            style="width: 80%"
            size="mini"
            v-model="banners.upTime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="00:00:00"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="下架时间:" prop="downTime">
          <el-date-picker
            style="width: 80%"
            size="mini"
            v-model="banners.downTime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="23:59:59"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="优先级:" prop="orderIdx">
          <el-input v-model="banners.orderIdx" maxlength="20" size="mini"  style="width: 80%" placeholder="数值越大优先级越高"></el-input>
        </el-form-item>
        <el-form-item label="简介:" prop="description">
          <el-input v-model="banners.description" maxlength="999" size="mini"  style="width: 80%"></el-input>
        </el-form-item>
       
        <el-form-item label="加载方式" prop="loadStyle">
          <el-radio-group v-model="banners.loadStyle">
            <el-radio label="POPUP">弹窗</el-radio>
            <el-radio label="JUMP_PAGE">页面跳转</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发布客户端:" prop="osPlatform">
          <el-select v-model="banners.osPlatform" placeholder="请选择" size="mini" style="width: 80%">
            <el-option
              v-for="item in osPlatforms"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="addtoUpdate('banners')" :disabled="isDisable">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>

  import {formatUnixtimestamp,buildRequestURL,toDataTime} from '../../../config/util'
  import {num} from '../../../config/validate'
  import {SESSION_STOART_MENUS} from "../../utils/ConstUtils.js"
  import {SESSION_STORAGE_USER} from "../../utils/ConstUtils.js"
  let nums=(rule, value,callback)=>{

    if (value!=0 && !value){
      callback(new Error('优先级不能为空'))
    }else  if  (!num(value)){
      callback(new Error('请输入整数!'))
    }else {
      callback()
    }
  }
  export default {
    name: "bannerManagement",
    data() {
      return {
        startTime: {
          disabledDate: time => {
            return time.getTime() > Date.now();
          }
        },
       
        checkStatusList:[{
          value:"PASS",
          name:"通过"
        },{
          value:"REJECT",
          name:"拒绝"
        }],
        bannerStatusList:[{
          value:"WAIT_AUDIT",
          name:"待审核"
        },{
          value:"ON_SHELVES",
          name:"已上架"
        },{
          value:"OFF_SHELF",
          name:"已下架"
        },
        {
          value:"REJECT",
          name:"已拒绝"
        }],
        osPlatforms:[{
          value:"ALL",
          name:"所有"
        },
        {
          value:"ANDROID",
          name:"安卓"
        },
        {
          value:"IOS",
          name:"苹果"
        }],
        fileisShow:false,
        uploadData:{
          uploadFile:'',
        },
        action:this.api.API_GATEWATE+'mango/privateupload',
        title:"",
        banner:false,
        isDisable:false,
        fileList:[],
        banners:{
          imageUrl:'',
          sourceUrl:'',
          name:'',
          upTime:'',
          downTime:'',
          orderIdx:'',
          description:'',
          loadStyle: 'POPUP',
          osPlatform:''
        },
        tableDatas:'',
        authButton:[],
        userList:'',
        tableData: [],
        searchParams: {
          osPlatform:"",
          name:"",
          creDate:[],
          bannerStatus:"",
          checkStatus:""
        },
        params:{
          page:1,
          pageSize:10,
          osPlatform:"",
          name:"",
          beginDate:"",
          endDate:"",
          bannerStatus:"",
          checkStatus:""
        },
        total:0,
        rules: {
          name: [
            {required: true, message: '广告名称不能为空', trigger: 'blur'},
          ],
            imageUrl: [
            {required: true, message: '图片地址不能为空', trigger: 'change click'},
          ],
            sourceUrl: [
            {required: true, message: '资源地址不能为空', trigger: 'blur'},
          ],
            upTime: [
            {required: true, message: '上架时间不能为空', trigger: 'blur'},
          ],
            downTime: [
            {required: true, message: '下架时间不能为空', trigger: 'blur'},
          ],
            orderIdx: [
              {required: true,trigger: 'blur',validator:nums}
          ],
            description: [
            {required: true, message: '简介不能为空', trigger: 'blur'},
          ],
            loadStyle: [
            {required: true, message: '请选择加载方式', trigger: 'change'},
          ],
           /*  osPlatform: [
            {required: true, message: '发布客户端不能为空', trigger: 'change'},
          ], */
          file:[
            {required: true, message: '请点击上传图片', trigger: 'blur'},
          ],
        },
      }
    },
    methods : {
      //搜索
      queryBannerList(){
        
        this.params.osPlatform = this.searchParams.osPlatform;
        this.params.page =1;
        this.params.checkStatus = this.searchParams.checkStatus;
        this.params.bannerStatus = this.searchParams.bannerStatus;
        this.params.name = this.searchParams.name;
        if(this.searchParams.creDate && this.searchParams.creDate.length>0){
          this.params.beginDate = toDataTime(this.searchParams.creDate[0]);
          this.params.endDate = toDataTime(this.searchParams.creDate[1]);
        }else{
          this.params.beginDate ="";
          this.params.endDate ="";
        }
        this.init();
      },
      uploadPhoto (){
        this.$refs.uploadPhoto.submit();
      },
      //上传之前
      openUploadBefore(file){
        debugger
        //file = file.name.substring(0,file.name.indexOf("."));
        const nameArr = file.name.split('.');
        const extension = nameArr[nameArr.length - 1].toLowerCase() === 'jpg'
        const extension2 = nameArr[nameArr.length - 1].toLowerCase() === 'jpeg'
        const extension3 = nameArr[nameArr.length - 1].toLowerCase() === 'png'
        const extension4 = nameArr[nameArr.length - 1].toLowerCase() === 'gif'
        const extension5 = nameArr[nameArr.length - 1].toLowerCase() === 'bmp'
        const isLt2M = file.size / 1024 / 1024 < 1
        if (!extension && !extension2 && !extension3 && !extension4 && !extension5) {
          this.$message.error('上传头像只支持jpg、jpeg、png、gif、bmp文件，文件小于1M!')
        }
        if (!isLt2M) {
          this.$message.error('上传失败，上传文件大小不能超过1M')
        }
        return (extension || extension2 || extension3 || extension4 || extension5) && isLt2M
      },
      //点击文件列表中已上传的文件时的钩子
      download (file){
        debugger
        window.open(file.url ? file.url : this.api.API_GATEWATE+'mango/static/'+file.response.msg);
      },
      // 上传成功后的回调
      uploadSuccess (response, file, fileList) {
        debugger
        if(response.key == "000000"){
          file.name = response.msg;
          this.banners.imageUrl = response.msg;
          this.$message({
            message: "上传成功",
            type: 'success'
          });
        }else{
          this.$message({
            message: "上传失败",
            type: 'error'
          });
        }
      },
      // 上传错误
      uploadError (response, file, fileList) {
        console.log('上传失败，请重试！')
      },
      //清除验证
      clearVail(){
        this.banners={
        };
        this.banners.roles=[];
        this.$refs['banners'].clearValidate();
      },
      getOperatorButton (){
        console.log(this.banners)
        this.title="广告新增";
        this.fileList=[];
        this.banner = true;
        this.banners={loadStyle:"POPUP",osPlatform:'ALL'};
      },
      handleClose() {
        this.clearVail();
        this.banner = false;
      },
      addtoUpdate (banners){
        console.log(this.banners.loadStyle)
        if(this.title == "广告新增"){
          this.addOperator(banners)
        }else{
          this.updataOperator(banners)
        }
      },
      updataOperator (banners) {
        this.$refs[banners].validate((valid) => {
          if (valid) {
            let _this = this;
            let params = {};
            params.name = _this.banners.name;
            params.description = _this.banners.description;
            params.downTime = _this.banners.downTime;
            params.imageUrl = _this.banners.imageUrl;
            params.loadStyle = _this.banners.loadStyle;
            params.orderIdx = _this.banners.orderIdx;
            params.adTypes = _this.banners.adTypes;
            params.osPlatform = _this.banners.osPlatform;
            params.sourceUrl = _this.banners.sourceUrl;
            params.upTime = _this.banners.upTime;
            params.id =  _this.banners.id;
            params.mdfOperId = _this.userList.userId | "";
            params.mdfOperName = _this.userList.userName | "";
            this.isDisable=true;
            _this.$http.put(_this.api.API_GATEWATE + 'mango/banner/updateBanner',
              params,
              _this.GLOBAL.topheaders())
              .then(function (res) {
                this.isDisable=false;
                console.log(res.data)
                if(res.data == true){
                  _this.$message({
                    message: "修改成功",
                    type: 'success'
                  });
                  _this.init();
                  _this.banner=false;
                }
                //控制台打印请求成功时返回的数据
                //bind(this)可以不用
              }.bind(this))
              .catch(function (err) {
                this.isDisable=false;
                if (err.data && err.data.msg) {
                  _this.$message({
                    message: err.data.msg,
                    type: 'error'
                  });
                }
                //bind(this)可以不用
              }.bind(this))
          }
        })
      },

      addOperator (banners) {
        console.log(banners)
        this.$refs[banners].validate((valid) => {
          if (valid) {
            let _this = this;
            let params = {};
            
            params.name = _this.banners.name;
            params.description = _this.banners.description;
            params.downTime = _this.banners.downTime;
            params.imageUrl = _this.banners.imageUrl;
            params.loadStyle = _this.banners.loadStyle;
            params.orderIdx = _this.banners.orderIdx;
            params.osPlatform = _this.banners.osPlatform;
            params.sourceUrl = _this.banners.sourceUrl;
            params.adTypes =_this.banners.adTypes
            params.upTime = _this.banners.upTime;
            params.crtOperId = _this.userList.userId | "";
            params.crtOperName = _this.userList.userName | "";
            this.isDisable=true;
            _this.$http.post(_this.api.API_GATEWATE + 'mango/banner/createBanner',
              params,
              _this.GLOBAL.topheaders())
              .then(function (res) {
                this.isDisable=false;
                console.log(res.data)
                if(res.data){
                  _this.$message({
                    message: "添加广告成功",
                    type: 'success'
                  });
                  this.init();
                  _this.banner= false;
                  // _this.banners.loginId = '';
                  // _this.banners.password= '';
                  // _this.banners.name= '';
                  // _this.banners.mobile= '';
                  // _this.banners.roles= [];
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
        
        let _this = this;
        this.tableDatas = val;
        _this.operatorInformation = [];
        if(item.resourceCode == "banner_update"){
          _this.title="广告更新";
          console.log(val);
          _this.banners = Object.assign({}, val);
          _this.banners.upTime = formatUnixtimestamp(_this.banners.upTime);
          _this.banners.downTime = formatUnixtimestamp(_this.banners.downTime);
          if(_this.banners.imageUrl){
              this.fileList =[{
                name: _this.banners.imageUrl,
                url: this.api.API_GATEWATE+'mango/static/'+_this.banners.imageUrl
              }]
          }
          this.banner = true;
        }else if(item.resourceCode == "banner_upper"){
          let id = _this.tableDatas.id
          this.$confirm('确定上架'+this.tableDatas.name+'?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let parm = {
              id : id,
              mdfOperId : _this.userList.userId,
              mdfOperName : _this.userList.userName
            }
            _this.$http.put(_this.api.API_GATEWATE+'mango/banner/upperShelfBanner',parm,
              _this.GLOBAL.topheaders())
              .then(function(res){
                this.init();
                if(res.data == true){
                  _this.$message({
                    type: 'success',
                    message: '上架成功'
                  });
                  this.params.page = 1;
                }
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
              message: '已取消上架'
            });
          });
        }else if(item.resourceCode =="banner_lower"){
          let id = _this.tableDatas.id
          this.$confirm('确定下架'+this.tableDatas.name+'?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let parm = {
              id : id,
              mdfOperId : _this.userList.userId,
              mdfOperName : _this.userList.userName
            }
            _this.$http.put(_this.api.API_GATEWATE+'mango/banner/lowerShelfBanner',parm,
              _this.GLOBAL.topheaders())
              .then(function(res){
                this.init();
                if(res.data == true){
                  _this.$message({
                    type: 'success',
                    message: '下架成功'
                  });
                  this.params.page = 1;
                }
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
              message: '已取消下架'
            });
          });
        }else if(item.resourceCode =="oper_reset_password"){
          this.$confirm('确定重置操作员【'+this.tableDatas.name+'】的密码吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let id = _this.tableDatas.id
            //let params = {"userId":1,"id":1,"account":"admin","password":"123456","osPlatform":"Web","deviceName":"browser", "appId":"000","systemId":"00000","roleIds":[1]}
            _this.$http.put(_this.api.API_GATEWATE+'operator/'+id+'/resetpwd',
              _this.tableDatas,
              _this.GLOBAL.topheaders())
              .then(function(res){
                if(res.data == true){
                  _this.$message({
                    type: 'success',
                    message: '重置密码成功！密码修改为:123456.'
                  });
                  this.init();
                }
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
              message: '已取消重置密码'
            });
          });
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
      queryRole () {
        let _this = this;
        _this.$http.get(_this.api.API_GATEWATE+'role?page=0&pageSize=9999',_this.GLOBAL.topheaders())
          .then(function(res){

            console.log(res.data)
            if(res.data && res.data.list.length>0){
              _this.roleList = res.data.list;
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
      },
      init () {
        let _this = this;
        _this.$http.get(buildRequestURL(_this.api.API_GATEWATE+'mango/banner/bannerList',_this.params),_this.GLOBAL.topheaders())
          .then(function(res){
            let tableData = [];
            if(res && res.data && res.data.list &&  res.data.list.length>0){
              tableData =  res.data.list;
              tableData.forEach(e =>{
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
                if(e.adTypes =='BANNER_ADS'){
                  e.adTypess = '广告条'
                }else if(e.adTypes =='POPUP_ADS'){
                   e.adTypess = '弹窗广告'
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
                if(e.loadStyle == "JUMP_PAGE"){
                  e.loadStyleName = "页面跳转";
                }else if(e.loadStyle == "POPUP"){
                  e.loadStyleName = "弹窗";
                }else{
                  e.loadStyleName = e.loadStyle
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
  .uploadFile-remark {
    margin-top: 10px;
    color: red;
  }
</style>

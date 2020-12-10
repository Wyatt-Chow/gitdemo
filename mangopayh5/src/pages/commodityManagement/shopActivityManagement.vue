<template>
  <div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 700px;overflow:auto;">
      <div class="main_top_01">
        <el-row style="margin-bottom:20px">
          <el-col :span="24">
            <label style="padding-left: 28px">活动名称:</label>
            <el-input style="width:20%;" size="mini" v-model="searchParams.name" maxlength="20"></el-input>
            <label style="padding-left: 30px">状态:</label>
            <el-select style="width:20%" size="mini" v-model="searchParams.status">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in [{value:'ENABLE',name:'已上架'},{value:'DISABLE',name:'已下架'}]"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
         
            <label style="padding-left: 28px">开始时间:</label>
            <el-date-picker
              style="width:25%"
              size="mini"
              v-model="searchParams.creDate"
              type="daterange"
              
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          
            <el-button type="primary"  size="mini" @click="queryBannerList" style="margin-left: 3%;" :disabled="isDisable">搜索</el-button>
             </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-button style="float: right; padding-right: 20px;"  type="primary" v-if="authButton.some(e=>{return e.resourceId == 150})" @click="getOperatorButton">活动新增</el-button>
          </el-col>
        </el-row>
      </div>
        <el-table ref="multipleTable" :default-sort = "{prop: 'id', order: 'ascending'}" :data="tableData" border stripe tooltip-effect="dark" style="width: 100%">
         
          <el-table-column label="活动名称"  show-overflow-tooltip prop="name" width="150" fixed="left">
          </el-table-column>
          <el-table-column label="激活开始日期"  show-overflow-tooltip prop="regStartTimes" width="150">
          </el-table-column>
          <el-table-column prop="discountAmounts" label="活动立减金额（元）" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="discountRate" label="活动折扣" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="regInDays" label="天数限制" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="onces"  label="仅限参与一次" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="onlyPayMembers" label="仅限会员参与" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="startTimes" label="开始时间" width="150" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="endTimes" label="结束时间" width="150" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="activityStatu" label="活动状态" width="200" show-overflow-tooltip>
          </el-table-column>
          <!-- <el-table-column prop="description" label="简介" show-overflow-tooltip>
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
          </el-table-column> -->
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
                  <el-dropdown-item  @click.native="upperShelf(scope.row)" v-if="scope.row.status == 'DISABLE'" >活动上架</el-dropdown-item>
                  <el-dropdown-item  @click.native="lowerShelf(scope.row)" v-if="scope.row.status == 'ENABLE'" >活动下架</el-dropdown-item>
                  <el-dropdown-item  @click.native="getOperating(scope.row,item)" v-if="item.resourceId == 151" v-for="item in authButton" :key="item.resourceId">{{item.resourceName}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-page" >
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="params.page+1"
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
      <el-form ref="banners" :rules="rules" :model="banners" label-width="150px">
        <el-form-item label="活动名称:" prop="name">
          <el-input v-model="banners.name" maxlength="100" size="mini" style="width:80%"></el-input>
        </el-form-item>
        <!--  <el-form-item label="激活限制:" prop="limit">
          <el-select v-model="banners.limit" placeholder="请选择" size="mini" style="width: 80%">
            <el-option
              v-for="item in [{value:'无限制',name:''},{value:'激活天数',name:'YES'},{value:'激活日期',name:'NO'}]"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="激活:" prop="regInDays" >
          <el-input v-model="banners.regInDays"  size="mini" style="width:80%"></el-input>天内
        </el-form-item>
        <el-form-item label="激活开始时间:" prop="regStartTime">
          <el-date-picker
            style="width: 80%"
            size="mini"
            v-model="banners.regStartTime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="00:00:00"
            format="yyyy-MM-dd HH:mm:ss"
            :clearable="false"
            value-format="yyyyMMddHHmmss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="立减金额（元）:" prop="discountAmount">
          <el-input v-model="banners.discountAmount"  size="mini" style="width:80%"></el-input>
        </el-form-item>
       
        <el-form-item label="活动折扣:" prop="discountRate">
          <el-input v-model="banners.discountRate" size="mini" style="width:80%" placeholder="例如：88折请输入0.88"></el-input>
        </el-form-item>
        
       <!--  <el-form-item label="图片地址:" prop="imageUrl">
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
            <div class="uploadFile-remark">*支持jpg、jpeg、png、git文件，文件小于1M</div>
          </el-upload>
          <el-input v-model="banners.imageUrl" v-show="fileisShow" type="hidden"  size="mini"  style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="资源地址:" prop="sourceUrl">
          <el-input v-model="banners.sourceUrl" size="mini" maxlength="9999" style="width: 80%"></el-input>
        </el-form-item> -->
        <el-form-item label="开始时间:" prop="startTime">
          <el-date-picker
            style="width: 80%"
            size="mini"
            v-model="banners.startTime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="00:00:00"
            format="yyyy-MM-dd HH:mm:ss"
            :clearable="false"
            value-format="yyyyMMddHHmmss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:" prop="endTime">
          <el-date-picker
            style="width: 80%"
            size="mini"
            v-model="banners.endTime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="23:59:59"
            format="yyyy-MM-dd HH:mm:ss"
            :clearable="false"
            value-format="yyyyMMddHHmmss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="仅限会员参与:" prop="onlyPayMember">
          <el-select v-model="banners.onlyPayMember" placeholder="请选择" size="mini" style="width: 80%">
            <el-option
              v-for="item in [{value:true,name:'YES'},{value:false,name:'NO'}]"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仅可参与一次:" prop="once">
          <el-select v-model="banners.once" placeholder="请选择" size="mini" style="width: 80%">
            <el-option
              v-for="item in [{value:true,name:'YES'},{value:false,name:'NO'}]"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="优先级:" prop="orderIdx">
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
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="addtoUpdate('banners')" :disabled="isDisable">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>

  import {formatUnixtimestamp,buildRequestURL,toDataTime,toTime} from '../../../config/util'
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
       
        /* checkStatusList:[{
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
        }], */
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
          name:'',
          discountAmount:'',
          discountRate:'',
          startTime:'',
          endTime:'',
          onlyPayMember:'',
          once:'',
          regInDays:''
        },
        tableDatas:'',
        authButton:[],
        userList:'',
        tableData: [],
        searchParams: {
          creDate:[],
          name:"",
          beginDate:"",
          endDate:"",
          satus:"",
          
        },
        params:{
          page:0,
          pageSize:10,
          creDate:[],
          name:"",
          beginDate:"",
          endDate:"",
          status:"",
          
        },
        total:0,
        rules: {
          name: [
            {required: true, message: '活动名称不能为空', trigger: 'blur'},
          ],
        /*   regInDays:[{required: true, message: '天数限制不能为空', trigger: 'blur'}], */
          discountAmount: [
            {required: true, message: '立减金额不能为空', trigger: 'blur'},
          ],
          discountRate: [
            {required: true, message: '活动折扣不能为空', trigger: 'blur'},
          ],
          startTime: [
            {required: true, message: '开始时间不能为空', trigger: 'change'},
          ],
           endTime: [
            {required: true, message: '结束时间不能为空', trigger: 'change'},
          ],
           /*  orderIdx: [
              {required: true,trigger: 'blur',validator:nums}
          ],
            description: [
            {required: true, message: '简介不能为空', trigger: 'blur'},
          ], */
          onlyPayMember: [
            {required: true, message: '请选择是否仅限会员参与', trigger: 'change'},
          ],
          once: [
            {required: true, message: '请选择是否仅限参与一次', trigger: 'change'},
          ],
          
        },
      }
    },
    methods : {
      //搜索
      queryBannerList(){
       
        this.params.page =0;
       
        this.params.status = this.searchParams.status;
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
     /*  //上传之前
      openUploadBefore(file){
        
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
        
        window.open(file.url ? file.url : this.api.API_GATEWATE+'mango/static/'+file.response.msg);
      },
      // 上传成功后的回调
      uploadSuccess (response, file, fileList) {
        
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
      }, */
      //清除验证
      clearVail(){
        this.banners={
        };
        this.banners.roles=[];
        if(this.$refs.banners){ this.$refs['banners'].clearValidate();}
       
      },

      getOperatorButton (){
        console.log(this.banners)
        this.title="活动新增";
        this.fileList=[];
        this.banner = true;
        this.clearVail();
      },
      handleClose() {
        this.clearVail();
        this.banner = false;
      },
      addtoUpdate (banners){
        
        if(this.title == "活动新增"){
          this.addOperator(banners)
        }else{
          this.updataOperator(banners)
        }
      },
      //上架
      upperShelf(val) {
        console.log(val);
        let _this = this;
        _this.banners.status = 'ENABLE'
        _this.$http.put(_this.api.API_GATEWATE + 'mango/shop/activity/upperShelf',
              val,
              _this.GLOBAL.topheaders())
              .then(function (res) {
                this.isDisable=false;
                console.log(res.data)
                if(res.data == true){
                  _this.$message({
                    message: "上架成功",
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
      },
      //下架
      lowerShelf(val){ 
        console.log(val)
        let _this = this;
        /* val.status = 'DISABLE' */
        _this.$http.put(_this.api.API_GATEWATE + 'mango/shop/activity/lowerShelf',
              val,
              _this.GLOBAL.topheaders())
              .then(function (res) {
                this.isDisable=false;
                console.log(res.data)
                if(res.data == true){
                  _this.$message({
                    message: "下架成功",
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
      },
      //修改
      updataOperator (banners) {
        this.$refs[banners].validate((valid) => {
          if (valid) {
            let _this = this;
            /* let params = {};
            params.name = _this.banners.name;
            params.description = _this.banners.description;
            params.downTime = _this.banners.downTime;
            params.imageUrl = _this.banners.imageUrl;
            params.loadStyle = _this.banners.loadStyle;
            params.orderIdx = _this.banners.orderIdx;
            params.osPlatform = _this.banners.osPlatform;
            params.sourceUrl = _this.banners.sourceUrl;
            params.upTime = _this.banners.upTime;
            params.id =  _this.banners.id;
            params.mdfOperId = _this.userList.userId | "";
            params.mdfOperName = _this.userList.userName | ""; */
            this.isDisable=true;
            _this.$http.put(_this.api.API_GATEWATE + 'mango/shop/activityUpdate',
              _this.banners,
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
      //添加
      addOperator (banners) {
        console.log(banners)
        this.$refs[banners].validate((valid) => {
          if (valid) {
            let _this = this;
           /*  _this.banners.startTime = _this.banners.upTime;
            _this.banners.endTime = _this.banners.downTime; */
            /* let params = {};
            
            params.name = _this.banners.name;
            params.description = _this.banners.description;
            params.downTime = _this.banners.downTime;
            params.imageUrl = _this.banners.imageUrl;
            params.loadStyle = _this.banners.loadStyle;
            params.orderIdx = _this.banners.orderIdx;
            params.osPlatform = _this.banners.osPlatform;
            params.sourceUrl = _this.banners.sourceUrl;
            params.upTime = _this.banners.upTime;
            params.crtOperId = _this.userList.userId | "";
            params.crtOperName = _this.userList.userName | ""; */
            this.isDisable=true;
            _this.$http.post(_this.api.API_GATEWATE + 'mango/shop/activitySave',
              _this.banners,
              _this.GLOBAL.topheaders())
              .then(function (res) {
                this.isDisable=false;
                console.log(res.data)
                if(res.data){
                  _this.$message({
                    message: "添加活动成功",/*  */
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
        if(item.resourceId == 151){
          _this.title="活动更新";
         console.log(val)
          _this.banners = {};
          for(let i in val){
            _this.$set(_this.banners,i,val[i]);
          }
          _this.banners.discountAmount = _this.banners.discountAmounts
          console.log(_this.banners);
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
                  this.params.page = 0;
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
                  this.params.page = 0;
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
        this.params.page = val-1;
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
        _this.$http.get(buildRequestURL(_this.api.API_GATEWATE+'mango/shop/activity',_this.params),_this.GLOBAL.topheaders())
          .then(function(res){
            console.log(res.data.content)
            let tableData = [];
            if(res.data.content.length>0){
              tableData =  res.data.content;
              tableData.forEach(e =>{
                if(e.status == "ENABLE"){
                    e.activityStatu = "已上架"
                }else if(e.status == "DISABLE"){
                  e.activityStatu = "已下架"
                }else{
                  e.activityStatu = e.status
                }
                if(e.discountAmount){
                  e.discountAmounts = e.discountAmount/100
                }
                if(e.regStartTime){ e.regStartTimes = toTime(e.regStartTime)}
               
                e.startTimes = toTime(e.startTime);
                e.endTimes = toTime(e.endTime);
                e.onces = e.once?'YES':'NO'
                e.onlyPayMembers = e.onlyPayMember?'YES':'NO'
                /* 
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
                } */
              })
              _this.tableData = tableData;
              _this.total = res.data.totalElements || 0;
            }else{
              _this.tableData = tableData;
              _this.total = res.data.totalElements || 0;
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

<template>
  <div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
      <div class="main_top_01">
       
        <el-row>
          <el-col :span="24" style="margin-bottom:20px">
            
           
            <el-button style="float: right; padding-right: 20px;"  type="primary"   @click="open">新开基本户</el-button>
          </el-col>
        </el-row>
      </div>
      <el-form label-width="100px">
       <el-form-item label="名称：">
         <span>{{info.platformName}}</span>
       </el-form-item>
        <el-form-item label="地址：">
         <span>{{info.platformAddress}}</span>
       </el-form-item> 
       <el-form-item label="银行卡号：">
         <span>{{info.bankCardNo}}</span>
       </el-form-item>
        <el-form-item label="户名：">
         <span>{{info.accountName}}</span>
       </el-form-item> 
       <el-form-item label="本金余额："> 
         <span style="display:inline-block;width:150px;">{{info.account[0].balance-info.account[0].freezeAmt}}</span>
         <el-button style="margin-left:40px" type="info" size="small" @click="preadjust(1)">调 账</el-button>
       </el-form-item> 
       <el-form-item label="利息余额：">
         <span style="display:inline-block;width:150px;">{{info.account[1].balance-info.account[1].freezeAmt}}</span>
         <el-button style="margin-left:40px" type="info" size="small" @click="preadjust(2)">调 账</el-button>
       </el-form-item> 
       <el-form-item label="罚息余额：">
         <span style="display:inline-block;width:150px;">{{info.account[3].balance-info.account[3].freezeAmt}}</span>
         <el-button style="margin-left:40px" type="info" size="small" @click="preadjust(3)">调 账</el-button>
       </el-form-item>
        <el-form-item label="营收：">
         <span style="display:inline-block;width:150px;">{{info.account[4].balance-info.account[4].freezeAmt}}</span>
         <el-button style="margin-left:40px" type="info" size="small" @click="preadjust(4)">调 账</el-button>
       </el-form-item>
      </el-form>
      </el-header>
    </el-container>
    <el-dialog
      :title="title"
      :visible.sync="banner"
      width="40%"
      :before-close="handleClose">
      <el-form ref="banners" :rules="rules" :model="banners" label-width="120px">
       
        <el-form-item label="调账方式:" prop="sign">
          <el-select v-model="banners.sign" placeholder="请选择" size="mini" style="width: 80%">
            <el-option
              v-for="item in [{value:'1',name:'增加'},{value:'0',name:'减少'}]"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="调账金额:" prop="amount">
          <el-input v-model="banners.amount" size="mini" maxlength="9999" style="width: 80%" type="number"></el-input>
        </el-form-item>
        <el-form-item label="调账说明:" prop="memo">
          <el-input v-model="banners.memo" size="mini" maxlength="9999" style="width: 80%" ></el-input>
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
        balanceVisible:false,
        balanceData:[],

        info:{},
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
          sigh:'',
          amount:'',
          coreId:-1,
          actType:'',
          
          
          memo:''
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
          sign: [
            {required: true, message: '请选择调账方式', trigger: 'change'},
          ],
          amount:[
            {required: true, message: '调账金额不能为空', trigger: 'blur'},
          ],
          memo:[
            {required: true, message: '调账说明不能为空', trigger: 'blur'},
          ],
        },
      }
    },
    methods : {
      open(){
        this.$http.post(this.api.API_GATEWATE + 'mango/openAccount',
              {coreId:-1},
              this.GLOBAL.topheaders())
              .then(function (res) {
                this.isDisable=false;
                console.log(res.data)
                if(res.data){
                  this.$message({
                    message: "开户成功",
                    type: 'success'
                  });
                  this.init();
                  
                }
                //控制台打印请求成功时返回的数据
                //bind(this)可以不用
              }.bind(this))
              .catch(function (err) {
                this.isDisable=false;
                if(err && err.data && err.data.key == "400300"){
                  this.$router.push({ path: "/login" });
                }
                this.$message({
                  message: err.data.msg,
                  type: 'error'
                });
                //bind(this)可以不用
              }.bind(this))
          
        
      },
      preshow(val){
        console.log(val);
        this.balanceVisible = true;
      },

      preopen(val){
        console.log(val);
      },
      preadjust(val){
       
        switch(val){
          case 1:
            this.title = '本金余额调账';
            this.banners.actType = 'PLATFORM-BASE-CAPITAL';
            this.banners.capitalType = 'CAPITAL';
            break;
          case 2:
            this.title = '利息余额调账'
            this.banners.actType = 'PLATFORM-BASE-INTEREST';
            this.banners.capitalType = 'INTEREST';
            break;
          case 3:
            this.title = '罚息余额调账'
            this.banners.actType = 'PLATFORM-BASE-SERVICE';
            this.banners.capitalType = 'SERVICE';
            break;
          case 4:
            this.title = '营收调账'
            this.banners.actType = 'PLATFORM-BASE-PROFIT';
            this.banners.capitalType = 'PROFIT';
            break;
          default:
            break;
        }
        this.banner = true;
      },
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
      addtoUpdate (){
       
       this.addOperator()
       
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

      addOperator () {
        console.log(this.banners)
        this.$refs['banners'].validate((valid) => {
          if (valid) {
            let _this = this;
            
            this.isDisable=true;
            _this.$http.post(_this.api.API_GATEWATE + 'mango/reconciliation',
              this.banners,
              _this.GLOBAL.topheaders())
              .then(function (res) {
                this.isDisable=false;
                console.log(res.data)
                if(res.data){
                  _this.$message({
                    message: "调账成功",
                    type: 'success'
                  });
                  this.init();
                  this.banners={};
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
        _this.$http.get(buildRequestURL(_this.api.API_GATEWATE+'mango/PlatformInfo',{}),_this.GLOBAL.topheaders())
          .then(function(res){
            console.log(res.data)
            
            if(res && res.data ){
              this.info = res.data;console.log(this.info)
              
            }else{
              
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

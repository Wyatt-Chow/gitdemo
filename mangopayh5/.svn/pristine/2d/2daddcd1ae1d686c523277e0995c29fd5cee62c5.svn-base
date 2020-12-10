<template>
  <div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 700px;overflow:auto;">
      <div class="main_top_01">
        <el-row style="margin-bottom:20px">
          <el-col :span="24">
            <label style="padding-left: 28px">券号:</label>
            <el-input style="width:20%;" size="mini" v-model="searchParams.code" maxlength="99"></el-input>
            <label style="padding-left: 28px">用户ID:</label>
            <el-input style="width:20%;" size="mini" v-model="searchParams.memberCoreId" maxlength="20"></el-input>
            <label style="padding-left: 30px">状态:</label>
            <el-select style="width:20%" size="mini" v-model="searchParams.isUsed">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in [{value:1,name:'已使用'},{value:0,name:'未使用'}]"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
         <el-row style="margin-bottom:20px">
          <el-col :span="24">
            <label style="padding-left: 28px">领取日期:</label>
            <el-date-picker
              style="width:25%"
              size="mini"
              v-model="searchParams.receiveDate"
              type="daterange"
              
              value-format="yyyyMMdd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
             <label style="padding-left: 28px">使用日期:</label>
            <el-date-picker
              style="width:25%"
              size="mini"
              v-model="searchParams.useDate"
              type="daterange"
              
              value-format="yyyyMMdd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          
            <el-button type="primary"  size="mini" @click="queryBannerList" style="margin-left: 3%;" :disabled="isDisable">搜索</el-button>
            <el-button type="primary"  size="mini" @click="getExport" style="margin-left: 3%;" :disabled="isdisable">导出</el-button>
            <el-button type="primary" style="float: right; padding-right: 20px;" @click="back">返回列表</el-button>
             <a  id="isa" href=""></a>
             </el-col>
            
        </el-row>
       
      </div>
        <el-table ref="multipleTable" :default-sort = "{prop: 'id', order: 'ascending'}" :data="tableData" border stripe tooltip-effect="dark" style="width: 100%">
         
          <el-table-column label="券号"  show-overflow-tooltip prop="code"  >
          </el-table-column>
          <el-table-column label="卡券名称"  show-overflow-tooltip prop="couponName"  >
          </el-table-column>
          <el-table-column label="用户ID"  show-overflow-tooltip prop="memberCoreId"  >
          </el-table-column>
         <!--  <el-table-column prop="discountAmounts" label="活动立减金额（元）" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="discountRate" label="活动折扣" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="regInDays" label="天数限制" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="onces"  label="仅限参与一次" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="onlyPayMembers" label="仅限会员参与" width="200" show-overflow-tooltip> 
          </el-table-column>-->
          <el-table-column prop="acceptTimes" label="领取时间"  show-overflow-tooltip>
          </el-table-column>
         
          <el-table-column prop="isUseds" label="卡券状态"  show-overflow-tooltip>
          </el-table-column> 
          <el-table-column prop="useTimes" label="使用时间"  show-overflow-tooltip>
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
           
            fixed="right"
            label="操作"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-dropdown :hide-on-click="false">
                <span class="el-dropdown-link">
                  <i class="el-icon-menu"></i><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  
                  <el-dropdown-item  @click.native="showCode" >查看</el-dropdown-item>
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
    <el-dialog
      :title="title"
      :visible.sync="banner"
      width="40%"
      :before-close="handleClose">
      <el-form ref="banners" :rules="rules" :model="banners" label-width="150px">
        <el-form-item label="活动名称:" prop="name">
          <el-input v-model="banners.name" maxlength="100" size="mini" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="激活:" prop="regInDays">
          <el-input v-model="banners.regInDays"  size="mini" style="width:80%"></el-input>天内
        </el-form-item>
        <el-form-item label="立减金额（元）:" prop="discountAmount">
          <el-input v-model="banners.discountAmount"  size="mini" style="width:80%"></el-input>
        </el-form-item>
       
        <el-form-item label="活动折扣:" prop="discountRate">
          <el-input v-model="banners.discountRate" size="mini" style="width:80%"></el-input>
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
        isdisable:false,
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
          couponId:'',
          code:'',
          isUsed:'',
          memberCoreId:'',
          page:1,
          pageSize:10,
          total:0,
          acceptBeginTime:'',
          acceptEndTime:'',
          useBeginTime:'',
          useEndTime:"",
          receiveDate:[],
          useDate:[]
        },
        params:{
          
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
       console.log(this.searchParams)
       this.searchParams.page = 1;
        
       this.init();
      },
      //导出
      getExport(){
        this.params.couponId = this.searchParams.couponId;
        this.params.page =1;
        this.params.code = this.searchParams.code;
        this.params.isUsed = this.searchParams.isUsed;
        this.params.pageSize = this.total;
        this.params.acceptBeginTime = this.searchParams.acceptBeginTime;
        this.params.acceptEndTime = this.searchParams.acceptEndTime;
        this.params.useBeginTime = this.searchParams.useBeginTime;
        this.params.useEndTime = this.searchParams.useEndTime;
        this.params.memberCoreId = this.searchParams.memberCoreId;
        
        if(!this.params.code && !this.params.isUsed&& !this.params.acceptBeginTime&&!this.params.acceptEndTime && !this.params.useBeginTime && !this.params.useEndTime&&!this.params.memberCoreId){
            this.$message({
              message: "请输入搜索条件进行导出",
              type: 'info'
            });
            return
        }
        let el = document.getElementById('isa');
        console.log(this.params)
        el.href=buildRequestURL(this.api.API_GATEWATE+'mango/nuts/exportCouponCode',this.params)
        el.click();
        

      },
      back(){
        this.$router.go(-1)
      },

      //查看
      showCode () {},
     
     

     
      handleClose() {
       
        this.banner = false;
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
       if(this.$route.params.coupons){ 
         this.searchParams.couponId =this.$route.params.coupons.couponId;
       }else{
         this.searchParams.couponId =''
       }
       console.log(this.searchParams)
        if(this.searchParams.useDate){
          this.searchParams.useBeginTime = this.searchParams.useDate[0]
          this.searchParams.useEndTime = this.searchParams.useDate[1]
        }else{
           this.searchParams.useBeginTime = '';
           this.searchParams.useEndTime = '';
        }
        if(this.searchParams.receiveDate){
          this.searchParams.acceptBeginTime = this.searchParams.receiveDate[0]
          this.searchParams.acceptEndTime = this.searchParams.receiveDate[1]
        }else{
          this.searchParams.acceptBeginTime = '';
          this.searchParams.acceptEndTime = '';
        }
       
        let _this = this;
        _this.$http.post(_this.api.API_GATEWATE+'mango/nuts/couponCodeList',_this.searchParams,_this.GLOBAL.topheaders())
          .then(function(res){
            console.log(res.data)
            let tableData = [];
            tableData = res.data.list;
            tableData.forEach(e=>{
              switch(e.isUsed){
                case '0':
                  e.isUseds = '未使用';
                  break;
                case '1':
                  e.isUseds = '已使用';
                  break;
                case '2':
                  e.isUseds = '未领取';
                  break;
              }
              if(e.acceptTime){
                e.acceptTimes = formatUnixtimestamp(e.acceptTime)
              }
              if(e.useTime){
                e.useTimes = formatUnixtimestamp(e.useTime)
              }
             
            })
             console.log(res.data.total)
              this.total = res.data.total;
            this.tableData =tableData;console.log(tableData)
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

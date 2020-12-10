<template>
  <div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
      <div class="main_top_01">
        <el-row style="margin-bottom:20px">
          <el-col :span="24">
            <label style="padding-left: 28px">客户姓名</label>
            <el-input style="width:20%;" size="mini" v-model="params.userName" placeholder="客户姓名" maxlength="20"></el-input>
            <label style="padding-left: 30px">状态:</label>
            <el-select style="width:20%" size="mini" v-model="params.status">
              <el-option value="1" label="全部"></el-option>
              <el-option
                v-for="item in bannerStatusList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            <label style="padding-left: 50px">日期</label>
            <el-date-picker
              style="width:25%"
              size="mini"
              v-model="params.creDate"
              type="daterange"
              :picker-options="startTime"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary"  size="mini" @click="queryBannerList" style="margin-left: 3%;" :disabled="isDisable">查询</el-button>
          </el-col>
        </el-row>
      </div>
        <el-table ref="multipleTable"  :data="tableData" border stripe tooltip-effect="dark" style="width: 100%">
          <el-table-column label="ID"  show-overflow-tooltip prop="id" width="100">
          </el-table-column>
          <el-table-column label="客户姓名"  show-overflow-tooltip prop="name" width="100">
          </el-table-column>
          <el-table-column label="联系方式"  show-overflow-tooltip prop="mobile" width="100">
          </el-table-column>
          <el-table-column prop="goodsName" label="商品名称" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="statuss" label="状态" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="orderPrice"  label="产品金额（元）" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column label="申请时间" show-overflow-tooltip>
            <template slot-scope="scope">
              <span> {{ scope.row.addTime | date('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
          </el-table-column>
           <el-table-column prop="feedType" label="反馈类型" show-overflow-tooltip width="110">
          </el-table-column>
           <el-table-column prop="content" label="反馈内容" show-overflow-tooltip width="110">
          </el-table-column>
          <el-table-column label="反馈时间" show-overflow-tooltip prop="addTime">
            <template slot-scope="scope">
              <span> {{ scope.row.addTime | date('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="realMoney" label="退补情况" show-overflow-tooltip width="110">
          </el-table-column>
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
                  <el-dropdown-item @click.native="check(scope.row)" v-if="authButton.some(e=>{return e.resourceId == 251}) && scope.row.status =='AUDITING'">审核</el-dropdown-item>
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
      title="退货详情"
      :visible.sync="banner"
      width="60%"
      :before-close="handleClose">
      <el-form ref="banners" :rules="rules" :model="banners" label-width="120px"  style="height:400px;overflow:auto">
        <span><strong>订单信息</strong></span>
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户姓名:" >
              <span>{{banners.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式:" >
              <span>{{banners.mobile}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单编号:" >
              <span>{{banners.applyDetail.orderNo}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="商品名称:" >
              <span>{{banners.goodsName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品价格:" >
              <span>{{banners.actualPrice}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <span><strong>贷款信息</strong></span>
        <el-row>
          <el-col :span="8">
            <el-form-item label="贷款金额:" >
              <span>{{banners.applyDetail.principalTotal}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="贷款期限:" >
              <span>{{banners.applyDetail.allPeriod}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="贷款利率:" >
              <span>{{banners.applyDetail.rate}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已还本金:" >
              <span>{{banners.applyDetail.actualPrincipalTotal}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已还期数:" >
              <span>{{banners.applyDetail.actualPeriod}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已还利息:" >
              <span>{{banners.applyDetail.actualAccrualTotal}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="未还本金:" >
              <span>{{banners.applyDetail.surplusPrincipalTotal}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="未还期次:" >
              <span>{{banners.applyDetail.surplusPeriod}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="未还利息:" >
              <span>{{banners.applyDetail.surplusAccrualTotal}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="未还罚息:" >
              <span>{{banners.applyDetail.surplusPenaltyTotal}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <span><strong>反馈信息</strong></span>
        <el-row>
          <el-col :span="8">
            <el-form-item label="反馈类型:" >
              <span>{{banners.feedType}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="反馈内容:" >
              <span>{{banners.content}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="反馈时间:" >
              <span>{{banners.addTime| date('YYYY-MM-DD HH:mm:ss')}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <span><strong>退款信息</strong></span>
        <el-row>
          <el-col :span="12">
            <el-form-item label="剩余应收合计:" >
              <span>
                {{banners.applyDetail.surplusPayAmountTotal}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="退款商品金额:" >
              <!-- <span>{{banners.refundMoney}}</span> -->
              <el-input type="number" style="width:60%;"  size="mini" v-model="banners.refundMoney">{{banners.refundMoney}}</el-input>元
            </el-form-item>
         </el-col>
         <el-col :span="12">
            <el-form-item label="退款利润金额:" >
              <!-- <span>{{banners.refundProfitAmount}}</span> -->
              <el-input type="number" style="width:60%;"  size="mini" v-model="banners.refundProfitAmount"></el-input>元
            </el-form-item>
         </el-col>
         <el-col :span="12">
          <el-form-item label="退补情况:" >
            <!-- <span>{{banners.realMoney>0?'应退'+Math.abs(banners.realMoney):'应收'+Math.abs(banners.realMoney)}}</span> -->
            <span>{{!(banners.refundMoney&&banners.refundProfitAmount)?'':(parseFloat(banners.refundMoney)+parseFloat(banners.refundProfitAmount)-banners.applyDetail.surplusPayAmountTotal>0?'应退'+Math.abs(parseFloat(banners.refundMoney)+parseFloat(banners.refundProfitAmount)-banners.applyDetail.surplusPayAmountTotal).toFixed(2):'应收'+Math.abs(parseFloat(banners.refundMoney)+parseFloat(banners.refundProfitAmount)-banners.applyDetail.surplusPayAmountTotal).toFixed(2))}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注:" >
            <!-- <span>{{banners.remark}}</span> -->
             <el-input  type="textarea" style="width:150%;" size="mini" v-model="banners.remark">{{banners.remark}}</el-input>
          </el-form-item>
         </el-col>
        </el-row>



      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="addtoUpdate('COMPLETED')" :disabled="isDisable">通过</el-button>
      <el-button type="primary" @click="addtoUpdate('REJECT')" :disabled="isDisable" >拒绝</el-button>
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
          value:"2",
          name:"审核通过"
        },{
          value:"3",
          name:"审核拒绝"
        },{
          value:"4",
          name:"等待审核"
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
          applyDetail:{},
          refundAmount:'',
          realAmount:'',
          remark:'',
          status:'',

        },
        tableDatas:'',
        authButton:[],
        userList:'',
        tableData: [],
        params:{
          userName:'',
          status:'1',
          creDate:[],
          startDate:'',
          endDate:'',
          page:1,
          pageSize:10,
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
      check(val) {
        this.getDetails(val);
        this.banner =true;

        console.log(this.banners)

      },
      getDetails(val){

        this.$http.post(this.api.API_GATEWATE+'mango/mall/returnGoodsDetail',{id:val.id},this.GLOBAL.topheaders())
          .then(function(res){
            this.banners = res.data;
            this.banners.msgId = val.id;
            this.banners.receive = (this.banners.applyDetail.surplusPrincipalTotal+this.banners.applyDetail.actualAccrualTotal+this.banners.applyDetail.actualPenaltyTotal+this.banners.applyDetail.surplusAccrualTotal)
          }.bind(this))
          .catch(function(err){
            if(err && err.data && err.data.key == "400300"){
              this.$router.push({ path: "/login" });
            }
            this.$message({
              message: err.body.msg,
              type: 'error'
            });
            //bind(this)可以不用
          }.bind(this))
      },
      //搜索
      queryBannerList(){


        if(this.params.creDate && this.params.creDate.length>0){
          this.params.startDate = this.params.creDate[0];
          this.params.endDate = this.params.creDate[1];
        }else{
          this.params.startDate ="";
          this.params.endDate ="";
        }
        this.init();
      },
      uploadPhoto (){
        this.$refs.uploadPhoto.submit();
      },

      //清除验证
      clearVail(){
       this.banners={
          applyDetail:{}
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
      addtoUpdate (string){
        this.banners.status = string;
        // this.banners.realAmount =parseFloat(this.banners.refundMoney)-parseFloat(this.banners.receive);
        //退款产品金额
        this.banners.refundAmount = parseFloat(this.banners.refundMoney);
        //退补情况
        this.banners.realAmount = parseFloat(this.banners.refundMoney)+parseFloat(this.banners.refundProfitAmount)-this.banners.applyDetail.surplusPayAmountTotal;
        this.banners.remark = this.banners.remark;
        this.banners.refundProfitAmount = parseFloat(this.banners.refundProfitAmount);


        console.log(this.banners)
        this.$http.post(this.api.API_GATEWATE+'mango/mall/returnGoodsAudit',this.banners,this.GLOBAL.topheaders())
          .then(function(res){

            if(res.data){

            this.$message({
              message: "提交成功",
              type: 'success'
            });
            this.handleClose();
            this.init();
            }
          }.bind(this))
          .catch(function(err){
            if(err && err.data && err.data.key == "400300"){
              this.$router.push({ path: "/login" });
            }
            this.$message({
              message: err.body.msg,
              type: 'error'
            });
            //bind(this)可以不用
          }.bind(this))
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
        _this.$http.post(_this.api.API_GATEWATE+'mango/mall/returnGoods',_this.params,_this.GLOBAL.topheaders())
          .then(function(res){
            let tableData = [];
            if(res && res.data && res.data.list &&  res.data.list.length>0){
              tableData =  res.data.list;
              tableData.forEach(e =>{
                if(e.status == "REJECT"){
                    e.statuss = "审核拒绝"
                }else if(e.status == "AUDITING"){
                  e.statuss = "等待审核"
                }else if(e.status == "COMPLETED"){
                  e.statuss = "审核通过"
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

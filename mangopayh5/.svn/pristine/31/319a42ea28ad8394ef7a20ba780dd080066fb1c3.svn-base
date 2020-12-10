<template>
  <div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
        <div class="main_top_01">
        <el-row style="margin-bottom:20px">
          <el-col :span="24">
            
            <label style="padding-left: 30px">制券类型:</label>
            <el-select style="width:20%" size="mini" v-model="searchParams.generateMode">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            <label style="padding-left: 50px">创建日期:</label>
            <el-date-picker
              style="width:25%"
              size="mini"
              v-model="searchParams.creDate"
              type="daterange"
             
              value-format="yyyyMMdd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
             <el-button type="primary"  size="mini" @click="queryCounponList" style="margin-left: 3%;" :disabled="isDisable">
               搜索
             </el-button>
              <el-button  style="margin-left:10px" size="mini" type="primary" v-if="authButton.some(e=>{return e.resourceId == 171})" @click.stop="getExport" :disabled="isdisable">导出</el-button>
            <a  id="isa" href=""></a>
          </el-col>
        </el-row>
        
      </div>
        <el-table ref="multipleTable" :default-sort = "{prop: 'couponId', order: 'ascending'}" :data="tableData" border stripe tooltip-effect="dark" style="width: 100%">
          <el-table-column label="卡券编号"   show-overflow-tooltip prop="couponId" width="80">
          </el-table-column>
          <el-table-column label="创建时间"   show-overflow-tooltip prop="createdTime" ></el-table-column>
          <el-table-column label="卡券名称"  show-overflow-tooltip prop="couponName" ></el-table-column>
          <el-table-column label="卡券价格"  show-overflow-tooltip prop="price" ></el-table-column>
          <el-table-column label="发放数量"   show-overflow-tooltip prop="outNum" ></el-table-column>
          <el-table-column prop="undercarriages" label="状态" show-overflow-tooltip ></el-table-column>
          <el-table-column prop="cardType" label="类型" show-overflow-tooltip ></el-table-column>
          
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
                  <el-dropdown-item  @click.native="getOperating(scope.row)" v-if="authButton.some(e=>{return e.resourceId == 170})">审核</el-dropdown-item>
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
      title="卡券审核"
      :visible.sync="approve"
      width="40%"
      :before-close="handleClose" >
      <el-form ref="coupons" :rules="rules" :model="coupons" label-width="120px" style="height:400px;overflow:auto">
        <el-form-item label="卡券名称:" prop="couponName" :rules="[{required: true, message: '卡券名称不能为空', trigger: 'blur'}]">
          <el-input v-model="coupons.couponName" maxlength="15" size="mini" style="width:80%" :disabled='true'></el-input>
        </el-form-item>
         <el-form-item label="卡券类型:" prop="cardType" :rules="[{required: true, message: '请选择卡券类型', trigger: 'change'}]">
          <el-select v-model="coupons.cardType" placeholder="请选择" size="mini"  style="width: 80%" :disabled='true'>
            <el-option
              v-for="item in couponTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="满减规则:" prop="reductionRule" v-if="coupons.cardType =='满减'">
          满<el-input v-model="coupons.leastCost" maxlength="10" size="mini" style="width:15%" :disabled='true'></el-input>元
          减<el-input v-model="coupons.reduceCost" maxlength="10" size="mini" style="width:15%" :disabled='true'></el-input>元
        </el-form-item>
        <el-form-item label="折扣规则:" prop="discountRule"  v-if="coupons.cardType =='折扣'">
          满<el-input v-model="coupons.leastCost" maxlength="10" size="mini" style="width:15%" :disabled='true'></el-input>元
          打<el-input v-model="coupons.reduceDiscount" maxlength="10" size="mini" style="width:15%" :disabled='true'></el-input>折
        </el-form-item>
        <el-form-item label="制券类型:" prop="generateMode" :rules="[{required: true, message: '请选择制券类型', trigger: 'change'}]">
          <el-select v-model="coupons.generateMode" placeholder="请选择" size="mini" style="width: 80%" :disabled="true">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
       
         <!--  <el-upload
            class="upload-demo"
            ref="uploadPhoto"
            :action="action"
            :limit="1"
            :show-file-list="true"
            :file-list="coupons.cardCodes"
            :on-success="function(response, file, fileList){uploadSuccess (response, file, fileList,1)}"
            :on-preview="download"
            :on-error="uploadError"
            
            :before-upload="openUploadBefore" v-if= "coupons.generateMode == '手工导入'">
            <el-button slot="trigger" size="mini" type="danger" class="uploadBtn" @click="uploadPhoto" disabled='true'>上传文件</el-button>
            <div class="uploadFile-remark">*支持xls、cvs、xlsx文件</div>
          </el-upload>
          <el-input v-model="coupons.cardCodes" v-show="fileisShow" type="hidden"  size="mini"  style="width: 80%"></el-input> -->
        </el-form-item>
        <el-form-item label="发放方式:" prop="provideMode" :rules="[{required: true, message: '请选择发放方式', trigger: 'change'}]" >
          <el-select v-model="coupons.provideMode" placeholder="请选择" size="mini" style="width: 80%" :disabled='true'>
            <el-option
              v-for="item in publishs"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发放用户:" prop="provideUserType" :rules="[{required: true, message: '请选择发放用户', trigger: 'change'}]">
          <el-select v-model="coupons.provideUserType" placeholder="请选择发放用户" size="mini" style="width: 80%" :disabled='true'>
            <el-option value='全部' label="全部" ></el-option>
            <el-option value='导入' label="导入" ></el-option>
            <!-- <el-option
              v-for="item in [ { value:'全部', name:'全部' }, {value:'导入', name:'导入',disabled: true }]"
              :key="item.value"
              :label="item.name"
              disabled="item.disabled"
              :value="item.value">
            </el-option> -->
          </el-select>
          <!-- <el-upload
            class="upload-demo"
            ref="uploadPhoto"
            :action="action"
            :limit="1"
            :show-file-list="true"
            :file-list="coupons.memberIds"
            :on-success="function(response, file, fileList){uploadSuccess (response, file, fileList,2)}"
            :on-preview="download"
           
            :on-error="uploadError"
            :before-upload="openUploadBefore" v-if= "coupons.provideUserType == '导入'">
            <el-button slot="trigger" size="mini" type="danger" class="uploadBtn" @click="uploadPhoto" disabled='true'>上传文件</el-button>
            <div class="uploadFile-remark">*支持xls、cvs、xlsx文件</div>
          </el-upload>
          <el-input v-model="coupons.memberIds" v-show="fileisShow" type="hidden"  size="mini"  style="width: 80%"></el-input> -->
        </el-form-item>
        <el-form-item label="发放数量:" prop="outNum" :rules="[{required: true, message: '发放数量不能为空', trigger: 'blur'}]">
          <el-input v-model="coupons.outNum"  size="mini" style="width:80%" :disabled='true'></el-input>
        </el-form-item>
        <el-form-item label="增加数量:" prop="outNum" >
          <el-input v-model="coupons.extraNum"  size="mini" style="width:80%" :disabled='true'></el-input>
        </el-form-item>
        <el-form-item label="限制领取数量:" prop="limit" 
        :rules="[{required: true,  message:'请选择是否限制领取数量', trigger: 'change'}]" >
          <el-select v-model="coupons.limit" placeholder="请选择" size="mini" style="width: 80%"  :disabled="true">
            <el-option
              v-for="item in [{value:'0',name:'否'},{value:'1',name:'是'}]"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最大领取数量:" prop="getLimit" v-if="coupons.limit=='1'" >
          <el-input v-model="coupons.getLimit"  size="mini" style="width:80%" :disabled='true'></el-input>
        </el-form-item>
        <el-form-item label="开始时间:" prop="fixedBeginTerms" :rules="[{required: true, message: '开始时间不能为空', trigger: 'blur'}]">
          <el-date-picker
            style="width: 80%"
            size="mini"
            v-model="coupons.fixedBeginTerms"
            type="datetime"
            :disabled="true"
            placeholder="选择日期时间"
            default-time="00:00:00"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyyMMddHHmmss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:" prop="fixedEndTerms" :rules="[{required: true, message: '结束时间不能为空', trigger: 'blur'}]">
          <el-date-picker
            style="width: 80%"
            size="mini"
            v-model="coupons.fixedEndTerms"
            type="datetime"
            :disabled="true"
            placeholder="选择日期时间"
            default-time="23:59:59"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyyMMddHHmmss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="标题:" prop="title" :rules="[{required: true, message: '标题不能为空', trigger: 'blur'}]">
          <el-input v-model="coupons.title" maxlength="15" size="mini"  style="width: 80%" :disabled='true'></el-input>
        </el-form-item>
        <el-form-item label="副标题:" prop="subtitle" :rules="[{required: true, message: '副标题不能为空', trigger: 'blur'}]">
          <el-input v-model="coupons.subtitle" maxlength="15" size="mini"  style="width: 80%" :disabled='true'></el-input>
        </el-form-item>
        <el-form-item label="价格（元）:" prop="price" :rules="[{required: true, message: '价格不能为空', trigger: 'blur'}]">
          <el-input v-model="coupons.price"  size="mini"  style="width: 80%" :disabled='true'></el-input>
        </el-form-item>
       <!--  <el-form-item label="封面logo:" prop="LogoUrl">
          <el-upload
            class="upload-demo"
            ref="uploadPhoto"
            :action="action"
            :limit="1"
            
            :show-file-list="true"
            :file-list="coupons.LogoUrl"
            :on-success="function(response, file, fileList){uploadSuccess (response, file, fileList,3)}"
            :on-preview="download"
            :on-error="uploadError"
            :before-upload="openUploadBefore">
            <el-button slot="trigger" size="mini" type="danger" class="uploadBtn" @click="uploadPhoto" disabled='true'>上传文件</el-button>
            <div class="uploadFile-remark">*支持jpg、jpeg、png、git文件，文件小于1M</div>
          </el-upload>
          <el-input v-model="coupons.imageUrl" v-show="fileisShow" type="hidden"  size="mini"  style="width: 80%"></el-input>
        </el-form-item> -->
        <el-form-item label="卡券说明" :rules="[{required: true, message: '卡券说明不能为空', trigger: 'blur'}]" prop="description">
          <el-input type="textarea" v-model="coupons.description" :disabled='true'></el-input>
        </el-form-item>
      
     <!--  <span slot="footer" class="dialog-footer" v-if="title=='卡券新增'||title=='卡券修改'">
      <el-button @click="handleClose">取 消</el-button>
       <el-button type="primary" @click="function(){addtoUpdate('yes')} " :disabled="isDisable">保 存</el-button>
      <el-button type="primary" @click="function(){addtoUpdate('no')}" :disabled="isDisable">提交审核</el-button>
    </span>
    <span slot="footer" class="dialog-footer" v-else>
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary"@click="handleClose" :disabled="isDisable">确 定</el-button>
      
    </span> -->
   
         <div class="uploadFile-remark" v-for="(item,index) of history" :key="index" style="margin-left:40px">
           {{index+1}}{{item.fieldDesc}}、从"{{item.oldValue}}"修改为"{{item.newValue}}"&nbsp&nbsp&nbsp&nbsp
         </div>
        <el-form-item label="审核意见" prop="checkStatus">
          <template>
            <el-radio v-model="coupons.checkStatus" label="yes">通过</el-radio>
            <el-radio v-model="coupons.checkStatus" label="no">拒绝</el-radio>
          </template>
        </el-form-item>
       </el-form>
    
      <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="addOperator" :disabled="isDisable">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import {SESSION_STOART_MENUS} from "../../utils/ConstUtils.js"
  import {formatUnixtimestamp,buildRequestURL,toDataTime} from '../../../config/util'
  import {SESSION_STORAGE_USER} from "../../utils/ConstUtils.js"
  export default {
    name: "bannerReviewManagement",
    data() {
      return {
        approve:false,
        typeList:[
          {
            value:"系统发放",
            name:"系统发放"
          },
          {
            value:"手工导入",
            name:"手工导入"
          },
          {
            value:'外部领券',
            name:'外部领券'
          }
        ],
        couponTypeList:[
          {
            value:'通用',
            name:'通用'
          },
          {
            value:'满减',
            name:'满减'
          },
          {
            value:'折扣',
            name:'折扣'
          }
        ],
        publishs:[
          {
            value:'主动购买',
            name:'主动购买'
          },
          {
            value:'自动发放',
            name:'自动发放'
          }
        ],
        couponStatusList:[
          {
            value:'',
            name:'全部'
          },
          {
            value:0,
            name:"待提交"
          },
          {
            value:1,
            name:"待审核"
          },
          {
            value:2,
            name:"审核通过"
          },
         /*  {
            value:"已结束",
            name:"已结束"
          }, */
          {
            value:'5',
            name:'已拒绝'
          },
          {
            value:'6',
            name:'已删除'
          }
        ],
        searchParams:{
          page:1,
          pageSize:10,
          generateMode:'',
          creDate:[]
        },
        isDisable:false,
        isdisable:true,
        
        bannerReviews:false,
        coupons:{
         
        },
        history:[],
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
            {required: true, message: '请选择审核状态', trigger: 'change'},
          ],
          
        },
      }
    },
    methods : {
      //清除验证
      clearVail(){
        
        this.coupons = {};
        
        this.$refs['coupons'].clearValidate();
      },
      handleClose() {
        this.approve =false;
        this.clearVail();
        this.bannerReviews = false;

      },
      //提交审核
      addOperator (val) {
        
        console.log(this.coupons)
        this.$refs['coupons'].validate((valid) => {
          if (valid) {
            let _this = this;
            this.isDisable=true;
            _this.$http.post(_this.api.API_GATEWATE + 'mango/nuts/approveCouponRule', this.coupons, _this.GLOBAL.topheaders())
              .then(function (res) {
                this.isDisable=false;
                console.log(res.data)
                if(res.data){
                  _this.$message({
                    message: "审核成功",
                    type: 'success'
                  });
                  this.init();
                  _this.approve= false;
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
      //查询修改
      queryDiff(val){
        let _this = this;
        _this.$http.get(_this.api.API_GATEWATE+'mango/nuts/couponHisDiff/'+val.couponId,_this.GLOBAL.topheaders())
          .then(function(res){
            if(res.data){ this.history = res.data;}
           
           
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
      //查询卡券
      querycoupon (val) {
        let _this = this;
        _this.$http.get(_this.api.API_GATEWATE+'mango/nuts/couponDetail/'+val.couponId,_this.GLOBAL.topheaders())
          .then(function(res){
         
            if(res){
              
               /* e.createdTime = formatUnixtimestamp(e.createTimestamp) */
               
              console.log(res)
              _this.coupons= res.data;
              if(_this.coupons.getLimit == -1){
                
                _this.coupons.limit = '0'
              }else{
                _this.coupons.limit = '1'
              }
               _this.coupons.fixedBeginTerms = formatUnixtimestamp(_this.coupons.fixedBeginTerm);
               _this.coupons.fixedEndTerms = formatUnixtimestamp(_this.coupons.fixedEndTerm)
            /*   if(_this.coupons.price){
                 _this.coupons.price = _this.coupons.price/100
               }else{
                 _this.coupons.price = 0
               } */
             
              
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
      //获取按钮方法
      getOperating (val) {
        console.log(val)
        this.approve = true
        if(val.couponId){
         this.querycoupon(val)
         this.queryDiff(val);
        }
        let _this = this;
        this.tableDatas = val;
        
      },
      handleSizeChange (val) {
        this.params.pageSize = val;
        this.init();
      },
      handleCurrentChange (val) {
        
        this.searchParams.page = val;console.log(this.searchParams.page)
        this.init();
      },
      //搜索
      queryCounponList () {
        
        if(this.searchParams.creDate && this.searchParams.creDate.length>0){
          this.searchParams.beginDate = this.searchParams.creDate[0];
          this.searchParams.endDate = this.searchParams.creDate[1];
        }else{
          this.searchParams.beginDate ="";
          this.searchParams.endDate ="";
        }
        console.log(this.searchParams)
        this.isdisable = false
        this.init();
      },
      //导出
      getExport(){

          let _this = this;
          //获取导出的条件参数：起止时间与开户渠道
         this.params.generateMode = this.searchParams.generateMode
          if(this.searchParams.creDate && this.searchParams.creDate.length>0){
            this.params.beginDate = this.searchParams.creDate[0];
            this.params.endDate = this.searchParams.creDate[1];
          }else{
            this.params.beginDate ="";
            this.params.endDate ="";
          }
          if(!this.params.beginDate && !this.params.endDate && !this.params.generateMode){
            this.$message({
              message: "请输入搜索条件进行导出",
              type: 'info'
            });
            return
          }
          _this.params.page = 1;
          _this.params.pageSize = _this.total;
          console.log(_this.params)
          window.location.href=buildRequestURL(_this.api.API_GATEWATE+'mango/nuts/exportApproveCoupon',_this.params)
          /* let el = document.getElementById('isa');
          console.log(_this.params)
          el.href=buildRequestURL(_this.api.API_GATEWATE+'mango/nuts/exportApproveCoupon',_this.params)
          el.click();
         */

      },
      init () {
        let _this = this;
        _this.$http.post(_this.api.API_GATEWATE+'mango/nuts/approveCouponRuleList',_this.searchParams,_this.GLOBAL.topheaders())
          .then(function(res){
            let tableData = [];
            if(res && res.data && res.data.list &&  res.data.list.length>0){
              tableData =  res.data.list;
              tableData.forEach(e =>{
                e.createdTime = formatUnixtimestamp(e.createTimestamp)
                if(e.undercarriage){
                 switch(e.undercarriage){
                   case 0:
                    e.undercarriages = "待提交";
                    break;
                  case 1:
                    e.undercarriages = "待审核";
                    break;
                  case 2:
                    e.undercarriages = "审核通过";
                    break;
                 /*  case 3:
                    e.undercarriages = "审核通过";
                    break;
                  case 4:
                    e.undercarriages = "审核通过";
                    break; */
                  case 5:
                    e.undercarriages = "已拒绝";
                    break;
                  case 6:
                    e.undercarriages = "已删除";
                    break;
                 }
               }
               if(e.price){
                 e.price = e.price/100
               }else{
                 e.price = ''
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

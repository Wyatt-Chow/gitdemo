<template>
  <div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 700px;overflow:auto;">
      <div class="main_top_01">
        <el-row style="margin-bottom:20px">
          <el-col :span="24">
           
            <label style="padding-left: 30px">类型:</label>
            <el-select style="width:20%" size="mini" v-model="type">
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
              v-model="creDate"
              type="daterange"
            
              value-format="yyyyMMdd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="margin-bottom:20px">
            <label style="padding-left: 30px">状态:</label>
            <el-select style="width:20%" size="mini" v-model="checkStatus">
              
              <el-option
                v-for="item in couponStatusList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            <label style="padding-left: 50px">卡券名称:</label>
            <el-input style="width:25%;" size="mini" v-model="name" maxlength="20"></el-input>
           <!--  <label style="padding-left: 50px">上架日期:</label>
            <el-date-picker
              style="width:25%"
              size="mini"
              v-model="arrivalDate"
              type="daterange"
             
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker> -->
            <el-button type="primary"  size="mini" @click="queryBannerList" style="margin-left: 3%;" :disabled="isDisable">搜索</el-button>
            <el-button  style="margin-left:10px" size="mini" type="primary"  v-if="authButton.some(e=>{return e.resourceId == 160})" @click.stop="getExport" :disabled="isdisable">导出</el-button>
            <a  id="isa" href=""></a>
            <el-button style="float: right; padding-right: 20px;"  type="primary" v-if="authButton.some(e=>{return e.resourceId == 159})" @click="getOperatorButton">新增卡券</el-button>
          </el-col>
        </el-row>
      </div>
        <el-table ref="multipleTable" :default-sort = "{prop: 'id', order: 'ascending'}" :data="tableData" border stripe tooltip-effect="dark" style="width: 100%">
          <el-table-column label="卡券编号"   show-overflow-tooltip prop="couponId" width="80"></el-table-column>
          <el-table-column label="创建时间"   show-overflow-tooltip prop="createdTime" width="150"></el-table-column>
          <el-table-column label="卡券名称"  show-overflow-tooltip prop="couponName" width="100"></el-table-column>
          <el-table-column label="归属商户"  show-overflow-tooltip prop="mchName" width="100"></el-table-column>
           <el-table-column label="开始时间"   show-overflow-tooltip prop="fixedBeginTerm" width="150"></el-table-column>
          <el-table-column label="结束时间"   show-overflow-tooltip prop="fixedEndTerm" width="150"></el-table-column>
          <el-table-column label="发放数量"   show-overflow-tooltip prop="outNum" width="80"></el-table-column>
         

          <el-table-column prop="couponNum" label="领取数量" show-overflow-tooltip ></el-table-column>
          
          
          <el-table-column prop="undercarriages" label="状态" show-overflow-tooltip ></el-table-column>
          <el-table-column prop="generateMode" label="类型" show-overflow-tooltip ></el-table-column>
          <el-table-column
           
            fixed="right"
            label="操作"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-dropdown :hide-on-click="false">
                <span class="el-dropdown-link">
                  <i class="el-icon-menu"></i><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" v-if="scope.row.undercarriage!=6">
                   <el-dropdown-item v-if="scope.row.undercarriage!=2" @click.native="showmore(scope.row)">查看</el-dropdown-item>
                   <el-dropdown-item v-if="scope.row.undercarriage==5 ||scope.row.undercarriage==0" 
                   @click.native="del(scope.row)">
                     删除
                    </el-dropdown-item>
                   <el-dropdown-item  @click.native="details(scope.row)" 
                    v-if="scope.row.undercarriage==2">明细</el-dropdown-item>
                   <el-dropdown-item  @click.native="update(scope.row)" v-if="scope.row.undercarriage==0||scope.row.undercarriage==5 ||scope.row.undercarriage==2">修改</el-dropdown-item>
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
      :before-close="handleClose" >
      <el-form ref="banners" :rules="rules" :model="coupons" label-width="120px" style="height:400px;overflow:auto">
        <el-form-item label="卡券名称:" prop="couponName" :rules="[{required: true, message: '卡券名称不能为空', trigger: 'blur'}]">
          <el-input v-model="coupons.couponName" maxlength="15" size="mini" style="width:80%" :disabled="title!='卡券新增'||show"></el-input>
        </el-form-item>
         <el-form-item label="卡券类型:" prop="cardType" :rules="[{required: true, message: '请选择卡券类型', trigger: 'change'}]">
          <el-select v-model="coupons.cardType" placeholder="请选择" size="mini"  style="width: 80%" :disabled="title!='卡券新增'||show">
            <el-option
              v-for="item in couponTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="满减规则:" prop="leastCost" v-if="coupons.cardType =='满减'" :rules="[{required: true,  validator:valeastCost, trigger: 'blur'}]">
          满<el-input v-model="coupons.leastCost" maxlength="10" size="mini" style="width:28%" :disabled="title!='卡券新增'||show" placeholder="支持两位小数" ></el-input>元
          减<el-input v-model="coupons.reduceCost" maxlength="10" size="mini" style="width:28%" :disabled="title!='卡券新增'||show" placeholder="支持两位小数"></el-input>元
        </el-form-item>
        <el-form-item label="折扣规则:" prop="reduceDiscount"  v-if="coupons.cardType =='折扣'" :rules="[{required: true,  validator:vareduceDiscount, trigger: 'blur'}]">
          满<el-input v-model="coupons.leastCost" maxlength="10" size="mini" style="width:28%" :disabled="title!='卡券新增'||show" placeholder="支持两位小数" ></el-input>元
          打<el-input v-model="coupons.reduceDiscount" maxlength="10" size="mini" style="width:28%" :disabled="title!='卡券新增'||show" >
            </el-input>折
        </el-form-item>
        <el-form-item label="制券类型:" prop="generateMode" :disabled="title!='卡券新增'||show"
        :rules="[{required: true, message: '请选择制券类型', trigger: 'change'}]">
          <el-select v-model="coupons.generateMode" placeholder="请选择" size="mini" style="width: 80%" :disabled="title!='卡券新增'||show">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
       
          <el-upload
            class="upload-demo"
            ref="uploadPhoto"
            :action="action"
            :limit="1"
            :show-file-list="true"
            :file-list="coupons.cardCodes"
            :on-success="function(response, file, fileList){uploadSuccess (response, file, fileList,1)}"
            :on-preview="download"
            :before-upload="function(file){return openUploadBefore(file,1)} "
            :on-error="uploadError"
            :disabled="title!='卡券新增'||show"
             v-if= "coupons.generateMode == '手工导入'">
            <el-button slot="trigger" size="mini" type="danger" class="uploadBtn" @click="uploadPhoto">上传文件</el-button>
            <div class="uploadFile-remark">*支持xls、xlsx文件</div>
          </el-upload>
          <el-input v-model="coupons.cardCodes" v-show="fileisShow" type="hidden"  size="mini"  style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="发放方式:" prop="provideMode" :rules="[{required: true, message: '请选择发放方式', trigger: 'change'}]" >
          <el-select v-model="coupons.provideMode" placeholder="请选择" size="mini" style="width: 80%" :disabled="title!='卡券新增'||show">
            <el-option
              v-for="item in publishs"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="全场通用:" prop="mchUnlimited" :rules="[{required: true,  validator:vamchUnlimited, trigger: 'change'}]" >
          <el-select v-model="coupons.mchUnlimited" placeholder="请选择" size="mini" style="width: 80%"  :disabled="title!='卡券新增'||show">
            <el-option
              v-for="item in [{value:'0',name:'否'},{value:'1',name:'是'}]"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="归属商户:" prop="mchId"  :rules="[{required: coupons.mchUnlimited != 1, message: '请选择归属商户', trigger: 'change'}]" v-if="coupons.mchUnlimited === '0'">
          <el-select v-model="coupons.mchId" placeholder="请选择" size="mini" style="width: 80%" :disabled="title!='卡券新增'||show">
            <el-option
              v-for="item in mchList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="卡券级别:" prop="applyType"  :rules="[{required: true, message: '请选择卡券级别', trigger: 'change'}]">
          <el-select v-model="coupons.applyType" placeholder="请选择" size="mini" style="width: 80%" :disabled="title!='卡券新增'||show">
            <el-option
              v-for="item in [{value:'门店',label:'门店'},{value:'商品',label:'商品'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发放用户:" prop="provideUserType" :rules="[{required: true, message: '请选择发放用户', trigger: 'change'}]">
          <el-select v-model="coupons.provideUserType" placeholder="请选择发放用户" size="mini" style="width: 80%" :disabled="title!='卡券新增'||show">
            <el-option value='全部' label="全部" :disabled="coupons.generateMode=='手工导入'&&coupons.provideMode=='自动发放'"></el-option>
            <el-option value='导入' label="导入" :disabled="coupons.provideMode=='主动购买'"></el-option>
            <!-- <el-option
              v-for="item in [ { value:'全部', name:'全部' }, {value:'导入', name:'导入',disabled: true }]"
              :key="item.value"
              :label="item.name"
              :disabled="item.disabled"
              :value="item.value">
            </el-option> -->
          </el-select>
          <el-upload
            class="upload-demo"
            ref="uploadPhoto"
            :action="action"
            :limit="1"
            :show-file-list="true"
            :before-upload="function(file){return openUploadBefore(file,1)} "
            :file-list="coupons.memberIds"
            :on-success="function(response, file, fileList){uploadSuccess (response, file, fileList,2)}"
            :on-preview="download"
            :disabled="title!='卡券新增'||show"
            :on-error="uploadError"
            v-if= "coupons.provideUserType == '导入'">
            <el-button slot="trigger" size="mini" type="danger" class="uploadBtn" @click="uploadPhoto">上传文件</el-button>
            <div class="uploadFile-remark">*支持xls、xlsx文件</div>
          </el-upload>
          <el-input v-model="coupons.memberIds" v-show="fileisShow" type="hidden"  size="mini"  style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="发放数量:" prop="outNum" :rules="[{required: true, message: '发放数量不能为空', trigger: 'blur'}]">
          <el-input v-model="coupons.outNum"  size="mini" style="width:80%" :disabled="title!='卡券新增'||show"></el-input>
        </el-form-item>
        <el-form-item label="增加数量:" prop="couponNumAdd" v-if="title!='卡券新增'">
          <el-input v-model="coupons.couponNumAdd"  size="mini" style="width:80%" :disabled="show"></el-input>
        </el-form-item>
        <el-form-item label="限制领取数量:" prop="limit" 
        :rules="[{required: true,  message:'请选择是否限制领取数量', trigger: 'change'}]" >
          <el-select v-model="coupons.limit" placeholder="请选择" size="mini" style="width: 80%"  :disabled="title!='卡券新增'||show">
            <el-option
              v-for="item in [{value:'0',name:'否'},{value:'1',name:'是'}]"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最大领取数量:" prop="getLimit" 
        :rules="[{required: true, message: '最大领取数量不能为空', trigger: 'blur'}]" v-if="coupons.limit=='1'">
          <el-input v-model="coupons.getLimit"  size="mini" style="width:80%" :disabled="title!='卡券新增'||show"></el-input>
        </el-form-item>
         <el-form-item label="使用地址:" prop="customUrl" >
          <el-input v-model="coupons.customUrl"  size="mini" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="开始时间:" prop="fixedBeginTerm" :rules="[{required: true, message: '开始时间不能为空', trigger: 'blur'}]">
          <el-date-picker
            style="width: 80%"
            size="mini"
            v-model="coupons.fixedBeginTerm"
            type="datetime"
            :disabled="show"
            placeholder="选择日期时间"
            default-time="00:00:00"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyyMMddHHmmss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:" prop="fixedEndTerm" :rules="[{required: true, message: '结束时间不能为空', trigger: 'blur'}]">
          <el-date-picker
            style="width: 80%"
            size="mini"
            v-model="coupons.fixedEndTerm"
            type="datetime"
            :disabled="show"
            placeholder="选择日期时间"
            default-time="23:59:59"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyyMMddHHmmss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="标题:" prop="title" :rules="[{required: true, message: '标题不能为空', trigger: 'blur'}]">
          <el-input v-model="coupons.title" maxlength="30" size="mini"  style="width: 80%" :disabled="show"></el-input>
        </el-form-item>
        <el-form-item label="副标题:" prop="subtitle" :rules="[{required: true, message: '副标题不能为空', trigger: 'blur'}]">
          <el-input v-model="coupons.subtitle" maxlength="30" size="mini"  style="width: 80%" :disabled="show"></el-input>
        </el-form-item>
        <el-form-item label="价格（元）:" prop="price" :rules="[{required: true, message: '价格不能为空', trigger: 'blur'}]">
          <el-input v-model="coupons.price"  size="mini"  style="width: 80%" :disabled="title!='卡券新增'||show"></el-input>
        </el-form-item>
        <el-form-item label="封面logo:" prop="LogoUrl">
          <el-upload
            class="upload-demo"
            ref="uploadPhoto"
            :action="action"
            :limit="1"
            :disabled="title!='卡券新增'"
            :show-file-list="true"
            :file-list="coupons.LogoUrl"
            :on-success="function(response, file, fileList){uploadSuccess (response, file, fileList,3)}"
            :on-preview="download"
            :on-error="uploadError"
            :before-upload="function(file){return openUploadBefore(file,2)} ">
            <el-button slot="trigger" size="mini" type="danger" class="uploadBtn" @click="uploadPhoto" :disabled="show">上传文件</el-button>
            <div class="uploadFile-remark">*支持jpg、jpeg、png、gif文件，文件小于1M</div>
          </el-upload>
          <!-- <el-input v-model="coupons.imageUrl" v-show="fileisShow" type="hidden"  size="mini"  style="width: 80%"></el-input> -->
        </el-form-item>
        <el-form-item label="卡券说明" :rules="[{required: true, message: '卡券说明不能为空', trigger: 'blur'}]" prop="description">
          <el-input type="textarea" v-model="coupons.description" :disabled="show"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="title=='卡券新增'||title=='卡券修改'">
      <el-button @click="handleClose">取 消</el-button>
       <el-button type="primary" @click="function(){addtoUpdate('yes')} " :disabled="isDisable" v-if="canSave">保 存</el-button>
      <el-button type="primary" @click="function(){addtoUpdate('no')}" :disabled="isDisable">提交审核</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-else>
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleClose" :disabled="isDisable">确 定</el-button>
      
      </span>
    </el-dialog>
  </div>
</template>

<script>

  import {formatUnixtimestamp,buildRequestURL,toDataTime,toData} from '../../../config/util'
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
    name: "couponList",
    computed:{
      //下拉选限制
        isdr:function(){
          if(this.coupons.generateMode=='系统发放'&&this.coupons.provideMode=='主动购买'){
            return true
          }
          if(this.coupons.generateMode=='手工导入'&&this.coupons.provideMode=='主动购买'){
            return true
          }
           if(this.coupons.generateMode=='外部领券'&&this.coupons.provideMode=='主动购买'){
            return true
          }
        },
        isqb:function(){
           
          if(this.coupons.generateMode=='手工导入'&&this.coupons.provideMode=='自动发放'){
            return true
          }else{
            return false;
          }
        },
    },
    data() {
      return {
        /* startTime: {
          disabledDate: time => {
            return time.getTime() > Date.now();
          }
        },
        arrivalTime:{
          disabledDate: time => {
            return time.getTime() > Date.now();
          }
        }, */
        
        //搜索条件
        name:'',
        creDate:[],
        type:'',
        checkStatus:'',

        //新增或修改，卡券对象
        coupons:{
          couponName:'',
          cardType:'',
          generateMode:'',
          reduceCost:'',
          reduceDiscount:'',
          leastCost:'',
          fixedEndTerm:'',
          fixedBeginTerm:'',
          getLimit:'',
          provideMode:'',
          provideUserType:'',
          outNum:'',
          title:'',
          subtitle:'',
          price:'',
          LogoUrl:'',
          description:'',
          memberIds:'',
          cardCodes:'',
          applyType:'',
          customUr:'',
          mchUnlimited:'',
          mchId:undefined,
        },
        //下拉选项
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
        publishUsers:'',
        publishUserList:'',
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
         /*  {
            value:'6',
            name:'已删除'
          } */
        ],
        canSave:true,
        fileisShow:false,
        uploadData:{
          uploadFile:'',
        },
        action:this.api.API_GATEWATE+'mango/privateupload',
        title:"",
        banner:false,
        isDisable:false,
        isdisable:true,
        show:false,
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
        },
        params:{
          page:1,
          pageSize:10,
          couponName:'',
          cardType:'',
          generateMode:'',
          beginDate:'',
          endDate:'',
          total:''
        },
        mchList:[],
        param:{},
        total:0,
        rules: {
          name: [
            {required: true, message: 'Banner名称不能为空', trigger: 'blur'},
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
            {required: true, message: '请点击上传文件', trigger: 'blur'},
          ],
        },
      }
    },
    watch:{
      mchUnlimited(val){
        if(val=='1'){
          this.coupons.mchId=''
        }
      }
    },
    computed:{
     mchUnlimited(){
        return this.coupons.mchUnlimited
      }
    },
    methods : {
      vamchUnlimited(rule, value,callback){
        
        if(this.coupons.mchUnlimited === undefined){
          return callback(new Error('请选择是否全场通用'))
        } else{
          return callback()
        } 
        
      },
      valeastCost(rule, value,callback){
        console.log(this.coupons.leastCost)
        if(!this.coupons.leastCost || !this.coupons.reduceCost){
          return callback(new Error('满减金额不能为空'))
        } else{
          return callback()
        } 
        
      },
      /* vareduceCost(rule, value,callback){
        console.log(this.coupons.reduceCost)
        if(!this.coupons.reduceCost){
          return callback(new Error('满减金额不能为空'))
        } else{
          return callback()
        } 
        
      }, */
      vareduceDiscount(rule, value,callback){
       /*  console.log(this.coupons.reduceDiscount) */
        if(!this.coupons.reduceDiscount || !this.coupons.leastCost){
          return callback(new Error('满减折扣不能为空'))
        } else{
          return callback()
        } 
        
      },
      //搜索
      queryBannerList(){
       
        this.params.couponName = this.name;
        this.params.page =1;
        this.params.undercarriage = this.checkStatus;
        this.params.generateMode = this.type;
        
        if(this.creDate && this.creDate.length>0){
          this.params.beginDate = this.creDate[0];
          this.params.endDate = this.creDate[1];
        }else{
          this.params.beginDate ="";
          this.params.endDate ="";
        }
        this.isdisable = false;
        this.init();
      },
      //明细
      details (val) {
        this.$router.push({ name: 'couponDetails', params: { coupons: val }})
      },
      //查看
      showmore(val) {
        this.title = '卡券查看'
        this.show = true;
        this.banner = true;
        this.querycoupon(val)
        console.log(val.couponId)
      },
      //导出
      getExport(){
        this.param.couponName = this.name;
        this.param.page =1;
        this.param.undercarriage = this.checkStatus;
        this.param.generateMode= this.type;
        this.param.pageSize = this.total;
        if(this.creDate && this.creDate.length>0){
          this.param.beginDate = this.creDate[0];
          this.param.endDate = this.creDate[1];
        }else{
          this.param.beginDate ="";
          this.param.endDate ="";
        }
        console.log(this.param)
        if(!this.param.beginDate && !this.param.endDate && !this.param.couponName&& (this.param.undercarriage==='')&&!this.param.generateMode){
            this.$message({
              message: "请输入搜索条件进行导出",
              type: 'info'
            });
            return
        }
        let el = document.getElementById('isa');
        console.log(this.param)
        el.href=buildRequestURL(this.api.API_GATEWATE+'mango/nuts/exportCouponRule',this.param)
        el.click();
        

      },
      uploadPhoto (){
        this.$refs.uploadPhoto.submit();
      },
      //上传之前
      openUploadBefore(file,val){
        
        //file = file.name.substring(0,file.name.indexOf("."));
        const nameArr = file.name.split('.');
        const extension = nameArr[nameArr.length - 1].toLowerCase() === 'jpg'
        const extension2 = nameArr[nameArr.length - 1].toLowerCase() === 'jpeg'
        const extension3 = nameArr[nameArr.length - 1].toLowerCase() === 'png'
        const extension4 = nameArr[nameArr.length - 1].toLowerCase() === 'gif'
        const extension5 = nameArr[nameArr.length - 1].toLowerCase() === 'bmp'
        const extension6 = nameArr[nameArr.length - 1].toLowerCase() === 'xlsx'
        const extension7 = nameArr[nameArr.length - 1].toLowerCase() === 'xls'
        const isLt2M = file.size / 1024 / 1024 < 1
        if(val==2){
          if (!extension && !extension2 && !extension3 && !extension4 && !extension5) {
            this.$message.error('上传封面只支持jpg、jpeg、png、gif、bmp文件')
            return false
          }
          if (!isLt2M) {
            this.$message.error('上传失败，上传文件大小不能超过1M')
            return false
          }
         
        }else if(val==1){
          if(!extension6 && !extension7){ this.$message.error('只支持xls、xlsx文件');return false}
          
        }
        
      },
      //点击文件列表中已上传的文件时的钩子
      download (file){
        
        window.open(file.url ? file.url : this.api.API_GATEWATE+'mango/static/'+file.response.msg);
      },
      // 上传成功后的回调
      uploadSuccess (response, file, fileList,val) {

        console.log(val)
        if(response.key == "000000"){
          file.name = response.msg;
          switch(val){
            case 1:
              this.coupons.cardCodes = response.msg
              break
            case 2:
              this.coupons.memberIds = response.msg
              break
            case 3:
              this.coupons.LogoUrl = response.msg;
              break
          }
         console.log(this.coupons)
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
        this.coupons={};
        this.banners.roles=[];
        if(this.$refs.banners){this.$refs['banners'].clearValidate();}
        
      },
      getOperatorButton (){
        console.log(this.coupons)
        this.title="卡券新增";
        this.fileList=[];
      
        this.banner = true;
        this.clearVail();
       /*  this.banners={loadStyle:"POPUP",osPlatform:'ALL'}; */
      },
      handleClose() {
        this.clearVail();
        this.show = false;
        this.banner = false;
        this.canSave = true
      },
      addtoUpdate (val){
        
        if(this.title == "卡券新增"){
          this.addOperator(val)
        }else{
          this.updataOperator(val)
        }
      },
      update(val){
        console.log(val)
        this.banner = true;
        this.title = '卡券修改'
        this.querycoupon(val)
      },
      //删除
      del(val){
        console.log(val)
        
         let _this = this;
          _this.$confirm('确定删除卡券?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.$http.delete(_this.api.API_GATEWATE+'mango/nuts/couponDelete/'+val.couponId,_this.GLOBAL.topheaders())
              .then(function(res){

                if(res.data == true) {
                  _this.$message({
                    message: "删除成功",
                    type: 'success'
                  });
                  this.searchParams.page=1;
                  this.init();
                  //控制台打印错误返回的内容
                }
              }.bind(this))
              .catch(function(err){
                if(err.body) {
                  console.log(err.body.msg)
                  _this.$message({
                    message: err.body.msg,
                    type: 'error'
                  });
                  //控制台打印错误返回的内容
                }
              }.bind(this))
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      },
      //修改
      updataOperator (val) {
        this.coupons.isSave = val
        this.$refs['banners'].validate((valid) => {
          if (valid) {
            let _this = this;
            console.log(_this.coupons)
           /*  if(_this.coupons.leastCost){
              _this.coupons.leastCost=_this.coupons.leastCost*100
            }
            if(_this.coupons.reduceCost){
              _this.coupons.reduceCost=_this.coupons.reduceCost*100
            }
            if(_this.coupons.reduceCost){
              _this.coupons.price=_this.coupons.price*100
            } */
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
            
            _this.$http.post(_this.api.API_GATEWATE + 'mango/nuts/couponUpdate',
              _this.coupons,
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
                  _this.canSave =true;
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
      addOperator (val) {
        console.log(val)
        
        this.$refs['banners'].validate((valid) => {
          if (valid) {
            let _this = this;
            /* let params = {};
           r
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
            _this.coupons.isSave = val;
            if(_this.coupons.limit === '0'){
              _this.coupons.getLimit = -1;
            }
            _this.$http.post(_this.api.API_GATEWATE + 'mango/nuts/couponAdd',
              _this.coupons,
              _this.GLOBAL.topheaders())
              .then(function (res) {
                this.isDisable=false;
                console.log(res.data)
                if(res.data){
                  _this.$message({
                    message: "新增卡券成功",
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
      

      //查询卡券
      querycoupon (val) {
        let _this = this;
        _this.$http.get(_this.api.API_GATEWATE+'mango/nuts/couponDetail/'+val.couponId,_this.GLOBAL.topheaders())
          .then(function(res){
          console.log(res)
           
            if(res){_this.coupons= res.data;}
            if(_this.coupons.fixedBeginTerm){
              _this.coupons.fixedBeginTerm = toData(formatUnixtimestamp(_this.coupons.fixedBeginTerm))
            }
            if(_this.coupons.fixedEndTerm){
              _this.coupons.fixedEndTerm = toData(formatUnixtimestamp(_this.coupons.fixedEndTerm))
            }
            if(_this.coupons.undercarriage == 2|| _this.coupons.undercarriage == 5){
              _this.canSave = false;
            }
            if(_this.coupons.getLimit == -1){
              _this.coupons.limit = '0'
            }else{
               _this.coupons.limit = '1'
            }
            /* 
            if(_this.coupons.price){
               _this.coupons.price = _this.coupons.price/100
            }else{
              _this.coupons.price = 0
            }
            if(_this.coupons.leastCost){
               _this.coupons.leastCost = _this.coupons.leastCost/100
            }else{
              _this.coupons.leastCost = ''
            }
            if(_this.coupons.reduceCost){
               _this.coupons.reduceCost = _this.coupons.reduceCost/100
            }else{
              _this.coupons.reduceCost = ''
            } */
           console.log(_this.coupons)

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
      /* getOperating (val,item) {
        
        let _this = this;
        this.tableDatas = val;
        _this.operatorInformation = [];
        if(item.resourceId == "banner_update"){
          _this.title="卡券更新";
          console.log(val);
           _this.coupons = {};
          for(let i in val){
            _this.$set(_this.coupons,i,val[i]);
          }
          console.log(_this.coupons);
          if(_this.coupons.LogoUrl){
              this.fileList =[{
                name: _this.coupons.LogoUrl,
                url: this.api.API_GATEWATE+'mango/static/'+_this.coupons.LogoUrl
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
      }, */
      handleSizeChange (val) {
        this.params.pageSize = val;
        this.init();
      },
      handleCurrentChange (val) {
        this.params.page = val;
        this.init();
      },
      /* 
      */
     //请求商户列表
      initMchList (){
        let _this = this;
        this.$http.post(_this.api.API_GATEWATE+'mango/getMchList',_this.searchParams,_this.GLOBAL.topheaders())
          .then(function(res){
           
          
           /*  _this.mchList =  res.data.list;*/
           
            for( let item of res.data.list){
              let obj = {};
              obj.label = item.mchShortName;
              obj.value = item.mchId
              _this.mchList.push(obj)
             
            } 
           this.init();
          })
      },
      init () {
        let _this = this;
        _this.$http.post(_this.api.API_GATEWATE+'mango/nuts/couponRuleList',_this.params,_this.GLOBAL.topheaders())
          .then(function(res){
            let tableData = [];
            if(res){
              tableData =  res.data.list;
              tableData.forEach(e =>{
               if(e.createTimestamp){e.createdTime = formatUnixtimestamp(e.createTimestamp)}
               if(e.fixedBeginTerm){e.fixedBeginTerm = formatUnixtimestamp(e.fixedBeginTerm)}
               if(e.fixedEndTerm){e.fixedEndTerm = formatUnixtimestamp(e.fixedEndTerm)}
               if(e.undercarriage!==''){
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
                if(e.price !==''){
                 e.price = e.price/100
                }else{
                 e.price = ''
                }
               }
             
               for(let item of _this.mchList){
                
                 if(e.mchId== item.value){
                    e.mchName = item.label;                   
                 }
               }
              })
              _this.tableData = tableData;
              console.log(_this.tableData)
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
      this.initMchList();
     
     
    }
  }
</script>


<style  lang="scss">
  .uploadFile-remark {
    margin-top: 10px;
    color: red;
  }
</style>

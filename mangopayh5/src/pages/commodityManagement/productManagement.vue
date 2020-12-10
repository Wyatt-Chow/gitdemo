<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 30px">商品名称:</label>
          <el-input size="mini" style="width:20%" v-model="titles">
          </el-input>
          <label style="padding-left: 50px">商品渠道:</label>
            <el-select v-model="goodsChannel" placeholder="请选择" size="mini">
             
              <el-option
                v-for="item in goodsChannelList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <label style="padding-left: 50px">商品种类:</label>
            <el-select v-model="category" placeholder="请选择" size="mini">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
           
        </el-col>
      </el-row>
       <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 30px">商品状态:</label>
          <el-select v-model="state" placeholder="请选择" size="mini">
              <el-option
                v-for="item in stateList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <label style="padding-left: 110px">归属商户:</label>
            <el-select v-model="belong" placeholder="请选择" size="mini">
              <el-option
                v-for="item in belongList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          <label style="padding-left: 50px">上架时间:</label>
         
          <el-date-picker
              style="width:25%"
              size="mini"
              v-model="searchtime"
              type="daterange"
              
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
      
     
    
           
          <el-button size="mini" type="primary" @click="queryProductOne" style="margin-left:55px" :disabled="isDisable">搜索</el-button>
          <el-button  style="margin-left:10px" size="mini" type="primary" v-if="item.resourceCode == 'vas_goods_report'"  v-for="item in authButton" :key="item.resourceId" @click.stop="getExport" :disabled="isdisable">导出</el-button>
          <a  id="isa" href="" target="_blank"></a>
        </el-col>
      </el-row>
      
      <el-row>
        <el-col :span="24" style="text-align: right;padding-right: 20px;">
          <el-button  type="primary" v-if="item.resourceCode == 'add'"  v-for="item in authButton" :key="item.resourceId" @click="getRedEnvelopeRuleButton">{{item.resourceDesc}}</el-button>
        </el-col>
      </el-row>
    </div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable" :data="tableData" stripe border tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="title" label="商品名称" show-overflow-tooltip width="150px" fixed="left"> </el-table-column>
          <el-table-column prop="id" label="商品ID" show-overflow-tooltip width="200px"> </el-table-column>
          <el-table-column prop="belongName" label="归属商户" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="seq" label="排序" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="vipDiscount" label="支持会员折扣" show-overflow-tooltip width="120px"> </el-table-column>
          <el-table-column prop="groupName" label="折扣名称" show-overflow-tooltip width="120px"> </el-table-column>
          <el-table-column prop="activityName" label="活动名称" show-overflow-tooltip width="120px"> </el-table-column>
          <el-table-column prop="cardCoupons" label="支持卡券" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="cardCouponId" label="卡券" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="channels" label="商品渠道" show-overflow-tooltip> </el-table-column>
          <el-table-column label="商品类别"  show-overflow-tooltip prop="categoryName">
          </el-table-column>
          <el-table-column prop="price" label="商品价格 (元)" show-overflow-tooltip width="120px">
          </el-table-column>
          <el-table-column prop="upTimes" label="上架时间" show-overflow-tooltip width="200px"> </el-table-column>
          <el-table-column prop="downTimes" label="下架时间" show-overflow-tooltip width="200px"> </el-table-column>
          
          <el-table-column prop="states" label="状态" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="body" label="商品描述" show-overflow-tooltip>
          </el-table-column>
         <!--  <el-table-column label="日期"  show-overflow-tooltip>
            <template slot-scope="scope">
              <span> {{ scope.row.createTimes | date('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
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
                   <el-dropdown-item  @click.native="onShelvesProduct(scope.row)" v-if="scope.row.state == 'OFF_SHELF'"  >
                    商品上架
                   </el-dropdown-item>
                  <el-dropdown-item  @click.native="getButton(scope.row,item)" v-if="item.resourceId == 68 && scope.row.state == 'OFF_SHELF'"  v-for="item in authButton" :key="item.resourceId">
                    商品修改
                  </el-dropdown-item>
                  <el-dropdown-item  @click.native="offShelfProduct(scope.row)" v-if="scope.row.state == 'ON_SHELVES'"  >
                    商品下架
                  </el-dropdown-item>
                  <el-dropdown-item  @click.native="getButton(scope.row,item)" v-if="(item.resourceId == 68 || item.resourceId == 69) &&scope.row.state == 'NORMAL'" v-for="item in authButton" :key="item.resourceId">{{item.resourceName}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-page">
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="searchParams.page"
                         :page-sizes="[10]" :page-size="searchParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-header>
    </el-container>
    <el-dialog
      :title="title"
      :visible.sync="productSync"
      width="60%"
      :before-close="handleClose">
      <el-form ref="productList" :inline="true"  :model="productList" label-width="120px">
        <el-form-item label="商品名称" prop="title" :rules="[{required: true, validator:validtitle, trigger: 'blur'}]">
          <el-input v-model="productList.title" size="mini" maxlength="30"  style="padding-left:8px"></el-input>
        </el-form-item>
         <el-form-item label="商品种类" prop="category" :rules="[{required: true, validator:validcategory, trigger: 'change'}]">
          <el-select v-model="productList.category"  placeholder="请选择" size="mini" >
            <el-option
              v-for="item in productTypeList"
              :key="item.typeValue"
              :label="item.typeName"
              :value="item.typeValue">
            </el-option>
          </el-select>
        </el-form-item>
         
        <el-form-item label="商品排序" prop="seq" :rules="[{required: true, validator:validseq, trigger: 'blur'}]">
          <el-input v-model="productList.seq" size="mini" maxlength="10"  style="padding-left:8px"></el-input>
        </el-form-item>
       
        <el-form-item label="归属商户" prop="belong" :rules="[{required: true, validator:validbelong, trigger: 'change'}]">
          <el-select v-model="productList.belong"  placeholder="请选择，支持搜索" size="mini" filterable>
            <el-option
              v-for="item in mchList"
              :key="item.mchId"
              :label="item.mchShortName"
              :value="item.mchId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联卡券" prop="associatedCouponId" 
         :rules="[{required: true, validator:validassociatedCouponId, trigger: 'change'}]" v-if="productList.category == 'CARD_COUPONS'">
          <el-select v-model="productList.associatedCouponId"  placeholder="请选择" size="mini" no-data-text='请先选择归属商户'>
             <el-option
              size="mini"
              v-for="item in couponList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" prop="price" :rules="[{required: true, validator:validprice, trigger: 'blur'}]">
          <el-input v-model="productList.price" size="mini" maxlength="13" placeholder="价格（元）" style="padding-left:8px"></el-input>
        </el-form-item>
        <el-form-item label="商品渠道" prop="channel" :rules="[{required: true, validator:validchannel, trigger: 'change'}]">
          <el-select v-model="productList.channel"  placeholder="请选择"  
          size="mini" :disabled="channelstates">
            <el-option
              v-for="item in channelList"
              :key="item.label"
              :label="item.label"
              :disabled="item.disabled"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        
        
         <el-form-item label="外部商品ID" prop="externalGoodsId" v-if="productList.channel == 'YES'"
         :rules="{required:(productList.channel == 'YES'),message:'外部ID不能为空', trigger: 'blur'}">
          <el-input v-model="productList.externalGoodsId" size="mini" maxlength="100" style="padding-left:8px"></el-input>
        </el-form-item>
        <el-form-item label="外部链接" prop="externalGoodsLinks" v-if="productList.channel == 'YES'">
          <el-input v-model="productList.externalGoodsLinks" size="mini" maxlength="999" style="padding-left:8px"></el-input>
        </el-form-item>
        <el-form-item label="商品详情" prop="body" :rules="[{required: true, validator:validbody, trigger: 'blur'}]">
          <el-input v-model="productList.body" size="mini" maxlength="100" style="padding-left:8px"></el-input>
        </el-form-item>
        <el-form-item label="支持会员折扣" prop="vipDiscount" :rules="[{required: true, validator:validvipDiscount, trigger: 'change'}]">
          <el-select v-model="productList.vipDiscount"  placeholder="请选择" size="mini" >
            <el-option
              v-for="item in [{label:'YES',value:'YES'},{label:'NO',value:'NO'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="折扣" prop="discountId" v-if="productList.vipDiscount == 'YES'" 
        :rules="{required:(productList.vipDiscount == 'YES'),validator:validgroupId, trigger: 'change'}">
          <el-select
            
            size="mini"
            filterable
            v-model="productList.groupId"
            
            placeholder="请选择折扣，支持搜索">
            <el-option
              size="mini"
              v-for="item in productDiscountList"
              :key="item.id"
              :label="item.groupName"
              :value="item.groupId">
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="支持卡券" prop="cardCoupons" :rules="[{required: true, validator:validcardCoupons, trigger: 'change'}]">
          <el-select v-model="productList.cardCoupons"  placeholder="请选择" size="mini">
            <el-option
              v-for="item in [{label:'YES',value:'YES'},{label:'NO',value:'NO'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="卡券" prop="couponsId" v-if="productList.cardCoupons == 'YES'" :rules="{required:(productList.cardCoupons == 'YES'),validator:validcouponsId, trigger: 'change'}"
       >
          <el-select
            multiple
            size="mini"
            filterable
            v-model="cardCouponIds"
            no-data-text='请先选择归属商户'
            placeholder="请选择卡券，支持搜索">
            <el-option
              size="mini"
              v-for="item in couponsList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="参与活动" prop="activityOnly" :rules="[{required: true, validator:validactivityOnly, trigger: 'change'}]">
          <el-select v-model="productList.activityOnly"  placeholder="请选择" size="mini">
            <el-option
              v-for="item in [{label:'仅参与活动',value:'YES'},{label:'参与活动还可参与其它优惠',value:'NO'},{label:'不参与',value:''}]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="活动名称" prop="activity" v-if="productList.activityOnly =='YES' ||productList.activityOnly =='NO'"
         :rules="[{required:(productList.activityOnly =='YES' ||productList.activityOnly =='NO'), validator:validactivity, trigger: 'change'}]">
          <el-select v-model="productList.activityId"  placeholder="请选择参与活动" size="mini">
            <el-option
              v-for="item in activityList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上架时间" prop="uptime" :rules="[{required: true, validator:validuptime, trigger: 'blur'}]">
          <el-date-picker v-model="productList.upTime" type="datetime" placeholder="选择日期时间" default-time="00:00:00"
            format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" :clearable="false"> 

          </el-date-picker>
        </el-form-item>
        <el-form-item label="下架时间" prop="downtime" :rules="[{required: true, validator:validdowntime, trigger: 'blur'}]">
          <el-date-picker v-model="productList.downTime" type="datetime" placeholder="选择日期时间" default-time="23:59:59"
            format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" :clearable="false"> 

          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="escReturn">取 消</el-button>
      <el-button type="primary" @click="addWhetherUpadate('productList')"  :disabled="isDisable">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import {SESSION_STOART_MENUS} from "../../utils/ConstUtils.js"
  import {isvalidString,isvalidAmountmoney} from '../../../config/validate'
  import {toTime,buildRequestURL,formatUnixtimestamp} from "../../../config/util.js"
  let validtitle=(rule, value,callback)=> {

    if (!value) {
      callback(new Error('商品名称不能为空!'))
    } else if (!isvalidString(value)) {
      callback(new Error('请输入中文、英文或数字'))
    } else {
      callback()
    }
  };
  let valiAmountmoney =(rule, value,callback)=>{

    if (!value){
      callback(new Error('商品价格不能为空!'))
    }else  if (!isvalidAmountmoney(value) || value == 0){
      callback(new Error('请输入正数,小数只允许两位!'))
    }else {
      callback()
    }
  };
  
  let validdowntime =(rule, value,callback)=> {

    if (!value) {
      callback(new Error('下架时间不能为空!'))
    } 
  };
  export default {
    name: "productManagement",
    data() {
      return {
        urlList:'',
        isDisable:false,
        isdisable:true,
        categoryList:[{
          value : "PHONE_CHARGE",
          lable : "话费充值"
        }],
        goodsChannelList:[{value:'',label:'全部'},{value:'NO',label:'内部商品'},{value:'YES',label:'外部商品'}],
        channelstates:false,
        couponList:[],
        options: [
          {
            value:"",
            label:'全部'
          },
          {
            value: 'CARD_COUPONS',
            label: '卡券商品'
          },
          {
            value: 'PHONE_CHARGE',
            label: '话费充值'
          },
          {
            value: 'GENERAL_GOODS',
            label: '通用商品'
          }
        ],
        stateList:[
          {
            value:'',
            label:'全部'
          },
          {
            value:"OFF_SHELF",
            label:'已下架'
          },
          {
            value:"DISABLE",
            label:'已删除'
          },
          {
            value:"ON_SHELVES",
            label:'已上架'
          },
          {
            value:"NORMAL",
            label:'待上架'
          },
        ],
        cardCouponIds:[],
        belongList:[

        ],
        //搜索条件
        titles:'',
        goodsChannel:'',
        title:"",
        category:"",
        state:'',
        belong:'',
        beginDate:'',
        searchtime:'',
        productSync:false,
        productList:{
          associatedCouponId:'',
          category:'',
          externalGoodsLinks:'',
          externalGoodsId:'',
          seq:'',
          belong:'',
          title:'',
          channel:'',
          body:'',
          price:'',
          groupId:'',
          couponsId:[],
          id:'',
          vipDiscount:'',
          cardCoupons:'',
          upTime:'',
          downTime:''
        },
        rules:{
          
          title: [
            {required: true, validator:validtitle, trigger: 'blur'},
          ],
          seq:[
            {required: true, message: '商品排序不能为空', trigger: 'blur'}
          ],
          belong:[
            {required: true, message: '归属商户不能为空', trigger: 'change'}
          ],
          vipDiscount:[
            {required: true, message: '是否支持会员折扣不能为空', trigger: 'change'}
          ],
          /* cardCoupons:[
            {required: true, message: '是否支持卡券不能为空', trigger: 'change'}
          ], */
          category: [
            {required: true, message: '商品种类不能为空', trigger: 'change'},
          ],
          body: [
            {required: true,trigger: 'blur',message: '商品详情不能为空'},
          ],
          price: [
            {required: true, validator:valiAmountmoney, trigger: 'blur'},
          ],
          groupId: [
            {required: true, message: '折扣不能为空', trigger: 'blur'},
          ],
          channel: [{required: true, message: '商品渠道不能为空', trigger: 'change'},],

         /*  externalGoodsLinks:[{required:(productList.channel == '外部商品'),message:'外部商品链接不能为空', trigger: 'change'}] */
        },
        productDiscountList:[],//折扣列表
        couponsList:[],//卡券列表
        coponList:[],//主动购买卡券列表
        mchList:[],//商户列表
        productTypeList:[],//商品种类列表
        activityList:[],//活动列表
        authButton:[],
        outgoingIsOpen: true,
        tableData: [],
        searchParams: {
          page: 1,
          pageSize: 10,
          title:null,
          category:null,
          goodsChannel:'',
        },
        searchParam: {
          page: 1,
          pageSize: '',
          title:'',
          category:'',
          goodsChannel:'',
        },
        total:0,
        channelList:[{label:'外部商品',value:'YES'},{label:'内部商品',value:'NO'}]
      }
    },
    watch :{
      newbelong(nval,oval){
        console.log(oval+'>'+nval)
       if(nval && oval){
        this.productList.associatedCouponId = [];
        this.cardCouponIds = [];
       
       }
       if(nval!=undefined){
          this.initCouponsList(nval)
          this.initCouponList(nval)
       }
     
       /*  this.productList.associatedCouponId = [];
        this.cardCouponIds = []; */
        
      },
      newcategory(val){
        if(val == 'CARD_COUPONS'){
          this.productList.channel = 'NO';
          this.channelList[0].disabled = true;
        }else{
          this.channelList[0].disabled = false;
        }
      },
      newactivityOnly(val){
        if(val == ''){
          
          this.productList.activityId = ''
        }
      }
    },
    computed:{
      newbelong () {
        return this.productList.belong;
      },
      newcategory(){
        return this.productList.category
      },
      newactivityOnly(){
        return this.productList.activityOnly
      }
    },
    methods:{
      //表单校验函数
      validcouponsId (rule, value,callback) {
         if (this.cardCouponIds.length<1) {
         return callback(new Error('卡券不能为空!'))
        } else{
          return callback()
        } 
      },
      validuptime (rule, value,callback){

        if (!this.productList.upTime) {
          return callback(new Error('上架时间不能为空!'))
        }else{
          return callback()
        } 
      },
      validdowntime (rule, value,callback){

        if (!this.productList.downTime) {
          return callback(new Error('下架时间不能为空!'))
        } else{
          return callback()
        } 
      },
      validcardCoupons (rule, value,callback){

        if (!this.productList.cardCoupons) {
          return callback(new Error('是否支持折扣不能为空!'))
        } else{
          return callback()
        } 
      },
      validtitle (rule, value,callback){

        if (!this.productList.title) {
         return callback(new Error('商品名称不能为空!'))
        } else{
          return callback()
        } 
      },
      validcategory (rule, value,callback){

        if (!this.productList.category) {
         return callback(new Error('商品分类不能为空!'))
        } else{
          return callback()
        } 
      },
      validseq (rule, value,callback){

        if (this.productList.seq ==='') {
         return callback(new Error('商品排序不能为空!'))
        } else{
          return callback()
        } 
      },
      validassociatedCouponId(rule, value,callback){
        if(!this.productList.associatedCouponId && this.productList.category == 'CARD_COUPONS'){
           return callback(new Error('关联卡券不能为空!'))
        } else{
          return callback()
        } 
        
      },
      validbelong (rule, value,callback){

        if (!this.productList.belong) {
         return callback(new Error('商户归属不能为空!'))
        } else{
          return callback()
        } 
      },
      validprice (rule, value,callback){

        if (!this.productList.price) {
         return callback(new Error('商户价格不能为空!'))
        } else{
          return callback()
        } 
      },
      validchannel (rule, value,callback){

        if (!this.productList.channel) {
         return callback(new Error('商户渠道不能为空!'))
        } else{
          return callback()
        } 
      },
      validbody (rule, value,callback){

        if (!this.productList.body) {
         return callback(new Error('商户详情不能为空!'))
        } else{
          return callback()
        } 
      },
      validvipDiscount (rule, value,callback){

        if (!this.productList.vipDiscount) {
         return callback(new Error('支持折扣不能为空!'))
        } else{
          return callback()
        } 
      },
      validactivityOnly (rule, value,callback){

        if (!this.productList.activityOnly&&this.productList.activityOnly!=='') {
         return callback(new Error('参与活动不能为空!'))
        } else{
          return callback()
        } 
      },
      validactivity (rule, value,callback){

        if (!this.productList.activityId) {
         return callback(new Error('活动名称不能为空!'))
        } else{
          return callback()
        } 
      },
      validgroupId (rule, value,callback){
         if (!this.productList.groupId) {
         return callback(new Error('折扣不能为空!'))
        } else{
          return callback()
        } 
      },
      //导出
      getExport(){
        if(this.titles){
          this.searchParam.title = this.titles
        }else{
          this.searchParam.title='';
        }
        if(this.category){
          this.searchParam.category = this.category
        }else{
          this.searchParam.category='';
        }
        if(this.goodsChannel){
          this.searchParam.externalGoods = this.goodsChannel
        }else{
          this.searchParam.externalGoods='';
        }
        if(this.belong){
          this.searchParam.belong = this.belong
        }else{
          this.searchParam.belong = ''
        }
        if(this.state){
          this.searchParam.state = this.state
        }else{
          this.searchParam.state = ''
        }
        if(this.searchtime){
          this.searchParam.beginDate = this.searchtime[0]
          this.searchParam.endDate = this.searchtime[1]
        }else{
          this.searchParam.beginDate = ''
          this.searchParam.endDate = ''
        }


        let _this = this;
        _this.searchParam.pageSize = _this.total;
        let el = document.getElementById('isa');
        el.href=buildRequestURL(_this.api.API_GATEWATE+'mango/value-added/service/goods/report',_this.searchParam);
        el.click();//触发打开事件
        //window.location.href=buildRequestURL(this.api.API_GATEWATE+'mango/value-added/service/goods/report',_this.searchParam);
        //return false
      },
      //清除验证
      clearVail(){
        this.productList={};
        this.productList.groupId='';
        this.cardCouponIds =[];
        this.$refs['productList'].clearValidate();
      },
      /* updateDiscount(val){
        
        this.$forceUpdate();
      }, */
      //搜索条件
      queryProductOne(){
        this.searchParams.page=1;
        if(this.titles){
          this.searchParams.title = this.titles
        }else{
          this.searchParams.title=null;
        }
        if(this.category){
          this.searchParams.category = this.category
        }else{
          this.searchParams.category=null;
        }
        if(this.goodsChannel){
          
          this.searchParams.externalGoods = this.goodsChannel
        }else{
          this.searchParams.externalGoods='';
        }
        if(this.belong){
          this.searchParams.belong = this.belong
        }else{
          this.searchParams.belong = ''
        }
        if(this.state){
          this.searchParams.state = this.state
        }else{
          this.searchParams.state = ''
        }
        if(this.searchtime){
          this.searchParams.beginDate = this.searchtime[0]
          this.searchParams.endDate = this.searchtime[1]
        }else{
          this.searchParams.beginDate = ''
          this.searchParams.endDate = ''
        }

        this.isdisable =false;
        
        this.init();
      },
      escReturn(){
        this.productSync=false;
        this.clearVail();
      },
      handleClose(){
        this.productSync=false;
        this.clearVail();
      },
      getRedEnvelopeRuleButton () {
        this.title = "新增商品";
        this.channelstates = false;
        
        this.productSync = true;
       
        this.productList={
          associatedCouponId:'',
          category:'',
          externalGoods:'',
          externalGoodsLinks:'',
          externalGoodsId:'',
          seq:'',
          belong:'',
          title:'',
          channel:'',
          body:'',
          price:'',
          groupId:'',
          id:'',
          vipDiscount:'',
          cardCoupons:'',
          activityOnly:'',
          activityId:''
        }
        if(this.$refs.productList){
          console.log('clear')
          this.$refs['productList'].clearValidate();
        }
       
      },
      addWhetherUpadate (productList){
        console.log(this.title)
        if(this.title == "新增商品"){
          this.addProduct(productList);
        }else{
          this.updateProduct(productList);
        }
      },
      //修改
      updateProduct (productList){
         this.$refs[productList].validate((valid) => {
          
          if (valid) {
            let obj = {};
            let arr =[];console.log(this.cardCouponIds)
            if(this.cardCouponIds.length>0){
             
              for(let item of this.cardCouponIds){
                for(let i of this.couponsList){
                  if(item == i.value){
                    console.log(item)
                    arr.push(i.cardCouponIds)
                  }
                }
              }
              this.productList.cardCouponIds = arr;
            }
            let _this = this;
            let discountId = [];
            discountId.push(_this.productList.groupId)
           
            let  params =  _this.productList;
            params.discountId = discountId;
            params.cardCoupons = _this.productList.cardCoupons;
            /* if(params.vipDiscount == 'NO'){
              delete params.discountId
            } */
            params.associatedCouponId = String(_this.productList.associatedCouponId);
            params.externalGoods = _this.productList.channel;
            params.upTime = formatUnixtimestamp(params.upTime);
            params.downTime = formatUnixtimestamp(params.downTime);
            if(params.activityId && (params.activityOnly == '')){
              delete params.activityId
            }
            this.isDisable=true;
            console.log(params)
            _this.$http.put(_this.api.API_GATEWATE + 'mango/updateProduct', params,_this.GLOBAL.topheaders())
              .then(function (res) {
                this.isDisable=false;
                _this.productSync = false;
                if (res.data == true) {
                  _this.init();
                  _this.productList = {};
                  _this.cardCouponIds =[];
                  _this.channelstates = false;
                  _this.$message({
                    message: "更新成功",
                    type: 'success'
                  });
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
          } })
      },
      //商品上架
      onShelvesProduct (val) {
        let _this = this;
         _this.$http.put(_this.api.API_GATEWATE + 'mango/onShelvesProduct/'+val.id, _this.GLOBAL.topheaders())
              .then(function (res) {
                if (res.data == true) {
                  _this.init();
                  _this.productList = {};
                  _this.$message({
                    message: "上架成功",
                    type: 'success'
                  });
                }
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
      },

      //商品下架
      offShelfProduct (val) {
        let _this = this;
         _this.$http.put(_this.api.API_GATEWATE + 'mango/offShelfProduct/'+val.id, _this.GLOBAL.topheaders())
              .then(function (res) {
                if (res.data == true) {
                  _this.init();
                  _this.productList = {};
                  _this.$message({
                    message: "下架成功",
                    type: 'success'
                  });
                }
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
      },
      //添加
      addProduct (productList) {
       
        this.$refs[productList].validate((valid,obj) => {
        
          if (valid) {
            let obj = {};
            let arr =[];console.log(this.couponsList)
            if(this.cardCouponIds.length>0){
             
              for(let item of this.cardCouponIds){
                for(let i of this.couponsList){
                  if(item == i.value){
                    console.log(item)
                    arr.push(i.cardCouponIds)
                  }
                }
              }
              this.productList.cardCouponIds = arr;
            }else{
              this.productList.cardCouponIds = arr;
            }
            let _this = this;
            let discountId = [];
            discountId.push(_this.productList.groupId)
            let params = {
              belong:_this.productList.belong,
              externalGoodsLinks:_this.productList.externalGoodsLinks,
              externalGoodsId:_this.productList.externalGoodsId,
              externalGoods:_this.productList.channel,
              seq:_this.productList.seq,
              vipDiscount:_this.productList.vipDiscount,
              cardCoupons:_this.productList.cardCoupons,
              title: _this.productList.title,//
              category: _this.productList.category,//
              body: _this.productList.body,//
              price: _this.productList.price,//
              discountId: discountId,//
              upTime: formatUnixtimestamp(_this.productList.upTime),
              downTime:formatUnixtimestamp(_this.productList.downTime),
              activityOnly:_this.productList.activityOnly,
              activityId:_this.productList.activityId,
              cardCouponIds:this.productList.cardCouponIds,
              associatedCouponId:this.productList.associatedCouponId
            }
            this.isDisable=true;console.log(params)
            _this.$http.post(_this.api.API_GATEWATE + 'mango/insertProduct', params,_this.GLOBAL.topheaders())
              .then(function (res) {
                this.isDisable=false;
                if (res.data == true) {
                  _this.init();
                  _this.productSync = false;
                  _this.productList = {};
                  _this.cardCouponIds =[];
                  _this.$message({
                    message: "添加成功",
                    type: 'success'
                  });
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
      //获取按钮
      getButton(val,item){
        console.log(val)
        if(item.resourceCode == "del"){
          this.delProduct(val);
        }else if(item.resourceCode == "update"){
          this.title="修改商品";
          this.queryProduct(val);
        }
      },
      //删除
      delProduct(val){
        let _this = this;
        if(val.id){
          let id = val.id;
          this.$confirm('确定删除该商品:'+val.title+'?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.$http.delete(_this.api.API_GATEWATE+'mango/deleteProduct/'+id)
              .then(function(res){
                console.log(res.data)
                if(res.data == true){
                  this.init();
                  _this.$message({
                    type: 'success',
                    message: '删除成功'
                  });
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
              message: '已取消删除'
            });
          });
        }
      },
      //查询
      queryProduct(val){
        
        let _this = this;
         _this.channelstates = true;
        _this.$http.get(_this.api.API_GATEWATE+'mango/productQueryone/'+val.id)
          .then(function(res){
           
            if(res.data){
             /*  if(res.data.belong){
                this.initCouponsList(res.data.belong)
                this.initCouponList(res.data.belong)
              } */
              _this.productSync = true;
              res.data.price = res.data.price/100;
              res.data.upTime = val.upTime
              res.data.downTime = val.downTime
              res.data.activityId = val.activityId
              res.data.associatedCouponId = res.data.associatedCouponId/1
              _this.productList = res.data;console.log(_this.productList)
              if(val.discounts.length > 0){
                _this.$set( _this.productList,'groupId' , val.discounts[0].groupId);
                
              }
              if(val.cardCouponIds.length>0){
                let arr = [];
                for(let item of val.cardCouponIds){
                  arr.push(item.couponsId)
                }
                /* _this.$set( _this.productList,'cardCouponIds' , arr); */
                _this.cardCouponIds = arr;
              }
              if(res.data.externalGoods == 'YES'){
                _this.$set( _this.productList,'channel' , 'YES');
                
              }else{
                _this.$set( _this.productList,'channel' , 'NO');
              }
               if(this.$refs.productList){
                
                  this.$refs['productList'].clearValidate();
                }
              console.log(_this.productList)
             
              
             
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
      },
      handleSizeChange (size) {

        this.searchParams.pageSize = size;
        this.init();
      },
      handleCurrentChange (val) {

        this.searchParams.page = val;
        this.init()
      },
      initProductDiscountList () {
        let _this = this;
        let searchParams= {
          page: 1,
          pageSize: 999,
        }
        _this.$http.post(_this.api.API_GATEWATE+'mango/productDiscountList',searchParams,_this.GLOBAL.topheaders())
          .then(function(res){
            console.log(res.data.list)
            //过滤掉不可用折扣
            for(let item of res.data.list){
              
             
                this.productDiscountList.push(item);
              
            }
           /*  console.log(this.productDiscountList)  */
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
      //请求活动列表 
      initActivityList() {
        let _this = this;
        this.$http.get(_this.api.API_GATEWATE+'mango/shop/activity?pageSize=999&status=ENABLE')
          .then(function(res){
            
            _this.activityList =  res.data.content; console.log(_this.activityList)
           /*  for( let item of _this.mchList){
              let obj = {};
              obj.label = item.mchShortName;
              obj.value = item.mchId
              _this.belongList.push(obj)
            } */
            //控制台打印请求成功时返回的数据
            //bind(this)可以不用
          }.bind(this))
          .catch(function(err){
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
      },
      //请求卡券列表
      initCouponsList (val){
       
        let arr= [];
        let _this = this;
        this.$http.post(_this.api.API_GATEWATE+'mango/nuts/couponRuleAll',{mchId:val},_this.GLOBAL.topheaders())
          .then(function(res){
           /* console.log(res.data) */
           
          
            for( let item of res.data){
              let obj = {};
              obj.label = item.couponName;
              obj.value = item.couponId
              obj.cardCouponIds = {couponsId:item.couponId, couponsName: item.couponName}
              arr.push(obj)
             
            }
            _this.couponsList = arr;/* console.log(arr) */
            
            //控制台打印请求成功时返回的数据
            //bind(this)可以不用
          }.bind(this))
          .catch(function(err){
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
      },
      //请求主动购买卡券列表
      initCouponList (val){
       
        let arr= [];
        let _this = this;
        this.$http.post(_this.api.API_GATEWATE+'mango/nuts/couponRuleAll',{mchId:val,provideMode:'主动购买',haveStock:true},_this.GLOBAL.topheaders())
          .then(function(res){
           /* console.log(res.data) */
           
          
            for( let item of res.data){
              let obj = {};
              obj.label = item.couponName;
              obj.value = item.couponId
              obj.cardCouponIds = {couponsId:item.couponId, couponsName: item.couponName}
              arr.push(obj)
             
            }
            _this.couponList = arr;/* console.log(arr) */
            
            //控制台打印请求成功时返回的数据
            //bind(this)可以不用
          }.bind(this))
          .catch(function(err){
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
      },
      //请求商户列表
      initMchList (){
        let _this = this;
        let searchParams= {
          page: 1,
          pageSize: 999,
        }
        this.$http.post(_this.api.API_GATEWATE+'mango/getMchList',searchParams,_this.GLOBAL.topheaders())
          .then(function(res){
           
            _this.mchList =  res.data.list;
            _this.belongList.push({label:'全部',value:''})
            for( let item of _this.mchList){
              let obj = {};
              obj.label = item.mchShortName;
              obj.value = item.mchId
              _this.belongList.push(obj)
             
            }
             console.log(_this.belongList)
            //控制台打印请求成功时返回的数据
            //bind(this)可以不用
          }.bind(this))
          .catch(function(err){
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
      },

      //请求商品种类列表
      initProductTypeList (){
        let _this = this;
        console.log(_this.api.API_GATEWATE+'mango/productType')
        this.$http.get(_this.api.API_GATEWATE+'mango/productType',_this.GLOBAL.topheaders())
          .then(function(res){
           
            _this.productTypeList =  res.body;console.log(res.body)
            
            //控制台打印请求成功时返回的数据
            //bind(this)可以不用
          }.bind(this))
          .catch(function(err){
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
      },

      init () {
        this.initActivityList()
        let _this = this;
        this.isDisable=true;
        _this.$http.post(_this.api.API_GATEWATE+'mango/productList',_this.searchParams,_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable=false;
            this.tableData = res.data.list;console.log(this.tableData)
            for (let i=0; i<_this.tableData.length;i++){
              _this.tableData[i].price= _this.tableData[i].price/100;
            }
            this.tableData.forEach(e =>{
              if(e.discounts.length>0){
                e.groupName = e.discounts[0].groupName
              }else{
                e.groupName = ''
              }
              if(e.cardCouponIds.length>0){
                let array =[];
                for(let item of e.cardCouponIds){
                  array.push(item.couponsName)
                }
                e.cardCouponId = array.join("||");
              }
              e.upTimes = formatUnixtimestamp(e.upTime)
              e.downTimes = formatUnixtimestamp(e.downTime)
              e.createTimes=toTime(e.createTime)
              if(e.category == "PHONE_CHARGE"){
                e.categoryName="话费充值"
              }
              if(e.category == "CARD_COUPONS"){
                e.categoryName="卡券商品"
              }
               if(e.category == "GENERAL_GOODS"){
                e.categoryName="通用商品"
              }
              if(e.activityId &&_this.activityList.length>0) {
                for(let item of _this.activityList){
                  if(item.id == e.activityId){
                    e.activityName = item.name
                  }
                }
               
              }else{
                e.activityName = ''
              }
              if(e.externalGoods == 'YES'){
                _this.$set( e,'channels' , '外部商品');
              }else{
                _this.$set( e,'channels' , '内部商品');
              }
              switch(e.state){
                case 'NORMAL':
                  e.states = "待上架";
                  break;
                case "ON_SHELVES":
                  e.states = '已上架';
                  break;
                case "DISABLE":
                  e.states = '已删除';
                  break;
                case "OFF_SHELF":
                  e.states = '已下架';
                  break;
                default:
                  e.states = '其它'
              }
             
            })
            this.total = res.data.total || 0;
            //控制台打印请求成功时返回的数据
            //bind(this)可以不用
          }.bind(this))
          .catch(function(err){
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
        console.log(this.authButton)
      }
      this.init();
      
      this.initProductDiscountList();
      this.initMchList();
      this.initProductTypeList ();
      this.initActivityList();
    }
  }
</script>

<style  lang="scss">
</style>


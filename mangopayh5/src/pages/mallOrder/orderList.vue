<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 30px">客户订单:</label>
          <el-input size="mini" style="width:20%" v-model="searchParams.orderNo" placeholder="订单编号">
          </el-input>
          <label style="padding-left: 30px">订单状态:</label>
            <el-select style="width:20%" size="mini" v-model="searchParams.orderStatus">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in orderStatusList"
                :key="item.label"
                :label="item.value"
                :value="item.label">
              </el-option>
            </el-select>
          <label style="padding-left: 30px">下单时间:</label>
          <el-date-picker
              style="width:25%"
              size="mini"
              v-model="searchParams.payTime"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间">
          </el-date-picker>
          </el-col>
      </el-row>
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 30px">手机号:</label>
          <el-input size="mini" style="width:20%" v-model="searchParams.mobile" placeholder="请输入手机号">
          </el-input>
          <!-- <label style="padding-left: 30px">商户号:</label>
          <el-input size="mini" style="width:20%" v-model="searchParams.mercId" placeholder="请输入商户号">
          </el-input>-->
          <el-button size="mini" type="primary" @click="queryProductOne" style="margin-left:55px" >查询</el-button>
          <el-button  style="margin-left:10px" size="mini" type="primary" v-if="item.resourceId == 244"  v-for="item in authButton" :key="item.resourceId" @click.stop="getExport" >导出</el-button>
          <a  id="isa" href="" target="_blank"></a>
        </el-col>
      </el-row>
    </div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable" :data="tableData" stripe border tooltip-effect="dark" style="width: 100%">

         <el-table-column prop="orderNo" label="订单编号" show-overflow-tooltip width="150" fixed='left'>
          </el-table-column>
          <el-table-column prop="userName" label="客户姓名" show-overflow-tooltip width="120">
          </el-table-column>
          <!-- <el-table-column prop="custType" label="客户类型" show-overflow-tooltip width="100">
          </el-table-column> -->
          <el-table-column prop="mobile" label="联系方式" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="payTime" label="下单时间" show-overflow-tooltip width="100">
            <template slot-scope="scope">
              <span> {{ scope.row.payTime | date('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="goodName" label="商品名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="mercName" label="所属商家" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="goodSpec" label="商品规格" show-overflow-tooltip width="100">
          </el-table-column>
          <el-table-column prop="orderStatuss" label="订单状态" show-overflow-tooltip width="150">
          </el-table-column>
         <el-table-column prop="receiptName" label="收货人" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="receiptMobile" label="收货联系方式" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="receiptAddress" label="收货地址" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="isEnterprises" label="发票类型" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="receiptHead" label="发票抬头" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="tariffNumber" label="发票税号" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="receiptDesc" label="发票内容" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="shippingNo" label="物流编号" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="shippingName" label="物流公司" show-overflow-tooltip>
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
                   <el-dropdown-item  @click.native="revocation(scope.row)" v-if="authButton.some(e=>{return e.resourceId == 247}) && scope.row.orderStatus == 'WAIT_DELIVER'">
                    发货
                   </el-dropdown-item>

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
      title="快递信息"
      :visible.sync="information"
      width="30%"
      :before-close="informationClose">
      <el-form ref="express" :rules="rules" :model="express" label-width="120px">
         <el-form-item label="快递公司:" prop="shippingId">
          <el-select  size="mini" v-model="express.shippingId">

              <el-option
                v-for="item in expressList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
          <el-form-item label="快递单号:" prop="shippingNo">
          <el-input v-model="express.shippingNo"  size="mini" style="width:76%"></el-input>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="informationClose">取 消</el-button>
      <el-button type="primary" @click="informations()" :disabled="isDisable">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {SESSION_STOART_MENUS} from "../../utils/ConstUtils.js"
  import {isvalidString,isvalidAmountmoney} from '../../../config/validate'
  import {toTime,buildRequestURL,formatUnixtimestamp} from "../../../config/util.js"

  export default {
    name: "productManagement",
    data() {
      return {
        expressList:[],//快递列表
        startDate:[],
        urlList:'',
        title:'',
        isDisable:false,
        isdisable:true,
        channelstates:false,
        couponList:[],
        orderStatusList: [
          {
            value: '已关闭',
            label: 'CLOSED'
          },{
            value:"待付款",
            label:'WAIT_PAY'
          },
          {
            value: '待审核',
            label: 'APPLYING'
          },
          {
            value: '待发货',
            label: 'WAIT_DELIVER'
          },
          {
            value: '待收货',
            label: 'WAIT_RECEIVE'
          },{
            value: '待评价',
            label: 'WAIT_COMMENT'
          },{
            value: '已完成',
            label: 'COMPLETED'
          }
        ],
        cardCouponIds:[],
        belongList:[

        ],

        //快递信息
        rules:{
          shippingId: [
            {required: true, message: '请选择快递公司', trigger: 'change'},
          ],
          shippingNo: [
            {required: true, message: '请输入快递单号', trigger: 'blur'},
          ],
        },

        //搜索条件
        loanId:'',
        searchtime:[],
        information:false,
        productSync:false,
        productList:{
          userName:'',
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

        express:{
          shippingId:'',
          shippingNo:'',
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
          loanId:'',
          userName:'',
          endDate:'',
          orderNo:"",
          payTime:[],

        },
        searchParam: {
          page: 1,
          pageSize: '',
          loanId:'',
          userName:'',
          startDate:'',
          endDate:'',
          orderNo:"",
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
      //发货提交
      informations(){

       console.log(this.express);
       this.$refs['express'].validate((valid) => {
          if (valid) {

        this.$http.post(this.api.API_GATEWATE+'mango/mall/mercDeliverOrder',this.express,this.GLOBAL.topheaders())
          .then(function(res){

            if (res.data == true) {

              this.informationClose();
              this.$message({
              message: "发货成功",
              type: 'success'
              });
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
          }
       })
      },
      //发货
     revocation(val) {
        this.information =true;
        this.express.orderId = val.id;
        this.express.mercId = val.mercId
      },

      informationClose(){
        this.information = false;
        this.express={};
        this.$refs['express'].clearValidate();
      },
      //导出
      getExport(){

        this.searchParam.orderNo = this.searchParams.orderNo;

        if(this.searchParams.orderStatus){
          this.searchParam.orderStatus = this.searchParams.orderStatus
        }else{
          this.searchParam.orderStatus = ''
        }
        // searchParams.orderStatus
        if(this.searchParams.payTime && this.searchParams.payTime.length>0){
          this.searchParam.startDate = this.searchParams.payTime[0]
          this.searchParam.endDate = this.searchParams.payTime[1]
        }else{
          this.searchParam.startDate = ''
          this.searchParam.endDate = ''
        }
        this.searchParam.mobile = this.searchParams.mobile
        if(!this.searchParam.orderNo && !this.searchParam.orderStatus && !this.searchParam.startDate && !this.searchParam.endDate && !this.searchParam.mobile) {
          this.$message({
            message: "请输入搜索条件进行导出",
            type: 'info'
          });
          return
        }

        let _this = this;
        _this.searchParam.pageSize = _this.total;
        let el = document.getElementById('isa');
        el.href=buildRequestURL(_this.api.API_GATEWATE+'mango/mall/MercOrderListReport',_this.searchParam);
        el.click();//触发打开事件
        //window.location.href=buildRequestURL(this.api.API_GATEWATE+'mango/value-added/service/goods/report',_this.searchParam);
        //return false
      },

      //查询条件
      queryProductOne(){
        this.searchParams.page=1;
        if(this.searchParams.payTime && this.searchParams.payTime.length>0){
          this.searchParams.startDate = this.searchParams.payTime[0]
          this.searchParams.endDate = this.searchParams.payTime[1]
        }else{
          this.searchParams.startDate = ''
          this.searchParams.endDate = ''
        }



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
      handleSizeChange (size) {

        this.searchParams.pageSize = size;
        this.init();
      },
      handleCurrentChange (val) {

        this.searchParams.page = val;
        this.init()
      },
      initExpressList () {
        let _this = this;

        _this.$http.get(buildRequestURL(_this.api.API_GATEWATE+'mango/mall/courierCompanyList',{}) ,_this.GLOBAL.topheaders())
          .then(function(res){
            this.expressList = res.data;

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
        this.isDisable=true;
        _this.$http.post(_this.api.API_GATEWATE+'mango/mall/mallOderPage',_this.searchParams,_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable=false;
            this.tableData = res.data.list;console.log(this.tableData)

            this.tableData.forEach(e =>{
             switch(e.isEnterprise){
               case true:
                 e.isEnterprises = '企业'
                 break;
                case false:
                 e.isEnterprises = '个人'
                 break;

             }

               for(let item of this.orderStatusList){
                 if(e.orderStatus==item.label){
                   e.orderStatuss= item.value;
                 }
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
      this.initExpressList();
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


    }
  }
</script>

<style  lang="scss">
</style>


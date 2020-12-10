<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 30px"></label>
          <el-input size="mini" style="width:20%" v-model="loanId" placeholder="客户姓名">
          </el-input>
          
          <label style="padding-left: 50px"></label>
         
          <el-date-picker
              style="width:25%"
              size="mini"
              v-model="searchtime"
              type="daterange"
              
              value-format="yyyyMMdd"
              range-separator="至"
              start-placeholder="反馈时间(起)"
              end-placeholder="反馈时间(止)">
          </el-date-picker>
      
     
    
           
          <el-button size="mini" type="primary" @click="queryProductOne" style="margin-left:55px" >查询</el-button>
          <!-- <el-button  style="margin-left:10px" size="mini" type="primary"  @click.stop="getExport">导出</el-button> -->
          <a  id="isa" href="" target="_blank"></a>
        </el-col>
      </el-row>
      
    
    </div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable" :data="tableData" stripe border tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="serialNumber" label="序号" show-overflow-tooltip width="90" fixed='left'>
          </el-table-column>
         <el-table-column prop="grantCode" label="借款编号" show-overflow-tooltip width="90" fixed='left'>
          </el-table-column>
          <el-table-column prop="customerName" label="客户姓名" show-overflow-tooltip width="120">
          </el-table-column>
          <!-- <el-table-column prop="custType" label="客户类型" show-overflow-tooltip width="100">
          </el-table-column> -->
          <el-table-column prop="contactWay" label="联系方式" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="productName" label="商品名称" show-overflow-tooltip width="100">
          </el-table-column>
          <el-table-column prop="AffiliatedMerchants" label="所属商户" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="feedbackType" label="反馈类型" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="feedbackContent" label="反馈内容" show-overflow-tooltip width="100">
          </el-table-column>
          <el-table-column prop="feedbackTime" label="反馈时间" show-overflow-tooltip width="150">
          </el-table-column>
         <el-table-column prop="productSum" label="产品金额(元)" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="paymentConditions" label="还款情况" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="oddCorpus" label="剩余本金(元)" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="residualInterest" label="剩余利息(元)" show-overflow-tooltip width="150">
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
                   <el-dropdown-item  @click.native="revocation(scope.row)">
                    查看
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
        urlList:'',
        title:'',
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
        loanId:'',
        searchtime:[],

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
          loanId:null,
          
        },
        searchParam: {
          page: 1,
          pageSize: '',
          
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
      //撤销
      revocation(val){
        console.log(val)
      },

      //导出
      getExport(){
        
      
        if(this.loanId){
          this.searchParam.loanId = this.loanId
        }else{
          this.searchParam.loanId = ''
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
      
      //搜索条件
      queryProductOne(){
        this.searchParams.page=1;
        if(this.loanId){
          this.searchParams.loanId = this.loanId
        }else{
          this.searchParams.loanId=null;
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
     
      
      
      

      

      init () {
       
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
      
      
    }
  }
</script>

<style  lang="scss">
</style>


<template>
  <div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 700px;overflow:auto;">
      <div class="main_top_01">
        <el-row style="margin-bottom:20px">
          <el-col :span="24">
           
            
            <el-button style="float: right; padding-right: 20px;"  type="primary" @click="banner=true;title='新增标签'"   >新增标签</el-button>
          </el-col>
        </el-row>
      </div>
        <el-table ref="multipleTable" :default-sort = "{prop: 'id', order: 'ascending'}" :data="tableData" border stripe tooltip-effect="dark" style="width: 100%">
          <el-table-column label="标签名称"   show-overflow-tooltip prop="name"></el-table-column>
          <el-table-column label="自动打标签条件"   show-overflow-tooltip prop="createdTime" ></el-table-column>
          <el-table-column label="备注"  show-overflow-tooltip prop="couponName" ></el-table-column>
          

          <el-table-column
           
            fixed="right"
            label="操作"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-dropdown :hide-on-click="false">
                <span class="el-dropdown-link">
                  <i class="el-icon-menu"></i><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" >
                   <el-dropdown-item  @click.native="showmore(scope.row)">修改</el-dropdown-item>
                   <el-dropdown-item  @click.native="del(scope.row)">删除</el-dropdown-item>
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
        <el-form-item label="标签名称:" prop="name" :rules="[{required: true, message: '标签名称不能为空', trigger: 'blur'}]">
          <el-input v-model="coupons.name" size="mini" style="width:80%" ></el-input>
        </el-form-item>
        <el-form-item label="标签条件:" prop="condition" :rules="[{required: true, message: '标签条件不能为空', trigger: 'blur'}]">
          <el-input v-model="coupons.condition"  size="mini" style="width:80%" ></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input v-model="coupons.remark"  size="mini" style="width:80%" ></el-input>
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
    name: "labelList",
   
    data() {
      return {
      

        //新增或修改，卡券对象
        coupons:{
          name:'',
          condition:'',
          remark:''
        },
        params:{},
        tableData:{},
      }
    },
   
   
    methods : {
       escReturn(){
        this.productSync=false;
        this.clearVail();
      },
      
     
      //清除验证
      clearVail(){
        this.coupons={};
       
        if(this.$refs.banners){this.$refs['banners'].clearValidate();}
        
      },
      
      handleClose() {
        this.clearVail();
        
        this.banner = false;
        
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

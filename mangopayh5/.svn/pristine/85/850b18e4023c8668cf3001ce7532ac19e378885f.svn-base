<!--会员管理页面-->
<template>
  <div class="main_top" >
    <div class="main_top_01">
      <el-row>
          <span type="info" style="margin-left: 3%">数据列表</span>
          <el-button type="primary"  size="mini" @click="accountpop = true;title = '添加银行帐户'" style="margin-left: 75%" >添加</el-button>
          <el-button type="primary"  size="mini" @click="exportMemberList" style="margin-left: 2%;" >导出</el-button>
          <el-button type="primary"  size="mini" @click="printMemberList" style="margin-left: 2%;" >打印</el-button>
      </el-row>
    </div>
    <el-container style="padding: 10px 10px;border: 2px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable" :data="tableData" stripe  :border="true" style="width: 100%" v-loading="isLoad">
          <el-table-column prop="account" label="账号"  show-overflow-tooltip width="70">
          </el-table-column>
          <el-table-column prop="accounTname" label="账号名称" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="openAccountBank" label="开户银行" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="branch" label="开户行" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="currency" label="币种" show-overflow-tooltip width="60">
          </el-table-column>
          <el-table-column prop="accountType" label="账户类型" show-overflow-tooltip width="100">
          </el-table-column>
          <el-table-column  prop="income" label="收入" show-overflow-tooltip width="80">
          </el-table-column>
          <el-table-column prop="spending" label="支出" show-overflow-tooltip width="80">
          </el-table-column>
          <el-table-column prop="updatedDate" label="更新日期" show-overflow-tooltip width="100">
          </el-table-column>
          <el-table-column prop="state" label="状态" show-overflow-tooltip >
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
                  <el-dropdown-item @click.native="preupdate(scope.row)">编辑</el-dropdown-item>
                  <el-dropdown-item @click.native="predel(scope.row)">删除</el-dropdown-item>
                  <el-dropdown-item @click.native="preview(scope.row)">明细</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-page">
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="params.page"
                         :page-sizes="[5, 10, 15, 20]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-header>
    </el-container>
     <el-dialog
      :title="title"
      :visible.sync="accountpop"
      width="40%"
      :before-close="handleClose">
      <el-form ref="accounts" :rules="rules" :model="account" label-width="120px">
        <el-form-item label="账户名称:" prop="name">
          <el-input v-model="account.name" maxlength="500" size="mini" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="账户:" prop="account">
          <el-input v-model="account.account" maxlength="500" size="mini" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="开户银行:" prop="bankCode">
          <el-select v-model="account.bankCode" placeholder="请选择" size="mini" style="width: 80%">
            <el-option
              v-for="item in bankList"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开户行名称:" prop="bankName">
          <el-input v-model="account.bankName" maxlength="500" size="mini" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="币种:" prop="currency">
          <el-select v-model="account.currency" placeholder="请选择" size="mini" style="width: 80%">
            <el-option
              v-for="item in currencyList"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="帐户类型:" prop="accountType">
          <el-select v-model="account.accountType" placeholder="请选择" size="mini" style="width: 80%">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="addtoUpdate()" :disabled="isDisable">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>
<!--会员管理页面-->
<script>
  import {SESSION_STOART_MENUS} from "@/utils/ConstUtils.js"
  import {toTime,buildRequestURL,toDataTime,formatUnixtimestamp,showload} from "../../../config/util.js"
    export default {
      name: "bankAccountList",
      data() {
        return {
          isLoad:false,
          accountpop:false,
          loading:false,
          isDisable:false,
          account:{
            name:'',
            account:'',
            bankCode:'',
            bankName:'',
            currency:'',
            accountType:'',

          },
          currencyList:[],
          typeList:[
            {
              value:'BASEACCOUNT',
              name:'基本帐户'
            },
            {
              value:'DEDICATEDACCOUNT',
              name:'专用帐户'

            },
            {
              value:'ASSISTACCOUNT',
              name:'辅助帐户'
            }
          ],
          bankList:[],


          rules:{
            name: [
              {required: true, message: '帐户名称不能为空', trigger: 'blur'},
            ],
            account: [
              {required: true, message: '帐号不能为空', trigger: 'blur'},
            ],
            bankCode: [
              {required: true, message: '请选择开户银行', trigger: 'change'},
            ],
            bankName: [
              {required: true, message: '开户银行名称不能为空', trigger: 'blur'},
            ],
            currency: [
              {required: true, message: '请选择币种', trigger: 'change'},
            ],
            accountType: [
              {required: true, message: '请选择帐户类型', trigger: 'change'},
            ],
            
          },
          title:'',
          authButton:[],
          authenticationStatus:'',
        
          params: {
            
            page:1,
            pageSize:10,
           
            
            
            
            
          },
          param: {
            
            page:1,
            pageSize:'',
            
           
            
            
            
          },
          merchatVal:{},
          
          tableData: [],
          total:0,
         
          
          
          
        }
      },
      methods : {
        addMemberList(){},
        printMemberList(){},
        exportMemberList(){},
        handleClose() {
          this.clearVail();
          this.accountpop = false;
        },
        clearVail(){
          this.account={};
        
          if(this.$refs.accounts){this.$refs['accounts'].clearValidate();}
        
        },
        //弹窗确定
        addtoUpdate (){
        
          if(this.title == "添加银行帐户"){
            
            this.addOperator(this.account)
          }else{
            console.log('修改')
          }
        },
        //添加
        addOperator (banners) {
        console.log(banners)
        this.$refs['accounts'].validate((valid) => {
          if (valid) {
            let _this = this;
            let params = {};
            
            params.name = _this.account.name;
            params.account = _this.account.account;
            params.bankCode = _this.account.bankCode;
            params.bankName =_this.account.bankName;
            params.currency = _this.account.currency;
            params.accountType = _this.account.accountType;
            this.isDisable=true;
            _this.$http.post(_this.api.API_GATEWATE + 'mango/banner/createBanner',
              params,
              _this.GLOBAL.topheaders())
              .then(function (res) {
                this.isDisable=false;
                console.log(res.data)
                if(res.data){
                  _this.$message({
                    message: "添加帐户成功",
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
        //导出
        getExport(){
          if(this.uuid){
            this.$message({
              message: "导出时UUID无效",
              type: 'info'
            });
            return
          }
          this.param.authenticationStatus = this.authenticationStatus;
          this.param.idNumber = this.idNumber;
          this.param.page =1;
          this.param.mobile = this.mobile;
          this.param.name = this.name;
         
          if(this.starttime && this.starttime.length>0){
            this.param.startDate = toDataTime(this.starttime[0]);
            this.param.endDate = toDataTime(this.starttime[1]);
          }else{
            this.param.startDate ="";
            this.param.endDate ="";
          }
          if(!this.param.idNumber && !this.param.mobile&&!this.param.name&&!this.param.startDate&&!this.param.endDate && !this.param.authenticationStatus ){
            this.$message({
              message: "请输入搜索条件进行导出",
              type: 'info'
            });
            return
          }
          this.param.pageSize = this.total;
          this.loading=true;
          if (!window.location.href.includes('10.11.51')){
            this.isurl = "/list/"
          }
          window.location.href=buildRequestURL(this.isurl+'mango/member/report',this.param);
          this.loading=false;
        },
        //删除
        predel(val){
          console.log(val)
        },
        //查看明细
        preview(val){
          console.log(val)

        },
        //修改
        preupdate(val){
          console.log(val)
          this.accountpop = true;
          this.title = '修改银行帐户'

        },
        //搜索
        queryMemberList () {
            this.params.idNumber = this.idNumber;
            this.params.page =1;
            this.params.mobile = this.mobile;
            this.params.name = this.name;
            this.params.authenticationStatus = this.authenticationStatus;
            this.params.uuid = this.uuid;
          if(this.starttime && this.starttime.length>0){
            this.params.startDate = toDataTime(this.starttime[0]);
            this.params.endDate = toDataTime(this.starttime[1]);
          }else{
            this.params.startDate ="";
            this.params.endDate ="";
          }
          this.isDisable=false;
          this.init();
        },
        handleSizeChange (size) {
         this.params.pageSize = size;
         this.init();
        },
        handleCurrentChange (val) {
          this.params.page = val;
          this.init()
        },
        changeStatu(val){
          
          let _this = this;
          if(val && val.coreId){
            if(!val.name){
              val.name = "";
            }
            let act = "";
            let infoName="";
            if(val.statu == "正常"){
              act = "mango/disabledAccount/";
              infoName = "冻结";
            }else{
              act = "mango/enableAccount/";
              infoName = "激活";
            }
            this.$confirm('确定要'+infoName+'【'+val.name+'】吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.loading=true;
              _this.$http.get(_this.api.API_GATEWATE+act+val.coreId,_this.GLOBAL.topheaders())
                .then(function(res){
                  this.loading=false
                  if(res && res.data){
                    _this.init();
                    console.log(res.data)
                    _this.$message({
                      message: '成功',
                      type: 'success'
                    });
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
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'+infoName
              });
            });
          }
        },
        init () {
            let _this = this;
            this.loading = true;
            this.$http.post(_this.api.API_GATEWATE+'mango/getMemberList',_this.params,_this.GLOBAL.topheaders())
              .then(function(res){
                this.loading = false;
                this.isLoad = true;
                setTimeout(() => {this.isLoad = false;}, 1000);
                if(res && res.data && res.data.list && res.data.list.length>0){
                  console.log(res.data.list)
                  this.tableData =  res.data.list;
                  for(let i=0; i<_this.tableData.length;i++){
                    _this.tableData[i].date=toTime(_this.tableData[i].createDate+_this.tableData[i].createTime);
                    if(_this.tableData[i].status == "NORMAL"){
                      _this.tableData[i].statu = "正常"
                    }else if(this.tableData[i].status == "DISABLE"){
                      _this.tableData[i].statu = "冻结"
                    }
                    switch(_this.tableData[i].authenticationStatus){
                      case 'CERTIFIED':
                        _this.tableData[i].authenticationStatus = '已认证'
                        break
                      case 'UNCERTIFIED':
                         _this.tableData[i].authenticationStatus = '未认证'
                         break
                      case 'UNBIND' :
                        _this.tableData[i].authenticationStatus = '已解绑'
                        break
                    }
                  }
                  this.total = res.data.total || 0;
                }else{
                  this.tableData =  [];
                  this.total =  0;
                }
                //控制台打印请求成功时返回的数据
                //bind(this)可以不用
              }.bind(this))
              .catch(function(err){
                this.loading = false;
                if(err && err.data && err.data.key == "400300"){
                  _this.$router.push({ path: "/login" });
                }
                _this.$message({
                  message: err.data.msg,
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
        this.init()
      }
    }
</script>


<style  lang="scss">

  
  


</style>

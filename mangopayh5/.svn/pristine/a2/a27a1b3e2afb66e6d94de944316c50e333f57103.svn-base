<template>
  <div>
  <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
    <el-header style="height: 600px;overflow:auto;">
      <el-col :span="24" style="text-align: right;margin-bottom: 20px">
        <el-button  type="primary" v-if="item.resourceCode == 'oper_add'"  v-for="item in authButton" :key="item.resourceId" @click="getOperatorButton">{{item.resourceDesc}}</el-button>
      </el-col>
      <el-table ref="multipleTable" :data="tableData" border stripe tooltip-effect="dark" style="width: 100%">
        <el-table-column label="登录账号"  show-overflow-tooltip prop="loginId">
        </el-table-column>
        <el-table-column label="姓名"  show-overflow-tooltip prop="name">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号码" show-overflow-tooltip >
        </el-table-column>
        <el-table-column prop="roleList" label="角色" show-overflow-tooltip>
        </el-table-column>
        <el-table-column  label="创建时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span> {{ scope.row.createTime | date('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
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
                <el-dropdown-item  @click.native="getOperating(scope.row,item)" v-if="item.resourceCode != 'oper_add' && item.resourceCode != 'query' && item.resourceCode != 'auth_query' && item.resourceType != '3'" v-for="item in authButton" :key="item.resourceId">{{item.resourceName}}</el-dropdown-item>
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
      title="操作员新增"
      :visible.sync="recharge"
      width="40%"
      :before-close="handleClose">
      <el-form ref="recharges" :rules="rules" :model="recharges" label-width="120px">
        <el-form-item label="登录账号" prop="loginId">
          <el-input v-model="recharges.loginId" maxlength="16" size="mini" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="recharges.password" maxlength="16" size="mini" type="password" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="操作员姓名" prop="name">
          <el-input v-model="recharges.name" size="mini" maxlength="20" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="操作员手机号" prop="mobile">
          <el-input v-model="recharges.mobile" maxlength="11" size="mini"  style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-select
            size="mini"
            style="width: 80%"
            v-model="recharges.roles"
            multiple
            placeholder="请选择角色名称">
            <el-option
              size="mini"
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="addOperator('recharges')" :disabled="isDisable">确 定</el-button>
    </span>
    </el-dialog>
    <el-dialog
      title="操作员修改"
      :visible.sync="operatorInformations"
        width="40%"
      :before-close="handleCloses">
      <el-form ref="operatorInformation" :rules="ruleValidate" :model="operatorInformation" label-width="120px">
        <el-form-item label="操作员姓名" prop="name">
          <el-input v-model="operatorInformation.name" size="mini" maxlength="20"  style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-select
            size="mini"
            style="width: 80%"
            @change="updateRoleAll"
            v-model="operatorInformation.roles"
            multiple
            placeholder="请选择角色名称">
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="handleCloses">取 消</el-button>
      <el-button type="primary" @click="updataOperator('operatorInformation')">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  let validPhone =(rule, value,callback)=>{

    if (!value){
      callback(new Error('手机号不能为空!'))
    }else  if (!isvalidPhone(value)){
      callback(new Error('请输入正确的11位手机号码!'))
    }else {
      callback()
    }
  };
  let valiName =(rule, value,callback)=>{

    if (!value){
      callback(new Error('姓名不能为空!'))
    }else  if (!isvalidName(value)){
      callback(new Error('请输入中文或英文!'))
    }else {
      callback()
    }
  };
  let valiAccount =(rule, value,callback)=>{
    if (!value){
      callback(new Error('账号不能为空!'))
    }else  if (!isvalidAccount(value)){
      callback(new Error('请输入5-16字节，允许字母数字下划线!'))
    }else {
      callback()
    }
  };
  let valiPwd =(rule, value,callback)=>{

    if (!value){
      callback(new Error('密码不能为空!'))
    }else  if (!isvalidPassWord(value)){
      callback(new Error('请输入长度在6~16之间，只能包含字母、数字和下划线!'))
    }else {
      callback()
    }
  };
  import {isvalidPhone,isvalidName,isvalidPassWord,isvalidAccount} from '../../../config/validate'
  import {SESSION_STOART_MENUS} from "../../utils/ConstUtils.js"
  import {SESSION_STORAGE_USER} from "../../utils/ConstUtils.js"
    export default {
        name: "operator",
      data() {
        return {
          isDisable:false,
          roleList: [],
          operatorInformation:{
            name:'',
            mobile:'',
            roles:[],
            alias:'',
            createTime:'',
            id:'',
          },
          roleId:'',
          operatorInformations:false,
          recharge:false,
          recharges:{
            loginId:'',
            password:'',
            name:'',
            mobile:'',
            roles:[],
          },
          tableDatas:'',
          accountOpening:false,
          authButton:[],
          userList:'',
          outgoingIsOpen: true,
          endTime:'',
          operationAuthority:false,
          tableData: [],
          multipleSelection: [],
          secretOptionObject:{},
          simpleSearchValue:'',
          searchParams: {
            page: 1,
            pageSize: 10,
          },
          params:{
            page:1,
            pageSize:10
          },
          total:0,
          rules: {
            name: [
              {required: true,trigger: 'blur',validator:valiName},
            ],
            loginId: [
              {required: true,trigger: 'blur',validator:valiAccount},
            ],
            password: [
              {required: true,trigger: 'blur',validator:valiPwd},
            ],
            mobile: [
              {required: true, trigger: 'blur',validator:validPhone},
            ],
            roles: [
              {required: true, message: '角色不能为空', trigger: 'blur'},
            ]
          },
          ruleValidate: {
            name: [
              {required: true,trigger: 'blur',validator:valiName},
            ],
            mobile: [
              {required: true, trigger: 'blur',validator:validPhone},
            ],
            roles: [
              {required: true, message: '角色不能为空', trigger: 'blur'},
            ]
          }
        }
      },
      methods : {
        //清除验证
        clearVail(){
          this.recharges={
          };
          this.recharges.roles=[];
          this.$refs['recharges'].clearValidate();
        },
        //清除验证
        clearVails(){
          this.$refs['operatorInformation'].clearValidate();
        },
        updateRoleAll(val){

          this.operatorInformation.roles.slice(val);
          this.$forceUpdate();
        },
      getOperatorButton (){
        this.recharge = true;
        this.recharges={
          loginId:'',
            password:'',
            name:'',
            mobile:'',
            roles:[],
        }
      },
      handleClose() {
       this.clearVail();
        this.recharge = false;
      },
      handleCloses() {
        this.clearVails();
        this.operatorInformations = false;
      },
      updataOperator (operatorInformation) {

        this.$refs[operatorInformation].validate((valid) => {
          if (valid) {
            let _this = this;
            let params = {};
            params =  _this.operatorInformation;
            params.name = _this.operatorInformation.name;
            params.roleIds = _this.operatorInformation.roles;
            params.roleId = _this.tableDatas.roleId;
            params.id =  _this.tableDatas.id;
            this.isDisable=true;
            _this.$http.put(_this.api.API_GATEWATE + 'operator',
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
                  _this.operatorInformations=false;
                  _this.operatorInformations.name="";
                  _this.operatorInformations.roles="";
                  _this.operatorInformations.mobile="";
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
        addOperator (recharges) {
          console.log(recharges)
          this.$refs[recharges].validate((valid) => {
            if (valid) {
              let _this = this;
              let params = {};
              params.userName = _this.recharges.loginId;
              params.userPwd = _this.recharges.password;
              params.name = _this.recharges.name;
              params.mobile = _this.recharges.mobile;
              params.roleIds = _this.recharges.roles;
              this.isDisable=true;
              _this.$http.post(_this.api.API_GATEWATE + 'operator',
                params,
                _this.GLOBAL.topheaders())
                .then(function (res) {
                  this.isDisable=false;
                  console.log(res.data)
                  if(res.data){
                    _this.$message({
                      message: "添加操作员成功",
                      type: 'success'
                    });
                    this.init();
                    _this.recharge= false;
                    _this.recharges.loginId = '';
                    _this.recharges.password= '';
                    _this.recharges.name= '';
                    _this.recharges.mobile= '';
                    _this.recharges.roles= [];
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
          if(item.resourceCode == "oper_update"){
            _this.operatorInformation = Object.assign({}, val);
              if(val.role){
                let arrIntRoles  = val.role;
                let  arrStringRoles = new Array();
                for(let role in arrIntRoles){
                  arrStringRoles.push(arrIntRoles[role].roleId);
                }
                _this.operatorInformation.roles = arrStringRoles;
              }
            this.operatorInformations = true;
          }else if(item.resourceCode == "oper_delete"){
            let id = _this.tableDatas.id
            this.$confirm('确定删除操作员'+this.tableDatas.name+'?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              _this.$http.delete(_this.api.API_GATEWATE+'operator/'+id,
                _this.GLOBAL.topheaders())
                .then(function(res){
                  this.init();
                  if(res.data == true){
                    _this.$message({
                      type: 'success',
                      message: '删除成功'
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
                message: '已取消删除'
              });
            });
          }else if(item.resourceCode =="oper_query"){

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
          _this.$http.get(_this.api.API_GATEWATE+'operator?page='+_this.params.page+'&pageSize='+_this.params.pageSize,_this.GLOBAL.topheaders())
            .then(function(res){

              let tableData = [];
              if(res && res.data && res.data.list &&  res.data.list.length>0){
                tableData =  res.data.list;
                for(let i=0; i<tableData.length; i++){
                  if(tableData[i].role.length == 1){
                    for(let k=0;k<tableData[i].role.length;k++){
                      tableData[i].roleList = tableData[i].role[k].roleName
                    }
                  }else if(tableData[i].role.length>1){
                    let roleList = [];
                    tableData[i].role.forEach(e=>{
                      roleList.push(e.roleName)
                    })
                    tableData[i].roleList=roleList.join(',')
                  }
                }
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
        this.queryRole();
      }
    }
</script>


<style  lang="scss">

</style>

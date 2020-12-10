<template>
  <div>
  <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
    <el-header style="height: 600px;overflow:auto;">
      <el-col :span="24" style="text-align: right;margin-bottom: 20px">
          <el-button  type="primary" v-if="item.resourceCode == 'auth_add'"  v-for="item in authButton" :key="item.resourceId" @click="getaddRole">{{item.resourceDesc}}</el-button>
      </el-col>
      <el-table ref="multipleTable" :data="tableData" stripe border tooltip-effect="dark" style="width: 100%">
        <el-table-column label="角色名称"  show-overflow-tooltip prop="roleName">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" show-overflow-tooltip >
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
                <el-dropdown-item  @click.native="getRoleButton(scope.row,item)" v-if="item.resourceCode != 'auth_add'  && item.resourceCode != 'auth_query' && item.resourceType != '3' && item.resourceCode != 'query'"  v-for="item in authButton" :key="item.resourceId">{{item.resourceName}}</el-dropdown-item>
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
      :visible.sync="getRole"
      width="40%"
      :before-close="handleClose">
      <el-form ref="roleList" :rules="rules" :model="roleList" label-width="120px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleList.roleName" size="mini" maxlength="20" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="roleList.description" maxlength="100" size="mini" type="textarea" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="权限设置" prop="permission">
          <el-tree
          :data = "data2"
          show-checkbox
          node-key = "resourceId"
          :default-checked-keys = "roleList.permission"
          ref = "tree"
          :props= "defaultProps" >
          </el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="resetChecked">取 消</el-button>
      <el-button type="primary" @click="getCheckedNodes('roleList')" :disabled="isDisable">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  let validroleName =(rule, value,callback)=>{
    if (!value){
      callback(new Error('角色名称不能为空'))
    }else  if (!isvalidString(value)){
      callback(new Error('请输入中文、英文、数字,不支持特殊字符'))
    }else {
      callback()
    }
  }
  let validdescription =(rule, value,callback)=>{
    if (!value.trim()){
      callback(new Error('角色描述不能为空'))
    }/* else  if (!isvalidString(value)){
      callback(new Error('请输入中文、英文、数字,不支持特殊字符'))
    } */else {
      callback()
    }
  }
  import {SESSION_STOART_MENUS} from "../../utils/ConstUtils.js"
  import {SESSION_STORAGE_USER} from "../../utils/ConstUtils.js"
  import {isvalidString} from '../../../config/validate'
  import  lodash from 'lodash'
  export default {
    name: "operatorManagement",
    data() {
      return {
        isDisable:false,
        title:'',
        data2: [],
        defaultProps: {
          children: 'children',
          label: 'resourceName'
        },
        rules: {
          roleName: [
            {required: true, trigger: 'blur',validator:validroleName},
          ],
          description: [
            {required: true, trigger: 'blur',validator:validdescription},
          ],
          permission: [
            {required: true, message: '角色权限不能为空', trigger: 'blur'},
          ]
        },
        getRole:false,
        authButton:[],
        roleList:{
          roleName:'',
          description:'',
          permission:[],
        },
        roleId:'',
        operationAuthority:false,
        tableData: [],
        searchParams: {
          page: 1,
          pageSize: 10,
        },
        total:0,
      }
    },
    methods : {
      //获取按钮方法
      getRoleButton (val,item) {

        let _this = this;
        _this.roleList={
          roleName:'',
          description:'',
          permission:[],
        };
        if(item.resourceCode == "auth_update"){
          _this.title="修改角色";
          _this.roleId = val.roleId
          _this.$http.get(_this.api.API_GATEWATE+'role/'+_this.roleId,_this.GLOBAL.topheaders())
            .then(function(res){
              console.log(res.data)
              let permissionList = res.data;
              let permission =[];
              permissionList.forEach(e => {
                permission.push(e.resourceId)
              })
              let arr = permission; //后台返回的id组成的数组
              let newArr = [];
              _this.roleList.permission = [];
              arr.forEach(item=>{
                this.checked(item,this.data2,newArr)
              })
              _this.roleList.permission = newArr;
              _this.$refs.tree.setCheckedKeys([_this.roleList.permission,true])
              //_this.$refs.tree.setCheckedKeys([_this.roleList.permission,true])
              //控制台打印请求成功时返回的数据
              //bind(this)可以不用
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
              //bind(this)可以不用
            }.bind(this))
          _this.getRole = true;
          _this.roleList.roleName = val.roleName;
          _this.roleList.description = val.roleDesc;
        }else if(item.resourceCode =="auth_delete"){
          let roleId = val.roleId
          _this.$confirm('确定删除角色'+val.roleName+'?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.$http.delete(_this.api.API_GATEWATE+'role/'+roleId,_this.GLOBAL.topheaders())
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
        }
      },
      checked(id,data,newArr) {

        data.forEach(item => {
          if (item.resourceId == id) {
            if (!item.children) {
              newArr.push(item.resourceId)
            }
          } else {
            if (item && item.children && item.children.length != 0) {
              this.checked(id, item.children, newArr)
            }
          }
        });
      },
      getCheckedNodes(roleList) {
        let ridsa = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());//this.$refs.tree.getCheckedKeys()// 获取当前的选中的数据[数组] -id, 把数组转换成字符串
        if(ridsa && ridsa.length>0){
          this.roleList.permission=[15];
        }
        if(this.title == "新增角色"){
          this.addRole(roleList);
        }else if(this.title == "修改角色"){
          this.updataRole(roleList);
        }
      },
      updataRole (roleList) {
        this.$refs[roleList].validate((valid) => {
          let _this = this;
          if (valid) {
            this.roleList.permission=[];
            let ridsa = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());//this.$refs.tree.getCheckedKeys()// 获取当前的选中的数据[数组] -id, 把数组转换成字符串
            ridsa.push(15)
            if(ridsa){
              this.roleList.permission = ridsa
            }
            let params = {
              roleId: _this.roleId,
              roleName : _this.roleList.roleName,
              roleDesc : _this.roleList.description,
              resourceIds : _this.roleList.permission
            }
            this.isDisable=true;
            _this.$http.put(_this.api.API_GATEWATE+'role',params,_this.GLOBAL.topheaders())
              .then(function(res){
                this.isDisable=false;
                console.log(res.data)
                if(res.data == true){
                  _this.$message({
                    message: "修改成功",
                    type: 'success'
                  });
                  _this.init();
                  _this.getRole=false;
                  _this.roleList.roleName="";
                  _this.roleList.description="";
                  _this.roleList.permission=[];
                  _this.$refs.tree.setCheckedKeys([]);
                }
                //控制台打印请求成功时返回的数据
                //bind(this)可以不用
              }.bind(this))
              .catch(function(err){
                if(err.data) {
                  console.log(err.body.msg)
                  _this.$message({
                    message: err.data.msg,
                    type: 'error'
                  });
                  //控制台打印错误返回的内容
                }
                this.isDisable=false;
                let arr = _this.roleList.permission; //后台返回的id组成的数组
                let newArr = [];
                _this.roleList.permission = [];
                arr.forEach(item=>{
                  this.checked(item,this.data2,newArr)
                })
                _this.roleList.permission = newArr;
                _this.$refs.tree.setCheckedKeys([_this.roleList.permission,true])
                //bind(this)可以不用
              }.bind(this))
          }})
      },
      addRole (roleList) {
        this.$refs[roleList].validate((valid) => {
          let _this = this;
            if (valid) {
              this.roleList.permission=[];
              let ridsa = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());//this.$refs.tree.getCheckedKeys()// 获取当前的选中的数据[数组] -id, 把数组转换成字符串
              ridsa.push(15)
              if(ridsa){
                this.roleList.permission = ridsa
              }
              let params = {
                roleName : _this.roleList.roleName,
                roleDesc : _this.roleList.description,
                resourceIds : _this.roleList.permission
              }
            this.isDisable=true;
              _this.$http.post(_this.api.API_GATEWATE+'role',params,_this.GLOBAL.topheaders())
                .then(function(res){
                  this.isDisable=false;
                  _this.getRole=false;
                  console.log(res.data)
                  if(res.data == true){
                    _this.$message({
                      message: "添加成功",
                      type: 'success'
                    });
                    _this.init();
                    _this.roleList.roleName="";
                    _this.roleList.description="";
                    _this.roleList.permission=[];
                    _this.$refs.tree.setCheckedKeys([]);
                  }
                  //控制台打印请求成功时返回的数据
                  //bind(this)可以不用
                }.bind(this))
                .catch(function(err){
                  this.isDisable=false;
                  if(err && err.data && err.data.key == "400300"){
                    _this.$router.push({ path: "/login" });
                  }
                  let arr = _this.roleList.permission; //后台返回的id组成的数组
                  let newArr = [];
                  _this.roleList.permission = [];
                  arr.forEach(item=>{
                    this.checked(item,this.data2,newArr)
                  })
                  _this.roleList.permission = newArr;
                  _this.$refs.tree.setCheckedKeys([_this.roleList.permission,true])
                  _this.$message({
                    message: err.body.msg,
                    type: 'error'
                  });
                  //bind(this)可以不用
                }.bind(this))
            }})
      },
      handleClose(){
        this.getRole=false;
        this.clearVails();
        this.roleList={};
        this.$refs.tree.setCheckedKeys([]);
      },
      //清除验证
      clearVails(){
        this.$refs['roleList'].clearValidate();
      },
      resetChecked() {

        this.getRole=false;
        this.clearVails();
        this.roleList={};
        this.roleList.permission=[];
        this.$refs.tree.setCheckedKeys([]);
      },
      getaddRole(){

        this.getRole=true;
        this.title="新增角色"
        this.$refs.tree.setCheckedKeys([]);
      },
      handleSizeChange (val) {
        this.searchParams.pageSize = val;
        this.init()
      },
      handleCurrentChange (val) {
        this.searchParams.page = val;
        this.init()
      },
      init () {
        let _this = this;
        _this.$http.get(_this.api.API_GATEWATE+'role?page='+_this.searchParams.page+'&pageSize='+_this.searchParams.pageSize,_this.GLOBAL.topheaders())
          .then(function(res){
            if(res && res.data && res.data.list && res.data.list.length>0){
              this.tableData =  res.data.list;
              this.total = res.data.total || 0;
            }else{
              this.tableData =  [];
              this.total = 0;
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
      const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
        const data = lodash.cloneDeep(menuList);
        const result = [];
        const hash = {};
        data.forEach((item, index) => {
          hash[data[index][id]] = data[index];
        });
        data.forEach((item) => {
          const hashVP = hash[item[pid]];
          if (hashVP) {
            if (!hashVP[children]) {
              hashVP[children] = [];
            }
            hashVP[children].push(item);
          } else {
            result.push(item);
          }
        });
        return result;
      };
     let menu = arrayToTree(menuList,'resourceId','resourceParentId')

      menu.forEach( e =>{
        if(e.resourceName != "" && e.resourceType != "3" && e.resourceId != '15'){
          this.data2.push(e)
        }
      })
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

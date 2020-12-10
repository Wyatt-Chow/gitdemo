<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 50px">红包名称:</label>
          <el-input  size="mini" maxlength="20" style="width:20%" v-model="searchParams.typeName">
          </el-input>
          <label style="padding-left: 50px">红包类型:</label>
          <el-input  size="mini" maxlength="20" style="width:20%" v-model="searchParams.typeValue">
          </el-input>
          <el-button size="mini" type="primary" @click="queryList" style="margin-left:55px" :disabled="isDisable">搜索</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-row>
          <el-col :span="24" style="text-align: right;padding-right: 20px;">
            <el-button  type="primary" v-if="item.resourceCode == 'add'"  v-for="item in authButton" :key="item.resourceId" @click="getRedEnvelopeTypeButton">{{item.resourceDesc}}</el-button>
          </el-col>
        </el-row>
      </el-row>
    </div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable" :data="tableData" border stripe tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="typeName" label="红包名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="typeValue" label="红包类型" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="stateName" label="状态" show-overflow-tooltip >
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
                  <el-dropdown-item  @click.native="getButton(scope.row,item)" v-if="item.resourceCode != 'add' && scope.row.state == 'NORMAL' && item.resourceCode != 'query' && item.resourceType != '3'" v-for="item in authButton" :key="item.resourceId">{{item.resourceName}}</el-dropdown-item>
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
      :title=title
      :visible.sync="redEnvelopeTypeSync"
      width="40%"
      :before-close="handleClose">
      <el-form ref="redEnvelopeTypeList" :rules="rules" :model="redEnvelopeTypeList" label-width="120px">
        <el-form-item label="红包类型" prop="typeValue">
          <el-input v-model="redEnvelopeTypeList.typeValue" maxlength="20" size="mini" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="红包名称" prop="typeName">
          <el-input v-model="redEnvelopeTypeList.typeName" maxlength="20" size="mini" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="escReturn">取 消</el-button>
      <el-button type="primary" @click="addWhetherUpadate('redEnvelopeTypeList')" :disabled="isDisable">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import {SESSION_STOART_MENUS} from "../../utils/ConstUtils.js"
  import {SESSION_STORAGE_USER} from "../../utils/ConstUtils.js"
  export default {
    name: "redEnvelopeTypeManagement",
    data() {
      return {
        isDisable:false,
        title:'',
        redPacketOne:[],
        redEnvelopeTypeList:{
          typeValue:'',
          typeName:'',
        },
        redEnvelopeTypeSync:false,
        endTime:'',
        authButton:[],
        tableData: [],
        searchParams: {
          typeName:'',
          typeValue:'',
          page: 1,
          pageSize: 10,
        },
        total:0,
        value: '',
        rules:{
          typeValue: [
            {required: true, message: '红包类型不能为空', trigger: 'blur'},
          ],
          typeName: [
            {required: true, message: '红包名称不能为空', trigger: 'blur'},
          ]
        }
      }
    },
    methods:{
      //条件搜索
      queryList(){
        this.searchParams.page=1;
        this.searchParams.typeValue = this.searchParams.typeValue;
        this.searchParams.mchName = this.searchParams.mchName;
        this.init();
      },
      //区分添加还是修改？
      addWhetherUpadate (redEnvelopeTypeList){
        if(this.title == "新增红包类型"){
          this.addRedEnvelopeTypeList(redEnvelopeTypeList)
        }else{
          this.updateRedPacketId(redEnvelopeTypeList)
        }
      },
      //获取按钮
      getButton(val,item){

        if(item.resourceCode == "del"){
          this.delredEnvelopeType(val);
        }else if(item.resourceCode == "query"){
          this.queryRedPacketId(val);
        }else if(item.resourceCode == "update"){
          this.title="修改红包类型";
          this.queryRedPacketId(val);
        }
      },
      //修改红包类型
      updateRedPacketId(redEnvelopeTypeList){

        this.$refs[redEnvelopeTypeList].validate((valid) => {
          if (valid) {
            let _this = this;
            let params = {
              id: _this.redEnvelopeTypeList.id,
              typeValue: _this.redEnvelopeTypeList.typeValue,
              typeName: _this.redEnvelopeTypeList.typeName,
            }
            this.isDisable=true;
            _this.$http.put(_this.api.API_GATEWATE + 'mango/updateRedPacket', params,_this.GLOBAL.topheaders())
              .then(function (res) {
                this.isDisable=false;
                console.log(res.data)
                if (res.data == true) {
                  _this.$message({
                    message: "修改成功",
                    type: 'success'
                  });
                  _this.init();
                  _this.redEnvelopeTypeSync = false;
                  _this.redEnvelopeTypeList={};

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
      //根据id查询数据
      queryRedPacketId(val){
        let _this = this;
        _this.$http.get(_this.api.API_GATEWATE+'mango/redPacketQueryone/'+val.id,_this.GLOBAL.topheaders())
          .then(function(res){
            this.redEnvelopeTypeSync=true;
            _this.redEnvelopeTypeList = res.data;
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
      //删除红包类型
      delredEnvelopeType (val){
        let _this = this;
        if(val.id){
          let id = val.id;
          this.$confirm('确定删除红包类型:'+val.typeName+'?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.$http.delete(_this.api.API_GATEWATE+'mango/deleteRedPacket/'+id,_this.GLOBAL.topheaders())
              .then(function(res){
                console.log(res.data)
                if(res.data == true){
                  _this.$message({
                    type: 'success',
                    message: '删除成功'
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
              }.bind(this))
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      //弹框关闭功能
      handleClose(done) {
        this.clearVails();
        this.redEnvelopeTypeSync=false;
        this.redEnvelopeTypeList={};
      },
      //清除验证
      clearVails(){
        this.$refs['redEnvelopeTypeList'].clearValidate();
      },
      escReturn(){
        this.clearVails();
        this.redEnvelopeTypeSync=false;
        this.redEnvelopeTypeList={};
      },
      getRedEnvelopeTypeButton (){
        this.title="新增红包类型";
        this.redEnvelopeTypeSync=true;
      },
      handleSizeChange (size) {
        this.searchParams.pageSize = size;
        this.init();
      },
      handleCurrentChange (val) {
        this.searchParams.page = val;
        this.init()
      },
      //新增红包类型
      addRedEnvelopeTypeList (redEnvelopeTypeList){
        this.$refs[redEnvelopeTypeList].validate((valid) => {
          if (valid) {
            let _this = this;
            let params = {
              typeValue: _this.redEnvelopeTypeList.typeValue,
              typeName: _this.redEnvelopeTypeList.typeName,
            }
            this.isDisable=true;
            _this.$http.post(_this.api.API_GATEWATE + 'mango/insertRedPacket', params,_this.GLOBAL.topheaders())
              .then(function (res) {
                this.isDisable=false;
                console.log(res.data)
                if (res.data == true) {
                  _this.$message({
                    message: "添加成功",
                    type: 'success'
                  });
                  _this.init();
                  _this.redEnvelopeTypeSync = false;
                  _this.redEnvelopeTypeList={};

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
                  //控制台打印错误返回的内容
                //bind(this)可以不用
              }.bind(this))
          }
        })
      },
      init () {
        let _this = this;
        this.isDisable=true;
        _this.$http.post(_this.api.API_GATEWATE+'mango/redPacketList',_this.searchParams,_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable=false;
            if(res && res.data && res.data.list){
              this.tableData = res.data.list;
              let lists = res.data.list
              lists.forEach(e =>{
                if(e.state != "DISABLE"){
                  e.stateName = '正常'
                }else if(e.state != "NORMAL"){
                  e.stateName = '已删除'
                }
              })
              this.total = res.data.total || 0;
            }else{
              this.tableData =[];
              this.total = 0;
            }
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
            _this.authButton.push(k);
          }
        })
      }
      this.init();
    }
  }
</script>


<style  lang="scss">
</style>

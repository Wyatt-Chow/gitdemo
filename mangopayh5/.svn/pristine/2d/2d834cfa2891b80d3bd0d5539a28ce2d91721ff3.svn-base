<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 30px">红包类型:</label>
          <el-select v-model="params.redPacketId"  placeholder="请选择" size="mini" style="width:20%">
            <el-option value="" key="" label="全部"></el-option>
            <el-option
              v-for="item in redPacketTypeList"
              :key="item.id"
              :label="item.typeName"
              :value="item.id">
            </el-option>
          </el-select>
          <label style="padding-left: 50px">银行渠道:</label>
            <el-select v-model="params.channel"  placeholder="请选择" size="mini" style="width:20%">
              <el-option
                v-for="item in channel"
                :key="item.lable"
                :label="item.value"
                :value="item.lable">
              </el-option>
            </el-select>
          <label style="padding-left: 50px">商户名称:</label>
          <el-select v-model="params.mchName"  placeholder="请选择" size="mini" style="width:20%">
            <el-option value="" key="" label="全部"></el-option>
            <el-option
              v-for="item in mchNameList"
              :key="item.coreId"
              :label="item.mchName"
              :value="item.mchName">
            </el-option>
          </el-select>
          <el-button type="primary"  size="mini" @click="queryRedPacket" style="margin-left: 50px;" :disabled="isDisable">搜索</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="text-align: right;padding-right: 20px;">
          <el-button  type="primary" v-if="item.resourceCode == 'add'"  v-for="item in authButton" :key="item.resourceId" @click="getRedEnvelopeButton">{{item.resourceDesc}}</el-button>
        </el-col>
      </el-row>
    </div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable" :data="tableData" stripe border tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="redPacketTypeName" label="红包名称" show-overflow-tooltip width="300">
          </el-table-column>
          <el-table-column prop="channelName" label="银行渠道" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="mchName" label="商户名" show-overflow-tooltip width="260">
          </el-table-column>
          <el-table-column prop="provisonAmount" label="总金额 (元)" show-overflow-tooltip>
          </el-table-column>
         <!-- <el-table-column prop="processname" label="剩余额度 (元)" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="urgencyName" label="已领取金额 (元)" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="creatorName" label="已领取人数" show-overflow-tooltip>
          </el-table-column>-->
          <el-table-column prop="states" label="状态" show-overflow-tooltip>
          </el-table-column>
      <!--    <el-table-column prop="activityName" label="有效期" show-overflow-tooltip>
          </el-table-column>-->
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
                  <el-dropdown-item  @click.native="getButton(scope.row,item)" v-if="item.resourceCode != 'add' && scope.row.state=='NORMAL' && item.resourceCode != 'query' && item.resourceType != '3'" v-for="item in authButton" :key="item.resourceId">{{item.resourceName}}</el-dropdown-item>
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
      title="新增红包预备款"
      :visible.sync="redEnvelopeSync"
      width="40%"
      :before-close="handleClose">
      <el-form ref="redPacketReserveList" :rules="rules" :model="redPacketReserveList" label-width="120px">
        <el-form-item label="红包类型" prop="redPacketTypeName">
          <el-select v-model="redPacketReserveList.redPacketTypeName"  @change="changeRedPacketTypeName"  placeholder="请选择" size="mini" style="width:80%">
            <el-option
              v-for="item in redPacketTypeList"
              :key="item.id"
              :label="item.typeName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="银行渠道" prop="channel">
          <el-select v-model="redPacketReserveList.channel"  @change="changeChannel" placeholder="请选择" size="mini" style="width:80%">
            <el-option
              v-for="item in accountList"
              :key="item.lable"
              :label="item.value"
              :value="item.lable">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商户名" prop="coreId">
          <el-select v-model="redPacketReserveList.coreId"  @change="changeCoreId"  placeholder="请选择" size="mini" style="width:80%">
            <el-option
              v-for="item in mchNameList"
              :key="item.coreId"
              :label="item.mchName"
              :value="item.coreId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="总金额" prop="provisonAmount">
          <el-input v-model="redPacketReserveList.provisonAmount" maxlength="13" size="mini" style="width: 80%"></el-input>&nbsp;<span>元</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="escReturn">取 消</el-button>
      <el-button type="primary" @click="addRedPacketReserve('redPacketReserveList')" :disabled="isDisable">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import {SESSION_STOART_MENUS} from "../../utils/ConstUtils.js"
  import {isvalidAmountmoney} from '../../../config/validate'
  import {toTime,toNum} from "../../../config/util.js"
  let valiAmountmoney =(rule, value,callback)=>{

    if (!value){
      callback(new Error('总金额不能为空!'))
    }else  if (!isvalidAmountmoney(value) || value == 0){
      callback(new Error('请输入正数,小数只允许两位!'))
    }else {
      callback()
    }
  };
  export default {
    name: "redEnvelopeSettlementPreparation",
    data() {
      return {
        isDisable:false,
        accountList:[{
          lable:'CMB',
          value:'招商银行'
        },{
          lable:'CCB',
          value:'建设银行'
        },{
          lable:'CIB',
          value:'兴业银行'
        }],
        channel:[{
          lable:null,
          value:'全部'
        },{
          lable:'CMB',
          value:'招商银行'
        },{
          lable:'CCB',
          value:'建设银行'
        },{
          lable:'CIB',
          value:'兴业银行'
        }],
        option:[{
          lable:null,
          value:'全部'
        },{
          lable:'湖南快乐阳光互动娱乐传媒有限公司',
          value:'湖南快乐阳光互动娱乐传媒有限公司'
        },{
          lable:'芒果超媒股份有限公司',
          value:'芒果超媒股份有限公司'
        },{
          lable:'湖南快乐通宝小额贷款有限公司',
          value:'湖南快乐通宝小额贷款有限公司'
        }],
        mchNameList:[],
        redPacketTypeList:[],
        redPacketReserveDetails:{},
        redPacketReserveList:{
          redPacketTypeName:null,
          mchName:'',
          channel:'',
          coreId:'',
          provisonAmount:'',
        },
        params:{
          redPacketId:null,
          channel:null,
          mchName:null,
          page :1,
          pageSize:10
        },
        redEnvelopeSync:false,
        authButton:[],
        tableData: [],
        searchParams: {
          page: 1,
          pageSize: 10,
        },
        currentPage: 1,
        total:0,
        rules: {
          redPacketTypeName: [
            {required: true, message: '红包类型不能为空', trigger: 'blur'},
          ],
          channel: [
            {required: true, message: '银行渠道不能为空', trigger: 'blur'},
          ],
          coreId: [
            {required: true, message: '商户名不能为空', trigger: 'blur'},
          ],
          provisonAmount: [
            {required: true,validator:valiAmountmoney,  trigger: 'blur'},
          ],
        },
      }
    },
    methods: {
      changeCoreId(){
        this.$refs['redPacketReserveList'].clearValidate('coreId');
      },
      changeChannel(){
        this.$refs['redPacketReserveList'].clearValidate('channel');
      },
      changeRedPacketTypeName(){
        this.$refs['redPacketReserveList'].clearValidate('redPacketTypeName');
      },
      //清除验证
      changeTypeName(){
        this.$refs['redPacketReserveList'].clearValidate();
      },
      //获取按钮
      getButton(val,item){

        if(item.resourceCode == "del"){
          this.delredEnvelopes(val);
        }else if(item.resourceCode == "query"){
          this.queryRedPacketId(val);
        }
      },
      queryRedPacketId(val){
        let _this = this;
        if(val.id) {
          let id = val.id;
          _this.$http.get(_this.api.API_GATEWATE + 'mango/redPacketReserveOne/'+id)
            .then(function (res) {
              if (res.data) {
              _this.redPacketReserveDetails = res.data;
              }
            }.bind(this))
            .catch(function (err) {
              if(((err && err.data && err.data.key == "400300"))){
                _this.$router.push({ path: "/login" });
              }
              _this.$message({
                message: err.body.msg,
                type: 'error'
              });
              //bind(this)可以不用
            }.bind(this))
        }

      },
      queryMchName (){

        let _this = this;
        let params = {
          page:1,
          pageSize:999
        }
        this.$http.post(_this.api.API_GATEWATE+'mango/getMchList',params,_this.GLOBAL.topheaders())
          .then(function(res){
            console.log(res.data)
            _this.mchNameList =  res.data.list;
            //控制台打印请求成功时返回的数据
            //bind(this)可以不用
          }.bind(this))
          .catch(function(err){
            if(((err && err.data && err.data.key == "400300"))){
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
      // changes (val){
      //
      //   this.$forceUpdate();
      // },
      //删除红包
      delredEnvelopes(val){
        let _this = this;
        if(val.id){
          let id = val.id;
          this.$confirm('确定删除红包预备款:'+val.redPacketTypeName+'?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.$http.delete(_this.api.API_GATEWATE+'mango/delRedPacketReserve/'+id,_this.GLOBAL.topheaders())
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
                if(((err && err.data && err.data.key == "400300"))){
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
      //清除验证
      clearVails(){
        this.$refs['redPacketReserveList'].clearValidate();
      },
      //escReturn
      escReturn(){
        this.clearVails();
        this.redEnvelopeSync=false;
        this.redPacketReserveList={};
      },
      //条件搜索
      queryRedPacket (){
        this.params.page=1;
        this.params.redPacketId = this.params.redPacketId;
        this.params.channel = this.params.channel;
        this.params.mchName = this.params.mchName || null;
        this.init();
      },
      addRedPacketReserve (redPacketReserveList){
        this.$refs[redPacketReserveList].validate((valid) => {
          if (valid) {
            let _this = this;
            this.mchNameList.forEach(e =>{
              if(e.coreId == _this.redPacketReserveList.coreId){
                _this.redPacketReserveList.mchName = e.mchName;
              }
            })
            let params = {
              mchName:_this.redPacketReserveList.mchName,
              redPacketId: _this.redPacketReserveList.redPacketTypeName,
              coreId: _this.redPacketReserveList.coreId,
              channel: _this.redPacketReserveList.channel,
              provisonAmount: _this.redPacketReserveList.provisonAmount,
            }
            this.isDisable=true;
            _this.$http.post(_this.api.API_GATEWATE + 'mango/insRedPacketReserve', params,_this.GLOBAL.topheaders())
              .then(function (res) {
                this.isDisable=false;
                console.log(res.data)
                if (res.data == true) {
                  _this.$message({
                    message: "添加成功",
                    type: 'success'
                  });
                  _this.init();
                  _this.redEnvelopeSync = false;
                  _this.redPacketReserveList={};

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
                  message: err.body.msg,
                  type: 'error'
                });
                //bind(this)可以不用
              }.bind(this))
          }
        })
      },
      //弹框关闭功能
      handleClose() {
       this.clearVails();
        this.redEnvelopeSync=false;
        this.redPacketReserveList={};
      },
      getRedEnvelopeButton () {
        this.redEnvelopeSync = true;
      },
      handleSizeChange (size) {

        this.params.pageSize = size;
        this.init();
      },
      handleCurrentChange (val) {

        this.params.page = val;
        this.init()
      },
      init () {
        let _this = this;
        _this.isDisable = true;
        _this.$http.post(_this.api.API_GATEWATE+'mango/redPacketReserve',_this.params,_this.GLOBAL.topheaders())
          .then(function(res){
            _this.isDisable = false;
            if(res && res.data && res.data.list){
              this.tableData = res.data.list;
              for (let i=0; i<_this.tableData.length;i++){
                _this.tableData[i].provisonAmount= _this.tableData[i].provisonAmount/100;
                /*_this.tableData[i].processname = _this.tableData[i].processname/100;
                _this.tableData[i].urgencyName =  _this.tableData[i].urgencyName/100;*/
              }
              this.tableData.forEach(e =>{
                if(e.state == "NORMAL"){
                  e.states = "正常"
                }else if(e.state == "DISABLE"){
                  e.states = "已删除"
                }
                this.accountList.forEach(k =>{
                  if(e.channel == k.lable){
                    e.channelName = k.value;
                  }
                })
              })
              this.total = res.data.total || 0;
            }else{
              this.tableData = [];
              this.total = 0;
            }
            //控制台打印请求成功时返回的数据
            //bind(this)可以不用
          }.bind(this))
          .catch(function(err){
            _this.isDisable = false;
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
      //初始化红包类型
      initredEnvelopeType (){
        let _this = this;
          let params={
            state : "NORMAL"
          }
        _this.$http.post(_this.api.API_GATEWATE+'mango/redPacketList',params,_this.GLOBAL.topheaders())
          .then(function(res){
            let list={"id":'',"typeName":'全部'};
            if(res.data && res.data.list){
              let lists = res.data.list
              lists.forEach(e =>{
                if(e.state != "DISABLE"){
                  this.redPacketTypeList.push(e)
                }
              })
            }
            //控制台打印请求成功时返回的数据
            //bind(this)可以不用
          }.bind(this))
          .catch(function(err){
            if(((err && err.data && err.data.key == "400300"))){
              _this.$router.push({ path: "/login" });
            }
            _this.$message({
              message: err.body.msg,
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
      }
      this.init();
      this.initredEnvelopeType();
      this.queryMchName();
    }
  }
</script>

<style  lang="scss">
</style>

<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 30px">商户名称:</label>
          <el-select v-model="mchName"  placeholder="请选择" size="mini" style="width:20%">
            <el-option value="" key="" label="全部"></el-option>
            <el-option
              v-for="item in mchNameList"
              :key="item.coreId"
              :label="item.mchName"
              :value="item.mchName">
            </el-option>
          </el-select>
          <label style="padding-left: 50px">红包类型:</label>
          <el-select v-model="redPacketId"  placeholder="请选择" size="mini" style="width:20%">
            <el-option value="" key="" label="全部"></el-option>
            <el-option
              v-for="item in redPacketTypeList"
              :key="item.id"
              :label="item.typeName"
              :value="item.id">
            </el-option>
          </el-select>
          <el-button size="mini" type="primary" @click="queryList" style="margin-left:55px" :disabled="isDisable">搜索</el-button>
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
          <el-table-column prop="name" label="红包规则名称" show-overflow-tooltip width="250">
          </el-table-column>
          <el-table-column label="红包类型"  show-overflow-tooltip prop="redPacketTypeName" width="250">
          </el-table-column>
          <el-table-column label="商户名称"  show-overflow-tooltip prop="mchName" width="250">
          </el-table-column>
          <el-table-column prop="totalAmount" label="总额度(元)" show-overflow-tooltip width="90">
        </el-table-column>
          <el-table-column prop="perAmount" label="单笔最大额度(元)"width="130">
          </el-table-column>
          <el-table-column prop="surplusAmount" label="剩余额度(元)"width="130">
        </el-table-column>
          <el-table-column prop="amountReleased" label="已发放金额(元)"width="130">
          </el-table-column>
          <el-table-column prop="numberReleased" label="已发放人数"width="130">
          </el-table-column>
        <!--  <el-table-column prop="receivedeAmount" label="已领取金额 (元)" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="creatorName" label="已领取人数" show-overflow-tooltip>
          </el-table-column>-->
          <el-table-column prop="states" label="状态" show-overflow-tooltip width="70">
          </el-table-column>
          <el-table-column prop="num" label="可领取红包次数"width="120">
          </el-table-column>
          <el-table-column label="开始时间" prop="startTime" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column label="结束时间" prop="endTime" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column
            v-if="authButton.length>0"
            fixed="right"
            label="操作"
            show-overflow-tooltip width="80">
            <template slot-scope="scope">
              <el-dropdown :hide-on-click="false">
                <span class="el-dropdown-link">
                  <i class="el-icon-menu"></i><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item  @click.native="getButton(scope.row,item)" v-if="item.resourceCode != 'add' && scope.row.state == 'NORMAL' &&  item.resourceCode != 'query' && item.resourceType != '3'" v-for="item in authButton" :key="item.resourceId">{{item.resourceName}}</el-dropdown-item>
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
      :visible.sync="redEnveloperuleSync"
      width="45%"
      :before-close="handleClose">
      <el-form ref="redEnvelopeRoleList" :rules="rules" :model="redEnvelopeRoleList" label-width="150px">
        <el-form-item label="商户名" prop="coreId">
          <el-select v-model="redEnvelopeRoleList.coreId" maxlength="20"  @change="changeCoreId" placeholder="请选择" size="mini" style="width:80%">
            <el-option
              v-for="item in mchNameList"
              :key="item.coreId"
              :label="item.mchName"
              :value="item.coreId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="红包规则名称" prop="name">
          <el-input v-model="redEnvelopeRoleList.name" size="mini" maxlength="20" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="红包有效日期" prop="starttime">
          <el-date-picker
            style="width:80%"
            size="mini"
            v-model="redEnvelopeRoleList.starttime"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
            :picker-options="startTime"
           >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="红包类型" prop="redPacketId">
          <el-select ref="redPacketId" v-model="redEnvelopeRoleList.redPacketId"  @change="changeredPacketId" placeholder="请选择" size="mini" style="width:80%">
            <el-option
              v-for="item in redPacketTypeList"
              :key="item.id"
              :label="item.typeName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="总金额" prop="totalAmount">
          <el-input v-model="redEnvelopeRoleList.totalAmount" ref="totalAmount"  @blur="blurperAmount" size="mini" maxlength="13"  style="width: 80%"></el-input>&nbsp;<span>元</span>
        </el-form-item>
        <el-form-item label="单笔最大金额" prop="perAmount">
          <el-input v-model="redEnvelopeRoleList.perAmount"  ref="totalAmount" @blur="blurtotalAmount" size="mini" maxlength="13"  style="width: 80%"></el-input>&nbsp;<span>元</span>
        </el-form-item>
        <el-form-item label="可领取红包次数" prop="num">
          <el-input v-model="redEnvelopeRoleList.num"  maxlength="10" size="mini"  style="width: 80%" placeholder="输入0为不限制次数"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="escReturn">取 消</el-button>
      <el-button type="primary" @click="addWhetherUpadate('redEnvelopeRoleList')" :disabled="isDisable">确 定</el-button>
    </span>
    </el-dialog>
    <el-dialog
      title="更新红包预备款"
      :visible.sync="updateredRedPacketSync"
      width="40%"
      :before-close="handleClose2">
      <el-form ref="updateredRedPacketList" :rules="updataRedPacket" :model="updateredRedPacketList" label-width="120px">
        <el-form-item prop="newTotalAmount">
          <el-select v-model="titles" size="mini" style="width: 27%">
            <el-option value="+" key="+" label="总额度加"></el-option>
            <el-option value="-" key="-" label="总额度减"></el-option>
          </el-select>
          <el-input v-model="updateredRedPacketList.newTotalAmount"  size="mini" maxlength="13"  style="width:50%"></el-input>&nbsp;<span>元</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="escReturn2">取 消</el-button>
      <el-button type="primary" @click="amountUpdateList('updateredRedPacketList')" :disabled="isDisable">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import {SESSION_STOART_MENUS} from "../../utils/ConstUtils.js"
  import {SESSION_STORAGE_USER} from "../../utils/ConstUtils.js"
  import {isvalidAmountmoney,num,isvalidFee,nuberOne} from '../../../config/validate'
  import {toData,toTime} from "../../../config/util.js"
  let valid7Number=(rule, value,callback)=> {
    if (!value) {
      callback(new Error('最大金额不能为空!'))
    } else if (!isvalidFee(value) || value == 0) {
      callback(new Error('请输入1-7位整数或1-7位整数加1-2位小数!'))
    } else {
      callback()
    }
  };
  let validnum=(rule, value,callback)=> {
    if (!value) {
      callback(new Error('次数不能为空!'))
    } else if (!num(value)) {
      callback(new Error('请输入数字!'))
    } else {
      callback()
    }
  };
  let validNumber=(rule, value,callback)=>{
    if (!value){
      callback(new Error('金额不能为空!'))
    }else  if (!isvalidAmountmoney(value) || value==0){
      callback(new Error('请输入正数,允许带两位小数!'))
    }else {
      callback()
    }
  };
  let validNumberOne=(rule, value,callback)=>{
    debugger
    if (!value){
      callback(new Error('金额不能为空!'))
    }else  if (!nuberOne(value)){
      callback(new Error('请输入整数或小数,允许带两位小数!'))
    }else {
      callback()
    }
  };
  export default {
    name: "redEnvelopeRuleManagement",
    data() {
      return {
        titles:'+',
        isDisable:false,
        updateredRedPacketList:{
          newTotalAmount:"",
        },
        updateredRedPacketSync:false,
        title:"",
        redEnveloperuleSync:false,
        mchNameList:[],
        startTime: {
          disabledDate: time => {
            return time.getTime() < new Date(new Date().toLocaleDateString()).getTime();
          }
        },
        /* end*/
        redEnvelopeRoleList:{
          coreId:'',
          name:'',
          starttime:[],
          mchName:'',
          perAmount:'',
          totalAmount:'',
          redPacketId:'',
          startDate:'',
          endDate:'',
        },
        updataRedPacket:{
          newTotalAmount: [
            {required: true,trigger: 'blur',validator:validNumberOne},
          ],
        },
        rules:{
          perAmount:[
            {required: true,trigger: 'blur',validator:valid7Number},
          ],
          name: [
            {required: true, message: '红包规则名称不能为空', trigger: 'blur'},,
          ],
          starttime: [
            {required: true, message: '红包有效日期不能为空', trigger: 'blur'},
          ],
          coreId: [
            {required: true, message: '商户名不能为空', trigger: 'blur'},
          ],
          totalAmount: [
            {required: true,trigger: 'blur',validator:validNumber},
          ],
          redPacketId: [
            {required: true, message: '红包类型不能为空', trigger: 'blur'},
          ],
          num: [
            {required: true, trigger: 'blur',validator:validnum},
          ]
        },
        authButton:[],
        outgoingIsOpen: true,
        tableData: [],
        redPacketId:'',
        mchName:'',
        searchParams: {
          page: 1,
          pageSize: 10,
        },
        params: {
          page: 1,
          pageSize: 10,
        },
        total:0,
        redPacketTypeList:[],
        value: ''
      }
    },
    methods:{
      amountUpdateList(val){
        let _this = this;
        this.$refs[val].validate((valid) => {
          if (valid) {
            let params = {
              id: _this.updateredRedPacketList.id,
              totalAmount: this.titles+_this.updateredRedPacketList.newTotalAmount
            }
            _this.isDisable = true;
            _this.$http.put(_this.api.API_GATEWATE + 'mango/updateTotalAmount', params, _this.GLOBAL.topheaders())
              .then(function (res) {
                console.log(res.data)
                if (res.data == true) {
                  _this.isDisable = false;
                  this.updateredRedPacketSync = false;
                  _this.$message({
                    type: 'success',
                    message: '更新成功'
                  });
                  this.init();
                }
              }.bind(this))
              .catch(function (err) {
                if (err && err.data && err.data.key == "400300") {
                  _this.$router.push({path: "/login"});
                }
                _this.$message({
                  message: err.data.msg,
                  type: 'error'
                });
                _this.isDisable = false;
                //bind(this)可以不用
              }.bind(this))
          }
       })
      },
      blurperAmount(){
        if(this.redEnvelopeRoleList.perAmount && this.redEnvelopeRoleList.totalAmount){
          if(this.redEnvelopeRoleList.perAmount*10 > this.redEnvelopeRoleList.totalAmount*10){
            this.$message({
              message: "总金额不能小于单笔最大金额",
              type: 'info'
            });
            this.redEnvelopeRoleList.totalAmount="";
            //this.$refs.totalAmount.focus();
          }
        }
      },
      blurtotalAmount(){
        if(this.redEnvelopeRoleList.perAmount && this.redEnvelopeRoleList.totalAmount){
          if(this.redEnvelopeRoleList.perAmount*10 > this.redEnvelopeRoleList.totalAmount*10){
            this.$message({
              message: "单笔最大金额不能大于总金额",
              type: 'info'
            });
            this.redEnvelopeRoleList.perAmount="";
            //this.$refs.perAmount.focus();
          }
        }

      },
      changeCoreId(val){
        if(val){
          this.redEnvelopeRoleList.coreId = val;
          this.$refs['redEnvelopeRoleList'].clearValidate('coreId');
        }
      },
      changeredPacketId(val){
        if(val){
          this.redEnvelopeRoleList.redPacketId = val;
          this.$refs['redEnvelopeRoleList'].clearValidate('redPacketId');
        }
      },
      //条件搜索
      queryList(){
        this.searchParams.page=1;
        if(this.redPacketId){
          this.searchParams.redPacketId = this.redPacketId;
        }else{
          this.searchParams.redPacketId=null;
        }
        if(this.mchName){
          this.searchParams.mchName = this.mchName;
        }else{
          this.searchParams.mchName=null;
        }
        this.init();
      },
      //清除验证
      clearVails(){
        this.$refs['redEnvelopeRoleList'].clearValidate();
      },
      escReturn(){
        this.redEnvelopeRoleList={};
        this.redEnveloperuleSync=false;
        this.clearVails();
        //this.$forceUpdate();
      },
      escReturn2(){
        this.updateredRedPacketSync=false;
        this.$refs['updateredRedPacketList'].clearValidate();
        this.updateredRedPacketList.newTotalAmount="";
        //this.$forceUpdate();
      },
      handleClose(){
        this.redEnvelopeRoleList={};
        this.redEnveloperuleSync=false;
        this.clearVails()
      },
      handleClose2(){
        this.updateredRedPacketList.newTotalAmount="";
        this.updateredRedPacketSync=false;
        this.$refs['updateredRedPacketList'].clearValidate();
      },
      getRedEnvelopeRuleButton () {
        this.title = "新增红包规则";
        this.redEnveloperuleSync = true;
      },
      addWhetherUpadate (redEnvelopeRoleList){
        this.blurtotalAmount();
        if(this.redEnvelopeRoleList.starttime && this.redEnvelopeRoleList.starttime.length>0){
          this.redEnvelopeRoleList.startDate = toData(this.redEnvelopeRoleList.starttime[0]);
          this.redEnvelopeRoleList.endDate = toData(this.redEnvelopeRoleList.starttime[1]);
        }else{
          this.redEnvelopeRoleList.startDate ="";
          this.redEnvelopeRoleList.endDate ="";
        }
        if(this.title == "新增红包规则"){
          this.addRedEnvelopeList(redEnvelopeRoleList);
        }else{
          this.updateRedEnvelopeList(redEnvelopeRoleList);
        }
      },
      //修改
      updateRedEnvelopeList (redEnvelopeRoleList){
        this.$refs[redEnvelopeRoleList].validate((valid) => {
          if (valid) {
            let _this = this;
            _this.mchNameList.forEach(e =>{
              if(e.coreId == _this.redEnvelopeRoleList.coreId){
                _this.redEnvelopeRoleList.mchName=e.mchName;
              }
            })
            let params = {
              id:_this.redEnvelopeRoleList.id,
              mchName: _this.redEnvelopeRoleList.mchName,//商户名
              totalAmount: _this.redEnvelopeRoleList.totalAmount,//红包总金额
              perAmount: _this.redEnvelopeRoleList.perAmount,//固定金额
              name: _this.redEnvelopeRoleList.name,//红包名称
              coreId: _this.redEnvelopeRoleList.coreId,//商户【COREID】
              redPacketId: _this.redEnvelopeRoleList.redPacketId,//红包类型Id
              num: _this.redEnvelopeRoleList.num,//可领取红包次数
              startTime: _this.redEnvelopeRoleList.startDate,
              endTime: _this.redEnvelopeRoleList.endDate,
            }
            this.isDisable = true;
            _this.$http.put(_this.api.API_GATEWATE + 'mango/updateRedEnvelopeRules', params,_this.GLOBAL.topheaders())
              .then(function (res) {
                this.isDisable = false;
                if (res.data == true) {
                  _this.init();
                  _this.redEnveloperuleSync = false;
                  _this.redEnvelopeRoleList = {};
                  _this.$message({
                    message: "更新成功",
                    type: 'success'
                  });
                }
                //控制台打印请求成功时返回的数据
                //bind(this)可以不用
              }.bind(this))
              .catch(function (err) {
                this.isDisable = false;
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
      //添加
      addRedEnvelopeList (redEnvelopeRoleList) {
        this.$refs[redEnvelopeRoleList].validate((valid) => {
          if (valid) {
            let _this = this;
            _this.mchNameList.forEach(e =>{
              if(e.coreId == _this.redEnvelopeRoleList.coreId){
                _this.redEnvelopeRoleList.mchName=e.mchName;
              }
            })
            let params = {
              mchName: _this.redEnvelopeRoleList.mchName,//商户名
              totalAmount:_this.redEnvelopeRoleList.totalAmount,//红包总金额
              perAmount:_this.redEnvelopeRoleList.perAmount,//固定金额
              name: _this.redEnvelopeRoleList.name,//红包名称
              coreId: _this.redEnvelopeRoleList.coreId,//商户【COREID】
              redPacketId: _this.redEnvelopeRoleList.redPacketId,//红包类型Id
              num: _this.redEnvelopeRoleList.num,//红包类型Id
              startTime: _this.redEnvelopeRoleList.startDate,
              endTime: _this.redEnvelopeRoleList.endDate,
            }
            this.isDisable = true;
            _this.$http.post(_this.api.API_GATEWATE + 'mango/insertRedEnvelopeRules', params,_this.GLOBAL.topheaders())
              .then(function (res) {
                this.isDisable = false;
                if (res.data == true) {
                  _this.init();
                  _this.redEnveloperuleSync = false;
                  _this.redEnvelopeRoleList = {};
                  _this.$message({
                    message: "添加成功",
                    type: 'success'
                  });
                }
                //控制台打印请求成功时返回的数据
                //bind(this)可以不用
              }.bind(this))
              .catch(function (err) {
                this.isDisable = false;
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
      //获取按钮
      getButton(val,item){
        if(item.resourceCode == "del"){
          this.delredEnvelopeRole(val);
        }else if(item.resourceCode == "update"){
          this.title="修改红包规则";
          this.queryRedPacketRuleId(val);
        }else if(item.resourceCode == "amount_update"){
          this.updateredRedPacketSync = true;
          this.updateredRedPacketList = val;
          //this.updateredRedPacketList.newTotalAmount='';
          
        }
      },
      //删除
      delredEnvelopeRole(val){
        let _this = this;
        if(val.id){
          let id = val.id;
          this.$confirm('确定删除红包规则:'+val.name+'?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.$http.delete(_this.api.API_GATEWATE+'mango/deleteRedEnvelopeRules/'+id,_this.GLOBAL.topheaders())
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
      //修改
      queryRedPacketRuleId(val){
        let _this = this;
        _this.$http.get(_this.api.API_GATEWATE+'mango/redEnvelopeRulesQueryone/'+val.id,_this.GLOBAL.topheaders())
          .then(function(res){
            if(res.data){
              _this.redEnvelopeRoleList = res.data;
              if(res.data.endTime && res.data.startTime){
                let starttime = toData(res.data.startTime);
                let endtime = toData(res.data.endTime);
                _this.redEnvelopeRoleList.starttime = [starttime,endtime];
              }
              res.data.totalAmount = res.data.totalAmount/100;
              res.data.perAmount = res.data.perAmount/100;
              _this.redEnveloperuleSync = true;
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
      queryMchName (){
        let _this = this;
        let params = {
        }
        this.$http.post(_this.api.API_GATEWATE+'mango/getMchList',params,_this.GLOBAL.topheaders())
          .then(function(res){
            console.log(res.data)
            _this.mchNameList =  res.data.list;
            //控制台打印请求成功时返回的数据
            //bind(this)可以不用
          }.bind(this))
          .catch(function(err){
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
      //初始化红包类型
      initredEnvelopeType (){
        let _this = this;
        let params={
            state : "NORMAL"
        }
        _this.$http.post(_this.api.API_GATEWATE+'mango/redPacketList',params,_this.GLOBAL.topheaders())
          .then(function(res){
            console.log(res.data)
            if(res && res.data && res.data.list){
              let lists = res.data.list
              lists.forEach(e =>{
                if(e.state != "DISABLE"){
                  this.redPacketTypeList.push(e)
                }
              })
            }else{
              this.redPacketTypeList=[];
            }
            //控制台打印请求成功时返回的数据
            //bind(this)可以不用
          }.bind(this))
          .catch(function(err){
            _this.$message({
              message: err.data.msg,
              type: 'error'
            });
            //bind(this)可以不用
          }.bind(this))
      },
      init () {
        let _this = this;
        this.isDisable = true;
        _this.$http.post(_this.api.API_GATEWATE+'mango/redEnvelopeRulesList',_this.searchParams,_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable = false;
            _this.tableData = [];
            _this.total = 0;
            if(res && res.data && res.data.list && res.data.list.length>0){
              this.tableData = res.data.list;
              for (let i=0; i<_this.tableData.length;i++){
                if(_this.tableData[i].num == 0){
                  _this.tableData[i].num ='不限次数'
                }
                if(_this.tableData[i].totalAmount){
                  _this.tableData[i].totalAmount= _this.tableData[i].totalAmount/100;
                }
                if(_this.tableData[i].surplusAmount){
                  _this.tableData[i].surplusAmount= _this.tableData[i].surplusAmount/100;
                }
                if(_this.tableData[i].amountReleased){
                  _this.tableData[i].amountReleased= _this.tableData[i].amountReleased/100;
                }
               if(_this.tableData[i].perAmount){
                 _this.tableData[i].perAmount = _this.tableData[i].perAmount/100;
               }
                if(this.tableData[i].receivedeAmount){
                  _this.tableData[i].receivedeAmount =  _this.tableData[i].receivedeAmount/100;
                }
                if (_this.tableData[i].state && _this.tableData[i].state == "NORMAL") {
                  _this.tableData[i].states = "正常"
                } else if (_this.tableData[i].state && _this.tableData[i].state == "DISABLE") {
                  _this.tableData[i].states = "已删除"
                }
                if(_this.tableData[i].startTime){
                  _this.tableData[i].startTime = toTime(_this.tableData[i].startTime);
                }
                if(_this.tableData[i].endTime){
                  _this.tableData[i].endTime = toTime(_this.tableData[i].endTime);
                }
              }
              this.total = res.data.total || 0;
            }

            //控制台打印请求成功时返回的数据
            //bind(this)可以不用
          }.bind(this))
          .catch(function(err){
            this.isDisable = false;
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
            this.authButton.push(k);
          }
        })
      }
      this.init();
      this.queryMchName();
      this.initredEnvelopeType();
    }
  }
</script>

<style  lang="scss">
</style>

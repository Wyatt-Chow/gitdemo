<!--客户详情页面-->
<template>
  <div class="main_top" >
    
     
        <el-row type="flex" justify="space-around">  
          <el-col :span="6">

          </el-col>       
          <el-col :span='18'>
             <el-form label-width='100px'>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="用户ID：">
                    <span>{{'ll'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="注册时间：">
                    <span>{{'ll'}}</span>
                  </el-form-item>
                </el-col>
             
                <el-col :span="12">
                  <el-form-item label="用户姓名：">
                    <span>{{'ll'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="身份证号：">
                    <span>{{'ll'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="用户性别：">
                    <span>{{'ll'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="教育程度：">
                    <span>{{'ll'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="年龄：">
                    <span>{{'ll'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="生日：">
                    <span>{{'ll'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="籍贯：">
                    <span>{{'ll'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="居住地址：">
                    <span>{{'ll'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="个人年收入：">
                    <span>{{'ll'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="用户来源：">
                    <span>{{'ll'}}</span>
                  </el-form-item>
                </el-col>
                
              </el-row>
              </el-form>
              
            
          </el-col>
       
        </el-row>
     
        <el-button type="info" @click="historyVisible = true" center>查看完整档案>></el-button>
    
        <el-row>    
          <el-col :span="24" style="margin-top: 3%;">
            <span>统计信息</span>
          </el-col>     
          <el-col :span='24'>
            <el-table :data='statisticsInfo'>
              <el-table-column property="creditAmount"  label="贷款金额"></el-table-column>
              <el-table-column property="creditNumber"  label="贷款笔数"></el-table-column>
              <el-table-column property="creditRemain"  label="待还金额"></el-table-column>
              <el-table-column property="maxCreditAmount"  label="最高贷款金额"></el-table-column>
              <el-table-column property="overdueNumber"  label="逾期次数"></el-table-column>
              <el-table-column property="overdueAmount"  label="逾期金额"></el-table-column>
              <el-table-column property="paymentsOnTime"  label="按时还款率"></el-table-column>
              <el-table-column property="loginNumber"  label="登录次数"></el-table-column>
              
            </el-table>
          </el-col>
        </el-row>
        <el-row>    
          <el-col :span="24" style="margin-top: 3%;">
            <span>银行卡信息</span>
          </el-col>     
          <el-col :span='24'>
            <el-table :data='cardInfo'>
              <el-table-column property="useType"  label="帐户类型"></el-table-column>
              <el-table-column property="accountName"  label="帐户户名"></el-table-column>
              <el-table-column property="bankName"  label="银行开户行"></el-table-column>
              <el-table-column property="bankProv"  label="银行开户地(省)"></el-table-column>
              <el-table-column property="bankCity"  label="银行开户地(市)"></el-table-column>
              <el-table-column property="bankCardNo"  label="银行账号"></el-table-column>
              <el-table-column property="confirmBankCardNo"  label="确认银行账号"></el-table-column>
              <el-table-column property="status"  label="使用状态"></el-table-column>
              <el-table-column property="branchName"  label="支行名称"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
          <el-row>    
          <el-col :span="24" style="margin-top: 3%;">
            <span>贷款信息</span>
          </el-col>     
          <el-col :span='24'>
            <el-table :data='loanInfo'>
              <el-table-column property="grantCode"  label="贷款编号"></el-table-column>
              <el-table-column property="creatDate"  label="申请日期"></el-table-column>
              <el-table-column property="custId"  label="用户账号"></el-table-column>
              <el-table-column property="amount"  label="申请额度"></el-table-column>
              <el-table-column property="productName"  label="借款产品"></el-table-column>
              <el-table-column property="periods"  label="期限"></el-table-column>
              <el-table-column property="grantAmount"  label="审批金额"></el-table-column>
              <el-table-column property="source"  label="借款来源"></el-table-column>
              <el-table-column property="grantStatus"  label="借款状态"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <div class="table-page">
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="params.page"
                         :page-sizes="[5, 10, 15, 20]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
     
    
    <el-dialog title="用户完整档案" :visible.sync="historyVisible" center width="60%" >
      <el-form label-position=right label-width="80px" :disabled="true">
       
        <span ><strong>个人信息</strong></span>
          <el-row :gutter="20" style="margin-top: 50px;">
          <el-col :span="12">
          
            <el-form-item label='本人姓名'>
              <el-input v-model="form.name" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='性别'>
              <el-radio v-model="sex" label="1">男</el-radio>
              <el-radio v-model="sex" label="2">女</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='手机号码1'>
              <el-input v-model="form.phone1" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='手机号码2'>
              <el-input v-model="form.phone2" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='身份证'>
              <el-input v-model="form.cardId" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='学历'>
              <el-input v-model="form.education" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='年龄'>
              <el-input v-model="form.age" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='婚姻状况'>
             <el-radio v-model="marriage" label="1" >已婚</el-radio>
             <el-radio v-model="marriage" label="2" >未婚</el-radio>
             <el-radio v-model="marriage" label="3" >离异</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='有无子女'>
             <el-radio v-model="childSituation" label="1">有</el-radio>
             <el-radio v-model="childSituation" label="2">无</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='邮箱'>
              <el-input v-model="form.email" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='QQ'>
              <el-input v-model="form.qq" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='微信'>
              <el-input v-model="form.weixin" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label='家人知晓'>
             <el-radio v-model="familyKnow" label="1">是</el-radio>
             <el-radio v-model="familyKnow" label="2">否</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        </el-form>
        <el-form label-position=right label-width="80px" :disabled="true">
          <span><strong>居住信息</strong></span>
        <el-row :gutter="20" style="margin-top: 50px;">
          <el-col :span="12">
            <el-form-item label='居住情况'>
              <el-input v-model="form.livingSituation" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='现居住地'>
              <el-input v-model="form.adress" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='详细地址'>
              <el-input v-model="form.detailedAddress" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='居住时长'>
              <el-input v-model="form.theLivingTime" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='住宅电话'>
              <el-input v-model="form.homePhone" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        </el-form>
        <el-form label-position=right label-width="100px" :disabled="true">
          <span><strong>资产信息</strong></span>
        <el-row :gutter="20" style="margin-top: 50px;">
          <el-col :span="12">
            <el-form-item label='房产'>
              <el-input v-model="form.houseSituation" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='数量'>
              <el-input v-model="form.name" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='车产'>
              <el-input v-model="form.carSituation" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='数量'>
              <el-input v-model="form.carSituationNumber" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='个人年收入'>
              <el-input v-model="form.yearSalary" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        </el-form>
        <el-form label-position=right label-width="120px" :disabled="true">
          <span><strong>联系人信息</strong></span>
          <el-row :gutter="20" style="margin-top: 50px;">
            <el-col :span="12">
            <el-form-item label='配偶姓名'>
              <el-input v-model="form.spouseName" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='工作单位'>
              <el-input v-model="form.spouseUnit" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label='移动电话'>
              <el-input v-model="form.spouseTel" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='直系亲属姓名'>
              <el-input v-model="form.zxQsName" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='关系'>
              <el-input v-model="form.zxQsRelation" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='移动电话'>
              <el-input v-model="form.zxQsTel" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='工作单位'>
              <el-input v-model="form.zxQsUnit" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='其他联系人电话'>
              <el-input v-model="form.otherContactName" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='关系'>
              <el-input v-model="form.otherContactRelation" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='移动电话'>
              <el-input v-model="form.otherContactTel" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='工作单位'>
              <el-input v-model="form.otherContactUnit" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          </el-row>
        </el-form>
        <el-form label-position=right label-width="100px" :disabled="true">
          <span><strong>职业信息</strong></span>
          <el-row :gutter="20" style="margin-top: 50px;">
            <el-col :span="12">
            <el-form-item label='参与工作时间'>
              <el-input v-model="form.workingTime" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label='现单位名称'>
              <el-input v-model="form.unitName" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label='缴纳社保'>
              <el-radio v-model="sbYears" label="1">是</el-radio>
             <el-radio v-model="sbYears" label="2">否</el-radio>
            </el-form-item>
          </el-col> 
          <el-col :span="12">
            <el-form-item label='缴纳公积金'>
              <el-radio v-model="payAccumulationFund" label="1">是</el-radio>
             <el-radio v-model="payAccumulationFund" label="2">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='现单位地址'>
              <el-input v-model="form.unitAddress" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='详细单位地址'>
              <el-input v-model="form.detailedUnitAddress" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='现单位部门'>
              <el-input v-model="form.unitDept" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='现单位职位'>
              <el-input v-model="form.unitPosition" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='单位性质'>
              <el-input v-model="form.unitType" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='入职时间'>
              <el-input v-model="form.entryTime" size="mini" style="width:80%"></el-input>
            </el-form-item>
          </el-col> 
          </el-row>
        </el-form>
    </el-dialog>
  </div>
</template>
<!--客户详情页面-->
<script>
  import {SESSION_STOART_MENUS} from "@/utils/ConstUtils.js"
  import {toTime,buildRequestURL,toDataTime,formatUnixtimestamp,showload} from "../../../config/util.js"
    export default {
        name: "membershipManagement",
      data() {
        return {
          form:{},
          isLoad:false,
          isurl:'/',
          loading:false,
          isDisable:true,
          hrefUrl:'1111',
          idNumber:'',
          mobile:'',
          name:'',
          uuid:'',
          authButton:[],
          authenticationStatus:'',
          baseInfo:[{name1:'ll',value1:'122',name2:'ll',value2:'122',}],
          statisticsInfo:[],
          cardInfo:[],
          loanInfo:[],
          authenticationStatusList:[
            {
              value:'CERTIFIED',
              name:'已认证'
            },
            {
              value:'UNCERTIFIED',
              name:'未认证'

            },
            {
              value:'UNBIND',
              name:'已解绑'
            }
          ],

          //完整档案字段
          sex:'',
          marriage:'',
          familyKnow:'',
          childSituation:'',
          payAccumulationFund:'',
          sbYears:'',

          params: {
            authenticationStatus:'',
            page:1,
            pageSize:10,
            idNumber:"",
            mobile:"",
            name:"",
            startDate:"",
            endDate:"",
          },
          param: {
            authenticationStatus:'',
            page:1,
            pageSize:'',
            idNumber:"",
            mobile:"",
            name:"",
            startDate:"",
            endDate:"",
          },
          merchatVal:{},
          outgoingIsOpen: true,
          tableData: [],
          total:0,
          starttime:[],
          logVisible: false,
          historyVisible:false,
          logData:[],
          historyData:[],
          /* start 开始时间小于今天,结束时间不能大于开始时间 */
          startTime: {
            disabledDate: time => {
                return time.getTime() > Date.now();
            }
          },
          
        }
      },
      methods : {

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
        /*clickExport(){
          this.loading=true;
          this.$confirm('确定导出吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (!window.location.href.includes('10.11.51')){
                this.isurl = "/list/"
            }
            window.location.href=buildRequestURL(this.isurl+'mango/member/report',this.param);
            this.loading=false
          }).catch(() => {
            this.loading=false
            this.$message({
              type: 'info',
              message: '已取消导出'
            });
          });*/
        //获取操作日志
        getLog (val) {
          let _this = this;
          _this.logVisible = true;
          let params = {
            page:1,
            pageSize:999,
            userCoreId: val.coreId
          }
          this.$http.post(_this.api.API_GATEWATE+'mango/userTracksList',params,_this.GLOBAL.topheaders())
          .then(function(res) {
            _this.logData = res.body.list;
            _this.logData.forEach(e =>{
              e.createDate = formatUnixtimestamp(e.createDate)
            })
          }).catch(function(err){
            this.loading = false;
            if(err && err.data && err.data.key == "400300"){
                this.$router.push({ path: "/login" });
            }
            _this.$message({
            message: err.data.msg,
            type: 'error'
            });
                //bind(this)可以不用
          }.bind(this))
        },
        //查看详情
        view(val){
          this.$router.push({ name: 'customerDetails', params: { coupons: val }})
        },
        //删除
        del(val){
          console.log(val)
        },
        //获取实名历史
        getHistory (val) {
          let _this = this;
          _this.historyVisible = true;
          let params = {
            page:1,
            pageSize:999,
            memberCoreId: val.coreId
          }
          this.$http.post(_this.api.API_GATEWATE+'mango/getElecAccountHistory',params,_this.GLOBAL.topheaders())
          .then(function(res) {
            console.log(res.body.list)
            res.body.list.forEach(e =>{
              e.time = toTime(e.createDate+e.createTime)
              if(e.openAccountChannel == "CMB"){
                e.channelName ="招商银行";
              }else if(e.openAccountChannel == "CCB"){
                e.channelName ="建设银行"
              }else if(e.openAccountChannel == "CIB"){
                e.channelName ="兴业银行"
              }
            })
           
            _this.historyData = res.body.list;
          })
          .catch(function(err){
            this.loading = false;
            if(err && err.data && err.data.key == "400300"){
                this.$router.push({ path: "/login" });
            }
            _this.$message({
            message: err.data.msg,
            type: 'error'
            });
                //bind(this)可以不用
          }.bind(this))
        },
        //搜索
        queryMemberList () {
            this.params.idNumber = this.idNumber;
            this.params.page =1;
            this.params.mobile = this.mobile;
            this.params.name = this.name;
            this.params.authenticationStatus = this.authenticationStatus;
            this.params.uuid = this.uuid;
          if(this.addtime && this.addtime.length>0){
            this.params.startDate = toDataTime(this.addtime[0]);
            this.params.endDate = toDataTime(this.addtime[1]);
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

  /** 列表表格样式*/
  /**!*/
  .membershipMana-main {

  }


</style>

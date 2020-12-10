<template>
  <div  class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 30px">商户名称:</label>
          <el-input size="mini" style="width:20%" maxlength="20" v-model="searchParams.mchName"></el-input>
          <!--<label style="padding-left: 50px">渠道:</label>-->
            <!--<el-select v-model="searchParams.statu"  placeholder="请选择" size="mini" style="width:20%">-->
              <!--<el-option-->
                <!--v-for="item in stateOptions"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <el-button size="mini" type="primary" @click="queryList" style="margin-left:3%" :disabled="isDisable">搜索</el-button>
          <el-button style="float: right; ;"  type="primary" v-if="authButton.some(e=>{return e.resourceId == 187})" 
            @click="preCreate">商户入驻</el-button>
        </el-col>
      </el-row>
    </div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable" :data="tableData" stripe border>
          <el-table-column label="商户代码"  show-overflow-tooltip prop="mchId">
          </el-table-column>
          <el-table-column prop="mchName" label="商户名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="busiLicenseNo" label="商户证件代码" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="busiLicenseAddress" label="商户注册地址" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="mchType" label="商户类型" show-overflow-tooltip width="90">
          </el-table-column>
          <el-table-column prop="" label="商户结算账号" show-overflow-tooltip width="170">
          </el-table-column>
          <el-table-column prop="statu" label="状态" show-overflow-tooltip width="100">
          </el-table-column>
          <el-table-column prop="date" label="注册时间" show-overflow-tooltip width="150">
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
                  <el-dropdown-item  @click.native="getOperating(scope.row,item)"  
                  v-for="item in authButton.filter(filterAuth(scope.row))" :key="item.resourceId">{{item.resourceName}}</el-dropdown-item>
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
        title="开户"
        :visible.sync="accountOpening"
        width="30%"
        :before-close="handleClose">
      <el-form ref="banks" :rules="rule" :model="banks" label-width="100px">
        <el-form-item label="账户类型" prop="actType" v-if="openType">
          <el-select v-model="banks.actType"  placeholder="请选择" size="mini" style="width:80%">
            <!-- <el-option value="BORROW_MONEY">借点钱</el-option>
            <el-option value="SPEND_MONEY">花点钱</el-option> -->
            <el-option
              v-for="item in actList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="银行" prop="bank" v-else>
          <el-select v-model="banks.bank"  placeholder="请选择" size="mini" style="width:80%">
            <el-option
              v-for="item in accountList"
              :key="item.lable"
              :label="item.value"
              :value="item.lable">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="accountOpenings('banks')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="充值"
      :visible.sync="rechargeShow"
      width="30%"
      :before-close="handleCloses">
      <el-form ref="recharge" :rules="rules" :model="recharge" label-width="100px">
        <el-form-item label="充值金额" prop="number" >
          <el-input v-model="recharge.number" size="mini"  maxlength="13" style="width: 80%"></el-input>&nbsp;<span>元</span>
        </el-form-item>
        <el-form-item label="银行" prop="accounts">
          <el-select v-model="recharge.accounts"  placeholder="请选择" size="mini" style="width:80%">
            <el-option
              v-for="item in accountList"
              :key="item.lable"
              :label="item.value"
              :value="item.lable">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="handleCloses">取 消</el-button>
      <el-button type="primary" @click="getRecharge('recharge')">确 定</el-button>
    </span>
    </el-dialog>
    <el-dialog
      title="商户调账"
      :visible.sync="regulation"
      width="40%"
      :before-close="regulationCloses">
      <el-form ref="regulations" :rules="regulationrules" :model="regulations" label-width="120px">
       
        <el-form-item label="调账账户:" prop="actType">
          <el-select v-model="regulations.actType" placeholder="请选择" size="mini" style="width: 80%">
            <el-option
              v-for="item in actList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调账方式:" prop="sign">
          <el-select v-model="regulations.sign" placeholder="请选择" size="mini" style="width: 80%">
            <el-option
              v-for="item in [{value:'1',name:'减少'},{value:'0',name:'增加'}]"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调账金额:" prop="amount">
          <el-input v-model="regulations.amount" size="mini" maxlength="9999" style="width: 80%" type="number"></el-input>
        </el-form-item>
        <el-form-item label="调账说明:" prop="memo">
          <el-input v-model="regulations.memo" size="mini" maxlength="9999" style="width: 80%" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="regulationCloses">取 消</el-button>
      <el-button type="primary" @click="addtoUpdate('banners')" :disabled="isDisable">确 定</el-button>
    </span>
     </el-dialog>
     <el-dialog
      title="商户信息更新"
      :visible.sync="information"
      width="40%"
      :before-close="informationClose">
      <el-form ref="update" :rules="updaterules" :model="update" label-width="120px" style="height:400px;overflow:auto">
        
        <el-form-item label="归属机构:" prop="belongOrgNo">
          
        </el-form-item>
        <el-form-item label="商户全称" prop="mchName">
          <el-input v-model="update.mchName" maxlength="13" size="mini" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="商户简称:" prop="mchShortName">
          <el-input v-model="update.mchShortName" maxlength="13" size="mini" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="营业执照号:" prop="busiLicenseNo">
          <el-input v-model="update.busiLicenseNo" maxlength="13" size="mini" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="执照过期日期:" prop="busiLicenseExpiryDate">
          <el-date-picker
            style="width: 80%"
            size="mini"
            v-model="update.busiLicenseExpiryDate"
            type="date"
            
            placeholder="选择日期时间"
            value-format="yyyyMMdd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="归属省份:" prop="busiLicenseProvCode">
          <el-select v-model="update.busiLicenseProvCode" placeholder="请选择" size="mini" style="width:80%">
            <el-option
              v-for="item in plist"
              :key="item.areaCode"
              :label="item.areaName"
              :value="item.areaCode">
            </el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="归属市区" prop="busiLicenseCityCode">
          

          <el-select v-model="update.busiLicenseCityCode" placeholder="请选择" size="mini" style="width:80%" @focus="getclist">
            <el-option
              v-for="item in clist"
              :key="item.areaCode"
              :label="item.areaName"
              :value="item.areaCode">
            </el-option>
          </el-select>
        </el-form-item>
       
        <el-form-item label="营业地址:" prop="busiLicenseAddress">
          <el-input v-model="update.busiLicenseAddress" maxlength="13" size="mini" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="法人姓名:" prop="legalPersonName">
          <el-input v-model="update.legalPersonName" maxlength="13" size="mini" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="法人身份证号码:" prop="legalPersonIdNumber">
          <el-input v-model="update.legalPersonIdNumber" maxlength="13" size="mini" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名:" prop="concatName">
          <el-input v-model="update.concatName" maxlength="13" size="mini" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="联系人方式:" prop="concatTel">
          <el-input v-model="update.concatTel" maxlength="13" size="mini" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="网站:" prop="webAddress">
          <el-input v-model="update.webAddress" maxlength="13" size="mini" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="商户类型" prop="mchType">
          <el-select v-model="update.mchType" placeholder="请选择" size="mini" style="width:80%">
            <el-option
              v-for="item in typeNameList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算银行:" prop="settlementBankCode">
          <el-select v-model="update.settlementBankCode" placeholder="请选择" size="mini" style="width:80%">
            <el-option
              v-for="item in blist"
              :key="item.id"
              :label="item.bankName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算账户类型:" prop="settlementAccountType">
          <el-select v-model="update.settlementAccountType" placeholder="请选择" size="mini" style="width:80%">
            <el-option
              v-for="item in [{value:'00',label:'对公'},{value:'01',label:'对私'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算账户名称:" prop="settlementAccountName">
          <el-input v-model="update.settlementAccountName" maxlength="13" size="mini" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="结算账户卡号:" prop="settlementCardNo">
          <el-input v-model="update.settlementCardNo" maxlength="13" size="mini" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>  
      <span slot="footer" class="dialog-footer">
        <el-button @click="informationClose">取 消</el-button>
        <el-button type="primary" @click="informations">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="商户入驻"
      :visible.sync="crtmch"
      width="40%"
      :before-close="crtClose">
      <el-form ref="crtmch" :rules="updaterules" :model="crtobj" label-width="120px" style="height:400px;overflow:auto">
        
        <el-form-item label="归属机构:" prop="belongOrgNo">
           <el-select v-model="crtobj.belongOrgNo" placeholder="请选择" size="mini" style="width:80%">
            <el-option
              v-for="item in tableData"
              :key="item.orgNo"
              :label="item.contactName"
              :value="item.orgNo">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商户全称" prop="mchName">
          <el-input v-model="crtobj.mchName" maxlength="13" size="mini" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="商户简称:" prop="mchShortName">
          <el-input v-model="crtobj.mchShortName" maxlength="13" size="mini" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="营业执照号:" prop="busiLicenseNo">
          <el-input v-model="crtobj.busiLicenseNo" maxlength="13" size="mini" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="执照过期日期:" prop="busiLicenseExpiryDate">
          <el-date-picker
            style="width: 80%"
            size="mini"
            v-model="crtobj.busiLicenseExpiryDate"
             type="date"
            
            placeholder="选择日期时间"
            value-format="yyyyMMdd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="归属省份:" prop="busiLicenseProvCode">
          <el-select v-model="crtobj.busiLicenseProvCode" placeholder="请选择" size="mini" style="width:80%">
            <el-option
              v-for="item in plist"
              :key="item.areaCode"
              :label="item.areaName"
              :value="item.areaCode">
            </el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="归属市区" prop="busiLicenseCityCode">
          

          <el-select v-model="crtobj.busiLicenseCityCode" placeholder="请选择" size="mini" style="width:80%" @focus="getclist">
            <el-option
              v-for="item in clist"
              :key="item.areaCode"
              :label="item.areaName"
              :value="item.areaCode">
            </el-option>
          </el-select>
        </el-form-item>
       
        <el-form-item label="营业地址:" prop="busiLicenseAddress">
          <el-input v-model="crtobj.busiLicenseAddress" maxlength="13" size="mini" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="法人姓名:" prop="legalPersonName">
          <el-input v-model="crtobj.legalPersonName" maxlength="13" size="mini" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="法人身份证号码:" prop="legalPersonIdNumber">
          <el-input v-model="crtobj.legalPersonIdNumber" maxlength="13" size="mini" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名:" prop="concatName">
          <el-input v-model="crtobj.concatName" maxlength="13" size="mini" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="联系人方式:" prop="concatTel">
          <el-input v-model="crtobj.concatTel" maxlength="13" size="mini" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="网站:" prop="webAddress">
          <el-input v-model="crtobj.webAddress" maxlength="13" size="mini" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="商户类型" prop="mchType">
          <el-select v-model="crtobj.mchType" placeholder="请选择" size="mini" style="width:80%">
            <el-option
              v-for="item in typeNameList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算银行:" prop="settlementBankCode">
          <el-select v-model="crtobj.settlementBankCode" placeholder="请选择" size="mini" style="width:80%">
            <el-option
              v-for="item in blist"
              :key="item.id"
              :label="item.bankName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算账户类型:" prop="settlementAccountType">
          <el-select v-model="crtobj.settlementAccountType" placeholder="请选择" size="mini" style="width:80%">
            <el-option
              v-for="item in [{value:'00',label:'对公'},{value:'01',label:'对私'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算账户名称:" prop="settlementAccountName">
          <el-input v-model="crtobj.settlementAccountName" maxlength="13" size="mini" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="结算账户卡号:" prop="settlementCardNo">
          <el-input v-model="crtobj.settlementCardNo" maxlength="13" size="mini" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="费率支付类型:" prop="feeType">
          <el-select v-model="crtobj.feeType" placeholder="请选择" size="mini" style="width:80%">
            <el-option
              v-for="item in [{value:'DEBIT',label:'储蓄卡'},{value:'CREDIT',label:'信用卡'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="费率:" prop="rate">
          <el-input v-model="crtobj.rate" maxlength="13" size="mini" style="width: 80%" placeholder="按千分比"></el-input>‰
        </el-form-item>
        <el-form-item label="固定手续费:" prop="fixedFee">
          <el-input v-model="crtobj.fixedFee" maxlength="13" size="mini" style="width: 80%" placeholder="单位为分"></el-input>分
        </el-form-item>
        <el-form-item label="最低手续费:" prop="minFee">
          <el-input v-model="crtobj.minFee" maxlength="13" size="mini" style="width: 80%" placeholder="单位为分"></el-input>分
        </el-form-item>
        <el-form-item label="最高手续费:" prop="maxFee">
          <el-input v-model="crtobj.maxFee" maxlength="13" size="mini" style="width: 80%" placeholder="单位为分"></el-input>分
        </el-form-item>
      </el-form>  
      <span slot="footer" class="dialog-footer">
        <el-button @click="crtClose">取 消</el-button>
        <el-button type="primary" @click="create">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {SESSION_STOART_MENUS} from "@/utils/ConstUtils.js"
  import {SESSION_STORAGE_USER} from "@/utils/ConstUtils.js"
  import {toTime} from "../../../config/util.js"
  import {isvalidAmountmoney} from '../../../config/validate'
  let valiAmountmoney =(rule, value,callback)=>{

    if (!value){
      callback(new Error('金额不能为空!'))
    }else  if (!isvalidAmountmoney(value) || value == 0){
      callback(new Error('请输入正数,小数只允许两位!'))
    }else {
      callback()
    }
  };
  export default {
    name: "membershipManagement",
    data() {
      return {
        isDisable:false,
        banks:{
          bank:'',
          actType:'',
        },
        openType:false,
        recharge:{
          number:'',
          accounts:''
        },
        plist:[],
        clist:[],
        blist:[],
        mlist:[],


        crtmch:false,
        crtobj:{
           userName:'',
          userPwd:'',
          mchName:'',
          mchShortName:'',
          busiLicenseNo:'',
          busiLicenseExpiryDate:'',
          busiLicenseProvCode:'',
          busiLicenseProv:'',
          busiLicenseCityCode:'',
          busiLicenseCity:'',
          busiLicenseAddress:'',
          legalPersonName:'',
          legalPersonIdNumber:'',
          concatName:'',
          concatTel:'',
          mchType:'',
          settlement:'',
          upTime:'',
          webAddress:'',
        },
        mchNameList:[],
        typeNameList:[{
          label:'TV',
          value:'TV'
        },{
          label:'SHOPPING',
          value:'SHOPPING'
        },{
          label:'MGPAY',
          value:'MGPAY'
        },{
          label:'FULU',
          value:'FULU'
        },{
          label:'TEST',
          value:'TEST'
        },{
          label:'VIDEO',
          value:'VIDEO'
        }],
        
        //调账表单
        regulation:false,
        regulationrules:{
          actType: [
            {required: true, message: '请选择调账账户', trigger: 'change'},
          ],
          sign:[
             {required: true, message: '请选择调账方式', trigger: 'change'},
          ],
          amount:[
            {required: true, message: '调账金额不能为空', trigger: 'blur'},
          ],
          memo:[
            {required: true, message: '调账说明不能为空', trigger: 'blur'},
          ],
        },
        //商户信息更新表单
        updaterules:{
          belongOrgNo:[{required: true, message: '请选择归属机构', trigger: 'change'},],
          mchName:[{required: true, message: '请输入商户全称', trigger: 'blur'},],
          mchShortName:[{required: true, message: '请输入商户简称', trigger: 'blur'},],
          busiLicenseNo:[{required: true, message: '请输入营业执照号', trigger: 'blur'},],
          busiLicenseExpiryDate:[{required: true, message: '请选择过期日期', trigger: 'change'},],
          busiLicenseProvCode:[{required: true, message: '请选择归属省份', trigger: 'change'},],
          busiLicenseCityCode:[{required: true, message: '请选择归属市区', trigger: 'change'},],
          busiLicenseAddress:[{required: true, message: '请输入营业地址', trigger: 'blur'},],
          legalPersonName:[{required: true, message: '请输入法人姓名', trigger: 'blur'},],
          legalPersonIdNumber:[{required: true, message: '请输入法人身份证', trigger: 'blur'},],
          concatName:[{required: true, message: '请输入联系人姓名', trigger: 'blur'},],
          concatTel:[{required: true, message: '请输入联系人方式', trigger: 'blur'},],
          webAddress:[{required: true, message: '请输入网站', trigger: 'blur'},],
          mchType:[{required: true, message: '请选择商户类型', trigger: 'change'},],
          settlementBankCode:[{required: true, message: '请选择结算银行', trigger: 'change'},],
          settlementAccountType:[{required: true, message: '请选择结算账户类型', trigger: 'change'},],
          settlementAccountName:[{required: true, message: '请输入结算账户名称', trigger: 'blur'},],
          settlementCardNo:[{required: true, message: '请输入结算卡号', trigger: 'blur'},],
          feeType:[{required: true, message: '请选择费率支付类型', trigger: 'change'},],
          rate:[{required: true, message: '请输入费率', trigger: 'blur'},],
          fixedFee:[{required: true, message: '请输入固定手续费', trigger: 'blur'},],
          minFee:[{required: true, message: '请输入最低手续费', trigger: 'blur'},],
          maxFee:[{required: true, message: '请输入最高手续费', trigger: 'blur'},],

        
        },

        regulations:{
          actType:'',
          sign:'',
          amount:'',
          memo:'',
          coreIds:'',
          coreId:null,
          typeNameList:null,
        },

        update:{
          userName:'',
          userPwd:'',
          mchName:'',
          mchShortName:'',
          busiLicenseNo:'',
          busiLicenseExpiryDate:'',
          busiLicenseProvCode:'',
          busiLicenseProv:'',
          busiLicenseCityCode:'',
          busiLicenseCity:'',
          busiLicenseAddress:'',
          legalPersonName:'',
          legalPersonIdNumber:'',
          concatName:'',
          concatTel:'',
          mchType:'',
          settlement:'',
          upTime:'',
          webAddress:'',
        },
        provincesNameList:[],
        cityNameList:[],
        actList:[{label:'花点钱',value:'SPEND_MONEY'},{label:'借点钱',value:'BORROW_MONEY'}],
        userList:'',
        tableDatas:'',
        rechargeShow:false,
        accountOpening:false,
        information:false,
        authButton:[],
        outgoingIsOpen: true,
        tableData: [],
        multipleSelection: [],
        myDoneappTypeList:'',
        merchatVal:{},
        simpleSearchValue:'',
        searchParams: {
          status:'',
          mchName:'',
          startDate:'',
          endDate:'',
          page: 1,
          pageSize: 10,
        },
        tableDatas:'',
        currentPage: 1,
        total:0,
        styleObj: {
          'color':'red'
        },
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
        stateOptions: [{
          value: '',
          label: '全部'
        }, {
          value: 'NORMAL',
          label: '正常'
        }, {
          value: 'CLOSED',
          label: '销户'
        }, {
          value: 'FREEZE',
          label: '冻结'
        },{
          value: 'DISABLE',
          label:'已禁用'
        }],
        value: '',
        crtrules:{},
        rules: {
          number: [
            {required: true,validator:valiAmountmoney, trigger: 'blur'},
          ],
          accounts: [
            {required: true, message: '请选择银行', trigger: 'blur'},
          ]
        },
        rule: {
          bank: [
            {required: true, message: '请选择银行', trigger: 'blur'},
          ],
          actType: [
            {required: true, message: '请选择账户类型', trigger: 'blur'},
          ],
        },
      }
    },
    methods:{
      informations(){
        this.$http.put(this.api.API_GATEWATE+'mango/mch',this.update,this.GLOBAL.topheaders())
              .then(function(res){
                if(res){
                  this.accountOpening = false
                  this.$message({
                    type: 'success',
                    message: '更新成功！'
                  });
                }
              }.bind(this))
              .catch(function(err){
                this.rechargeShow = false
                if(err && err.data && err.data.key == "400300"){
                  this.$router.push({ path: "/login" });
                }
                this.$message({
                  message: err.body.msg,
                  type: 'error'
                });
                //bind(this)可以不用
              }.bind(this))
      },
      handleClose() {
        this.accountOpening = false;
        this.$refs['banks'].clearValidate();
      },
      handleCloses(string){
        this.rechargeShow = false;
        this.$refs['recharge'].clearValidate();
      },
      regulationCloses(string){
        this.regulation = false;
        this.$refs['regulations'].clearValidate();
      },
      informationClose(string){
        this.information = false;
        this.update = {};
        this.$refs['update'].clearValidate();
      },

      //过滤操作按钮
      filterAuth(val){
        
        let arr = [43,44,188,189,190]
        return function(i,index,list){
          if(i.resourceId === 189 && val.status === 'DISABLE'){
            return false;
          }
          if(i.resourceId === 190 && val.status === 'NORMAL'){
            return false;
          }
          return arr.indexOf(i.resourceId) !== -1 ;
        }
          
        
      },
      //省份列表
      getplist(){
        this.$http.get(this.api.API_GATEWATE+'bas/prov',this.GLOBAL.topheaders())
        .then(function(res){
          if(res){
           this.plist= res.data
          }
        })
      },
      //市区列表
      getclist(){
        if(this.update.busiLicenseProvCode||this.crtobj.busiLicenseProvCode){
         let code=this.update.busiLicenseProvCode?this.update.busiLicenseProvCode:this.crtobj.busiLicenseProvCode
           this.$http.get(this.api.API_GATEWATE+'bas/prov/'+code,this.GLOBAL.topheaders())
          .then(function(res){
           if(res){
            this.clist= res.data
           }
        })
        }
      },
      //银行列表
      getblist(){
         this.$http.get(this.api.API_GATEWATE+'bas/banks',this.GLOBAL.topheaders())
        .then(function(res){
          if(res){
            this.blist= res.data
          }
        })
      },
      //搜索
      queryList () {
        this.searchParams.page = 1;
        this.searchParams.mchName = this.searchParams.mchName;
        this.searchParams.statu = this.searchParams.status;
        this.init();
      },
      handleSizeChange (size) {

        this.params.pageSize = size;
        this.init();
      },
      handleCurrentChange (val) {

        this.searchParams.page = val;
        this.init()
      },
      accountOpenings (recharge) {
        this.$refs[recharge].validate((valid) => {
          if (valid) {
            let _this = this;
            console.log(_this.userList)
            console.log(_this.tableDatas)
            let params ={};
            let url = this.openType?'mango/mch/openAccount':'mango/creatAccount';
            params.coreId = _this.tableDatas.coreId | '';
            params.crtOperId = _this.userList.userId | '';
            params.actType= _this.banks.actType;
            params.bank = _this.banks.bank;
            this.$http.post(_this.api.API_GATEWATE+url,params,_this.GLOBAL.topheaders())
              .then(function(res){
                if(res){
                  this.accountOpening = false
                  this.$message({
                    type: 'success',
                    message: '开户成功！'
                  });
                }
              }.bind(this))
              .catch(function(err){
                this.rechargeShow = false
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
      getRecharge (recharges) {
        this.$refs[recharges].validate((valid) => {
          if (valid) {
            let _this = this;
            console.log(_this.tableDatas)
            let params = {};
            params.coreId = _this.tableDatas.coreId;
            params.bank = _this.recharge.accounts;
            params.rechargeAmt = _this.recharge.number*100;
            this.$http.post(_this.api.API_GATEWATE + 'mango/recharge', params,{
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'AID': '002',
                'SID': '00000',
              }
            })
              .then(function (res) {
                if(res){
                  this.rechargeShow = false
                  this.$message({
                    type: 'success',
                    message: '充值成功！'
                  });
                }
              }.bind(this))
              .catch(function (err) {
                this.rechargeShow = false
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
          }
        })
      },

      preCreate(){
        this.crtmch = true;
      },
      create(){
        this.$refs['crtmch'].validate((valid) => {
        if (valid) {
        let _this = this;
        this.crtobj.busiLicenseProv=this.plist.find(e=>{return e.areaCode == this.crtobj.busiLicenseProvCode}).areaCode;
        this.crtobj.busiLicenseCity=this.clist.find(e=>{return e.areaCode == this.crtobj.busiLicenseCityCode}).areaCode;
        this.crtobj.settlementBankName=this.blist.find(e=>{return e.id == this.crtobj.settlementBankCode}).id;

        let base=this.crtobj;

        let fees={ channel:'CCB',payChannel:'MANGO_PAY',tradeType:'H5_WAP',rate:'1',fixedFee:'100',minFee:'0',maxFee:'10000',feeType:'DEBIT'}
        this.$http.post(_this.api.API_GATEWATE+'mango/mch',{base,fees},_this.GLOBAL.topheaders())
              .then(function(res){
                if(res){
                  this.crtmch = false;
                  this.crtobj = {};
                  this.$message({
                    type: 'success',
                    message: '入驻成功！'
                  });
                }
              }.bind(this))
              .catch(function(err){
                this.rechargeShow = false
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
      crtClose(){
        this.crtmch = false;
        this.crtobj = {};
        this.$refs['crtmch'].clearValidate();
      },
      getOperating (val,item) {
        const _this =this;
        this.tableDatas = val;
        
        if(item.resourceId == 43){
          this.accountOpening = true;
          this.banks={};
        }
        if(item.resourceId == 220){
          
          this.regulation = true;
          this.regulations={
            coreId:val.coreId
          };
        }
        if(item.resourceId == 44){
         this.rechargeShow = true;
         this.recharge={};
        }
        if(item.resourceId ===219){
          this.accountOpening = true;
          this.openType = true;
        }
        if(item.resourceId ===188){
          console.log(val);
          this.update.coreId = val.coreId;
          this.update.busiLicenseAddress = val.busiLicenseAddress;
          this.update.busiLicenseCity = val.busiLicenseCity;
          this.update.busiLicenseCityCode = val.busiLicenseCity;
          this.update.busiLicenseProvCode = val.busiLicenseProv;
          this.update. busiLicenseProv= val.busiLicenseProv;
          this.update.legalPersonName = val.legalPersonName;
          this.update. mchName = val.mchName;
          this.update.mchType = val.mchType;
          this.update. mchShortName= val.mchShortName;
          this.update.webAddress = val. webAddress;
          this.information = true;
          
        }
        if(item.resourceName == "商户启用"){
          console.log(val)
         
          this.$confirm('确定启用'+val.mchName+'?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let parm = {
              coreId : val.coreId,
              
            }
            console.log(parm)
            _this.$http.put(_this.api.API_GATEWATE+'mango/mch/enable',parm,
              _this.GLOBAL.topheaders())
              .then(function(res){
                console.log(res)
                this.init();
                if(res.ok == true){
                  _this.$message({
                    type: 'success',
                    message: '启用成功'
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
              message: '已取消启用'
            });
          });
        }
        if(item.resourceName == "商户禁用"){
          console.log(val)

          this.$confirm('确定禁用'+val.mchName+'?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let parm = {
              coreId : val.coreId,
            }
            _this.$http.put(_this.api.API_GATEWATE+'mango/mch/disable',parm,
              _this.GLOBAL.topheaders())
              .then(function(res){
                this.init();
                if(res.ok == true){
                  _this.$message({
                    type: 'success',
                    message: '禁用成功'
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
              message: '已取消禁用'
            });
          });
        }
      },

      //调账
      addtoUpdate () {
        console.log(this.regulations)
        this.$refs['regulations'].validate((valid) => {
          if (valid) {
            let _this = this;
            
            this.isDisable=true;
            _this.$http.post(_this.api.API_GATEWATE + 'mango/mch/reconciliation',
              this.regulations,
              _this.GLOBAL.topheaders())
              .then(function (res) {
                this.isDisable=false;
                console.log(res.data)
                if(res.data){
                  _this.$message({
                    message: "调账成功",
                    type: 'success'
                  });
                  this.init();
                  this.regulations={};
                  _this.regulation= false;
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
        
      },

      getTableData() {
        this.$confirm('是否确认充值?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '充值成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消充值'
          });
        });
      },
      init () {
        let _this = this;
        this.isDisable=true;
        this.$http.post(_this.api.API_GATEWATE+'mango/getMchList',_this.searchParams,_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable=false;
            _this.tableData =  res.data.list;
            for(let i=0; i<_this.tableData.length;i++){
              _this.tableData[i].date=toTime(_this.tableData[i].createDate+_this.tableData[i].createTime)
              if(_this.tableData[i].status == "NORMAL"){
                _this.tableData[i].statu = "正常"
              }else if(this.tableData[i].status == "CLOSED"){
                _this.tableData[i].statu = "销户"
              }else if(this.tableData[i].status == "FREEZE"){
                _this.tableData[i].statu = "冻结"
              }else if(this.tableData[i].status == "DISABLE"){
                _this.tableData[i].statu = "已禁用"
              }
            }
            _this.total = res.data.total || 0;
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
        console.log(this)
      },
    },
    created() {
      this.getplist();
      this.getblist();
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
    }
  }
</script>


<style  lang="scss">



</style>

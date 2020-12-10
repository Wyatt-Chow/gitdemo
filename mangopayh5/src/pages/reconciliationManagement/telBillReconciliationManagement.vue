<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 30px">对账时间:</label>
          <el-date-picker
            style="width:22%"
            size="mini"
            v-model="startDate"
            value-format="yyyyMMdd"
            type="daterange"
            :picker-options="startTime"
           
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
         <!-- <label style="padding-left: 50px">业务类型:</label>
          <template>
            <el-select v-model="value" placeholder="请选择" size="mini" style="width: 20%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>-->
         <!-- <label style="padding-left: 50px">状态:</label>
          <el-select v-model="value"  placeholder="请选择" size="mini" style="width:20%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>-->
          <el-button size="mini" type="primary" @click="queryBankList" style="margin-left:5%" :disabled="isDisable">搜索</el-button>
         
          <a  id="isa" href=""></a>
          <el-button style="float: right; padding-right: 20px;"  type="primary"  @click="show = true">导入账单</el-button>
        </el-col>
      </el-row>
    </div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable" :data="tableData" border stripe tooltip-effect="dark" style="width: 100%">
          <el-table-column label="对账时间"  show-overflow-tooltip>
            <template slot-scope="scope">
              <span> {{ scope.row.accountDate | date('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
         <!--  <el-table-column prop="mchId" label="渠道名称" show-overflow-tooltip>
          </el-table-column> -->
          <el-table-column prop="fileName" label="文件名" show-overflow-tooltip>
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
                  <el-dropdown-item  @click.native="getOperating(scope.row)" v-if="authButton.some(e=>{return e.resourceId == 181})">
                    下载
                  </el-dropdown-item>
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
      title="导入对账单"
      :visible.sync="show"
      width="40%"
      :before-close="handleClose">
      <el-form ref="roleList" :model="billList" label-width="150px">
        <el-form-item label="对账开始日期:" prop="beginAccountDate" :rules="[{required: true, message: '开始时间不能为空', trigger: 'blur'}]">
          <el-date-picker
            style="width: 80%"
            size="mini"
            v-model="billList.beginAccountDate"
            type="date"
            
            placeholder="选择日期"
            
            format="yyyy-MM-dd"
            value-format="yyyyMMdd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="对账结束日期:" prop="endAccountDate" :rules="[{required: true, message: '结束时间不能为空', trigger: 'blur'}]">
          <el-date-picker
            style="width: 80%"
            size="mini"
            v-model="billList.endAccountDate"
            type="date"
            
            placeholder="选择日期时间"
           
            format="yyyy-MM-dd"
            value-format="yyyyMMdd">
          </el-date-picker>
        </el-form-item>
     <!--  </el-form>
      <el-form :inline="true"> -->
        <el-form-item 
        v-for="(file, index) in channelList" 
        :label="file.name" :key="index" 
        > 
        <el-upload
        class="upload-demo"
        :action="api.API_GATEWATE+'mango/settle/bill//mobileRecharge/'+file.tag+'/upload'"
        ref="upload"
        accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-success="handleSuccess"
        :on-error="handleError"
        :limit="1"
        :on-exceed="handleExceed"
        >
        <el-button size="small" type="danger">点击上传对账文件</el-button>
       
  </el-upload>
        </el-form-item>
        
  
    
 
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit" :disabled="isDisable">发起对账</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import {SESSION_STOART_MENUS} from "@/utils/ConstUtils.js"
  import {toDataTime,buildRequestURL} from "../../../config/util.js"
  export default {
    name: "membershipManagement",
    data() {
      return {
        show:false,
        isDisable:false,
        accountDate:'',
        authButton:[],
        outgoingIsOpen: true,
        tableData: [],
        startDate:[],
        rules:[],
        fileList:[],
        channelList:[],
        billList:{
          beginAccountDate:'',
          endAccountDate:''
          

        },
        searchParams: {
          page: 1,
          pageSize: 10,
        },
        total:0,
        value: '',
        /* start 开始时间小于今天,结束时间不能大于开始时间 */
        startTime: {
          disabledDate: time => {
            return time.getTime() > Date.now();
          }
        },
        /* end*/
      }
    },
    methods :{
      handleClose (){
        this.show = false;
        this.billList = {};
        for (let item of this.$refs.upload){
          item.clearFiles();
        }
       
      },
      handlePreview() {},
      handleRemove(){},
      beforeRemove(){},
      handleExceed(){
         this.$message({
          message:'同一渠道只支持上传一份文件',
          type:'error'
        })
      },
      //上传成功回调
      handleSuccess(response, file, fileList){
        console.log(fileList)
        console.log(this.fileList)
      },
      //上传失败回调
      handleError (err, file, fileList){
        console.log(err)
        console.log(err.msg)
        this.$message({
          message:JSON.parse(err.message).msg,
          type:'error'
        })
      },
      //上传账单
      submit(){
         this.$refs['roleList'].validate((valid) => {
          if (valid) {
        this.$http.get(this.api.API_GATEWATE+'mango/settle/bill/shop/compare?beginAccountDate='+this.billList.beginAccountDate+'&endAccountDate='+this.billList.endAccountDate+'&shopCategory=PHONE_CHARGE', this.GLOBAL.topheaders())
          .then(function(res){
           if(res.data.result == "SUCCESS"){
              this.$message({
                message: '对账成功！',
                type: 'success'
              });
              this.show = false;
              this.billList = {};
              for (let item of this.$refs.upload){
                item.clearFiles();
              }
           }
          }.bind(this))
          .catch(function(err){
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
        console.log(this.billList)
      },
      queryBankList(){
        this.searchParams.page=1;
        if(this.startDate && this.startDate.length>0){
          this.searchParams.startDate = this.startDate[0];
          this.searchParams.endDate = this.startDate[1];
        }else{
          this.searchParams.startDate ="";
          this.searchParams.endDate ="";
        }
        console.log(this.searchParams)
        this.init();
      },
      handleSizeChange (size) {
        this.searchParams.pageSize = size;
        this.init();
      },
      handleCurrentChange (val) {
        this.searchParams.page = val;
        this.init()
      },
      //请求渠道列表
      initChannelList(){
        let _this = this;
       
        this.$http.get(_this.api.API_GATEWATE+'mango/common/hawk/channel/options',_this.GLOBAL.topheaders())
          .then(function(res){
           this.channelList = res.data
          }.bind(this))
          .catch(function(err){
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
      },
      //下载文件
      getOperating(val){
        let el = document.getElementById('isa');
        el.download = val.fileName;
        el.href=this.api.API_GATEWATE+'mango/settle/bill/download/'+val.fileName
        el.click();
       /*  window.location.href = buildRequestURL(this.api.API_GATEWATE+'mango/settle/bill/download',{filename:val.fileName}); */
       /*  window.window.open(this.api.API_GATEWATE+'mango/settle/bill/download/'+val.fileName); */

      },
      init () {
        let _this = this;
        this.isDisable=true;
        this.$http.get(buildRequestURL(_this.api.API_GATEWATE+'mango/settle/bill/shop/pages',_this.searchParams),_this.GLOBAL.topheaders())
          .then(function(res){
            this.isDisable=false;
            console.log(res.data)
            if(res){
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
        
      },
    },
    
    /* //权限检查
    checkauthority(id){
      console.log(id)
      return true
    }, */
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
      this.initChannelList();
    }
  }
</script>


<style  lang="scss">
</style>

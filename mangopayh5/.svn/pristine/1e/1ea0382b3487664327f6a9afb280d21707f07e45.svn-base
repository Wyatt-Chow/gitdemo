<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
         <!--  <label style="padding-left: 30px">会员等级:</label>
          <el-select v-model="vipLevel" placeholder="请选择" size="mini">
            <el-option value label="全部"></el-option>
            <el-option
              v-for="item in commodityDiscountList.items"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select> -->
          <label style="padding-left: 30px">折扣名称:</label>
          <el-input size="mini" style="width:20%" v-model="groupName"></el-input>
          <el-button
            size="mini"
            type="primary"
            @click="queryvipLevels"
            style="margin-left:20px"
            :disabled="isDisable"
          >搜索</el-button>
          <el-button
            style="margin-left:10px"
            size="mini"
            type="primary"
            v-if="item.resourceCode == 'vas_goods_discount_report'"
            v-for="item in authButton"
            :key="item.resourceId"
            @click.stop="getExport"
            :disabled="isdisable"
          >导出</el-button>
          <a id="isa" href target="_blank"></a>
        </el-col>
        <el-col :span="23" style="text-align: right">
          <el-button
            type="primary"
            v-if="item.resourceCode == 'add'"
            v-for="item in authButton"
            :key="item.resourceId"
            @click="getRedEnvelopeRuleButton"
          >{{item.resourceDesc}}</el-button>
        </el-col>
      </el-row>
    </div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
        <el-table
          ref="multipleTable"
          :data="tableData"
          stripe
          border
          tooltip-effect="dark"
          style="width: 100%"
        >
          <!--  <el-table-column prop="maxFee" label="最大折扣" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="最小折扣"  show-overflow-tooltip prop="minFee">
          </el-table-column>-->
          
            
         
          <el-table-column prop="groupName" label="折扣名称" show-overflow-tooltip></el-table-column>
         
          <el-table-column prop="createTimes" label="折扣创建时间" show-overflow-tooltip> </el-table-column>
         
         
          
          <el-table-column
            v-if="authButton.length>0"
            fixed="right"
            label="操作"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-dropdown :hide-on-click="false">
                <span class="el-dropdown-link">
                  <i class="el-icon-menu"></i>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item  @click.native="show(scope.row)">查看详情</el-dropdown-item>
                  <el-dropdown-item
                    @click.native="getButton(scope.row,item)"
                    v-if="item.resourceId == 73 || item.resourceId == 74"
                    v-for="item in authButton"
                    :key="item.resourceId"
                  >{{item.resourceName}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="searchParams.page"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="searchParams.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-header>
    </el-container>
    <el-dialog
      :title="title"
      :visible.sync="commodityDiscountSyns"
      width="62%"
      :before-close="handleClose"
    >
      <el-form ref="commodityDiscountList" :model="commodityDiscountList" label-width="120px">
        <el-form-item label="折扣名称" prop="groupName" :rules="[ { required: true, message: '请输入折扣名称', trigger: 'blur' }]">
          <el-input
            v-model="commodityDiscountList.groupName"
            maxlength="20"
            size="mini"
            style="width: 80%"
          ></el-input>
        </el-form-item>
       
        <el-row v-for="(item,index) in commodityDiscountList.items" :key="index">
         
          <el-col :span="3">
            <el-form-item :label="item.label"></el-form-item>
          </el-col>
         
          <el-col :span="7">
            <el-form-item :prop="'items'+index+'.fixedFee'" label="立减（元）" >
              <el-input v-model="item.fixedFee" maxlength="13" size="mini" @blur="calcuteDiscount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item :prop="'items'+index+'.rate'" label="折扣" >
              <el-input v-model="item.rate" maxlength="13" size="mini" @blur="calcuteDiscount"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="7" >  
             
               <span >以100.00元为例，优惠后金额为{{((100.00*10-item.fixedFee*10)*(item.rate===''?1:item.rate)/10).toFixed(2)}}元</span>
             
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="escReturn">取 消</el-button>
        <el-button
          type="primary"
          @click="addWhetherUpadate('commodityDiscountList')"
          :disabled="isDisable"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="detailsSyns"  width="60%" :before-close="detailshandleClose">
       <el-table :data="discountList" inline>
          <el-table-column  label="折扣名称" prop="name"> </el-table-column>
          <el-table-column  label="立减（元）" prop="fixedFee"> </el-table-column>
          <el-table-column  label="折扣" prop="rate"> </el-table-column>
          
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { SESSION_STOART_MENUS } from "../../utils/ConstUtils.js";
import { isvalidNuber, isvalidFee } from "../../../config/validate";
import { toTime, buildRequestURL } from "../../../config/util.js";
let validrate = (rule, value, callback) => {
  if (value != 0 && !value) {
    callback(new Error("比率不能为空"));
  } else if (!isvalidNuber(value) || value > 1) {
    callback(new Error("请输入小于等于1的正数或小数(3位)!"));
  } else {
    callback();
  }
};

export default {
  name: "commodityDiscountManagement",
  data() {
    var  validfixedFee = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("固定折扣不能为空"));
      } else if (!isvalidFee(value)) {
        callback(new Error("请输入1-7位整数或1-7位整数加1-2位小数!"));
      } else {
        callback();
      }
    };
    return {
      urlList: "",
      commodityDiscountList: {
        groupName: "",
        items: [
          {
            vipLevel:0,
            value: "0",
            label: "普通会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:1,
            value: "1",
            label: "一级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:2,
            value: "2",
            label: "二级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:3,
            value: "3",
            label: "三级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:4,
            value: "4",
            label: "四级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:5,
            value: "5",
            label: "五级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:6,
            value: "6",
            label: "六级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:7,
            value: "7",
            label: "七级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:8,
            value: "8",
            label: "八级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:9,
            value: "9",
            label: "九级会员",
            fixedFee: "",
            rate: "",
            checked:false
          }
        ]
      },
      discountList:[],
      vipLevel: "",
      groupName:'',
      discountFee: 0,
      isDisable: false,
      isdisable: true,
      title: "",
      commodityDiscountSyns: false,
      detailsSyns:false,
      ruleList: {
        rate: [{ required: true, trigger: "blur", validator: validrate }],
        fixedFee: [
          { required: true, trigger: "blur", validator: validfixedFee }
        ],
        groupName: [
          { required: true, trigger: "blur", message: "折扣名称不能为空" }
        ],
        vipLevel: [
          { required: true, trigger: "blur", message: "请选择会员等级" }
        ]
      },
      authButton: [],
      tableData: [],
      searchParams: {
        page: 1,
        pageSize: 10
      },
      searchParam: {
        page: 1,
        pageSize: ""
      },
      total: 0
    };
  },
  methods: {
    //搜索
    queryvipLevels() {
      this.searchParams.page = 1;
      this.searchParams.vipLevel = this.vipLevel;
      this.searchParams.groupName = this.groupName;
      this.isdisable = false;
      this.init();
    },
    show(val){
      this.detailsSyns = true;
      this.discountList = val.items
      console.log(val)
    },
    //计算以10为例的优惠金额
    calcuteDiscount() {/* 
      let discountFee = 0;

      if (
        isvalidNuber(this.commodityDiscountList.rate) &&
        isvalidFee(this.commodityDiscountList.fixedFee) &&
        this.commodityDiscountList.fixedFee !== ""
      ) {
        console.log(this.discountFee);
        discountFee =
          parseFloat(10 * this.commodityDiscountList.rate) +
          parseFloat(this.commodityDiscountList.fixedFee);
        if (discountFee < 0) {
          discountFee = 0;
        }
        if (discountFee > 99999999) {
          discountFee = 99999999;
        }
      }

      this.discountFee = discountFee; */
    },
    //导出
    getExport() {
      debugger;
      let _this = this;
      _this.searchParam.vipLevel = this.vipLevel;
      _this.searchParam.groupName = this.groupName;
      _this.searchParam.pageSize = _this.total;
      let el = document.getElementById("isa");
      el.href = buildRequestURL(
        _this.api.API_GATEWATE +
          "mango/value-added/service/goods/discount/report",
        _this.searchParam
      );
      el.click(); //触发打开事件
      return false;
      //window.location.href=buildRequestURL(_this.api.API_GATEWATE+'mango/value-added/service/goods/discount/report',_this.searchParam);
      //return false
    },
    //清除验证
    clearVail() {
      this.$refs["commodityDiscountList"].clearValidate();
    },
    escReturn() {
      this.discountFee = 0;
      this.clearVail();
      this.commodityDiscountSyns = false;
      this.commodityDiscountList = {
        groupName: "",
        items: [
          {
            vipLevel:0,
            value: "0",
            label: "普通会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:1,
            value: "1",
            label: "一级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:2,
            value: "2",
            label: "二级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:3,
            value: "3",
            label: "三级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:4,
            value: "4",
            label: "四级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:5,
            value: "5",
            label: "五级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:6,
            value: "6",
            label: "六级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:7,
            value: "7",
            label: "七级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:8,
            value: "8",
            label: "八级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:9,
            value: "9",
            label: "九级会员",
            fixedFee: "",
            rate: "",
            checked:false
          }]
      };
    },
    detailshandleClose() {
      this.discountList = []
      this.detailsSyns = false;
    },
    handleClose() {
      this.discountFee = 0;
      this.clearVail();
      this.commodityDiscountList = {
        groupName: "",
        items: [
          {
            vipLevel:0,
            value: "0",
            label: "普通会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:1,
            value: "1",
            label: "一级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:2,
            value: "2",
            label: "二级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:3,
            value: "3",
            label: "三级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:4,
            value: "4",
            label: "四级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:5,
            value: "5",
            label: "五级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:6,
            value: "6",
            label: "六级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:7,
            value: "7",
            label: "七级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:8,
            value: "8",
            label: "八级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:9,
            value: "9",
            label: "九级会员",
            fixedFee: "",
            rate: "",
            checked:false
          }
        ]
      };
      this.commodityDiscountSyns = false;
    },
    getRedEnvelopeRuleButton() {
      this.title = "新增商品折扣组";
      this.commodityDiscountSyns = true;
    },
    addWhetherUpadate(commodityDiscountList) {
     
      if (this.title == "新增商品折扣组") {
        this.addCommodityDiscount(this.commodityDiscountList);
      } else {
        this.updateRedEnvelopeList(commodityDiscountList);
      }
    },
    //修改
    updateRedEnvelopeList(commodityDiscountList) {
     
       
          let _this = this;
         
          let params = {}; 
          params.groupName = _this.commodityDiscountList.groupName;
          params.id = _this.commodityDiscountList.groupId;
          params.groupCreateTime =  _this.commodityDiscountList.groupCreateTime
          params.items = [];
          for(let item of _this.commodityDiscountList.items){
            item.maxFee = "99999999"
            item.minFee = "0"
            item.name =  item.label + "-" + _this.commodityDiscountList.groupName;
            item.id = item.discountId;
            if(item.fixedFee || item.rate){
              params.items.push(item)
            }
          }
          console.log(params);console.log(_this.commodityDiscountList)
          _this.$http
            .put(
              _this.api.API_GATEWATE + "mango/updateProductDiscount",
              params,
              _this.GLOBAL.topheaders()
            )
            .then(
              function(res) {
                this.isDisable = false;
                if (res.data == true) {
                  _this.init();
                  _this.commodityDiscountSyns = false;
                  _this.commodityDiscountList = {
                    groupName: "",
                    items: [
                      {
                        vipLevel:0,
                        value: "0",
                        label: "普通会员",
                        fixedFee: "",
                        rate: "",
                        checked:false
                      },
                      {
                        vipLevel:1,
                        value: "1",
                        label: "一级会员",
                        fixedFee: "",
                        rate: "",
                        checked:false
                      },
                      {
                        vipLevel:2,
                        value: "2",
                        label: "二级会员",
                        fixedFee: "",
                        rate: "",
                        checked:false
                      },
                      {
                        vipLevel:3,
                        value: "3",
                        label: "三级会员",
                        fixedFee: "",
                        rate: "",
                        checked:false
                      },
                      {
                        vipLevel:4,
                        value: "4",
                        label: "四级会员",
                        fixedFee: "",
                        rate: "",
                        checked:false
                      },
                      {
                        vipLevel:5,
                        value: "5",
                        label: "五级会员",
                        fixedFee: "",
                        rate: "",
                        checked:false
                      },
                      {
                        vipLevel:6,
                        value: "6",
                        label: "六级会员",
                        fixedFee: "",
                        rate: "",
                        checked:false
                      },
                      {
                        vipLevel:7,
                        value: "7",
                        label: "七级会员",
                        fixedFee: "",
                        rate: "",
                        checked:false
                      },
                      {
                        vipLevel:8,
                        value: "8",
                        label: "八级会员",
                        fixedFee: "",
                        rate: "",
                        checked:false
                      },
                      {
                        vipLevel:9,
                        value: "9",
                        label: "九级会员",
                        fixedFee: "",
                        rate: "",
                        checked:false
                      }]
                    };
                  _this.$message({
                    message: "更新成功",
                    type: "success"
                  });
                }
                //控制台打印请求成功时返回的数据
                //bind(this)可以不用
              }.bind(this)
            )
            .catch(
              function(err) {
                this.isDisable = false;
                if (err && err.data && err.data.key == "400300") {
                  _this.$router.push({ path: "/login" });
                }
                _this.$message({
                  message: err.data.msg,
                  type: "error"
                });
                //bind(this)可以不用
              }.bind(this)
            );
        
      
    },
    //添加
    addCommodityDiscount(commodityDiscountList) {
      
      
       
          let _this = this;console.log(_this.commodityDiscountList)
          let items = [];
          for( let item of _this.commodityDiscountList.items){
            item.name =  item.label + "-" + _this.commodityDiscountList.groupName;
            if(item.fixedFee || item.rate){
              items.push(item)
            }
           
          }
          console.log(items);
          let params = {
            groupName: _this.commodityDiscountList.groupName, //折扣组名称
            items:items
          };
          console.log(params)
          this.isDisable = true;
          _this.$http
            .post(
              _this.api.API_GATEWATE + "mango/insertProductDiscount",
              params,
              _this.GLOBAL.topheaders()
            )
            .then(
              function(res) {
                this.isDisable = false;
                if (res.data == true) {
                  _this.init();
                  _this.commodityDiscountSyns = false;
                  _this.commodityDiscountList = {
                    groupName: "",
         items: [
          {
            vipLevel:0,
            value: "0",
            label: "普通会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:1,
            value: "1",
            label: "一级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:2,
            value: "2",
            label: "二级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:3,
            value: "3",
            label: "三级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:4,
            value: "4",
            label: "四级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:5,
            value: "5",
            label: "五级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:6,
            value: "6",
            label: "六级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:7,
            value: "7",
            label: "七级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:8,
            value: "8",
            label: "八级会员",
            fixedFee: "",
            rate: "",
            checked:false
          },
          {
            vipLevel:9,
            value: "9",
            label: "九级会员",
            fixedFee: "",
            rate: "",
            checked:false
          }
        ]
                  };
                  _this.$message({
                    message: "添加成功",
                    type: "success"
                  });
                }
                //控制台打印请求成功时返回的数据
                //bind(this)可以不用
              }.bind(this)
            )
            .catch(
              function(err) {
                this.isDisable = false;
                if (err && err.data && err.data.key == "400300") {
                  _this.$router.push({ path: "/login" });
                }
                _this.$message({
                  message: err.data.msg,
                  type: "error"
                });
                //bind(this)可以不用
              }.bind(this)
            );
        
      
    },
    //获取按钮
    getButton(val, item) {
      if (item.resourceCode == "del") {
        this.delcommodityDiscount(val);
      } else if (item.resourceCode == "update") {
        this.title = "修改商品折扣组";
        //this.commodityDiscountList=val;
        //this.commodityDiscountSyns = true;
        this.querycommodityDiscountId(val);
      }
    },
    //删除
    delcommodityDiscount(val) {
      let _this = this;
      if (val.groupId) {
        let id = val.groupId;
        this.$confirm("确定删除该商品折扣?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            _this.$http
              .delete(
                _this.api.API_GATEWATE + "mango/deleteProductDiscount/" + id
              )
              .then(
                function(res) {
                  console.log(res.data);
                  if (res.data == true) {
                    this.init();
                    _this.$message({
                      type: "success",
                      message: "删除成功"
                    });
                  }
                }.bind(this)
              )
              .catch(
                function(err) {
                  if (err && err.data && err.data.key == "400300") {
                    _this.$router.push({ path: "/login" });
                  }
                  _this.$message({
                    message: err.body.msg,
                    type: "error"
                  });
                  //bind(this)可以不用
                }.bind(this)
              );
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    //查询
    querycommodityDiscountId(val) {
      let _this = this;
      _this.$http
        .get(
          _this.api.API_GATEWATE + "mango/productDiscountQueryone/" + val.groupId,
          _this.GLOBAL.topheaders()
        )
        .then(
          function(res) {
            if (res.body) {
              console.log(res)
              let commodityDiscountList = {
                groupName: "",
                items: [
                  {
                    vipLevel:0,
                    value: "0",
                    label: "普通会员",
                    fixedFee: "",
                    rate: "",
                    checked:false
                  },
                  {
                    vipLevel:1,
                    value: "1",
                    label: "一级会员",
                    fixedFee: "",
                    rate: "",
                    checked:false
                  },
                  {
                    vipLevel:2,
                    value: "2",
                    label: "二级会员",
                    fixedFee: "",
                    rate: "",
                    checked:false
                  },
                  {
                    vipLevel:3,
                    value: "3",
                    label: "三级会员",
                    fixedFee: "",
                    rate: "",
                    checked:false
                  },
                  {
                    vipLevel:4,
                    value: "4",
                    label: "四级会员",
                    fixedFee: "",
                    rate: "",
                    checked:false
                  },
                  {
                    vipLevel:5,
                    value: "5",
                    label: "五级会员",
                    fixedFee: "",
                    rate: "",
                    checked:false
                  },
                  {
                    vipLevel:6,
                    value: "6",
                    label: "六级会员",
                    fixedFee: "",
                    rate: "",
                    checked:false
                  },
                  {
                    vipLevel:7,
                    value: "7",
                    label: "七级会员",
                    fixedFee: "",
                    rate: "",
                    checked:false
                  },
                  {
                    vipLevel:8,
                    value: "8",
                    label: "八级会员",
                    fixedFee: "",
                    rate: "",
                    checked:false
                  },
                  {
                    vipLevel:9,
                    value: "9",
                    label: "九级会员",
                    fixedFee: "",
                    rate: "",
                    checked:false
                  }
                ] 
              }
              for(let item of commodityDiscountList.items){
                for(let i of res.body.items){
                  if(item.vipLevel == i.vipLevel){
                    item.discountId = i.discountId
                    item.fixedFee  = i.fixedFee/100
                    if(i.rate){
                      item.rate = parseFloat(i.rate)
                    }else{
                      item.rate = ''
                    }
                    
                   
                  }
                }
              }
              commodityDiscountList.groupName = res.body.groupName;
              commodityDiscountList.groupId = res.body.groupId
              commodityDiscountList.groupCreateTime = res.body.groupCreateTime
              _this.commodityDiscountList = commodityDiscountList;
              
              _this.calcuteDiscount();
              _this.commodityDiscountSyns = true;
            }
          }.bind(this)
        )
        .catch(
          function(err) {
            if (err && err.data && err.data.key == "400300") {
              _this.$router.push({ path: "/login" });
            }
            _this.$message({
              message: err.body.msg,
              type: "error"
            });
            //bind(this)可以不用
          }.bind(this)
        );
    },
    handleSizeChange(size) {
      this.searchParams.pageSize = size;
      this.init();
    },
    handleCurrentChange(val) {
      this.searchParams.page = val;
      this.init();
    },
    init() {
      let _this = this;
      _this.$http
        .post(
          _this.api.API_GATEWATE + "mango/productDiscountList",
          _this.searchParams,
          _this.GLOBAL.topheaders()
        )
        .then(
          function(res) {
            this.tableData = res.data.list;
            console.log(this.tableData);
            this.tableData.forEach(e => {
              e.createTimes = toTime(e.groupCreateTime);
              if(e.items){
                for(let i of e.items){
                  i.fixedFee = i.fixedFee/100
                }
              }
            });
            this.total = res.data.total || 0;
            console.log(this.total)
            //控制台打印请求成功时返回的数据
            //bind(this)可以不用
          }.bind(this)
        )
        .catch(
          function(err) {
            if (err && err.data && err.data.key == "400300") {
              _this.$router.push({ path: "/login" });
            }
            _this.$message({
              message: err.body.msg,
              type: "error"
            });
            //bind(this)可以不用
          }.bind(this)
        );
    }
  },
  created() {
    let _this = this;
    let path = this.$route.path;
    let menuList = sessionStorage.getItem(SESSION_STOART_MENUS);
    menuList = JSON.parse(menuList);
    menuList.forEach(e => {
      if (path == e.resourceCode) {
        _this.merchatVal = e;
      }
    });
    if (_this.merchatVal) {
      menuList.forEach(k => {
        if (_this.merchatVal.resourceId == k.resourceParentId) {
          this.authButton.push(k);
        }
      });
    }
    this.init();
  }
};
</script>

<style  lang="scss">
</style>


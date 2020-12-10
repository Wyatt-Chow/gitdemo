<template>
    <div>
    <div class="main_top_01">
        
          <el-col :span="24" style="margin-bottom:20px">
            <label style="padding-left: 50px">开户渠道:</label>
            <el-select v-model="openAccountChannel" placeholder="请选择" size="mini" style="width: 20%">
              <el-option
                v-for="item in bankList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <label style="padding-left: 44px">激活日期:</label>
            <el-date-picker
            style="width:22%"
            size="mini"
            v-model="starttime"
            type="daterange"
            :picker-options="startTime"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
            
            <el-button type="primary"  size="mini" @click="queryList" style="margin-left: 3%;" :disabled="isDisable">搜索</el-button>
            <el-button  style="margin-left:10px" size="mini" type="primary" v-if="item.resourceCode == 'elec_stats_report'"  v-for="item in authButton" :key="item.resourceId" @click.stop="getExport" :disabled="isdisable">导出</el-button>
            <a  id="isa" href=""></a>
          </el-col>
        </el-row>
    </div>
     <el-container style="padding: 10px 10px;border: 2px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable"  stripe  :border="true" style="width: 100%" :data='tableData'>
          <el-table-column prop="channelName" label="开户渠道"  show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="respMessage" label="失败原因" show-overflow-tooltip>
          </el-table-column>
          
          <el-table-column prop="total" label="数量统计" show-overflow-tooltip >
          </el-table-column>
      
        </el-table>
        <div class="table-page">
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="params.page"
                         :page-sizes="[10]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-header>
    </el-container>
    </div>
</template>

<script>
  import {SESSION_STOART_MENUS} from "@/utils/ConstUtils.js"
  import {toNum,buildRequestURL,formatUnixtimestamp,toDataTime} from "../../../config/util.js"
    export default {
        name: 'failedStatistics',
        data() {
            return {
              searchParams:{
                openAccountChannel:'',
                page:1,
                pageSize: 10,
                beginDate:'',
                endDate:''
              },
              searchParam: {
                openAccountChannel:'',
                page:1,
                pageSize:'',
                beginDate:'',
                endDate:''
              },
              params:{
                page:1,
                pageSize: 10,
              },
              openAccountChannel:'',
              bankList: [{
                value:'',
                label:'全部'
              },{
                value:'CMB',
                label:'招商银行'
              },{
                value:'CCB',
                label:'建设银行'
              },{
                value:'CIB',
                label:'兴业银行'
              }],
              starttime:[],
            
              tableData:[],
              isDisable:false,
              isdisable:true,
              total:0,
              merchatVal:{},
              authButton:[],
              /* start 开始时间小于今天,结束时间不能大于开始时间 */
              startTime: {
                disabledDate: time => {
                  return time.getTime() > Date.now();
                }
              },
              /* end*/
            }
        },
        methods: {
          // 搜索
          queryList(){
            this.searchParams.openAccountChannel =this.openAccountChannel;
            this.searchParams.page=1;
          
            if(this.starttime && this.starttime.length>0){
              this.searchParams.beginDate = toDataTime(this.starttime[0]);
              this.searchParams.endDate = toDataTime(this.starttime[1]);
            }else{
              this.searchParams.beginDate ="";
              this.searchParams.endDate ="";
            }
           
            this.isdisable=false;
            this.init();
            //this.queryAllStatistics();
          },
          init () {
            let _this = this;
            
            this.isDisable=true;console.log(_this.searchParams)
            this.$http.post(_this.api.API_GATEWATE+'mango/StatsElecAccountList',_this.searchParams,_this.GLOBAL.topheaders())
              .then(function(res){
                this.isDisable=false;
                console.log(res.body.list);
                let tableData = res.body.list
                tableData.forEach(e=>{
               
                if(e.openAccountChannel == "CMB"){
                  e.channelName ="招商银行";
                }else if(e.openAccountChannel == "CCB"){
                  e.channelName ="建设银行"
                }else if(e.openAccountChannel == "CIB"){
                  e.channelName ="兴业银行"
                }
                
              })
                _this.tableData=tableData
               
                _this.total = res.body.total
              /*  if(res.body.list.length>0){
                  let tableData =res.data.body.list;
                  console.log(tableData);
                  _this.tableData =  res.data.body.list;
                  _this.total = res.body.total || 0;
                }else{
                  _this.tableData = [];
                  _this.total = 0;
                } */
              
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


        // 导出
        getExport(){

          let _this = this;
          //获取导出的条件参数：起止时间与开户渠道
          this.searchParam.openAccountChannel =this.openAccountChannel;
          if(this.starttime && this.starttime.length>0){
            this.searchParam.beginDate = toDataTime(this.starttime[0]);
            this.searchParam.endDate = toDataTime(this.starttime[1]);
          }else{
            this.searchParam.beginDate ="";
            this.searchParam.endDate ="";
          }
          if(!this.searchParam.beginDate && !this.searchParam.endDate && !this.searchParam.openAccountChannel){
            this.$message({
              message: "请输入搜索条件进行导出",
              type: 'info'
            });
            return
          }
          _this.searchParam.pageSize = _this.total;
          let el = document.getElementById('isa');
          console.log(_this.searchParam)
          el.href=buildRequestURL(_this.api.API_GATEWATE+'mango/elec/stats/report',_this.searchParam)
          el.click();
        //触发打开事件
        // window.location.href=buildRequestURL(_this.api.API_GATEWATE+'mango/wallet/activation/report',_this.searchParam);
        // return false
        // window.open(buildRequestURL(_this.api.API_GATEWATE+'mango/wallet/activation/report',_this.searchParam))

      },
         
        handleSizeChange(size) {
          this.searchParams.pageSize = size;
          this.init();
        },

        handleCurrentChange(val) {
          this.params.page = val -1;
          this.searchParams.page = this.params.page+1;
          if(this.params.page >= 1){
            this.params.page = this.params.page +1;
          }
          this.init()
        }
      },
      created() {
        let now = new Date();
        this.starttime[1] = formatUnixtimestamp(now).substring(0,10);
        let ago = new Date(now.getTime() - 6*24*60*60*1000);
        this.starttime[0] = formatUnixtimestamp(ago).substring(0,10);
        console.log(this.starttime)
         
      
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
      }

    }
</script>

<style scoped>

</style>

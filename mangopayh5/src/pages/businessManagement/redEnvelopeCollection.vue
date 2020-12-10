<template>
  <div class="main_top">
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 30px">交易时间:</label>
          <el-date-picker  size="mini" style="width:9.5%" v-model="starttime" :picker-options="startTime" type="date" value-format="yyyy-MM-dd"></el-date-picker>-
          <el-date-picker  size="mini" style="width:10%" v-model="endtime" :picker-options="endTime" type="date" value-format="yyyy-MM-dd"></el-date-picker>
          <label style="padding-left: 50px">激活渠道:</label>
          <template>
            <el-select v-model="value" placeholder="请选择" size="mini" style="width: 20%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
          <label style="padding-left: 50px">开立银行:</label>
          <el-select v-model="values" placeholder="请选择" size="mini" style="width: 20%">
            <el-option
              v-for="item in optionss"
              :key="item.values"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary"  size="mini" style="margin-left: 50px">搜索</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" style="text-align: right;">
        </el-col>
      </el-row>
    </div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable" :data="tableData" border stripe tooltip-effect="dark" style="width: 100%">
          <el-table-column label="交易日期"  show-overflow-tooltip prop="title">
          </el-table-column>
          <el-table-column prop="appTypeName" label="激活渠道" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="processname" label="红包发放数量" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="urgencyName" label="红包发放金额" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="creatorName" label="红包领取金额" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="senderName" label="红包领取数量" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="activityName1" label="成功率" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div class="table-page" >
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="searchParams.page"
                         :page-sizes="[5, 10, 15, 20]" :page-size="searchParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-header>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "redEnvelopeCollection",
    data() {
      return {
        tableData: [],
        searchParams: {
          page: 1,
          pageSize: 10,
        },
        options: [{
          value: '选项1',
          label: '湖南快乐阳光互动娱乐传媒有限公司'
        }, {
          value: '选项2',
          label: '芒果超媒股份有限公司\n'
        }, {
          value: '选项3',
          label: '湖南快乐通宝小额贷款有限公司\n'
        }],
        value: '',
        optionss: [{
          value: '选项1',
          label: '招商银行'
        }, {
          value: '选项2',
          label: '建设银行\n'
        }, {
          value: '选项3',
          label: '兴业银行\n'
        }],
        values: '',
        total:0,
        endtime:'',
        starttime:'',
        /* start 开始时间小于今天,结束时间不能大于开始时间 */
        startTime: {
          disabledDate: time => {
            if (this.endtime) {
              return (
                time.getTime() > new Date(this.endtime).getTime()
              );
            } else {
              return time.getTime() > Date.now();
            }
          }
        },
        endTime: {
          disabledDate: time => {
            if (this.starttime) {
              return (
                time.getTime() > Date.now() ||
                time.getTime() < new Date(this.starttime).getTime()
              );
            } else {
              return time.getTime() > Date.now();
            }
          }
        },
        /* end*/
      }
    },
    methods:{
      handleSizeChange (size) {

        this.params.pageSize = size;
        this.init();
      },
      handleCurrentChange (val) {

        this.params.page = val;
        this.init()
      },
    }
  }
</script>


<style  lang="scss">

  /**
  * 头部按钮搜索样式
  */
  .myDoneHeader-content {
    padding-right: 0px;
    .title-1 { height:100%; border-bottom: 1px solid #ebebeb; position: relative}
    .title-1 h3{ color: #f55050; font-size: 18px; position: absolute; top: -2px;}

    .el-input__inner{
      border: 1px solid #d1d1d1;
      height: 35px;
      line-height: 35px;
      padding: 0 10px;
    }
    .el-input__inner:focus {
      border-color: #ffa7a7
    }
    .el-date-editor--datetimerange:focus {
      border-color: #ffa7a7
    }

    .el-button{ padding: 0px 16px; font-size: 16px;height: 35px; }

  }

  .right_btn {
    float: right;
    margin-left:200px;

  }
  .btn_x {
    width: 6.33333%;
  }
  .b {
    display: inline-block;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

  }
  .b span{ font-size: 16px;}
  .btn_left {
    float: left;
  }

  .btn_search{ margin-right:12px; margin-left: 12px;}
  .btn_s{display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #d1d1d1;
    background: #fff;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    -webkit-transition: .1s;
    transition: .1s;
    line-height: 35px;
    padding-left: 10px;
    font-size: 14px;
    border-radius: 4px;
    margin-top: 10px;
    color: #7c7c7c;}


  /**
  * 搜索条件表单样式
  */
  .myDoneSearch-content {
    .search-row {
      margin-bottom: 10px;
    }
    margin-top: 20px;
    margin-left: 60px;
    .search-span {
      text-align: right;
      padding-top: 8px;
    }
    .el-input__inner {
      border: 1px solid #d1d1d1;
      height: 35px;
      line-height: 35px;
      padding: 0 10px;
    }
    .el-input__inner:focus {
      border-color: #ffa7a7
    }

    .el-button {
      padding: 0px 16px;
      font-size: 16px;
      height: 35px;
    }

    .el-range-editor.is-active, .el-range-editor.is-active:hover {
      border: 1px solid #ffa7a7;
    }
    .el-select .el-input.is-focus .el-input__inner {
      border-color: #dd6161;
    }
  }
  .el-select-dropdown__item.selected {
    color: #dd6161;
    font-weight: 700;
  }



  /**
  * 列表表格样式
  */
  .myDoneTable-main {
    margin-top: 10px;

    .el-checkbox__input.is-checked  .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
      background-color: #ff6464;
      border-color: #ff6464;
    }
    .el-checkbox__inner:hover,.el-checkbox__input.is-focus .el-checkbox__inner  {
      border-color: #ff6464;
    }
    .el-table--enable-row-hover .el-table__body tr:hover>td{background-color: #fef1f1;}
    .el-table--enable-row-focus .el-table__body tr:focus>td{background-color: #fef1f1;}
    .el-table th.is-leaf {border-bottom: 1px solid #dddddd;}
    .el-table--striped .el-table__body tr.el-table__row--striped td{background: #F8f8f8;}
    .el-table td {border-bottom: none; }
    .el-table th>.cell { text-align:center; font-size: 16px;color:#383838; }
    // .el-table td>.cell { text-align:center; font-size: 12px; }
    .el-table .cell{ text-align:center; line-height: 34px;}
    .el-table thead{ color: #333; }

    .table-page {
      .el-pagination {
        margin-top: 10px;
        white-space: nowrap;
        color: #303133;
        font-weight: 700;
        float: right;
        padding-top: 10px;
      }
    }
  }

</style>
